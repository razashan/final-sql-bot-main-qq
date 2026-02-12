import React, { useEffect, useState, useRef } from "react";
import Exercises from "../exercises/Exercises";
import axios from "axios";
import "./AddExercise.scss";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";

import Select from "react-select";
import { ClipLoader } from "react-spinners";

const AddExercise = () => {
  const isProduction = process.env.NODE_ENV === "production";
  const getExercises = isProduction
    ? process.env.REACT_APP_API_URL_GET_EXERCISES_PROD
    : process.env.REACT_APP_API_URL_GET_EXERCISES;

  const createExercise = isProduction
    ? process.env.REACT_APP_API_URL_CREATE_QUESTION_PROD
    : process.env.REACT_APP_API_URL_CREATE_QUESTION;

  const getAssociatedTables = isProduction
    ? process.env.REACT_APP_API_URL_GET_ASSOCIATED_TABLES_PROD
    : process.env.REACT_APP_API_URL_GET_ASSOCIATED_TABLES;

  const apiUrlGetTables = isProduction
    ? process.env.REACT_APP_API_URL_GET_TABLENAME_PROD
    : process.env.REACT_APP_API_URL_GET_TABLENAME;

  const apiUrlGetQuestions = isProduction
    ? process.env.REACT_APP_API_URL_GENERATE_AI_QUESTIONS_PROD
    : process.env.REACT_APP_API_URL_GENERATE_AI_QUESTIONS;

  const apiUrlExecute = isProduction
    ? process.env.REACT_APP_API_URL_EXECUTESQL_PROD
    : process.env.REACT_APP_API_URL_EXECUTESQL;

  const apiUrlGetTableSchema = isProduction
    ? process.env.REACT_APP_API_URL_GET_TABLE_DATA_PROD
    : process.env.REACT_APP_API_URL_GET_TABLE_DATA;

  const [exerciseError, setExerciseError] = useState(false);
  const [questionNameError, setQuestionNameError] = useState(false);
  const [associatedTablesError, setAssociatedTablesError] = useState(false);
  const [hintsError, setHintsError] = useState(false);
  const [queryError, setQueryError] = useState(false);
  const [explanationError, setExplanationError] = useState(false);
  const [ExpectedOutput, setExpectedOutputError] = useState(false);
  const [questionArrayError, setQuestionArrayError] = useState(false);
  const [sqlTypeError, setSqlTypeError] = useState(false);

  const [difficultyLevel, setDifficultyLevel] = useState("");

  const [open, setOpen] = useState(false);
  const [uploadFromFile, setUploadFromFile] = useState(false);

  const [exerciseId, setExerciseId] = useState([]);
  const [exerciseData, setExerciseData] = useState([]);
  const [exerciseName, setExerciseName] = useState("");
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    questionName: "",
    AssociatedTableName: [],
    hints: [],
    ExpectedOutput: "",
    solutionQuery: "",
    solutionExplanation: "",
    DifficultyLevel: "",

    sqlType: "",
  });
  const [associatedTableData, setAssociatedTableData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [aiExpectedOutput, setAiExpectedOutput] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleQuestionChange = (key, value) => {
    setNewQuestion((prevQuestion) => ({ ...prevQuestion, [key]: value }));
  };

  const handleDifficultyChange = (key, value) => {
    setDifficultyLevel(value);

    // Update the newQuestion state correctly
    setNewQuestion((prevQuestion) => ({
      ...prevQuestion,
      [key]: value,
    }));
  };

  const handleSqlTypeChange = (key, value) => {
    setNewQuestion((prevQuestion) => ({ ...prevQuestion, [key]: value }));
  };
  const resetErrors = () => {
    setQuestionNameError(false);
    setAssociatedTablesError(false);
    setExpectedOutputError(false);
    setExplanationError(false);
    setQueryError(false);
    setHintsError(false);
    setSqlTypeError(false);
    setAiExpectedOutput(false);
  };
  const addQuestion = () => {
    if (
      !newQuestion.questionName ||
      !newQuestion.AssociatedTableName ||
      !newQuestion.ExpectedOutput ||
      !newQuestion.hints ||
      !newQuestion.solutionExplanation ||
      !newQuestion.solutionQuery ||
      !newQuestion.sqlType
    ) {
      setQuestionNameError(!newQuestion.questionName.trim());
      setAssociatedTablesError(newQuestion.AssociatedTableName.length === 0);
      setExpectedOutputError(!newQuestion.ExpectedOutput?.trim());
      setHintsError(!newQuestion.hints.length === 0);
      setQueryError(!newQuestion.solutionQuery.trim());
      setExplanationError(!newQuestion?.solutionExplanation?.trim());
      setSqlTypeError(!newQuestion?.sqlType.trim());
      return;
    }

    setQuestions([...questions, newQuestion]);

    setNewQuestion({
      questionName: "",
      AssociatedTableName: [""],
      hints: [""],
      ExpectedOutput: "",
      DifficultyLevel: "",
      solutionQuery: "",
      solutionExplanation: "",

      sqlType: "",
    });
    setHints([""]);

    // Reset error states
    resetErrors();
    // Close the modal
    setShowModal(false);
  };

  const handleHide = () => {
    resetErrors();
    setShowModal(false);
  };

  const HandleShow = () => {
    // Call resetErrors when the modal is shown
    resetErrors();
    setShowModal(true);
  };
  const removeQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

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
          if (exercise.ExerciseName === exerciseName) {
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
  }, [exerciseName]);

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

  const handleExerciseNameChange = (e) => {
    setExerciseName(e.target.value);
  };

  const handleCreateExercise = async () => {
    try {
      let matchedExercise = null;
      // Iterate through exerciseData to find a matching exercise name
      for (const exercise of exerciseData) {
        if (exercise.ExerciseName === exerciseName) {
          matchedExercise = exercise.id;
          setExerciseId(matchedExercise);
          break;
        }
      }
      if (!exerciseName && (!questions || questions.length === 0)) {
        setExerciseError(true);
        setQuestionArrayError(true);
        return;
      } else if (!exerciseName) {
        setExerciseError(true);
        setQuestionArrayError(false);
        return;
      } else if (!questions || questions.length === 0) {
        setExerciseError(false);
        setQuestionArrayError(true);
        return;
      }

      // Make an API call to create a new exercise
      const responseCreate = await axios.post(
        createExercise,
        {
          exercise_id: matchedExercise,
          questions: questions,
          // Add any other parameters needed for creating the exercise
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Handle success
      toast.success("Question created successfully");
      const data = responseCreate.data;

      // Clear the questions array after successful creation
      setQuestions([]);

      // Reset errors to false
      setExerciseError(false);
    } catch (error) {
      // Handle errors
      console.error("Error creating exercise:", error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const csvData = reader.result;

      handleQuestionChange("ExpectedOutput", csvData);
    };

    reader.readAsText(file);
  };

  const [showModal1, setShowModal1] = useState(false);
  const [hints, setHints] = useState([]);
  const [newHint, setNewHint] = useState("");

  const handleShow = () => setShowModal1(true);
  const handleClose = () => setShowModal1(false);

  const handleAddHint = () => {
    if (newHint.trim() !== "") {
      setHints([...hints, newHint]);
      setNewQuestion((prevQuestion) => ({
        ...prevQuestion,
        hints: [...prevQuestion.hints, newHint],
      }));
      setNewHint("");
    }
  };

  function logArray(array, propertyName) {
    return Array.isArray(array) ? array.join(", ") : "N/A";
  }
  function handleSelect(selected) {
    const selectedTables = selected
      ? selected.map((option) => option.value)
      : [];
    setNewQuestion((prevQuestion) => ({
      ...prevQuestion,
      AssociatedTableName: selectedTables,
    }));
  }

  const transformedOptions = associatedTableData.map((table) => ({
    value: table.TableName,
    label: table.TableName,
  }));

  const getTableSchema = async (tableName) => {
    try {
      const response = await axios.get(
        `${apiUrlGetTableSchema}/?tableName=${tableName}`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching table schema for table ${tableName}:`,
        error
      );
      throw error;
    }
  };

  const fetchTableSchemas = async (tableNames) => {
    const schemaPromises = tableNames.map((tableName) =>
      getTableSchema(tableName)
    );
    try {
      const schemaResponses = await Promise.all(schemaPromises);
      return schemaResponses;
    } catch (error) {
      console.error("Error fetching table schemas:", error);
      throw error; // Propagate the error to the calling function
    }
  };

  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(false);

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
  const [aiQuestion, setAiQuestion] = useState(false);

  const generateAiQuestion = async () => {
    // Set loading state to true when starting to fetch data
    setLoading(true);
    if (!difficultyLevel) {
      setLoading(false); // Set loading state to false if difficultyLevel is missing
      return toast.error("Enter difficulty level to generate question");
    }

    const table = associatedTableData.map((item) => item.TableName);

    try {
      const tableSchemas = await fetchTableSchemas(table);
      const tables = tableSchemas.map((schema, index) => ({
        tableName: table[index],
        schema,
      }));

      const response = await axios.post(apiUrlGetQuestions, {
        database: exerciseName,
        tables,
        difficultyLevel,
      });

      const receivedText = response.data.sqlQuery;

      const questionDescriptionRegex =
        /Question Description:([\s\S]+?)SQL Type:([\s\S]+?)Associated Table Name:([\s\S]+?)Hints:([\s\S]+?)Solution:([\s\S]+?)Explanation of Solution:([\s\S]+)/;
      const match = receivedText.match(questionDescriptionRegex);

      if (match) {
        const [
          _,
          questionDescription,
          sqlType,
          associatedTableName,
          hints,
          solution,
          explanation,
        ] = match;

        const associatedTableArray = associatedTableName
          ?.trim()
          .split(",")
          .map((table) => table?.trim());

        const hintsArray = hints
          ?.trim()
          .split(",")
          .map((hint) => hint?.trim());
        setHints(hintsArray);
        // console.log(solution, "solution query is here!!");
        // Remove the SQL code block formatting (i.e., triple backticks and sql, case insensitive)
        const cleanedSolution = solution.replace(/```sql|```/gi, "").trim();

        // console.log(cleanedSolution, "cleaned solution is here!!");

        const response = await axios.post(apiUrlExecute, {
          sqlQuery: cleanedSolution,
        });

        setAiQuestion(true);
        setApiResponse(response.data.result);
        const JsonToSimplified = convertJsonToSimplified(response.data.result);
        const jsonString = JSON.stringify(JsonToSimplified);
        let modifiedSolution = cleanedSolution;

        // Iterate over each associated table
        associatedTableArray.forEach((tableName) => {
          // Create a regular expression to match the table name in the solution
          const regex = new RegExp(`\\b${tableName}\\b`, "gi");

          // Replace occurrences of the full table name with only the last part
          modifiedSolution = modifiedSolution.replace(
            regex,
            tableName.split("_").pop()
          );
        });
        const transformedQuestion = {
          questionName: questionDescription.trim(),
          sqlType: sqlType.trim(),
          AssociatedTableName: associatedTableArray,
          hints: hintsArray,
          ExpectedOutput: jsonString,
          DifficultyLevel: difficultyLevel,
          solutionQuery: modifiedSolution,
          solutionExplanation: explanation.trim(),
        };

        setExpectedOutputError(false);
        setAiExpectedOutput(true);

        setNewQuestion({
          ...transformedQuestion,
        });
      } else {
        console.error("Error parsing question details from the text.");
      }
    } catch (error) {
      toast.error("AI was unable to generate the question. Please try again.");
      console.error("Error generating AI question:", error.message);
      // Handle errors, e.g., set an error state
    } finally {
      // Set loading state to false when data fetching is complete (whether successful or not)
      setLoading(false);
    }
  };

  function convertCsvStringToString(csvString, delimiter = ",") {
    const rows = csvString.split("\n");

    // Process each row and join values with "," and add a line break after each line
    const formattedLines = rows.map((row) => {
      const values = row.split(delimiter);
      return values.join(",") + "\n"; // Add a comma and line break after each line
    });

    // Join all formatted lines
    const formattedString = formattedLines.join("");

    return formattedString;
  }

  const fileInputRef = useRef(null);
  const handleQuestionFromFile = async (event) => {
    const file = event.target.files[0];

    if (file) {
      try {
        const reader = new FileReader();

        reader.onload = (e) => {
          const fileContent = e.target.result;
          const lines = fileContent.split("\n");

          const labels = [
            "questionName",
            "DifficultyLevel",
            "sqlType",
            "AssociatedTableName",
            "ExpectedOutput",
            "hints",
            "solutionQuery",
            "solutionExplanation",
          ];

          const updatedValues = {};

          let currentLabel = null;

          lines.forEach((line) => {
            labels.forEach((label) => {
              if (line.includes(`${label}:`)) {
                currentLabel = label;
                updatedValues[currentLabel] = ""; // Initialize as an empty string for multi-line values
              }
            });

            if (currentLabel && line.trim() !== "") {
              // Check if the line includes the current label
              if (line.includes(`${currentLabel}:`)) {
                updatedValues[currentLabel] +=
                  line.replace(`${currentLabel}:`, "").trim() + " ";
              } else {
                // Add the line to the current label's value
                if (currentLabel === "ExpectedOutput") {
                  updatedValues[currentLabel] += line.trim() + "\n"; // Add a line break for ExpectedOutput
                } else {
                  updatedValues[currentLabel] += line.trim() + " ";
                }
              }
            }
          });

          // Trim whitespace from multi-line values
          labels.forEach((label) => {
            if (updatedValues[label]) {
              updatedValues[label] = updatedValues[label].trim();
            }

            // Split AssociatedTableName and hints into arrays
            if (label === "AssociatedTableName") {
              updatedValues[label] = updatedValues[label]
                .split(",")
                .map((tableName) => `${exerciseName}_${tableName.trim()}`);
            } else if (label === "hints") {
              updatedValues[label] = updatedValues[label]
                .split(",")
                .map((hint) => hint.trim());
            }

            if (label === "ExpectedOutput") {
              updatedValues[label] = convertCsvStringToString(
                updatedValues[label]
              );
            }
          });

          setUploadFromFile(true);

          // Update only the values in the state
          setNewQuestion(updatedValues);
        };

        reader.readAsText(file);
      } catch (error) {
        console.error("Error reading file:", error);
      }
    }
  };

  // Upload bulk file

  const [showBulkModal, setShowBulkModal] = useState(false);

  const handleBulkModalClose = () => {
    setShowBulkModal(false);
  };

  const handleShowBulkForm = () => {
    // Implement your logic for showing the bulk form
    setShowBulkModal(true);
  };
  const [bulkFile, setBulkFile] = useState([]);
  const handleQuestionFromBulkFiles = async (files) => {
    try {
      const allFileData = [];

      for (const file of files) {
        const fileData = await new Promise((resolve, reject) => {
          const reader = new FileReader();

          reader.onload = (e) => {
            const fileContent = e.target.result;

            if (fileContent) {
              try {
                const workbook = XLSX.read(fileContent, { type: "binary" });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];

                const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                if (!data || data.length <= 1) {
                  reject(
                    new Error(
                      "File content is missing data or does not have enough questions."
                    )
                  );
                  return;
                }

                const labels = data[0]; // First row as labels
                // console.log(labels, "labels here");

                const questions = data.slice(1).map((row) => {
                  const questionData = {};

                  row.forEach((cell, index) => {
                    const label = labels[index];
                    const safeCell = cell != null ? String(cell).trim() : "";

                    if (label && safeCell !== "") {
                      if (label === "AssociatedTableName") {
                        questionData[label] = safeCell
                          .split(",")
                          .map((item) =>
                            exerciseName
                              .split(" ")
                              .join("_")
                              .concat("_", item.trim())
                          );
                      } else if (label === "hints") {
                        questionData[label] = safeCell
                          .split(",")
                          .map((hint) => hint.trim());
                      } else {
                        questionData[label] = safeCell;
                      }
                    }
                  });

                  return questionData;
                });

                const hasEmptyQuestion = questions.some(
                  (question) => !Object.keys(question).length
                );

                if (hasEmptyQuestion) {
                  reject(
                    new Error("Some questions are missing required labels.")
                  );
                } else {
                  resolve(questions);
                }
              } catch (err) {
                reject(new Error("Error parsing file content."));
              }
            } else {
              reject(new Error("File content is undefined."));
            }
          };

          reader.readAsBinaryString(file);
        });

        allFileData.push(...fileData); // Spread the questions into the array
      }

      setBulkFile(allFileData);
    } catch (error) {
      toast.error("Incorrect file format");
      console.error("Error reading files:", error.message);
    }
  };

  const handleBulkFileChange = (e) => {
    const files = Array.from(e.target.files);

    setSelectedFiles([...selectedFiles, ...files]);
    try {
      handleQuestionFromBulkFiles(files);
    } catch {
      toast.error("Incorrect file");
    }
  };

  const handleAddFiles = () => {
    const associatedTableNames = bulkFile
      .map((fileData) => fileData.AssociatedTableName)
      .flat();
    const incorrectTables = associatedTableNames.filter(
      (tableName) =>
        !transformedOptions.some((option) => option.value === tableName)
    );

    if (incorrectTables.length > 0) {
      toast.error("Incorrect tables selected");
      return;
    }

    setQuestions(bulkFile);
    setShowBulkModal(false);
  };

  return (
    <div>
      {open ? (
        <>
          <Exercises />
        </>
      ) : (
        <div className="add-exercises">
          <div className="exercise-name">
            <label>Database Name*</label>
            {exerciseError && (
              <p className="error">Database name is required</p>
            )}
            <div className="exercise-inner">
              <select
                value={exerciseName}
                onChange={handleExerciseNameChange}
                placeholder="Enter exercise name"
              >
                {/* Default option with disabled attribute */}
                <option disabled value="">
                  Select Database
                </option>

                {/* Display options from the exerciseData array */}
                {exerciseData.map((data, index) => (
                  <option key={index} value={data.ExerciseName}>
                    {data.ExerciseName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="add-question">
            <div className="button_modal">
              <div className="buttons">
                <Button
                  style={{
                    backgroundColor: "#202225",
                    border: "1px solid #202225",
                  }}
                  variant="primary"
                  onClick={() => setShowModal(true)}
                >
                  Add Question
                </Button>
                <Button
                  onClick={handleShowBulkForm}
                  variant="dark"
                  style={{ marginLeft: "10px" }}
                >
                  Add question in bulk
                </Button>

                {questionArrayError && (
                  <p className="error">No question is created </p>
                )}

                <Modal
                  show={showBulkModal}
                  onHide={handleBulkModalClose}
                  className="add_hint_modal"
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Upload Questions In Bulk</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="input">
                      <label>Add file:</label>
                      <input
                        type="file"
                        // accept=""
                        multiple
                        onChange={handleBulkFileChange}
                      />
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="dark" onClick={handleAddFiles}>
                      Add Files
                    </Button>
                    <Button variant="dark" onClick={handleBulkModalClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>

              <Modal
                show={showModal}
                onHide={handleHide}
                className="add_question_modal"
              >
                <Modal.Header closeButton>
                  <Modal.Title>Add Question</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                    }}
                  >
                    <Button onClick={generateAiQuestion} variant="dark">
                      Generate questions
                    </Button>
                    <input
                      type="file"
                      accept=".txt"
                      onChange={handleQuestionFromFile}
                      ref={fileInputRef}
                    />

                    {loading && <ClipLoader color="black" size={25} />}
                  </div>

                  <div className="input">
                    {" "}
                    <label>Question Description*</label>
                    {questionNameError && (
                      <p className="error">Question name is required</p>
                    )}
                    <textarea
                      className="question-name"
                      type="text"
                      placeholder="Enter question description"
                      value={newQuestion.questionName}
                      onChange={(e) =>
                        handleQuestionChange("questionName", e.target.value)
                      }
                    ></textarea>
                  </div>
                  <div className="input">
                    <label>Difficulty level*</label>
                    {questionNameError && (
                      <p className="error">Difficulty level is required</p>
                    )}
                    <select
                      className="question-name"
                      value={newQuestion?.DifficultyLevel}
                      onChange={(e) =>
                        handleDifficultyChange(
                          "DifficultyLevel",
                          e.target.value
                        )
                      }
                    >
                      <option value="">Select Difficulty Level</option>
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>

                  <div className="input">
                    <label>SQL Type*</label>
                    {sqlTypeError && (
                      <p className="error">SQL Type is required</p>
                    )}
                    <input
                      type="text"
                      className="question-name"
                      placeholder="Enter SQL Type"
                      value={newQuestion.sqlType}
                      onChange={(e) =>
                        handleSqlTypeChange("sqlType", e.target.value)
                      }
                    />
                  </div>

                  <div className="input">
                    <label>Associated Tables*</label>
                    {associatedTablesError && (
                      <p className="error">
                        Associated table names are required
                      </p>
                    )}

                    {aiQuestion || uploadFromFile ? (
                      <div className="input">
                        <input
                          type="text"
                          className="question-name"
                          placeholder="Enter SQL Type"
                          value={newQuestion.AssociatedTableName.map((e) => e)}
                        />
                      </div>
                    ) : (
                      <Select
                        options={transformedOptions}
                        placeholder="Select Associated Table"
                        value={
                          newQuestion.AssociatedTableName
                            ? transformedOptions.filter((option) =>
                                newQuestion.AssociatedTableName.includes(
                                  option.value
                                )
                              )
                            : null
                        }
                        onChange={handleSelect}
                        isSearchable={true}
                        isMulti={true}
                      />
                    )}

                    {/* Dropdown for Associated Tables */}

                    {aiQuestion ? (
                      <label>Expected output</label>
                    ) : (
                      <label>Upload expected output CSV File*</label>
                    )}
                    {ExpectedOutput && (
                      <p className="error">Expected Output table is required</p>
                    )}
                    {aiQuestion ? (
                      <textarea
                        className="question-name"
                        value={newQuestion.ExpectedOutput}
                        style={{ marginBottom: "10px" }}
                      ></textarea>
                    ) : (
                      <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                      />
                    )}

                    <div className="bottom">
                      <Button variant="dark" onClick={handleShow}>
                        Upload hints
                      </Button>
                      {hintsError && (
                        <p className="error">Hints are required</p>
                      )}

                      <Modal
                        show={showModal1}
                        onHide={handleClose}
                        className="add_hint_modal"
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Add Hints</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <div className="input">
                            <label>Hint:</label>
                            <input
                              type="text"
                              value={newHint}
                              onChange={(e) => setNewHint(e.target.value)}
                            />
                          </div>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="dark" onClick={handleAddHint}>
                            Add Hint
                          </Button>
                          <Button variant="dark" onClick={handleClose}>
                            Close
                          </Button>
                        </Modal.Footer>
                      </Modal>
                      {newQuestion.hints?.length > 0 && (
                        <div>
                          <p>Added Hints:</p>
                          <ul>
                            {newQuestion.hints?.map((hint, index) => (
                              <li key={index}>{hint}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="input">
                        {" "}
                        <label>Solution*</label>
                        {queryError && (
                          <p className="error">Query is required</p>
                        )}
                        <input
                          className="question-name"
                          type="text"
                          placeholder="Enter Query"
                          value={newQuestion.solutionQuery}
                          onChange={(e) =>
                            handleQuestionChange(
                              "solutionQuery",
                              e.target.value
                            )
                          }
                        />
                        {explanationError && (
                          <p className="error">Explanation is required</p>
                        )}
                        <textarea
                          className="question-name"
                          type="text"
                          placeholder="Enter Explanation"
                          value={newQuestion.solutionExplanation}
                          onChange={(e) =>
                            handleQuestionChange(
                              "solutionExplanation",
                              e.target.value
                            )
                          }
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="dark" onClick={addQuestion}>
                    Add Question
                  </Button>
                  <Button variant="dark" onClick={() => setShowModal(false)}>
                    Cancel
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
            <div className="cards">
              <div className="questions">
                {questions.map((question, index) => {
                  return (
                    <div key={index} className="card">
                      <label>Question #{index + 1}</label>
                      <p>Question Name: {question.questionName}</p>

                      <p>
                        Associated Tables:{" "}
                        {question?.AssociatedTableName.map((table, index) => {
                          const parts = table.split("_");
                          const secondPart = parts.length > 1 ? parts[1] : "";
                          return (
                            <span key={index}>
                              {secondPart}
                              {index !==
                                question.AssociatedTableName.length - 1 && ", "}
                            </span>
                          );
                        })}
                      </p>

                      <p>Hints: {logArray(question.hints, "hints")}</p>

                      <p>Expected Output: {question.ExpectedOutput}</p>
                      <p>Solution Query: {question.solutionQuery}</p>
                      <p>
                        Solution Explanation: {question.solutionExplanation}
                      </p>
                      <Button
                        onClick={() => removeQuestion(index)}
                        className="remove-btn"
                      >
                        Remove Question
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="createexercise">
              <button onClick={handleCreateExercise}>Create Question</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddExercise;
