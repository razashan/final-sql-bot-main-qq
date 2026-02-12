// import React from "react";
import NewTopBar from "../component/newTopBar";
// import Topbar from "../../User/components/topBar";
import "./dashboard.scss";
import { Icon } from "@iconify/react";
import axios, { all } from "axios";
import { GRAPHICS } from "../../User/assets";
import Google_icon from "../assets/icon/google_icon.png";
import { useState, useEffect, useContext, useMemo } from "react";
import diff from "fast-diff";
import SqlEditor from "../component/SqlEditor";
import { toast } from "react-toastify";
import { getUserProfile } from "../../../firebase/firebase";
import { Modal } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
// import { Icon } from "@iconify/react";
import { CsvToHtmlTable } from "react-csv-to-table";
import { ClipLoader } from "react-spinners";
import NewSqlEditor from "../component/NewSqlEditor";
import { updateEmail } from "firebase/auth";
import { useAccounts } from "../../User/hooks/accounts";
import { MyContext } from "../../../context/context";
import { display } from "@mui/system";

import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";

// import infoIcn from '../../../../public/info-iconn.svg'
// import infoIcn from "../../../../public/info-iconn.svg"

// Custom Table Node for React Flow
const TableNode = ({ id, data }) => (

  console.log(data, 'data in TableNode'),
  <div
    style={{
      background: "#2a2a2a",
      border: "1px solid #333",
      borderRadius: 6,
      color: "white",
      minWidth: 200,
      padding: 10,
      position: "relative",
    }}
  >
    <div
      style={{
        fontWeight: 700,
        fontSize: 16,
        marginBottom: 8,
        color: "#fff",
        textAlign: "center",
      }}
    >
      {data.label}
    </div>
    <div>
      {data.fields &&
        data.fields.map((field, idx) => {
          const { Field, Type, Key, } = field;
          const isPrimaryKey = Key === "PRI";
          const isForeignKey = field.isForeignKey === true;

          console.log(isPrimaryKey === true, Field, "isPrimaryKey")
          console.log(isForeignKey === true, Field, 'isForeignKey')

          // Handles: PK gets a target handle, FK gets a source handle
          return (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 13,
                borderBottom: "1px solid #333",
                padding: "2px 0",
                position: "relative",
              }}
            >
              {isPrimaryKey && (
                <Handle
                  type="target"
                  position={Position.Left}
                  id={`pk-${Field}`}
                  style={{
                    background: "#78be06",
                    width: 10,
                    height: 10,
                    left: -12,
                    top: 12,
                    borderRadius: "50%",
                  }}
                />
              )}
              <span style={{ flex: 1, color: "#fff" }}>{Field}</span>
              <span style={{ color: "#aaa", fontSize: 12 }}>{Type}</span>
              {isPrimaryKey && (
                <span
                  style={{
                    background: "#78be06",
                    color: "white",
                    borderRadius: 4,
                    padding: "0 5px",
                    fontSize: 11,
                    marginLeft: 4,
                  }}
                >
                  PK
                </span>
              )}
              {isForeignKey && (
                <span
                  style={{
                    background: "#007cb9",
                    color: "white",
                    borderRadius: 4,
                    padding: "0 5px",
                    fontSize: 11,
                    marginLeft: 4,
                  }}
                >
                  FK
                </span>
              )}
              {isForeignKey && (
                <Handle
                  type="source"
                  position={Position.Right}
                  id={`fk-${Field}`}
                  style={{
                    background: "#007cb9",
                    width: 10,
                    height: 10,
                    right: -12,
                    top: 12,
                    borderRadius: "50%",
                  }}
                />
              )}
            </div>
          );
        })}
    </div>
  </div>
);


const DescriptionWithReadMore = ({ description }) => {
  const [showMore, setShowMore] = useState(false);
  const maxLength = 1100;
  const isLong = description.length > maxLength;
  const displayText = showMore ? description : description.slice(0, maxLength);

  return (
    <div style={{ fontSize: "14px", textAlign: "center" }}>
      {displayText}
      {isLong && !showMore && "... "}
      {isLong && (
        <button
          style={{
            background: "none",
            border: "none",
            color: "#007cb9",
            cursor: "pointer",
            fontSize: "14px",
            padding: 0,
            marginLeft: "5px",
            textDecoration: "underline",
          }}
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "Read less" : "Read more"}
        </button>
      )}
    </div>
  );
};


function Dashboard({
  isSideMenuOpen,
  toggleSideMenu,
  bookmark,
  activeTab,
  setActiveTab,
  isAdmin,
  databasee,
  setDatabasee,
  closeDashboard,
  activePlan,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [bookmarkName, setBookmarkName] = useState("");
  const [tableLoading, setTableLoading] = useState(true);
  const { updateQuestionLength, questionLimitOver, updateTab } = useAccounts();
  const { value, setValue } = useContext(MyContext);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const { solvedQuestionIds, setSolvedQuestionIds } = useContext(MyContext);

  // Use useEffect to update it after the first render
  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  const [show, setShow] = useState(false);
  const [desktopshow, setDesktopShow] = useState(false);
  const [totalQuestion, setTotalQuestion] = useState(0);
  const [user, setUser] = useState(null);
  const [unlockshow, setUnlockShow] = useState(false);
  const [questionData, setQuestionData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [databaseName, setDatabaseName] = useState([]);
  const [hintData, setHintData] = useState([]);
  const [apiResponse, setApiResponse] = useState([]);
  const [error, setError] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [outputTableData, setOutputTableData] = useState(null);
  const [points, setPoints] = useState(0);
  const [query, setQuery] = useState("");
  const [aiHints, setAiHints] = useState([]);
  const [aiHintsLoading, setAIHintsLoading] = useState(false);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [noQuestion, setNoQuestion] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const [aiResponse, setAiResponse] = useState("");
  const [submitFeedback, setSubmitFeedback] = useState(false);
  const [aiEvaluationLoading, setAIEvaluationLoading] = useState(false);
  const [showStatus, setShowStatus] = useState(null);
  const [filterdata, setFilterdata] = useState(null);
  const [isRunQueryClicked, setRunQueryClicked] = useState(false);
  const [refreshPoints, setRefreshPoints] = useState(false);
  const [questionLoading, setQuestionLoading] = useState(false);

  // Making States for reactflow api call
  const [reactFlowData, setReactFlowData] = useState([]);
  const [reactFlowLoading, setReactFlowLoading] = useState(true);

  const [selectedQuestion, setSelectedQuestion] = useState(null);
  useEffect(() => {
    // console.log("selectedQuestion:", selectedQuestion);
  }, [selectedQuestion]);

  useEffect(() => {
    // console.log("query:", query);
  }, [query]);
  useEffect(() => {
    // console.log("outputTableData:", outputTableData);
  }, [outputTableData]);

  const [info, setInfo] = useState(false);

  const [isBookmarkMode, setIsBookmarkMode] = useState(false);
  const [bookmarkedQuestion, setBookmarkedQuestion] = useState(null);

  const handleClose = () => setUnlockShow(false);

  const handleInfo = () => {
    setInfo(!info);
  };

  const handleShow = () => {
    setUnlockShow(true);
    handleAIHints();
  };

  const solutionHandleClose = () => setShowSolution(false);
  const solutionHandleShow = () => {
    setShowSolution(true);
  };

  const handleFilterChange = (filtersData) => {
    setFilterdata(filtersData);
  };

  // Apis
  const isProduction = process.env.NODE_ENV === "production";
  const apiUrlGetQuestions = isProduction
    ? process.env.REACT_APP_API_URL_GET_QUESTIONS_PROD
    : process.env.REACT_APP_API_URL_GET_QUESTIONS;
  const apiUrlGetTables = isProduction
    ? process.env.REACT_APP_API_URL_GET_TABLENAME_PROD
    : process.env.REACT_APP_API_URL_GET_TABLENAME;
  const apiReactFlow = isProduction ? process.env.REACT_APP_API_URL_GET_TABLENAME_REACTFLOW_PROD : process.env.REACT_APP_API_URL_GET_TABLENAME_REACTFLOW;
  const apiUrlExecute = isProduction
    ? process.env.REACT_APP_API_URL_EXECUTESQL_PROD
    : process.env.REACT_APP_API_URL_EXECUTESQL;

  const apiUrlGetHints = isProduction
    ? process.env.REACT_APP_API_URL_GET_HINT_PROD
    : process.env.REACT_APP_API_URL_GET_HINT;

  const apiUrlAiHints = isProduction
    ? process.env.REACT_APP_API_URL_GENERATE_AI_HINTS_PROD
    : process.env.REACT_APP_API_URL_GENERATE_AI_HINTS;

  const apiUrlAiEvaluation = isProduction
    ? process.env.REACT_APP_API_URL_GENERATE_AI_EVALUATION_PROD
    : process.env.REACT_APP_API_URL_GENERATE_AI_EVALUATION;

  const apiUrlSolvedQuestion = isProduction
    ? process.env.REACT_APP_API_URL_SOLVED_QUESTIONS_PROD
    : process.env.REACT_APP_API_URL_SOLVED_QUESTIONS;

  const apiUrlGetSolvedQuestion = isProduction
    ? process.env.REACT_APP_API_URL_GET_SOLVED_QUESTIONS_PROD
    : process.env.REACT_APP_API_URL_GET_SOLVED_QUESTIONS;

  const apiUrlAddBookmark = isProduction
    ? process.env.REACT_APP_API_URL_ADD_BOOKMARK_PROD
    : process.env.REACT_APP_API_URL_ADD_BOOKMARK;

  const apiUrlGetBookmark = isProduction
    ? process.env.REACT_APP_API_URL_GET_BOOKMARK_PROD
    : process.env.REACT_APP_API_URL_GET_BOOKMARK;

  const apiUrlTrackAttempts = isProduction
    ? process.env.REACT_APP_API_URL_ADD_ATTEMPT_PROD
    : process.env.REACT_APP_API_URL_ADD_ATTEMPT;

  const apiUrlGetAttempts = isProduction
    ? process.env.REACT_APP_API_URL_GET_ATTEMPTS_PROD
    : process.env.REACT_APP_API_URL_GET_ATTEMPTS;

  const getAssociatedTables = isProduction
    ? process.env.REACT_APP_API_URL_GET_ASSOCIATED_TABLES_PROD
    : process.env.REACT_APP_API_URL_GET_ASSOCIATED_TABLES;

  const updateQuestionStates = (questions, solvedQuestions) => {
    const totalQuestions = questions.length;
    const solvedLength = solvedQuestions?.length || 0;
    const percentage = ((solvedLength / totalQuestions) * 100).toFixed(2);

    setQuestionData(questions);
    setTotalQuestion(totalQuestions);
    setGetSolvedQuestion(solvedQuestions);
    setSolvedQuestionLength(solvedLength);
    setPrecentageOfQuestion(percentage);
    updateQuestionLength(solvedLength);
  };

  const fetchQuestions = async () => {
    // console.log("fetchQuestions");

    try {
      const questionsResponse = await axios.get(apiUrlGetQuestions);
      const questions = questionsResponse.data;

      if (user) {
        const solvedResponse = await axios.get(
          `${apiUrlGetSolvedQuestion}?userId=${user.uid}`
        );
        const solvedQuestions = solvedResponse.data;
        setSolvedQuestionIds(
          solvedQuestions.map((q) => q.questionId || q.QuestionID)
        );

        // Update questionData with solvedStatus
        const updatedQuestions = questions.map((question) => ({
          ...question,
          solvedStatus: solvedQuestions.some(
            (a) => a.questionId === question.QuestionID
          ),
        }));

        updateQuestionStates(updatedQuestions, solvedQuestions);
      } else {
        updateQuestionStates(questions, []);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchAssociatedTables = async () => {
      try {
        if (value?.id) {
          const responseAssociatedTables = await axios.get(
            `${getAssociatedTables}?ExerciseID=${value?.id}`
          );
          const associatedTable = responseAssociatedTables.data;
          setDatabaseName(associatedTable);
        }
      } catch (error) {
        console.error("Error fetching associated tables:", error);
      }
    };
    fetchAssociatedTables();
  }, [value?.id]);

  useEffect(() => {
    fetchQuestions();
  }, [user]);

  const currentQuestion = useMemo(() => {
    if (isBookmarkMode && bookmarkedQuestion) {
      return bookmarkedQuestion;
    }
    return selectedQuestion || questionData[currentQuestionIndex];
  }, [
    isBookmarkMode,
    bookmarkedQuestion,
    selectedQuestion,
    questionData,
    currentQuestionIndex,
  ]);

  useEffect(() => {
    setValue(null);
  }, []);

  // Optimize fetchBookmarks to batch state updates
  const fetchBookmarks = async () => {
    try {
      if (user) {
        const bookmarksResponse = await axios.get(
          `${apiUrlGetBookmark}?userId=${user.uid}`
        );
        const updatedQuestionData = questionData.map((question) => ({
          ...question,
          bookmarkStatus: bookmarksResponse.data.some(
            (bookmark) => bookmark.bookmarkedQuestionId === question?.QuestionID
          ),
        }));
        setQuestionData(updatedQuestionData);
      }
    } catch (error) {
      console.error("Error fetching bookmarks:", error.message);
    }
  };
  useEffect(() => {
    fetchBookmarks();
  }, [user]);

  // colors for easy hard medium difficulty level

  function getButtonColor(difficultyLevel) {
    switch (difficultyLevel?.toLowerCase()) {
      case "easy":
        return "#78be06";
      case "medium":
        return "#007cb9";
      case "hard":
        return "#dc2f2f";
      default:
        return "transparent";
    }
  }

  // Get table schema

  useEffect(() => {
    const getTableSchema = async () => {
      try {
        if (!currentQuestion?.TableNames) return;

        const schemaPromises = currentQuestion.TableNames.map((tableName) =>
          axios.get(`${apiUrlGetTables}?tableName=${tableName}`)
        );

        const schemaResponses = await Promise.all(schemaPromises);
        const tableSchemas = schemaResponses.map((response) => response.data);
        setTableLoading(false);

        const textAfterHyphenArray = currentQuestion.TableNames.map(
          (tableName) => {
            const tableNameParts = tableName.split("_");
            return tableNameParts[tableNameParts.length - 1];
          }
        );

        setTableData([
          { tableName: textAfterHyphenArray, schema: tableSchemas },
        ]);
      } catch (error) {
        console.error("Error fetching table schema:", error);
      }
    };

    const fetchReactFlowSchema = async () => {
      try {
        if (!currentQuestion?.TableNames) {
          return
        };

        const schemaPromises = currentQuestion.TableNames.map((tableName) =>
          axios.get(`${apiReactFlow}?tableName=${tableName}`)
        );

        const schemaResponses = await Promise.all(schemaPromises);
        const reactFlowSchemas = schemaResponses.map((response) => response.data);

        setReactFlowLoading(false);
        setReactFlowData(reactFlowSchemas);
      } catch (error) {
        console.error("Error fetching React Flow schema:", error);
      }
    };



    getTableSchema();
    fetchReactFlowSchema();
  }, [currentQuestion]);

  // Get hints
  const getHints = async () => {
    if (currentQuestion) {
      try {
        const response = await axios.get(
          `${apiUrlGetHints}?questionID=${currentQuestion.QuestionID}`
        );
        setHintData(response.data);
      } catch (error) {
        console.error("Error fetching hints", error);
      }
    }
  };

  useEffect(() => {
    getHints();
  }, [currentQuestion]);

  useEffect(() => {
    console.log("firstRends");
  }, []);

  const handleQueryChange = (query) => {
    setQuery(query);
  };

  const handleRunClick = async () => {
    // console.log("handleRunClick");

    if (questionLimitOver) {
      updateTab("Subscription");
      return;
    }

    let updateQuery = query;
    tableData[0].tableName.forEach((tableNameElement, index) => {
      const regex = new RegExp(`\\b${tableNameElement}\\b`, "gi");
      updateQuery = updateQuery.replace(regex, (match) => {
        return match === tableNameElement
          ? currentQuestion?.TableNames[index]
          : match;
      });
    });

    try {
      const response = await axios.post(apiUrlExecute, {
        sqlQuery: updateQuery,
      });

      // console.log("response:", response);

      if (response.data.error) {
        // console.log("if condition");
        console.log("response.data.error:", response.data.error);

        setError(response.data.error);
        setApiResponse(null);
        setOutputTableData(null);
      } else {
        // console.log("else condition");

        setApiResponse(response.data.result);
        setError(null);
        setRunQueryClicked(true);
      }

      // console.log("outputTableData:", outputTableData);
      // console.log(
      //   "currentQuestion?.solvedStatus:",
      //   currentQuestion?.solvedStatus
      // );

      if (!outputTableData && !currentQuestion?.solvedStatus) {
        try {
          await axios.post(apiUrlTrackAttempts, {
            userId: user?.uid,
            questionId: currentQuestion?.QuestionID,
            attempt: 1,
          });
        } catch (error) {
          console.error("Error adding attempt:", error);
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response.data.error || "An unexpected error occurred.");
        setApiResponse(null);
        setOutputTableData(null);
      } else {
        console.error("Error:", error);
        setError("An unexpected error occurred.");
        setApiResponse(null);
        setOutputTableData(null);
      }
    }
  };
  // console.log(currentQuestion, "currentQuestion");
  //  convert json data to simplified
  const convertJsonToSimplified = (data) => {
    // console.log("convertJsonToSimplified");
    // console.log("data:", data);

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

  const handleAIHints = async () => {
    try {
      setAIHintsLoading(true);

      const tableNamesArray = tableData.map((entry) => entry.tableName);

      const response = await axios.post(apiUrlAiHints, {
        query: query,
        question: currentQuestion?.QuestionName,
        tables: tableNamesArray,
        solution: outputTableData,
      });

      setAiHints(response.data.sqlQuery);
    } catch (error) {
      console.error("Error making AI evaluation request:", error.message);
    } finally {
      setAIHintsLoading(false);
    }
  };

  // console.log("line 576");

  // console.log("apiResponse:", apiResponse);

  // it converts apiResponse into simple format
  const JsonToSimplified = apiResponse && convertJsonToSimplified(apiResponse);

  const convertToSimpleCSV = (data) => {
    // console.log("convertToSimpleCSV");
    // console.log("data:", data);

    const rows = data?.split("\\n");
    const cleanedRows = rows?.map(
      (row) =>
        row.replace(/\\/g, "").replace(/"/g, "").replace(/r$/, "").trim() || ""
    );
    const simplifiedCSV = cleanedRows?.join("\n") || "";
    return simplifiedCSV;
  };

  // console.log("line 593");

  // console.log("selectedQuestion:", selectedQuestion);

  // console.log(
  //   "selectedQuestion?.ExpectedOutput:",
  //   selectedQuestion?.ExpectedOutput
  // );

  const simplifiedCSV = convertToSimpleCSV(selectedQuestion?.ExpectedOutput);
  // console.log("simplifiedCSV:", simplifiedCSV);

  function compareResults(simplifiedCSV, JsonToSimplified) {
    // console.log("compareResults");
    // console.log("simplifiedCSV:", simplifiedCSV);
    // console.log("JsonToSimplified:", JsonToSimplified);

    // const trimmedCSV = simplifiedCSV?.trim() || "";
    // const trimmedJson = JsonToSimplified?.trim() || "";
    // console.log("trimmedCSV:", trimmedCSV);
    // console.log("trimmedJson:", trimmedJson);

    // const differences = diff(trimmedCSV, trimmedJson);
    // console.log("differences:", differences);

    // if (differences.every(([action]) => action === 0)) {
    // Sort function for CSV strings
    const sortCSV = (csvString) => {
      return csvString.split("\n").sort().join("\n").trim();
    };
    const sortedCSV = sortCSV(simplifiedCSV);
    const sortedJson = sortCSV(JsonToSimplified);
    if (sortedCSV === sortedJson) {
      setOutputTableData(true);
      setShowStatus(true);

      if (currentQuestion?.QuestionID) {
        setSolvedQuestionIds((prev) => {
          if (!prev.includes(currentQuestion.QuestionID)) {
            return [...prev, currentQuestion.QuestionID];
          }
          return prev;
        });
      }


    } else {
      console.log("Results do not match");
      setOutputTableData(false);
      setShowStatus(true);
    }
  }

  useEffect(() => {
    // console.log("line 612");
    // console.log("apiResponse:", apiResponse);
    // console.log("isFirstRender:", isFirstRender);

    if (apiResponse && !isFirstRender) {
      compareResults(simplifiedCSV, JsonToSimplified);
    }
  }, [apiResponse, simplifiedCSV, JsonToSimplified, isFirstRender]);

  const submitHandleClose = () => setSubmitFeedback(false);
  const submitHandleShow = () => {
    if (query && outputTableData) {
      setSubmitFeedback(true);
      handleAIEvaluation();
    } else {
      toast.info("Please solve question for evaluation.");
    }
  };

  const handleAIEvaluation = async () => {
    if (query && outputTableData) {
      try {
        setAIEvaluationLoading(true);
        const response = await axios.post(apiUrlAiEvaluation, {
          userQuery: query,
        });
        setAiResponse(response.data.sqlQuery);
      } catch (error) {
        console.error("Error making AI evaluation request:", error.message);
        toast.error(
          "An error occurred while evaluating the query. Please try again."
        );
      } finally {
        setAIEvaluationLoading(false);
      }
    }
  };

  // compare output and expected output

  //  filter data based on filters in topbar

  // useEffect(() => {
  //   let updatedFilteredQuestions = [...questionData];

  //   if (filterdata?.database) {
  //     updatedFilteredQuestions = updatedFilteredQuestions.filter(
  //       (data) => data.exercise_id === filterdata.database
  //     );
  //   }

  //   if (filterdata?.level) {
  //     updatedFilteredQuestions = updatedFilteredQuestions.filter(
  //       (data) => data.DifficultyLevel === filterdata.level
  //     );
  //   }

  //   if (filterdata?.sqlType) {
  //     updatedFilteredQuestions = updatedFilteredQuestions.filter(
  //       (data) => data.sqlType === filterdata.sqlType
  //     );
  //   }
  //   if (bookmark) {
  //     updatedFilteredQuestions = updatedFilteredQuestions.filter(
  //       (question) => question.QuestionName === bookmarkName
  //     );
  //   }

  //   if (updatedFilteredQuestions.length === 0) {
  //     setNoQuestion(true);
  //   } else {
  //     setNoQuestion(false);
  //   }
  //   setShuffledQuestions(updatedFilteredQuestions);

  //   setFilteredQuestions(updatedFilteredQuestions);
  // }, [filterdata, questionData, bookmark]);

  useEffect(() => {
    if (user) {
      fetchQuestions();
      fetchBookmarks();
    }
  }, [user]);

  // Add console logs to track bookmark data
  useEffect(() => {
    // console.log("line 718");

    // console.log("Bookmark prop received:", bookmark);
    if (bookmark) {
      console.log("Bookmarked Question ID:", bookmark.bookmarkedQuestionId);
      console.log("Question Name:", bookmark.QuestionName);
    }
  }, [bookmark]);

  useEffect(() => {
    // console.log("line 726");

    if (bookmark && bookmark.bookmarkedQuestionId) {
      setIsLoading(true);

      setIsBookmarkMode(true);

      const foundQuestion = questionData.find(
        (question) =>
          String(question.QuestionID) === String(bookmark.bookmarkedQuestionId)
      );

      if (foundQuestion) {
        const singleQuestionArray = [foundQuestion];

        Promise.resolve()
          .then(() => {
            setBookmarkedQuestion(foundQuestion);
            setSelectedQuestion(foundQuestion);
            setCurrentQuestionIndex(0);
          })
          .then(() => {
            setFilteredQuestions(singleQuestionArray);
            setShuffledQuestions(singleQuestionArray);
          })
          .then(() => {
            setTimeout(() => {
              setIsLoading(false);
            }, 50);
          });
      } else {
        setIsLoading(false);
      }
    } else {
      setIsBookmarkMode(false);
      setBookmarkedQuestion(null);
    }
  }, [bookmark, questionData]);

  // Modify the filtering effect to respect bookmark mode
  useEffect(() => {
    // console.log("line 769");
    if (isBookmarkMode && bookmarkedQuestion) {
      // When in bookmark mode, ensure we only show the bookmarked question
      const singleQuestionArray = [bookmarkedQuestion];
      setFilteredQuestions(singleQuestionArray);
      setShuffledQuestions(singleQuestionArray);
      setSelectedQuestion(bookmarkedQuestion);
      return;
    }

    let updatedFilteredQuestions = [...questionData];

    if (databasee) {
      updatedFilteredQuestions = updatedFilteredQuestions.filter(
        (question) => String(question.exercise_id) === String(databasee)
      );
    }

    if (filterdata?.level) {
      updatedFilteredQuestions = updatedFilteredQuestions.filter(
        (data) => data.DifficultyLevel === filterdata.level
      );
    }

    if (filterdata?.sqlType) {
      updatedFilteredQuestions = updatedFilteredQuestions.filter(
        (data) => data.sqlType === filterdata.sqlType
      );
    }

    // Update states in a specific order
    Promise.resolve()
      .then(() => {
        setNoQuestion(updatedFilteredQuestions.length === 0);
        setFilteredQuestions(updatedFilteredQuestions);
        setShuffledQuestions(updatedFilteredQuestions);
      })
      .then(() => {
        if (updatedFilteredQuestions.length > 0 && !selectedQuestion) {
          setSelectedQuestion(updatedFilteredQuestions[0]);
          setCurrentQuestionIndex(0);
        }
      });
  }, [questionData, databasee, filterdata, isBookmarkMode, bookmarkedQuestion]);

  // GET SOLVED QUESTIONS
  const [getSolvedQuestion, setGetSolvedQuestion] = useState([]);
  const [solvedQuestionLength, setSolvedQuestionLength] = useState(0);
  const [percetageOfQuestion, setPrecentageOfQuestion] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState(filteredQuestions);

  useEffect(() => {
    const percentage = ((solvedQuestionLength / totalQuestion) * 100).toFixed(
      2
    );
    setPrecentageOfQuestion(percentage);
  }, [getSolvedQuestion]);

  useEffect(() => {
    setOutputTableData(false);
  }, [currentQuestionIndex]);

  // Add bookmarks
  const addBookmark = async () => {
    let userId = user?.uid;
    try {
      const response = await axios.post(apiUrlAddBookmark, {
        questionId: currentQuestion.QuestionID,
        userId: userId,
      });
      toast.success(response.data.result);
      fetchBookmarks();
    } catch (error) {
      console.error("Error adding bookmark:", error);
    }
  };

  // Call the addBookmark function

  // useEffect(()=>{
  //   if(filteredQuestions){
  //     setQuestionLoading(true);
  //   }
  // },[filteredQuestions]);

  // console.log(tableLoading, "tableLoading");
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // useEffect(() => {
  //   console.log(value == null, "vavaavavavvav");
  // }, [value]);
  // useEffect(() => {
  //   console.log(currentQuestionIndex, "vavaavavavvav");
  // }, [currentQuestionIndex]);
  useEffect(() => { }, [shuffledQuestions]);

  useEffect(() => {
    // console.log("line 873");

    if (
      questionData.length > 0 &&
      currentQuestionIndex === 0 &&
      !selectedQuestion
    ) {
      setSelectedQuestion(questionData[0]);
    }
  }, [questionData, currentQuestionIndex, selectedQuestion]);

  useEffect(() => {
    if (questionData.length > 0) {
      if (databasee) {
        const filteredQuestions = questionData.filter(
          (question) => String(question.exercise_id) === String(databasee)
        );

        setFilteredQuestions(filteredQuestions);
        setShuffledQuestions(filteredQuestions);

        // Set the first question as selected
        if (filteredQuestions.length > 0) {
          setCurrentQuestionIndex(0);
          setSelectedQuestion(filteredQuestions[0]);
        } else {
          setSelectedQuestion(null);
        }
      } else {
        // When databasee is null, show all questions
        setFilteredQuestions(questionData);
        setShuffledQuestions(questionData);
        setCurrentQuestionIndex(0);
        setSelectedQuestion(questionData[0]);
      }
    }
  }, [databasee, questionData]);

  // Add back all the removed functionality
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const profile = await getUserProfile();
        setUser(profile);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!currentQuestion?.solvedStatus) {
      setQuery("");
      setShowStatus(false);
      setPoints("");
    }
    setRunQueryClicked(false);
  }, [currentQuestionIndex, currentQuestion]);

  useEffect(() => {
    if (currentQuestion?.solvedStatus && currentQuestion?.solutionQuery) {
      // console.log("useEffect");

      setQuery(currentQuestion.solutionQuery);
      setShowStatus(true);
      setOutputTableData(true);
    }
  }, [currentQuestionIndex, currentQuestion]);

  useEffect(() => {
    if (currentQuestion && currentQuestion.DifficultyLevel) {
      const { DifficultyLevel } = currentQuestion;
      let initialPoints;
      if (DifficultyLevel === "Easy") {
        initialPoints = 5;
      } else if (DifficultyLevel === "Medium") {
        initialPoints = 20;
      } else if (DifficultyLevel === "Hard") {
        initialPoints = 40;
      }

      if (
        outputTableData &&
        currentQuestion?.QuestionID &&
        user &&
        initialPoints
      ) {
        // Fetch attempts
        axios
          .get(
            `${apiUrlGetAttempts}?userId=${user?.uid}&questionId=${currentQuestion?.QuestionID}`
          )
          .then((res) => {
            const attemptsData = res.data.attempts;

            if (Array.isArray(attemptsData) && attemptsData.length > 0) {
              const attempts = attemptsData[0].attempt;

              // Calculate points based on attempts
              let calculatedPoints = initialPoints;

              if (attempts >= 3) {
                calculatedPoints -= 1;
              }

              if (attempts >= 6) {
                calculatedPoints -= 2;
              }

              if (attempts >= 9) {
                calculatedPoints -= 3;
              }
              setPoints(calculatedPoints);

              // Submit solved question with calculated points
              const solvedQuestion = async () => {
                try {
                  let response = await axios.post(apiUrlSolvedQuestion, {
                    userId: user.uid,
                    Name: user.displayName,
                    questionId: currentQuestion?.QuestionID,
                    points: calculatedPoints,
                  });

                  fetchQuestions();
                  setRefreshPoints(!refreshPoints);
                } catch (error) {
                  console.error(
                    "Error submitting solved question:",
                    error.message
                  );
                }
              };

              if (!currentQuestion.solvedStatus) {
                solvedQuestion();
              }
            } else {
              setPoints(initialPoints);
              // If no attempts, use the initial points to submit the solved question
              const solvedQuestionWithoutAttempts = async () => {
                try {
                  let response = await axios.post(apiUrlSolvedQuestion, {
                    userId: user.uid,
                    Name: user.displayName,
                    questionId: currentQuestion?.QuestionID,
                    points: initialPoints,
                  });
                  setRefreshPoints(!refreshPoints);
                } catch (error) {
                  console.error(
                    "Error submitting solved question (no attempts):",
                    error.message
                  );
                }
              };
              if (!currentQuestion.solvedStatus) {
                solvedQuestionWithoutAttempts();
              }
            }
          })
          .catch((error) => {
            console.log(error, "Error in fetching attempts");
          });
      }
    }
  }, [outputTableData]);

  // Add a cleanup effect
  useEffect(() => {
    return () => {
      setIsBookmarkMode(false);
      setBookmarkedQuestion(null);
      setIsLoading(false);
    };
  }, []);

  // console.log("React FLow Data from API:", reactFlowData)
  // console.log("Table Data from API:", tableData)

  const nodeTypes = { table: TableNode };

  const ERDDiagram = ({ tableData, reactFlowData }) => {
    if (
      !reactFlowData ||
      reactFlowData.length === 0 ||
      reactFlowData.every(table => !table.schema || table.schema.length === 0)
    ) {
      return (
        <div style={{ color: "#fff", padding: "20px" }}>
          No table data available
        </div>
      );
    }

    // console.log(reactFlowData, "reactFlowData");

    const { tableName, schema } = tableData[0];

    const tableNames = reactFlowData.map(item => item.tableName);

    const schemas = reactFlowData.map(item => item.schema);
    console.log(schemas, "schemas");
    console.log(schema, 'SCHEMA')

    if (!schemas || Array.isArray(schemas) === false) {
      return (
        <div style={{ color: "#fff", padding: "20px" }}>Invalid Schema Format</div>
      )
    }

    const getPrimaryKey = (fields) => {
      // Find the field where Key === 'PRI'
      const pk = fields.find(f => f.Key === 'PRI');
      return pk || fields[0]; // fallback to first field if not found
    };

    // Find all foreign keys in the schema by checking isForeignKey property
    const getForeignKeys = (fields, allTableNames) => {
      return fields
        .map(f => {
          if (f.isForeignKey && f.referencedTable && allTableNames.includes(f.referencedTable)) {
            return {
              ...f,
              referencedTable: f.referencedTable
            };
          }
          return null;
        })
        .filter(Boolean);
    };

    // Build nodes for each table
    const initialNodes = schemas.map((tableSchema, index) => ({
      id: tableNames[index],
      type: "table",
      data: {
        label: tableName[index],
        fields: tableSchema,
      },
      position: { x: index * 400, y: 0 },
      style: {
        background: "#2a2a2a",
        border: "1px solid #333",
        borderRadius: "6px",
        padding: "10px",
        width: 300,
        color: "white",
      },
    }));

    console.log(initialNodes, "initialNodes");

    // Build edges for foreign key relationships
    const initialEdges = [];

    schemas.forEach((tableSchema, tableIndex) => {
      const currentTable = tableNames[tableIndex];
      const allTables = tableNames;


      const primaryKey = getPrimaryKey(tableSchema);

      // Collect all foreign keys for this table and append to a global list
      if (!window.allForeignKeys) window.allForeignKeys = [];
      const foreignKeys = getForeignKeys(tableSchema, allTables);
      foreignKeys.forEach(fk => window.allForeignKeys.push(fk));

      foreignKeys.forEach(fkField => {
        const referencedTable = fkField.referencedTable;
        const refTableIdx = tableNames.indexOf(referencedTable);


        if (refTableIdx !== -1) {
          const referencedTableSchema = schemas[refTableIdx];
          const referencedPK = getPrimaryKey(referencedTableSchema);
          console.log(currentTable, "currentTable");

          initialEdges.push({
            id: `${currentTable}-${fkField.Field}-to-${referencedTable}-${referencedPK.Field}`,
            source: currentTable,
            sourceHandle: `fk-${fkField.Field}`,
            target: referencedTable,
            targetHandle: `pk-${referencedPK.Field}`,
            label: fkField.Field,
            type: "smoothstep",
            animated: true,
            style: { stroke: "#007cb9" },
            labelStyle: { fill: "#007cb9", fontWeight: 700 },
          });
        }
      });
    });

    console.log(initialEdges, "initialEdges");

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    return (
      <div style={{ width: "100%", height: "500px", background: "#1a1a1a" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          nodeTypes={nodeTypes}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    );
  };


  return (
    <div className="dashboard">
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#1a1a1a",
          }}
        >
          <ClipLoader color="white" size={50} />
        </div>
      ) : (
        <>
          {!bookmark ? (
            <NewTopBar
              refreshPoints={refreshPoints}
              onFilterChange={handleFilterChange}
              totalQuestion={totalQuestion}
              isSideMenuOpen={isSideMenuOpen}
              toggleSideMenu={toggleSideMenu}
              solvedQuestionLength={solvedQuestionLength}
              percentage={percetageOfQuestion}
              isAdmin={isAdmin}
              databasee={databasee}
              setDatabasee={setDatabasee}
            />
          ) : (
            <div className="bookmark-head">
              <button
                onClick={closeDashboard}
                style={{
                  marginLeft: "20px",
                  padding: "8px",
                  color: "white",
                  backgroundColor: "#797c7f",

                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon
                  icon="material-symbols:arrow-back"
                  width="24"
                  height="24"
                />
              </button>
              <span>Bookmarked questions</span>
            </div>
          )}

          <div className="content">
            <div className={`sidebar ${show ? "showsidebar" : "hidesidebar"}`}>
              <button
                className="sidebarbtn"
                onClick={() => {
                  setShow(!show);
                }}
              >
                {" "}
                <Icon
                  icon="icon-park-outline:double-left"
                  color="white"
                  width="25"
                  height="25"
                />
                Collapse Slidebar
              </button>

              <button
                className="sidebarbtn"
                onClick={() => {
                  const shuffled = shuffleArray(filteredQuestions);
                  setShuffledQuestions(shuffled);
                }}
              >
                Shuffle Questions
              </button>

              {shuffledQuestions?.map((data, index) => (
                <div
                  className={` sidecard ${index === currentQuestionIndex
                    ? "sideCardActive"
                    : "sidecard"
                    }`}
                  key={index}
                  onClick={() => {
                    // console.log(data.solvedStatus, "data.solvedStatus");
                    if (data.solvedStatus) {
                      toast("This question is Already Solved");
                    }
                    // setCurrentQuestionIndex(index);

                    // setShow(false);
                    else {
                      setCurrentQuestionIndex(index);
                    }
                  }}
                >
                  <div className="card_content">
                    <p>
                      {solvedQuestionIds.includes(data.QuestionID) && (
                        <Icon
                          style={{
                            border: "",
                            background: "#78BE06",
                          }}
                          icon="typcn:tick"
                          color="white"
                          width="15"
                          height="14"
                        />
                      )}
                    </p>
                    <p>
                      <span style={{ fontWeight: "500", fontSize: "18px" }}>
                        {index + 1}.{" "}
                      </span>
                      {data.QuestionName}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        columnGap: "10px",
                        alignItems: "center",
                      }}
                    >
                      <button
                        style={{
                          backgroundColor: getButtonColor(data.DifficultyLevel),
                        }}
                      >
                        {data.DifficultyLevel}
                      </button>
                      {solvedQuestionIds.includes(data.QuestionID) && (
                        <span
                          style={{
                            backgroundColor: "#4CAF50",
                            color: "white",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            fontSize: "12px",
                          }}
                        >
                          Solved
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {desktopshow ? (
              <>
                <div className="desktoptoggle">
                  <Icon
                    icon="material-symbols:double-arrow"
                    color="white"
                    width="25"
                    height="25"
                    onClick={() => {
                      setDesktopShow(!desktopshow);
                    }}
                  />
                </div>
              </>
            ) : (
              <>
                <div
                  className={`sidebar2 ${desktopshow ? "hidesidebar2" : "showsidebar2"
                    }`}
                >
                  <button
                    className="sidebarbtn"
                    onClick={() => {
                      setDesktopShow(!desktopshow);
                    }}
                  >
                    {" "}
                    <Icon
                      icon="icon-park-outline:double-left"
                      color="white"
                      width="20"
                      height="20"
                    />
                    Collapse Slidebar
                  </button>
                  <button
                    className="sidebarbtn"
                    onClick={() => {
                      const shuffled = shuffleArray(filteredQuestions);
                      setShuffledQuestions(shuffled);
                    }}
                  >
                    Shuffle Questions
                  </button>

                  {shuffledQuestions?.map((data, index) => (
                    <div
                      className={` sidecard ${index === currentQuestionIndex
                        ? "sideCardActive"
                        : "sidecard"
                        }`}
                      key={data.QuestionID}
                      onClick={() => {
                        if (
                          activePlan === "Free Package" &&
                          solvedQuestionLength >= 10
                        ) {
                          toast.error(
                            "You have already solved 10 questions. Please upgrade your plan to solve more."
                          );
                          setActiveTab("Subscription");
                          return;
                        }
                        setCurrentQuestionIndex(index);
                        setSelectedQuestion(shuffledQuestions[index]);
                      }}
                    >
                      {/* <div className="icon">
                      <img src={Google_icon} alt="" />
                    </div> */}
                      <div className="card_content">
                        <p>
                          {solvedQuestionIds.includes(data.QuestionID) && (
                            <Icon
                              style={{
                                border: "",
                                background: "#78BE06",
                              }}
                              icon="typcn:tick"
                              color="white"
                              width="15"
                              height="14"
                            />
                          )}
                        </p>
                        <p>
                          <span style={{ fontWeight: "500", fontSize: "18px" }}>
                            {index + 1}.{" "}
                          </span>
                          {data.QuestionName}
                        </p>

                        <div style={{ display: "flex", columnGap: "120px" }}>
                          <button
                            style={{
                              backgroundColor: getButtonColor(
                                data.DifficultyLevel
                              ),
                            }}
                          >
                            {data.DifficultyLevel}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            <div
              className={`right_content ${desktopshow ? "fullwidth" : "right_content"
                }`}
            >
              <div className="sidebar_toggle">
                <Icon
                  icon="material-symbols:double-arrow"
                  color="white"
                  width="25"
                  height="25"
                  onClick={() => {
                    setShow(!show);
                  }}
                />
              </div>
              <div className="dashboard_content">
                <div className="question_section">
                  {/* Info modal */}

                  <Modal
                    centered
                    show={info}
                    onHide={handleInfo}
                    className="info_modal"
                  >
                    <Modal.Header
                      closeButton
                      closeVariant="white"
                      className="info_header"
                    >
                      <Modal.Title></Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="info_body">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <h3 style={{ fontSize: "14px" }}>{value?.ExerciseName || "Music Database"}</h3>

                        {/* Description with font size 14px and Read More */}
                        <DescriptionWithReadMore
                          description={value?.exerciseDescription || "List of Tables in Music database"}
                        />


                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            flexWrap: "wrap",
                            alignItems: "center",
                            gap: "10px",
                            marginTop: "10px",
                          }}
                        >
                          {value == "" ? (
                            <>
                              <p className="database-name">artists</p>
                              <p className="database-name">albums</p>
                              <p className="database-name">playlists</p>
                            </>
                          ) : (
                            databaseName.map((item, index) => {
                              let tableName = item.TableName;
                              if (tableName.startsWith("Music__")) {
                                tableName = tableName.split("Music__")[1];
                              } else if (
                                tableName.startsWith("Product_Analytics_")
                              ) {
                                tableName =
                                  tableName.split("Product_Analytics_")[1];
                              }

                              return (
                                <p className="database-name" key={index}>
                                  {tableName}
                                </p>
                              );
                            })
                          )}
                        </div>
                      </div>
                    </Modal.Body>
                    {/* <Modal.Footer></Modal.Footer> */}
                  </Modal>

                  {value == null ? (
                    ""
                  ) : (
                    <div
                      className="info-modal"
                      onClick={handleInfo}
                      style={{ cursor: "pointer", width: "fit-content" }}
                    >
                      <img
                        src="/info-icn.svg"
                        alt="info-img"
                        style={{ width: "35px", color: "invert(100%0" }}
                      />
                    </div>
                  )}

                  {currentQuestion?.bookmarkStatus || bookmark ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                      className="bookmark-icon"
                    >

                      <Icon
                        onClick={addBookmark}
                        icon="ion:bookmarks"
                        width="20"
                        height="20"
                        style={{ color: "yellow" }}
                      />
                    </div>
                  ) : (
                    <div
                      style={{ display: "flex", justifyContent: "flex-end" }}
                      className="bookmark-icon"
                    >
                      <Icon
                        onClick={addBookmark}
                        icon="ion:bookmarks"
                        width="20"
                        height="20"
                      />
                    </div>
                  )}

                  {
                    <div className="box">
                      {!noQuestion && (
                        <di className="qno-Select-sec">
                          {/* <h1> Selected Question</h1> */}
                          {/* <button
                            style={{
                              backgroundColor: getButtonColor(
                                currentQuestion?.DifficultyLevel
                              ),
                            }}
                          >
                            {currentQuestion?.DifficultyLevel}
                          </button> */}
                        </di>
                      )}

                      {/* {noQuestion && (
                        <p
                          style={{
                            color: "white",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                            fontSize: "24px",
                            fontWeight: "bold",
                          }}
                        >
                          No Questions Added Yet !
                        </p>
                      )} */}

                      {!noQuestion && (
                        <div className="qno-Select-sec">
                          <h1> Selected Question</h1>
                          <div
                            style={{
                              display: "flex",
                              gap: "10px",
                              alignItems: "center",
                            }}
                          >
                            <button
                              style={{
                                backgroundColor: getButtonColor(
                                  selectedQuestion?.DifficultyLevel
                                ),
                              }}
                            >
                              {selectedQuestion?.DifficultyLevel}
                            </button>
                            {solvedQuestionIds.includes(selectedQuestion?.QuestionID) && (
                              <span
                                style={{
                                  backgroundColor: "#4CAF50",
                                  color: "white",
                                  padding: "4px 8px",
                                  borderRadius: "4px",
                                  fontSize: "12px",
                                }}
                              >
                                Solved
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                      <span style={{ fontSize: "18px", fontWeight: "500" }}>
                        {selectedQuestion?.QuestionName}
                      </span>
                      {!noQuestion && (
                        <div className="accordion-btn">
                          <Accordion className="accordion">
                            <Accordion.Item eventKey="0">
                              <Accordion.Header className="accordion_header">
                                <Icon
                                  icon="lucide:key"
                                  color="white"
                                  width="20"
                                  height="20"
                                />
                                View Hint
                              </Accordion.Header>
                              <Accordion.Body>
                                {tableLoading && !questionLoading ? (
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <ClipLoader color="white" size={25} />
                                  </div>
                                ) : (
                                  hintData.map((hint, index) => (
                                    <p key={index}> - {hint.Hint}</p>
                                  ))
                                )}
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        </div>
                      )}
                    </div>
                  }
                  {!noQuestion && (
                    <div className="box">
                      <p>Source Tables:</p>

                      {tableLoading && !questionLoading && (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <ClipLoader color="white" size={25} />
                        </div>
                      )}

                      {!noQuestion &&
                        tableData?.map(({ tableName, schema }) => (
                          <div key={tableName.join("-")}>
                            {schema?.map((fields, index) => (
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
                  )}

                  {!noQuestion && (
                    <div className="box">
                      <p>Entity Relationship Diagram:</p>
                      {tableLoading && !questionLoading ? (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <ClipLoader color="white" size={25} />
                        </div>
                      ) : tableData && tableData.length > 0 ? (
                        <ERDDiagram tableData={tableData} reactFlowData={reactFlowData} />
                      ) : (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "#fff",
                            padding: "20px",
                          }}
                        >
                          No table data available
                        </div>
                      )}
                    </div>
                  )}

                  {!noQuestion && (
                    <div className="box">
                      <p>Expected Output:</p>
                      <div className="half_width">
                        <div
                          style={{ overflow: "scroll" }}
                          className="box_details"
                        >
                          <CsvToHtmlTable
                            data={simplifiedCSV}
                            csvDelimiter=","
                            tableClassName="table  table-hover table-custom-width"
                            style={{ marginLeft: "50%" }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="feedback_section">
                  <div className="box">
                    {/* <div className="buttons">
                      {!isAdmin && (
                        <>
                          {selectedQuestion?.solvedStatus ? (
                            <div className="solved_label">
                              <span
                                style={{
                                  backgroundColor: "#4CAF50",
                                  color: "white",
                                  padding: "10px 20px",
                                  borderRadius: "4px",
                                  fontSize: "14px",
                                  fontWeight: "500",
                                  display: "inline-block",
                                }}
                              >
                                Solved
                              </span>
                            </div>
                          ) : (
                            <button onClick={handleRunClick} className="run_query">
                              Run Query
                            </button>
                          )}
                        </>
                      )}
                      {(selectedQuestion?.solvedStatus == true || isAdmin) && (
                        <button onClick={solutionHandleShow} className="run_query">
                          Show Answer
                        </button>
                      )}

                      <button onClick={submitHandleShow} className="run_query">
                        AI Evaluation
                      </button>
                    </div> */}
                    <div className="buttons">
                      {/* {selectedQuestion?.solvedStatus ? (
                        <div className="solved_label">
                          <span
                            style={{
                              backgroundColor: "#4CAF50",
                              color: "white",
                              padding: "10px 20px",
                              borderRadius: "4px",
                              fontSize: "14px",
                              fontWeight: "500",
                              display: "inline-block",
                            }}
                          >
                            Solved
                          </span>
                        </div>
                      ) : (
                        <button onClick={handleRunClick} className="run_query">
                          Run Query
                        </button>
                      )} */}


                      {solvedQuestionIds.includes(selectedQuestion?.QuestionID) ? (
                        <div className="solved_label">
                          <span style={{
                            backgroundColor: "#4CAF50",
                            color: "white",
                            padding: "10px 20px",
                            borderRadius: "4px",
                            fontSize: "14px",
                            fontWeight: "500",
                            display: "inline-block",
                          }}> Solved </span>
                        </div>
                      ) : (
                        <button onClick={handleRunClick} className="run_query">Run Query</button>
                      )}

                      {(solvedQuestionIds.includes(selectedQuestion?.QuestionID) || isAdmin) && (
                        <button
                          onClick={solutionHandleShow}
                          className="run_query"
                        >
                          Show Answer
                        </button>
                      )}

                      <button onClick={submitHandleShow} className="run_query">
                        AI Evaluation
                      </button>
                    </div>
                    <div className="editor">
                      <NewSqlEditor
                        onQueryChange={handleQueryChange}
                        value={query}
                      />
                    </div>

                    <div className="buttons_bottom">
                      <div className="button_">
                        <button
                          onClick={() => setActiveTab("Report Bugs")}
                          className="unlock"
                        >
                          Report Bugs
                        </button>

                        <button onClick={handleShow} className="unlock">
                          AI Hints
                        </button>
                      </div>
                    </div>
                  </div>

                  {error && <div style={{ color: "white" }}>{error} </div>}
                  {showStatus && (
                    <div className="outputStatus">
                      {query && outputTableData === true ? (
                        <>
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <div
                              style={{ display: "flex", flexDirection: "row" }}
                            >
                              <p>Your answer is correct</p>

                              <Icon
                                className="thumbsIcon"
                                icon="gridicons:thumbs-up"
                                width="40"
                                height="40"
                              />
                            </div>
                            <div style={{ textAlign: "center" }}>
                              {!selectedQuestion?.solvedStatus && (
                                <div>
                                  <p>{points} points added!</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </>
                      ) : isRunQueryClicked &&
                        query &&
                        outputTableData === false ? (
                        <>
                          <p>Your answer is wrong</p>
                          <Icon
                            className="thumbsIcon"
                            icon="mdi:thumb-down"
                            width="40"
                            height="40"
                          />
                        </>
                      ) : null}
                    </div>
                  )}

                  <div className="result_header">
                    <h1>Query Output</h1>
                  </div>

                  <div style={{ overflow: "scroll" }} className="result">
                    {!error &&
                      query &&
                      isRunQueryClicked &&
                      JsonToSimplified && (
                        <CsvToHtmlTable
                          data={JsonToSimplified}
                          csvDelimiter=","
                          tableClassName="table  table-hover table-custom-width"
                          style={{ marginLeft: "50%" }}
                        />
                      )}
                  </div>
                </div>

                {/* unlock modal */}

                <Modal
                  centered
                  show={unlockshow}
                  onHide={handleClose}
                  className="unlock_modal"
                >
                  <Modal.Header closeButton closeVariant="white">
                    <Modal.Title></Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <h3>AI Hints</h3>

                    {aiHintsLoading ? (
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <ClipLoader color="white" size={25} />
                      </div>
                    ) : (
                      aiHints
                    )}
                  </Modal.Body>
                  <Modal.Footer></Modal.Footer>
                </Modal>

                {/* submit feedback */}

                <Modal
                  centered
                  show={submitFeedback}
                  onHide={submitHandleClose}
                  className="submit_modal"
                >
                  <Modal.Header closeButton closeVariant="white">
                    <Modal.Title> </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <h3>AI Evaluation</h3>
                    {aiEvaluationLoading ? (
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <ClipLoader color="white" size={25} />
                      </div>
                    ) : (
                      <>
                        <div> {aiResponse}</div>
                      </>
                    )}
                  </Modal.Body>
                  <Modal.Footer></Modal.Footer>
                </Modal>

                <Modal
                  size="lg"
                  centered
                  show={showSolution}
                  onHide={solutionHandleClose}
                  className="show_solution_modal"
                >
                  <Modal.Header closeButton closeVariant="white">
                    <Modal.Title>
                      Question {currentQuestionIndex + 1}\ Solution
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div>
                      <h4>Query:</h4>
                      <p>{selectedQuestion?.solutionQuery}</p>
                    </div>
                    <div>
                      <h4>Explanation:</h4>
                      <p>{selectedQuestion?.solutionExplanation}</p>
                    </div>
                  </Modal.Body>
                </Modal>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
//test
export default Dashboard;
