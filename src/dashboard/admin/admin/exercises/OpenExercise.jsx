import React, { useState, useEffect } from "react";
import "./Exercises.scss";
import editicon from "../../../../assets/icons/eidticon.svg";
import { Icon } from "@iconify/react";
import axios from "axios";
import { toast } from "react-toastify";
// import Button from "react-bootstrap/Button";
import { Modal, Button } from "react-bootstrap";

const OpenExercise = ({ setOpen, backBtn, selectedExercise, reloadData }) => {
  const isProduction = process.env.NODE_ENV === "production";
  const apiUrlUpdateExercise = isProduction
    ? process.env.REACT_APP_API_URL_UPDATE_EXERCISE_PROD
    : process.env.REACT_APP_API_URL_UPDATE_EXERCISE;

  const TableCreate = isProduction
    ? process.env.REACT_APP_API_URL_CREATE_TABLE_PROD
    : process.env.REACT_APP_API_URL_CREATE_TABLE;

  const DeleteExercise = isProduction
    ? process.env.REACT_APP_API_URL_DELETE_EXERCISE_PROD
    : process.env.REACT_APP_API_URL_DELETE_EXERCISE;

  const [exerciseName, setExerciseName] = useState(
    selectedExercise.ExerciseName
  );
  const [exerciseDescription, setExerciseDescription] = useState(
    selectedExercise.exerciseDescription
  );
  const [showModal, setShowModal] = useState(false);
  const [tableName, setTableName] = useState("");
  const [fileInputKey, setFileInputKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // Update name or description

  useEffect(() => {
    setExerciseName(selectedExercise?.ExerciseName || "");
    setExerciseDescription(selectedExercise?.exerciseDescription || "");
  }, [selectedExercise]);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleShow = () => {
    setExerciseName(selectedExercise?.ExerciseName || "");
    setExerciseDescription(selectedExercise?.exerciseDescription || "");
    setTableName("");
    setFileInputKey((prevKey) => prevKey + 1);
    setLoading(false);
    setSelectedFile(null);
    setShowModal(true);
  };

  const handleUpdate = async () => {
    try {
      const updatedExercise = {
        ExerciseName: exerciseName,
        exerciseDescription: exerciseDescription,
      };

      const response = await axios.put(
        `${apiUrlUpdateExercise}?exerciseId=${selectedExercise.id}`,
        updatedExercise
      );
      toast.success("Exercise updated successfully");
    } catch (error) {
      console.error("Error updating exercise:", error);
    }
  };

  const handleTableNameChange = (event) => {
    setTableName(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const uploadTable = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("ExerciseID", selectedExercise.id);
      formData.append("tableName", tableName);
      formData.append("file", selectedFile);

      const response = await axios.post(TableCreate, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = response.data;
      toast.success("Table added successfully");

      // Append new table name to selectedExercise.TableName locally
      if (selectedExercise.TableName) {
        selectedExercise.TableName += `,${tableName}`;
      } else {
        selectedExercise.TableName = tableName;
      }

      setTableName("");
      setSelectedFile(null);
      setFileInputKey((prevKey) => prevKey + 1);

    } catch (error) {
      toast.error("Error uploading table");
      console.error("Error uploading table:", error);
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  // Delete exercise

  const DeleteExercsie = async (id) => {
    axios
      .delete(`${DeleteExercise}?exerciseId=${id}`)
      .then((res) => {
        toast.success("Exercise deleted successfully");
        backBtn();
      })
      .then((error) => {
        console.log(error);
      });
  };

  const [showDialog, setShowDialog] = useState(false);

  const handleDeleteClick = () => {
    // Open the modal
    setShowDialog(true);
  };

  const handleConfirmDelete = () => {
    // Close the modal and delete the exercise
    setShowDialog(false);
    DeleteExercsie(selectedExercise.id);
  };

  const handleCancelDelete = () => {
    // Close the modal without deleting the exercise
    setShowDialog(false);
  };





  // post request
  // localhost/3001/deleteTable
  // tableName

  const deleteTable = async (tableName) => {
    try {
      reloadData();
      // console.log(tableName, "table Name is here");
      // const apiUrlDeleteTable = isProduction
      //   ? process.env.REACT_APP_API_URL_DELETE_TABLE_PROD
      //   : process.env.REACT_APP_API_URL_DELETE_TABLE;

      const apiUrlDeleteTable = "http://localhost:3001/query/deleteTable";

      await axios.delete(apiUrlDeleteTable, {
        data: { tableName }
      });
      toast.success("Table deleted successfully");
      reloadData();
      // Optionally, update the UI by removing the deleted table from the list
      const updatedTables = selectedExercise.TableName.split(",").filter(
        (name) => name !== tableName
      );
      selectedExercise.TableName = updatedTables.join(",");

    } catch (error) {
      toast.error("Error deleting table");
      console.error("Error deleting table:", error);
    }
  };


  return (
    <div className="intromain">
      {/* <Icon icon="ep:back" width="30" height="30" onClick={backBtn} /> */}
      <div className="introtop">
        <h2>Database Name</h2>
        <input
          type="text"
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
        />
        <h3>Database description:</h3>
        <textarea
          value={exerciseDescription}
          onChange={(e) => setExerciseDescription(e.target.value)}
        />
        <div className="bottons">
          <button onClick={handleUpdate}>Update</button>
          <button onClick={backBtn}>Cancel</button>
        </div>
      </div>

      <div className="introbotom">
        <div className="botomright">
          <h1>List Of the Database Tables</h1>
          <label htmlFor="exerciseName" className="label">
            Associated Tables:
          </label>
          <button onClick={handleShow} className="add-table-btn">
            Add Table
          </button>

          <div className="topcards">
            {selectedExercise.TableName &&
              selectedExercise.TableName.split(',').map((tableName, index) => (
                <div key={index} className="table-button-wrapper">
                  <button className="table-button">
                    {tableName.split('_').slice(-1)[0]}
                  </button>
                  <Icon
                    icon="mdi:delete"
                    className="delete-icon"
                    onClick={() => deleteTable(tableName)}
                  />
                </div>
              ))}
          </div>
          <div className="btns">
            <div className="go-back">
              <button style={{ background: "red" }} onClick={handleDeleteClick}>
                Delete Exercise
              </button>
              <Modal show={showDialog} onHide={handleCancelDelete} centered>
                <Modal.Header closeButton>
                  <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>Are you sure you want to delete the exercise?</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCancelDelete}>
                    Cancel
                  </Button>
                  <Button variant="danger" onClick={handleConfirmDelete}>
                    Yes
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
            <div className="go-back">
              <button onClick={backBtn}>Go Back</button>
            </div>
          </div>
        </div>
      </div>

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
            {/* {errors.tableName && (
              <p className="error">Table name is required*</p>
            )} */}
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
            {/* {errors.file && (
              <p className="error">File is required*</p>
            )} */}
            <input
              key={fileInputKey}
              type="file"
              accept=".csv"
              onChange={handleFileChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="dark"
            onClick={uploadTable}
            disabled={!tableName || !selectedFile || loading}
            className="ms-4 "
          >
            {loading ? "Uploading..." : "Upload"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OpenExercise;
