import { React, useState, useEffect } from "react";
import { Button, HintBtn, TopBar, CustomModal } from "../components";

import { Modal } from "react-bootstrap";
import { Icon } from "@iconify/react";
import axios from "axios";
import { CsvToHtmlTable } from "react-csv-to-table";

import diff from "fast-diff";
const Practice = ({ backBtn, isSideMenuOpen, toggleSideMenu, ExerciseID }) => {
  const [show, setShow] = useState(false);
  const [aiShow, aisetShow] = useState(false);

  const [lgShow, setLgShow] = useState(false);
  const [smShow, setsmShow] = useState(false);
  const [questionData, setQuestionData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [hintData, setHintData] = useState([]);

  const [textareaValue, setTextareaValue] = useState("");
  const [apiResponse, setApiResponse] = useState([]);
  const [error, setError] = useState(null);

  const [showSolution, setShowSolution] = useState(false);
  const [outputTableData, setOutputTableData] = useState(null);

  const isProduction = process.env.NODE_ENV === "production";
  const apiUrlGetExercises = isProduction
    ? process.env.REACT_APP_API_URL_GET_QUESTIONS_PROD
    : process.env.REACT_APP_API_URL_GET_QUESTIONS;

  const apiUrlGetTables = isProduction
    ? process.env.REACT_APP_API_URL_GET_TABLENAME_PROD
    : process.env.REACT_APP_API_URL_GET_TABLENAME;

  const apiUrlExecute = isProduction
    ? process.env.REACT_APP_API_URL_EXECUTESQL_PROD
    : process.env.REACT_APP_API_URL_EXECUTESQL;

  const apiUrlGetHints = isProduction
    ? process.env.REACT_APP_API_URL_GET_HINT_PROD
    : process.env.REACT_APP_API_URL_GET_HINT;

  useEffect(() => {
    // Make GET request when the component mounts
    axios
      .get(`${apiUrlGetExercises}?exercise_id=${ExerciseID}`)
      .then((response) => {
        // Handle successful response

        setQuestionData(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching data:", error);
      });
  }, []);
  const currentQuestion = questionData[currentQuestionIndex];
  // console.log(currentQuestion.QuestionID);

  useEffect(() => {
    if (questionData.length > 0) {
      const getTableSchema = async () => {
        try {
          const schemaPromises = currentQuestion.TableNames.map((tableName) =>
            axios.get(`${apiUrlGetTables}?tableName=${tableName}`)
          );

          const schemaResponses = await Promise.all(schemaPromises);

          // Extract the data from each response
          const tableSchemas = schemaResponses.map((response) => response.data);

          // Set the table schema and name in the state, replacing existing data
          setTableData([
            { tableName: currentQuestion.TableNames, schema: tableSchemas },
          ]);
        } catch (error) {
          console.error("Error fetching table schema:", error);
        }
      };

      getTableSchema();
    }
  }, [currentQuestionIndex, questionData]);

  useEffect(() => {
    const getHints = async () => {
      try {
        // Assuming currentQuestion.id is a single ID
        const response = await axios.get(
          `${apiUrlGetHints}?questionID=${currentQuestion.QuestionID}`
        );

        // Extract the data from the response
        const hints = response.data;

        // Set the table schema and name in the state
        setHintData(hints);
      } catch (error) {
        console.error("Error fetching table schema:", error);
      }
    };

    getHints();
  }, [tableData]);

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  if (
    questionData.length === 0 ||
    currentQuestionIndex >= questionData.length
  ) {
    return (
      <>
        <Icon
          icon="ep:back"
          width="40"
          height="40"
          onClick={backBtn}
          className="back-button"
        />
        <p className="no_question">No questions available</p>
      </>
    );
  }

  const handleRunClick = async () => {
    try {
      // Make a POST request to the API with the textarea value as the sqlQuery
      const response = await axios.post(apiUrlExecute, {
        sqlQuery: textareaValue,
      });

      // Handle the API response here
      if (response.data.error) {
        // If the server returned an error, set the error state
        setOutputTableData(null);
        setError(response.data.error);
        setApiResponse(null);
      } else {
        // If no error, update the response data
        setApiResponse(response.data.result);
        setError(null);
        const JsonTosimplified = response.data.result
          ?.map((entry, index) => {
            const values = Object.values(entry);
            if (index === 0) {
              const keys = Object.keys(entry);
              return [keys.join(","), values.join(",")].join("\n");
            }

            return values.join(",");
          })
          .join("\n");
        compareResults(simplifiedCSV, JsonTosimplified);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle AxiosError (response from the server with status code 400)
        setError(error.response.data.error || "An unexpected error occurred.");
        setApiResponse(null);
        setOutputTableData(null);
      } else {
        // Handle other errors (network errors, etc.)
        console.error("Error:", error);
        setError("An unexpected error occurred.");
        setApiResponse(null);
        setOutputTableData(null);
      }
    }
  };

  const convertToSimpleCSV = (data) => {
    const rows = data.split("\\n");
    const cleanedRows = rows.map((row) =>
      row.replace(/\\/g, "").replace(/"/g, "").replace(/r$/, "").trim()
    );
    const simplifiedCSV = cleanedRows.join("\n");
    return simplifiedCSV;
  };

  const simplifiedCSV = convertToSimpleCSV(currentQuestion.ExpectedOutput);

  function compareResults(simplifiedCSV, JsonToSimplified) {
    const trimmedCSV = simplifiedCSV.trim();
    const trimmedJson = JsonToSimplified.trim();
    const differences = diff(trimmedCSV, trimmedJson);
    if (differences.every(([action]) => action === 0)) {

      setOutputTableData(true);
    } else {
  
      setOutputTableData(false);
    }
  }

  const toggleSolution = () => {
    setShowSolution((prevShowSolution) => !prevShowSolution);
  };

  return (
    <>
      <div className="dashboard_content">
        <div>
          <Icon icon="ep:back" width="40" height="40" onClick={backBtn} />
        </div>

        <div className="question_section">
          <h1>Question :1</h1>

          <div className="box">
            <span>{currentQuestion.QuestionName}</span>
          </div>

          <div className="box">
            <p>ExpectedOutput</p>

            <div className="half_width">
              <CsvToHtmlTable
                data={simplifiedCSV}
                csvDelimiter=","
                tableClassName="table  table-hover table-custom-width"
                style={{ marginLeft: "50%" }}
              />
            </div>
          </div>

          <div className="box">
            <p>Source Tables:</p>

            {tableData.map(({ tableName, schema }) => (
              <div key={tableName.join("-")}>
                {schema.map((fields, index) => (
                  <div key={index} className="blue_box">
                    <div className="box_header">
                      <h2>Table Name: {tableName[index]}</h2>
                    </div>
                    <div className="box_details">
                      <div className="fields-container">
                        {fields.map((field, fieldIndex) => (
                          <div key={fieldIndex} className="field">
                            <span>
                              <strong>{field.Field}</strong>:
                            </span>

                            <span>{field.Type}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="feedback_section">
          <div className="header">
            <Button text={"Level"} onClick={() => setsmShow(true)} />
            <div>
              <Button
                text={"Submit Feedback"}
                onClick={() => {
                  setShow(true);
                }}
              />
              <HintBtn text={"View Hint"} onClick={() => setLgShow(true)} />
            </div>
          </div>

          <div className="box">
            <h1>
              Write your SQL queries or Python code to provide expected answers.
            </h1>
            <textarea
              onChange={(e) => setTextareaValue(e.target.value)}
              placeholder={`"{id: 154, name: 'Chocolate Heaven'}"\n"{id: 154, name: 'Chocolate Heaven'}"\n"{id: 154, name: 'Chocolate Heaven'}"\n"{id: 154, name: 'Chocolate Heaven'}"\n"{id: 154, name: 'Chocolate Heaven'}"`}
            />
          </div>

          <div className="result_header">
            <h1>Query or Python code Output</h1>

            <div>
              <Button text={"AI Evaluation"} onClick={() => aisetShow(true)} />
              <Button text={"Run"} onClick={handleRunClick} active />
            </div>
          </div>
          {error && <div style={{ color: "red" }}>{error}</div>}
          <div className="result">
            {apiResponse &&
              outputTableData &&
              (Array.isArray(apiResponse) ? (
                apiResponse.map((item, index) => (
                  <p key={index}>{JSON.stringify(item)}</p>
                ))
              ) : (
                <p>{JSON.stringify(apiResponse.result)}</p>
              ))}
            {outputTableData === true ? (
              <p style={{ color: "green" }}>Correct Output</p>
            ) : outputTableData === false ? (
              <p className="error">Incorrect table name</p>
            ) : null}
          </div>
          {/* <div></div> */}

          <Button onClick={handleNextQuestion} text="Next Question"></Button>
        </div>

        <Modal
          centered
          size="lg"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
          className="view_hint_modal"
        >
          <Modal.Body>
            <div className="modal_question">{currentQuestion.QuestionName}</div>
            <div className="answer_code">
              <h2>HINTS</h2>
              {hintData &&
                hintData.map((hint, index) => (
                  <p key={index}> - {hint.Hint}</p>
                ))}
              {/* <h3  onClick={toggleSolution}>Click here to see solution</h3> */}
              <button
                style={{ border: "none", padding: "4px" }}
                onClick={toggleSolution}
              >
                Show solution
              </button>
              {showSolution && (
                <>
                  {/* <h2>Solution:</h2> */}
                  <p>Query:</p>
                  <p>{currentQuestion.solutionQuery}</p>
                  <p>Explanation:</p>
                  <p>{currentQuestion.solutionExplanation}</p>
                </>
              )}
            </div>
          </Modal.Body>
        </Modal>

        <Modal
          centered
          // size="lg"
          show={smShow}
          onHide={() => setsmShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
          className="level_modal"
        >
          <Modal.Body className="newmodal-body">
            <div className="levels">
              <div className="soft">Soft</div>
              <div className="easy">Easy</div>
              <div className="hard">Hard</div>
            </div>
          </Modal.Body>
        </Modal>

        <CustomModal
          show={show}
          setShow={setShow}
          heading={"Submit Feedback"}
          textareaHeading={"Write your feedback"}
          textareaRows={8}
          modalBtn={"Submit"}
        />

        <CustomModal
          show={aiShow}
          setShow={aisetShow}
          heading={"AI Evaluation"}
          textareaHeading={"The details of your problem are explained below"}
          textareaRows={8}
          modalBtn={"Copy"}
        />
      </div>
    </>
  );
};

export default Practice;
