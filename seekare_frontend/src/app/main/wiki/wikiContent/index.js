/* eslint-disable array-callback-return */
import React, { useState, useEffect, Fragment, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  makeStyles,
  Box,
  Typography,
  TextField,
  IconButton,
  Divider,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Remove, VisibilityOffTwoTone } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";

import { getTextFromHtml } from "app/util/helper";
import useAuth from "app/hooks/useAuth";
import {
  changeResponsive,
  closeModal,
  openModal,
  pushSnackbar,
} from "app/store/ui/actions";
import {
  createWiki,
  updateWiki,
  deleteWiki,
  fetchAllWikis,
  fetchWikiByID,
  appendQuestionWiki,
  deleteQuestionToWiki,
  updateWikiCategoryByWikiId,
} from "app/store/wiki/actions";
import { getToc } from "app/store/toc/actions";
import { setActiveContent } from "app/store/ui/actions";

import { DELETE_WIKI_SUCCESS } from "app/store/wiki/types";
import Editor from "app/main/shared-components/Editor";
import CustomButton from "app/main/shared-components/Button";

import { useSelectWiki } from "app/hooks/useSelectWiki";
import WikiQuizForm from "./WikiQuizForm";
import WikiTagDialog from "../wikiCategoryDialog";
import { Welcome } from "./welcome";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FaLongArrowAltLeft } from "react-icons/fa";


const useStyles = makeStyles((theme) => ({
  rootWrapper: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    "& .MuiAccordion-root": {
      minHeight: "46px",
      borderRadius: "0.5rem",
      backgroundColor: "#E4E9FC",
      boxShadow: "0px 6px 58px rgba(196, 203, 214, 0.103611)",
      overflow: "hidden",
      margin: "5px 0",
      "& .MuiAccordionSummary-root": {
        boxShadow: "none",
        "& .MuiAccordionSummary-content": {
          margin: 0,
        },
      },

      "& .MuiAccordionDetails-root": {
        background: theme.palette.secondary.lighter,
        color: theme.palette.text.secondary,
      },
    },
    [theme.breakpoints.up("sm")]: {
      display: "flex !important",
    },
    [theme.breakpoints.down("sm")]: {
      paddingTop: "20px",
    },
  },
  wikiContentWrapper: {
    background: (props) =>
      props.activeContent === "wiki" ? theme.palette.secondary.active : "white",
    border: (props) =>
      props.activeContent === "wiki"
        ? `1px solid ${theme.palette.secondary.main}`
        : "1px solid transparent",
    borderRadius: "12px",
    padding: "20px",
    marginTop: 0,
    overflow: "hidden auto",
    flexGrow: 1,
    flexShrink: 0,
    height: "calc(100% - 200px)",
  },
  wikiCardWrapper: {
    marginBottom: "20px",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "20px",
    },
  },
  wikiCard: {},
  wikiTitle: {
    position: "relative",
    borderBottom: "1px solid #848383",
    paddingBottom: 10,
    marginBottom: 10,
  },
  wikiSource: {
    fontSize: 14,
    marginBottom: 16,
    color: "#757575",
  },
  wikiContent: {
    fontSize: 16,
  },
  wikiContentEditorWrapper: {},
  wikiContentButtonWrapper: {
    marginTop: 8,
  },
  actionButton: {
    marginLeft: 5,
  },
  cardEditOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: "100%",
    width: "100%",
    opacity: 0,
    transition: "0.5s ease",
    "&:hover": {
      opacity: 1,
    },
  },
  inputTitle: {
    width: "100%",
  },
  questionsWrapper: {},
  questionWrapperTitle: {
    borderBottom: "1px solid #848383",
    paddingBottom: 8,
    marginBottom: 8,
    fontWeight: 500,
  },
  questionCard: {},
  questionTitle: {
    marginBottom: 4,
    fontWeight: 500,
    fontSize: 18,
  },
  questionAnswer: {
    fontStyle: "italic",
  },
  gettingStarted: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    paddingTop: "20rem",
  },
  welcome: {
    color: theme.palette.secondary.main,
    "& svg > path": {
      fill: theme.palette.secondary.main,
      stroke: theme.palette.secondary.main,
    },
    "& svg": {
      maxWidth: "40px",
      maxHeight: "40px",
      marginRight: "20px",
    },
    display: "flex",
  },
  bannerContainer: {
    marginBottom: "20px",
  },
  content: {
    overflow: "hidden auto",
    "&>section": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      backgroundColor: "#F0EFFF",
      padding: "10px",
    },
  },
  questionWrapper: {
    borderRadius: "0.5rem",
    backgroundColor: "#fff",
    marginBottom: "6px",
    paddingBottom: "10px",
  },
  accordionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#F0EFFF",
    padding: "10px",
  },
  accordionHeaderTitle: {
    color: theme.palette.secondary.main,
    fontWeight: "bolder",
  },
  accordionHeaderIcon: {
    padding: 0,
  },
  dragWrapper: {
    listStyle: "none",
    paddingLeft: "0",
  },
  closeButton: {
    position: "absolute",
    left: "30px",
    top: "5px",
    [theme.breakpoints.up(960)]: {
      display: "none",
    },
  },
}));

const WikiContent = forwardRef((prop, ref) => {
  const dispatch = useDispatch();
  const { bookId: altId } = useParams();
  let { type: activeWikiType, id: activeWikiId } = useSelector(
    (state) => state.wiki.activeWiki
  );
  activeWikiId = activeWikiId ? activeWikiId : altId;
  const activeContent = useSelector((state) => state.ui.content.activeContent);
  const classes = useStyles({
    activeContent,
  });
  let categories =
    useSelector((state) => state.question.categories) ||
    JSON.parse(window.localStorage.getItem("categories"));
  let wikiSel = useSelectWiki() ||
    JSON.parse(window.localStorage.getItem("wikiSel")) || {
      touched: "",
      title: "",
      content: "",
      isEditWiki: "",
      isCreateWiki: "",
      questions: [],
    };

  if (activeWikiId) {
    window.localStorage.setItem("wikiSel", JSON.stringify(wikiSel));
    window.localStorage.setItem("categories", JSON.stringify(categories));
  }

  const wikis = useSelector((state) => state.wiki.wikis);
  // wikiData
  const { isAuthenticated, isMd, isAdmin, currentUser } = useAuth();
  const [touched, setTouched] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isEditWiki, setIsEditWiki] = useState(false);
  const [, setDisabledPost] = useState(true);
  const [errors, setErrors] = useState(null);
  const [, setExpandedQuestion] = useState("");
  const isCreateWiki = activeWikiId === "new-wiki";
  const [activeQuiz, setActiveQuiz] = useState({});
  const [accordianState, setAccordianState] = useState({});
  const [qContent, setQContent] = useState({});
  const [qTitle, setQTitle] = useState({});
  const [wikiQuiz, setWikiQuiz] = useState([]);
  const responsive =
    useSelector((state) => state.ui.responsive.responsiveType) ||
    "kareBookItem";
  const { bookId } = useParams();
  // for quiz Content
  const getQuizeContent = () => {
    const questions = wikiSel.questions;
    if (wikiSel.categories) {
      return wikiSel.categories
        .map((c) => {
          if (!categories) return null;
          const cc = categories.find((ct) => ct._id === c);
          const res = { ...cc, cagId: cc?._id };

          if (questions) {
            res.quiz = questions.filter((q) => q.type === cc?._id);
          }
          return res;
        })
        .filter((i) => i);
    }
    return [];
  };
  // const currentRef = useRef()
  useEffect(() => {
    if (activeWikiId) {
      dispatch(fetchWikiByID(altId));
      dispatch(setActiveContent("wiki"));
    }
  }, [activeWikiId, altId, dispatch]);

  useEffect(() => {
    const landed = window.sessionStorage.getItem('landingModal')
    if(landed != 'landed') {
      dispatch(openModal("LANDINGMODAL",'HIDECLOSE'))
    }
  },[])

  useEffect(() => {
    const altWikiSel = JSON.parse(window.localStorage.getItem("wikiSel"));
    if (
      (wikiSel.title && !isCreateWiki) ||
      (altWikiSel?.title && !isCreateWiki)
    ) {
      setWikiQuiz(getQuizeContent());
      setTitle(wikiSel.title || altWikiSel.title);
      setContent(wikiSel.content || altWikiSel.content);
    } else if (isCreateWiki && activeWikiId !== "new-wiki") {
      setTitle("");
      setContent("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isCreateWiki,
    activeWikiId,
    // title,
    // content,
    wikiSel.title,
    wikiSel.content,
  ]);
  useEffect(() => {
    if (getTextFromHtml(content) !== "") {
      setErrors((errors) => ({
        ...errors,
        content: {
          valid: true,
          message: "",
        },
      }));
    } else {
      setErrors((errors) => ({
        ...errors,
        content: {
          valid: false,
          message: "Content is required",
        },
      }));
    }

    if (content !== "") {
      setDisabledPost(true);
    } else {
      setDisabledPost(true);
    }
  }, [content]);

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
    setTouched(true);
  };

  const onChangeContent = (value) => {
    setTouched(true);
    setContent(value);
  };

  const handleClickCancel = () => {
    // setIsCreateWiki(false);
    setIsEditWiki(false);
    getQuizeContent().map(({ cagId, title, quiz }) => {
      accordianState[cagId] = false;
      quiz.map(({ _id: id, title, content }) => {
        handleCancelQuiz(cagId);
      });
    });
  };
  const handleIsEditWikiTrue = () => {
    setIsEditWiki(true);
    getQuizeContent().map(({ cagId, title, quiz }) => {
      accordianState[cagId] = true;
      // const curActiveQuiz = {...activeQuiz};
      quiz.forEach(({ _id: id, title, content }) => {
        handleEditQuestion(cagId, { id, title, content });
        // curActiveQuiz[id] = {id, title, content};
      });
      // setActiveQuiz(curActiveQuiz);
    });
    wikiSel.questions.map(({ _id: id, title, content }) => {
      qContent[id] = content;
      qTitle[id] = title;
    });
    setQContent({ ...qContent });
    setQTitle({ ...qTitle });

    setAccordianState({ ...accordianState });
  };

  const handleSubmitWikiContent = async (e) => {
    e.preventDefault();
    // if (!isValid()) {
    //   setTouched(true);
    //   return;
    // }

    if (!isAuthenticated) {
      dispatch(pushSnackbar("Please login to post your question", "warning"));
      dispatch(openModal("LOGIN_MODAL"));
      return;
    }

    wikiSel.questions.map(({ _id: id, type }) => {
      let tempT = qTitle[id];
      let tempC = qContent[id];
      if (ref.current && ref.current.qid === id) {
        tempC = ref.current.getEditor().root.innerHTML;
      }
      handleUpdateQuiz(type, { title: tempT, content: tempC, id });
    });

    try {
      let realContent = content;
      if (ref.current && ref.current.qid === activeWikiId) {
        realContent = ref.current.getEditor().root.innerHTML;
      }
      const params = {
        title: title,
        content: realContent,
      };
      let message = "";
      if (isCreateWiki) {
        await dispatch(createWiki({ activeWikiType, activeWikiId }, params));
        message =
          "Your wiki is created successfulAs you are MD Helper, you can answer to this question!ly";
      } else if (isEditWiki) {
        await dispatch(updateWiki(activeWikiId, params));
        message = "Your change is updated successfully";
      }

      if (message) {
        dispatch(pushSnackbar(message, "success"));
      }

      dispatch(fetchAllWikis());
    } catch (error) {
      dispatch(
        pushSnackbar("Something went wrong, Please try again!", "error")
      );
    }
    getQuizeContent().map(({ cagId }) => {
      accordianState[cagId] = false;
    });
    setIsEditWiki(false);
  };

  const handleClickDelete = async () => {
    const modalProps = {
      title: "Would you delete the wiki?",
      description: "",
      buttons: [
        {
          title: "Delete",
          type: "primary",
          onClick: handleDeleteWiki,
        },
      ],
    };
    dispatch(openModal("CONFIRM_MODAL", modalProps));
  };

  const handleDeleteWiki = async () => {
    const result = await dispatch(deleteWiki(activeWikiId));
    await dispatch(fetchAllWikis());

    if (result.type === DELETE_WIKI_SUCCESS) {
      // dispatch(fetchWikiByTag(activeWikiId));
      dispatch(pushSnackbar("Your wiki is deleted successfully", "success"));
    }
    dispatch(closeModal("CONFIRM_MODAL"));
  };

  const addNewQuizData = (event, { cagId }) => {
    // stop default expand
    setActiveQuiz((q) => ({
      ...q,
      [cagId]: {
        id: "new",
        title: {},
        content: {},
      },
    }));
    event.stopPropagation();
    setExpandedQuestion(`categories_${cagId}`);
  };

  const handleAddIcon = (e, { cagId }) => {
    e.stopPropagation();
    let temp =
      accordianState[cagId] === undefined ? true : !accordianState[cagId];
    accordianState[cagId] = temp;
    setAccordianState({ ...accordianState });
  };

  const handleCancelQuiz = (name) => {
    setActiveQuiz((e) => ({
      ...e,
      [name]: undefined,
    }));
  };

  const handleEditQuestion = (name, { id, title, content }) => {
    setActiveQuiz((q) => ({
      ...q,
      [name]: {
        id,
        title,
        content,
      },
    }));
  };

  const handleDeleteQuestion = (id) => {
    if (!activeWikiId || !id) return;
    dispatch(deleteQuestionToWiki(activeWikiId, id));
  };

  const handleAddNewQuiz = (categId, { title, content }) => {
    const { _id } = wikiSel;
    const tContent = ref.current?.getEditor().root.innerHTML;
    dispatch(
      appendQuestionWiki(_id, {
        title,
        content: tContent,
        type: categId,
      })
    );
    handleCancelQuiz(categId);
  };

  const handleUpdateQuiz = (categId, { title, content, id }) => {
    const { _id } = wikiSel;

    dispatch(
      appendQuestionWiki(_id, {
        id,
        title,
        content,
        type: categId,
      })
    );
    handleCancelQuiz(categId);
  };
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(wikiQuiz);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setWikiQuiz(items);
    handleSaveCategories(items);
  };
  const handleSaveCategories = (wikis) => {
    dispatch(
      updateWikiCategoryByWikiId(
        activeWikiId,
        wikis.map(({ cagId }) => cagId)
      )
    );
  };
  return activeWikiId || bookId || isCreateWiki ? (
    <Box
      className={classes.rootWrapper}
      style={{
        display: responsive !== "kareBookItem" ? "none" : "flex",
      }}
    >
      {responsive === "kareBookItem" && (
        <FaLongArrowAltLeft
          className={classes.closeButton}
          size="22px"
          onClick={() => dispatch(changeResponsive("kareBook"))}
        />
      )}
      <Box className={classes.wikiContentWrapper}>
        <Box className={classes.wikiCardWrapper}>
          {isCreateWiki ? (
            <Box>
              <Typography
                className={classes.questionWrapperTitle}
                variant="h5"
                component="h1"
                pb={1}
                mb={1}
              >
                Create Wiki
              </Typography>
              {!isAuthenticated ? (
                <Typography
                  className={classes.wikiContent}
                  color="textPrimary"
                  gutterBottom
                >
                  Please, login to create a new wiki content
                </Typography>
              ) : (
                <Box
                  className={classes.wikiContentEditorWrapper}
                  component="form"
                  onSubmit={handleSubmitWikiContent}
                >
                  <Box mb={1}>
                    <Typography variant="h6" component="h2">
                      Wiki Title
                    </Typography>
                    <TextField
                      variant="outlined"
                      size="small"
                      name="title"
                      type="text"
                      onChange={onChangeTitle}
                      value={title}
                      placeholder="Wiki Title"
                      className={classes.inputTitle}
                      autoComplete="off"
                      required
                    />
                  </Box>
                  <Typography variant="h6" component="h2">
                    Content
                  </Typography>
                  <Editor
                    id={activeWikiId}
                    ref={ref}
                    content={content}
                    onlyText={!isMd || !isAdmin}
                    onChangeContent={onChangeContent}
                  />
                  {/* {errors &&
                    touched &&
                    errors.content &&
                    errors.content.message !== "" && (
                      <Box color="red">{errors.content.message}</Box>
                    )} */}
                  <Box
                    className={classes.wikiContentButtonWrapper}
                    display="flex"
                    justifyContent="flex-end"
                  >
                    <CustomButton
                      size="md"
                      variant="contained"
                      color="secondary"
                      onClick={handleSubmitWikiContent}
                    >
                      Save
                    </CustomButton>
                  </Box>
                </Box>
              )}
            </Box>
          ) : (
            <Box className={classes.wikiCard}>
              {(isMd || isAdmin) && isEditWiki ? (
                <Box
                  className={classes.wikiContentEditorWrapper}
                  component="form"
                  onSubmit={handleSubmitWikiContent}
                >
                  <Typography variant="h5" component="h2">
                    Edit Wiki
                  </Typography>
                  <Typography variant="h6" component="h2">
                    Title
                  </Typography>
                  <TextField
                    variant="outlined"
                    size="small"
                    name="title"
                    type="text"
                    onChange={onChangeTitle}
                    value={title}
                    placeholder="Wiki Title"
                    className={classes.inputTitle}
                    autoComplete="off"
                    required
                  />
                  <Typography variant="h6" component="h2">
                    Text
                  </Typography>
                  <Editor
                    id={activeWikiId}
                    ref={ref}
                    content={content}
                    onlyText={!isAdmin || !isMd}
                    onChangeContent={onChangeContent}
                  />
                  {errors &&
                    touched &&
                    errors.content &&
                    errors.content.message !== "" && (
                      <Box color="red">{errors.content.message}</Box>
                    )}
                </Box>
              ) : (
                <>
                  <Box className={classes.wikiTitle}>
                    <Typography variant="h5" component="h1">
                      {title}
                    </Typography>
                    {isAuthenticated && (isMd || isAdmin) && (
                      <Box className={classes.cardEditOverlay}>
                        <Box
                          className={classes.cardEditButton}
                          display="flex"
                          justifyContent="flex-end"
                          alignItems="center"
                        >
                          <CustomButton
                            type="button"
                            size="sm"
                            variant="contained"
                            color="secondary"
                            onClick={handleIsEditWikiTrue}
                          >
                            Edit
                          </CustomButton>
                          <CustomButton
                            type="button"
                            size="sm"
                            variant="outlined"
                            color="primary"
                            className={classes.actionButton}
                            onClick={handleClickDelete}
                          >
                            Delete
                          </CustomButton>
                        </Box>
                      </Box>
                    )}
                  </Box>
                  <Box className={classes.content}>
                    <Box
                      dangerouslySetInnerHTML={{
                        __html: content.slice(0, content.indexOf("<section>")),
                      }}
                    ></Box>

                    {/* <Typography
                      className={classes.wikiSource}
                      color="textPrimary"
                      gutterBottom
                    ></Typography>
                    <Typography
                      className={classes.wikiContent}
                      color="textPrimary"
                      gutterBottom
                    >
                      {content ? getTextFromHtml(content) : "No Data Found"}
                    </Typography> */}
                  </Box>
                </>
              )}
            </Box>
          )}
        </Box>
        {!isCreateWiki && (
          <Fragment>
            <Box>
              <WikiTagDialog
                myCategories={wikiSel.categories || []}
                wikiId={activeWikiId}
              />
            </Box>
            <Box className={classes.questionsWrapper} pt={2}>
              <DragDropContext
                onDragEnd={isMd || isAdmin ? handleOnDragEnd : () => {}}
              >
                <Droppable droppableId="characters">
                  {(provided) => (
                    <ul
                      className={classes.dragWrapper}
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {wikiQuiz.map(({ title, cagId, quiz }, id) => {
                        return (
                          <Draggable
                            key={cagId}
                            draggableId={isAdmin || isMd ? cagId : undefined}
                            index={id}
                          >
                            {(provided) => (
                              <li
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <Box
                                  className={classes.questionWrapper}
                                  key={cagId}
                                  style={{
                                    cursor: `${
                                      isMd || isAdmin ? "grab" : "default"
                                    }`,
                                  }}
                                >
                                  <Box
                                    className={classes.accordionHeader}
                                    onClick={(e) => handleAddIcon(e, { cagId })}
                                  >
                                    <Box
                                      className={classes.accordionHeaderTitle}
                                    >
                                      {/* {title} ({quiz?.length || 0}) */}
                                      {title}
                                    </Box>
                                    <IconButton
                                      className={classes.accordionHeaderIcon}
                                      arial-label={`Add New ${title}`}
                                      // onClick={(e) => addNewQuizData(e, { cagId })}
                                      onClick={(e) =>
                                        handleAddIcon(e, { cagId })
                                      }
                                      onFocus={(event) =>
                                        event.stopPropagation()
                                      }
                                      disabled={
                                        quiz?.length === 0 && !isMd && !isAdmin
                                      }
                                    >
                                      {accordianState[cagId] ? (
                                        <Remove />
                                      ) : (
                                        <AddIcon />
                                      )}
                                    </IconButton>
                                  </Box>
                                  {/* new question */}
                                  {activeQuiz[cagId] &&
                                    activeQuiz[cagId].id === "new" && (
                                      <WikiQuizForm
                                        onUpdateQuiz={(data) =>
                                          handleAddNewQuiz(cagId, data)
                                        }
                                        onCancelQuiz={() =>
                                          handleCancelQuiz(cagId)
                                        }
                                        ref={ref}
                                        qTitle={qTitle}
                                        qContent={qContent}
                                        setQContent={setQContent}
                                        setQTitle={setQTitle}
                                        id={activeQuiz[cagId].id}
                                        editFlag="new"
                                      />
                                    )}
                                  {quiz && quiz.length
                                    ? quiz.map(({ _id: id, title, content }) =>
                                        activeQuiz[cagId] && isEditWiki ? (
                                          <WikiQuizForm
                                            key={`qItm-${id}`}
                                            onUpdateQuiz={(data) =>
                                              handleUpdateQuiz(cagId, {
                                                ...data,
                                                id,
                                              })
                                            }
                                            ref={ref}
                                            onCancelQuiz={() =>
                                              handleCancelQuiz(cagId)
                                            }
                                            qTitle={qTitle}
                                            qContent={qContent}
                                            setQContent={setQContent}
                                            setQTitle={setQTitle}
                                            id={id}
                                            editFlag="edit"
                                          />
                                        ) : (
                                          accordianState[cagId] && (
                                            <Box px={1}>
                                              <Box
                                                my={2}
                                                key={`qItm-${id}`}
                                                mx={1}
                                              >
                                                <Box
                                                  justifyContent="space-between"
                                                  display="flex"
                                                  alignItems="center"
                                                  mb={1}
                                                >
                                                  <Box
                                                    fontSize="16px"
                                                    fontWeight="bold"
                                                  >
                                                    {title}
                                                  </Box>
                                                  {(isMd || isAdmin) && (
                                                    <Box>
                                                      {/* <IconButton
                                      color="secondary"
                                      onClick={() =>
                                        handleEditQuestion(cagId, {
                                          id,
                                          title,
                                          content,
                                        })
                                      }
                                    >
                                      <EditIcon fontSize="small" />
                                    </IconButton> */}
                                                      <IconButton
                                                        color="primary"
                                                        onClick={() =>
                                                          handleDeleteQuestion(
                                                            id
                                                          )
                                                        }
                                                      >
                                                        <DeleteIcon fontSize="small" />
                                                      </IconButton>
                                                    </Box>
                                                  )}
                                                </Box>
                                                <Box
                                                  fontSize="14px"
                                                  fontWeight="light"
                                                  mb={1}
                                                >
                                                  <Box
                                                    dangerouslySetInnerHTML={{
                                                      __html: content,
                                                    }}
                                                  ></Box>
                                                </Box>
                                              </Box>
                                              <Divider />
                                            </Box>
                                          )
                                        )
                                      )
                                    : accordianState[cagId] &&
                                      (isMd || isAdmin) && (
                                        <></>
                                        //     <IconButton
                                        //     className={classes.accordionHeaderIcon}
                                        //     style={{padding:'13px', width:'100%', borderRadius:0}}
                                        //     arial-label={`Add New ${title}`}
                                        //     onClick={(e) => addNewQuizData(e, { cagId })}
                                        //     onFocus={(event) => event.stopPropagation()}
                                        //   >
                                        //     <AddIcon />
                                        // </IconButton>
                                      )}
                                  {accordianState[cagId] &&
                                    isAuthenticated &&
                                    (isMd || isAdmin) && (
                                      <IconButton
                                        className={classes.accordionHeaderIcon}
                                        style={{
                                          padding: "13px",
                                          width: "100%",
                                          borderRadius: 0,
                                        }}
                                        arial-label={`Add New ${title}`}
                                        onClick={(e) =>
                                          addNewQuizData(e, { cagId })
                                        }
                                        onFocus={(event) =>
                                          event.stopPropagation()
                                        }
                                      >
                                        <AddIcon />
                                      </IconButton>
                                    )}
                                  {/* </Collapse> */}
                                </Box>
                              </li>
                            )}
                          </Draggable>
                        );
                      })}
                    </ul>
                  )}
                </Droppable>
              </DragDropContext>
              {isEditWiki && (
                <Box
                  className={classes.wikiContentButtonWrapper}
                  display="flex"
                  component="form"
                  onSubmit={handleSubmitWikiContent}
                  justifyContent="flex-end"
                >
                  <CustomButton
                    type="submit"
                    size="sm"
                    variant="contained"
                    color="secondary"
                    // disabled={disabledPost}
                  >
                    Save
                  </CustomButton>
                  <CustomButton
                    type="button"
                    size="sm"
                    variant="outlined"
                    color="primary"
                    className={classes.actionButton}
                    onClick={handleClickCancel}
                  >
                    Cancel
                  </CustomButton>
                </Box>
              )}
            </Box>
          </Fragment>
        )}
      </Box>
    </Box>
  ) : (
    <Welcome wikis={wikis} />
  );
});

export default WikiContent;
