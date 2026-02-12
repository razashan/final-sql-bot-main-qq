import React, { useState, useEffect } from "react";
import { Button, HintBtn, TopBar } from "../components";
import axios from "axios";
import Select from "react-select";
import Modal from "react-bootstrap/Modal";
import { CsvToHtmlTable } from "react-csv-to-table";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const AIText = ({ isSideMenuOpen, toggleSideMenu }) => {
  const [inputText, setInputText] = useState("");
  const [generatedResult, setGeneratedResult] = useState("");
  const [getResult, setGetResult] = useState("");

  const [sourceError, setSourceError] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const [exerciseId, setExerciseId] = useState([]);
  const [exerciseData, setExerciseData] = useState([]);
  const [exerciseName, setExerciseName] = useState("");
  const [associatedTableData, setAssociatedTableData] = useState([]);
  const [sourcetables, setSourceTables] = useState(null);
  const [TableData, setTableData] = useState([]);
  const [error, setError] = useState(null);
  const [queryExplanation, setQueryExplanation] = useState("");
  const [showExplanationModel, setShowExplanationModel] = useState(false);
  const [explanationLoading, setExplanationLoading] = useState(false);

  const isProduction = process.env.NODE_ENV === "production";

  const apiUrlAItoText = isProduction
    ? process.env.REACT_APP_API_URL_TEXT_TO_SQL_PROD
    : process.env.REACT_APP_API_URL_TEXT_TO_SQL;

  const apiUrlGetTables = isProduction
    ? process.env.REACT_APP_API_URL_GET_TABLE_DATA_PROD
    : process.env.REACT_APP_API_URL_GET_TABLE_DATA;

  const getExercisesNames = isProduction
    ? process.env.REACT_APP_API_URL_GET_EXERCISE_NAME_PROD
    : process.env.REACT_APP_API_URL_GET_EXERCISE_NAME;

  const getAssociatedTables = isProduction
    ? process.env.REACT_APP_API_URL_GET_ASSOCIATED_TABLES_PROD
    : process.env.REACT_APP_API_URL_GET_ASSOCIATED_TABLES;

  const apiUrlExecute = isProduction
    ? process.env.REACT_APP_API_URL_EXECUTESQL_PROD
    : process.env.REACT_APP_API_URL_EXECUTESQL;

  const apiUrlAItoTextExplain = isProduction
    ? process.env.REACT_APP_API_URL_TEXT_TO_SQL_EXPLAIN_PROD
    : process.env.REACT_APP_API_URL_TEXT_TO_SQL_EXPLAIN;
  // GET EXERCISES NAMES

  const [getExercisesName, setGetExerciseName] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(getExercisesNames);
        setGetExerciseName(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  function isRelevantToSource(userText, dataSource) {
    const userWords = userText.toLowerCase().split(/\s+/);

    // Check if any word in the user text is present in the table names
    const tableNamesMatch = dataSource.some((item) =>
      userWords.some((word) => item.tableName.toLowerCase().includes(word))
    );

    // Check if any word in the user text is present in the table data
    const tableDataMatch = dataSource.some((item) =>
      userWords.some((word) => item.data.toLowerCase().includes(word))
    );
    // Check if both table names and table data have a match
    return tableNamesMatch && tableDataMatch;
  }

  const handleGenerate = () => {
    setLoading(true);

    if (sourceError) {
      setLoading(false);
      return toast.error("No data source is selected");
    }

    if (!inputText) {
      setLoading(false);
      return toast.error("Question is empty");
    }

    setError(null);

    if (!isRelevantToSource(inputText, TableData)) {
      setLoading(false);
      return toast.error("Question is not according to data source");
    }

    // Make a POST request to the server
    axios

      .post(apiUrlAItoText, { userText: inputText, dataSource: TableData })
      .then((response) => {
        setGeneratedResult(response.data.sqlQuery);
        setSourceError(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("An error occurred. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleExplain = () => {
    if (!generatedResult) {
      return toast.error("No generated result to explain");
    }
    setShowExplanationModel(true);
    setExplanationLoading(true);
    axios
      .post(apiUrlAItoTextExplain, {
        generatedResult,
        dataSource: TableData,
        question: inputText,
      })
      .then((response) => {
        setExplanationLoading(false);
        setQueryExplanation(response.data.explanation);
      })
      .catch((error) => {
        setShowExplanationModel(false);
        setExplanationLoading(false);
        console.error("Error fetching data:", error);
        setError("An error occurred. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const getResult = async () => {
      if (generatedResult) {
        const response = await axios.post(apiUrlExecute, {
          sqlQuery: generatedResult,
        });
        const JsonToSimplified = convertJsonToSimplified(response.data.result);
        setResult(JsonToSimplified);
        // setResult(response.data);
      }
    };
    getResult();
  }, [generatedResult]);

  const [DBname, setDBname] = useState("");

  const handleChange = (event) => {
    // Update the state with the selected value
    setDBname(event.target.value);
  };
  const getExercises = isProduction
    ? process.env.REACT_APP_API_URL_GET_EXERCISES_PROD
    : process.env.REACT_APP_API_URL_GET_EXERCISES;

  // GET EXERCISES NAMES
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch exercises
        const responseExercises = await axios.get(getExercises);
        const exercisesData = responseExercises.data;
        setExerciseData(exercisesData);

        let matchedExercise = null;
        // Iterate through exerciseData to find a matching exercise name
        for (const exercise of exercisesData) {
          if (exercise.ExerciseName === DBname) {
            matchedExercise = exercise.id;
            setExerciseId(matchedExercise);
            break;
          }
        }
      } catch (error) {
        console.error("Error fetching exercise data:", error);
      }
    };

    fetchData();
  }, [DBname]);

  // Use another useEffect to fetch associated tables when exerciseId changes
  useEffect(() => {
    const fetchAssociatedTables = async () => {
      try {
        if (exerciseId) {
          const responseAssociatedTables = await axios.get(
            `${getAssociatedTables}?ExerciseID=${exerciseId}`
          );
          const associatedTable = responseAssociatedTables.data;
          setAssociatedTableData(associatedTable);
        }
      } catch (error) {
        console.error("Error fetching associated tables:", error);
      }
    };

    fetchAssociatedTables();
  }, [exerciseId]);

  const transformedOptions = associatedTableData?.map((table) => ({
    value: table.TableName,
    label: table.TableName,
  }));

  const handleSelect = (selected) => {
    const selectedTables = selected
      ? selected.map((option) => option.value)
      : [];
    setSourceTables(selectedTables);
  };

  const convertJsonToSimplified = (data) => {
    return (
      data
        ?.map((entry, index) => {
          const values = Object.values(entry);
          if (index === 0) {
            const keys = Object.keys(entry);
            return [keys.join(","), values.join(",")].join("\n");
          }
          return values.join(",");
        })
        .join("\n") || ""
    );
  };

  const handleAddSource = async () => {
    try {
      const results = [];

      for (const tableName of sourcetables) {
        const response = await axios.get(
          `${apiUrlGetTables}?tableName=${tableName}`
        );
        let simplifiedTable = convertJsonToSimplified(response.data);
        results.push({ tableName, data: simplifiedTable });
        setSourceError(false);
      }
      setTableData(results);
      setShowModal(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error, display a message, etc.
    }
  };
  const handleCloseExplanationModel = () => {
    setShowExplanationModel(false);
  };

  return (
    <>
      <div>
        <TopBar
          heading={"AI text to SQL"}
          isSideMenuOpen={isSideMenuOpen}
          toggleSideMenu={toggleSideMenu}
        />
      </div>

      <div className="ai_section">
        <div className="instruct_section">
          <h1>Instruct AI</h1>
          <div>
            <textarea
              placeholder="Instruct AI using everyday language e.g. Find information about engineers with at least 5 years of experience."
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>

          <div className="btn_container">
            {/* <Button text={"Generate"} active onClick={handleGenerate} /> */}
            <button onClick={handleShow} className="data_source">
              Select Data source
            </button>
            <button onClick={handleGenerate} className="generate">
              Generate
            </button>
          </div>
          <Modal
            centered
            show={showModal}
            onHide={handleClose}
            className="source_modal"
          >
            <Modal.Header closeButton closeVariant="white">
              <Modal.Title>Data Source</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* <h3></h3> */}
              <div className="dropdown">
                <select
                  name="selectDatabase"
                  id="selectDatabase"
                  onChange={handleChange}
                  value={DBname}
                >
                  <option value="">Select Databases</option>
                  {getExercisesName &&
                    getExercisesName?.map((e) => (
                      <option key={e.ExerciseName} value={e.ExerciseName}>
                        {e.ExerciseName}
                      </option>
                    ))}
                </select>

                {DBname && ( // Render the Select component only if a database is selected
                  <Select
                    options={transformedOptions}
                    placeholder="Select Associated Table"
                    onChange={handleSelect}
                    isSearchable={true}
                    isMulti={true}
                  />
                )}
              </div>

              <button onClick={handleAddSource}>Add source</button>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
          </Modal>

          <Modal
            centered
            show={showExplanationModel}
            onHide={handleCloseExplanationModel}
            className="unlock_modal"
          >
            <Modal.Header closeButton closeVariant="white">
              <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h3>Explanation</h3>

              {explanationLoading ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <ClipLoader color="white" size={25} />
                </div>
              ) : (
                queryExplanation
              )}
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
          </Modal>
          {TableData.map(({ tableName, data }) => (
            <div className="half_width" key={tableName}>
              <h3>{tableName}</h3>

              <div style={{ overflow: "scroll" }} className="box_details">
                <CsvToHtmlTable
                  data={data}
                  csvDelimiter=","
                  tableClassName="table table-hover table-custom-width"
                  style={{ marginLeft: "50%" }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="generate_section">
          <div className="header">
            <h1>AI Generation</h1>
            {generatedResult && (
              <button onClick={handleExplain} className="generate">
                Explain
              </button>
            )}
            {loading && <ClipLoader color="black" size={25} />}
          </div>

          <div className="box">
            <h1>Your AI Generated code</h1>
            <textarea
              value={generatedResult}
              placeholder="SELECT *FROM Engineers WHERE Experience >= 5;"
            />
          </div>

          <div className="result">
            <h3>Result</h3>
            {!result && <p>No record</p>}
            <div style={{ overflow: "scroll" }} className="box_details">
              <CsvToHtmlTable
                data={result}
                csvDelimiter=","
                tableClassName="table table-hover table-custom-width"
                style={{ marginLeft: "50%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIText;
