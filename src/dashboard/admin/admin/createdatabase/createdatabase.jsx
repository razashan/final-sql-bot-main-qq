import React, { useState, useEffect } from "react";
import "./createdatabase.scss";
import Adddatabase from "../adddatabase/adddatabase";
import crosicon from "../../../../assets/icons/crossicon.svg";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

import { getUserProfile } from "../../../../firebase/firebase";

function Createdatabase() {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [exerciseName, setExerciseName] = useState("");
  const [tables, setTables] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [exerciseID, setExerciseID] = useState(null);
  const [description, setDescription] = useState("");
  const [tableName, setTableName] = useState("");
  const [fileInputKey, setFileInputKey] = useState(0);

  const [errors, setErrors] = useState({
    exerciseName: false,
    description: false,
    tableName: false,
    file: false,
    tables: false,
  });
  const [emptyTable, setEmptyTable] = useState(false);
  const isProduction = process.env.NODE_ENV === "production";
  const ExerciseCreate = isProduction
    ? process.env.REACT_APP_API_URL_CREATE_EXERCISE_PROD
    : process.env.REACT_APP_API_URL_CREATE_EXERCISE;

  const TableCreate = isProduction
    ? process.env.REACT_APP_API_URL_CREATE_TABLE_PROD
    : process.env.REACT_APP_API_URL_CREATE_TABLE;

  const getExercisesNames = isProduction
    ? process.env.REACT_APP_API_URL_GET_EXERCISE_NAME_PROD
    : process.env.REACT_APP_API_URL_GET_EXERCISE_NAME;

  const apiUrlUpdateExercise = isProduction
    ? process.env.REACT_APP_API_URL_UPDATE_EXERCISE_PROD
    : process.env.REACT_APP_API_URL_UPDATE_EXERCISE;

  const apiUrlAddNotification = isProduction
    ? process.env.REACT_APP_API_URL_NOTIFICATION_PROD
    : process.env.REACT_APP_API_URL_NOTIFICATION;

  useEffect(() => {
    if (exerciseID !== null) {
      for (const table of tables) {
        uploadTable(table);
      }
    }
  }, [exerciseID, tables]);

  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await getUserProfile();
        setUser(profile);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchData();
  }, []);

  const postNotification = async (body) => {
    try {
      let userId = user?.uid;

      const response = await axios.post(apiUrlAddNotification, {
        userId: userId,
        body: body,
        is_general: "false",
      });
      return response.data;
    } catch (error) {
      console.error("Error sending notification:", error);
      throw error;
    }
  };

  const [loading, setLoading] = useState(false);

  const createDB = async () => {
    try {
      setLoading(true);
      if (!exerciseName || !description || tables.length === 0) {
        setErrors({
          exerciseName: !exerciseName,
          description: !description,
        });
        if (tables.length === 0) {
          setEmptyTable(true);
          toast.error("Please upload at least one table.");
        }
        setLoading(false);

        return;
      }

      const response = await axios.post(
        ExerciseCreate,
        {
          ExerciseName: exerciseName,
          exerciseDescription: description,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);

      toast.success("Exercise created ");
      let body = `A new exercise, "${exerciseName}," has been created. Practice is now available!`;
      postNotification(body);
      const data = response.data;
      setExerciseID(data.id);

      const uploadTables = async () => {
        for (const table of tables) {
          await uploadTable(table, data.id);
        }
      };

      uploadTables();
      setExerciseName("");
      setDescription("");
      setTables([]);
    } catch (error) {
      setLoading(false);

      toast.error("Error creating database");
      console.error("Error creating database:", error);
    }
  };

  const uploadTable = async (table, id) => {
    try {
      const formData = new FormData();
      formData.append("ExerciseID", JSON.stringify(id));
      formData.append("tableName", table.tableName);
      formData.append("file", table.file);

      const response = await axios.post(TableCreate, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = response.data;
    } catch (error) {
      toast.error("Error uploading table");
      console.error("Error uploading table:", error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUploadTable = () => {
    setErrors({
      exerciseName: false,
      description: false,
      tableName: false,
      file: false,
    });

    if (!tableName && !selectedFile) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        tableName: true,
        file: true,
      }));
      return;
    }

    if (!tableName) {
      setErrors((prevErrors) => ({ ...prevErrors, tableName: true }));
      return;
    }

    if (!selectedFile) {
      setErrors((prevErrors) => ({ ...prevErrors, file: true }));
      return;
    }

    const newTable = {
      tableName: tableName,
      file: selectedFile,
    };
    toast.success("Table uploaded successfully");
    setTables([...tables, newTable]);
    setTableName("");
    setSelectedFile(null);
    setFileInputKey((prevKey) => prevKey + 1); // Increment key to reset file input
  };

  const handleClose = () => {
    setShowModal(false);
    setTableName("");
    setSelectedFile(null);
  };

  const handleShow = () => setShowModal(true);

  const handleDatabaseNameChange = (event) => {
    setExerciseName(event.target.value);
  };

  const handleTableNameChange = (event) => {
    setTableName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDeleteTable = (tableName) => {
    // Filter out the table with the specified tableName
    const updatedTables = tables.filter((data) => data.tableName !== tableName);
    // Update the tables state
    setTables(updatedTables);
  };

  const [getExercisesName, setGetExerciseName] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(getExercisesNames);
        // Assuming the response contains the data you want to set in the state
        setGetExerciseName(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error if needed
      }
    };

    fetchData(); // Call the async function
  }, []);

  // Edit Database

  // Edit Database
  const [showDbModal, setShowDbModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);

  // Function to handle modal show
  const showModel = (index) => {
    setShowDbModal(true);
    setSelectedExercise(getExercisesName[index]);
  };

  // Function to handle modal close
  const closeDbModal = () => {
    setShowDbModal(false);
    setSelectedExercise(null);
  };

  const updateDatabase = async (id) => {
    try {
      const response = await axios.put(
        `${apiUrlUpdateExercise}?exerciseId=${id}`,
        selectedExercise
      );
      toast.success("Database updated successfully");
    } catch (error) {
      console.error("Error updating exercise:", error);
    }
  };

  return (
    <div>
      {open ? (
        <>
          <Adddatabase />
        </>
      ) : (
        <section className="create-database">
          <div className="inner-content">
            <div className="exercise-name">
              <label>Database Name</label>
              {errors.exerciseName && (
                <p className="error">Database Name is required*</p>
              )}
              <div className="exercise-inner">
                <input
                  type="text"
                  value={exerciseName}
                  onChange={handleDatabaseNameChange}
                  placeholder="Enter database name"
                />

                <button onClick={handleShow}>Upload Table</button>

                {/* React Bootstrap Modal */}
                <Modal
                  show={showModal}
                  onHide={handleClose}
                  animation={false}
                  className="uplaod_table_modal"
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Upload Table</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="input">
                      <label>Table Name:</label>
                      {errors.tableName && (
                        <p className="error">Table name is required*</p>
                      )}
                      <input
                        type="text"
                        className="table-name"
                        value={tableName}
                        onChange={handleTableNameChange}
                        placeholder="Enter table name"
                      />
                    </div>
                    <div className="input">
                      <label>Upload File:</label>
                      {errors.file && (
                        <p className="error">File is required*</p>
                      )}
                      <input
                        key={fileInputKey}
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                      />{" "}
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="dark" onClick={handleUploadTable}>
                      Upload
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>

            <div className="soccercountry">
              {tables.map((data) => (
                <div className="soccer" key={data.tableName}>
                  <div className="soctext">
                    <p>{data.tableName}</p>
                  </div>
                  <div className="crosicon">
                    <button onClick={() => handleDeleteTable(data.tableName)}>
                      {" "}
                      <img src={crosicon} alt="" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="description">
              <label>Description</label>
              {errors.description && (
                <p className="error">Description is required*</p>
              )}
              <textarea
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Enter description"
              ></textarea>
            </div>
            <div className="buttons">
              <button
                disabled={loading}
                onClick={createDB}>Create Database</button>
            </div>
            <div className="recently-added">
              <label>Others Databases</label>
              <div className="all-exercises">
                {getExercisesName &&
                  getExercisesName.map((item, index) => (
                    <div className="exercise-card" key={index}>
                      <p>{item.ExerciseName}</p>
                      <a href="#">
                        <img
                          src="/icons/edit.svg"
                          onClick={() => showModel(index)}
                          alt="..."
                        />
                      </a>
                    </div>
                  ))}

                <Modal
                  show={showDbModal}
                  onHide={closeDbModal}
                  className="edit_exercise_modal"
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Edit Exercise</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {selectedExercise && (
                      <>
                        <div className="input">
                          <label htmlFor="exerciseName">Exercise Name:</label>
                          <input
                            type="text"
                            id="exerciseName"
                            value={selectedExercise.ExerciseName}
                            onChange={(e) =>
                              setSelectedExercise({
                                ...selectedExercise,
                                ExerciseName: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="input">
                          <label htmlFor="exerciseDescription">
                            Exercise Description:
                          </label>
                          <textarea
                            id="exerciseDescription"
                            value={selectedExercise.exerciseDescription}
                            onChange={(e) =>
                              setSelectedExercise({
                                ...selectedExercise,
                                exerciseDescription: e.target.value,
                              })
                            }
                          ></textarea>
                        </div>

                        {/* <div className="input">
  <label htmlFor="exerciseName">Associated Tables:</label>

  < div style={{display:'flex'}} >
    {selectedExercise.TableName &&
      selectedExercise.TableName.split(',').map((tableName, index) => (
        <div style={{padding:'7px 10px', marginLeft:'10px', border:'1px solid black'}} key={index}>
         
            <p>{tableName}</p>
         
        </div>
      ))}
  </div>
</div> */}

                        {/* Add more fields as needed */}
                      </>
                    )}
                  </Modal.Body>
                  <Modal.Footer>
                    <button onClick={closeDbModal} className="close">
                      Close
                    </button>
                    <button
                      onClick={() => updateDatabase(selectedExercise.id)}
                      className="close"
                    >
                      Update
                    </button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default Createdatabase;
