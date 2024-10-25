import React, { useRef, useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

import classNames from "classnames";
import {
  Box,
  Button,
  Grid,
  Hidden,
  Link,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

import CustomButton from "app/main/shared-components/Button";
import * as API from "app/services/api";
import { openModal, pushSnackbar } from "app/store/ui/actions";
import useAuth from "app/hooks/useAuth";
import Editor from "app/main/shared-components/Editor";
import useDebounce from "app/hooks/useDebounce";
import { getTextFromHtml } from "app/util/helper";
import TagList from "app/main/shared-components/TagList";
import RightSidebar from "app/main/layouts/ClientLayout/RightSidebar";
import useClickOutside from "app/hooks/useClickOutside";
import BreadCrumb from "app/main/shared-components/BreadCrumb";
import { agreements } from "app/constants";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  header: {
    textAlign: "center",
  },
  title: {
    position: "relative",
  },
  formSection: {
    height: "87vh",
    overflow: "hidden auto",
  },
  askForm: {
    padding: "1rem",
    background: "#FFFFFF",
    boxShadow: "0px 6px 58px rgba(196, 203, 214, 0.103611)",
    borderRadius: 15,
    border: "1px solid #eee",

    "& p.description": {
      fontSize: "0.8rem",
    },
  },

  inputTitle: {
    width: "100%",
  },

  action: {
    padding: "1rem 0",
    "& button": {
      marginRight: "1rem",
    },
  },
  tipsSection: {},
  pin: {
    position: "absolute",
    top: "1rem",
    right: "1rem",
  },
  tipsPaper: {
    marginTop: "1rem",
    padding: "1rem",
    backgroundColor: "#e6e38a",
    position: "relative",
  },
  uploadZone: {
    border: "1px dotted gray",
    borderRadius: "0.5rem",
    backgroundColor: "#E2E2E2",
    minHeight: "5rem",
    height: "5rem",
    padding: "0.5rem 1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    cursor: "pointer",
  },
  uploadButton: {},
  uploadedItem: {
    width: "3rem",
    height: "100%",
    border: "1px solid gray",
    borderRadius: "0.4rem",
    overflow: "hidden",
    margin: "0 0.5rem",
    display: "flex",
    alignItems: "center",
    "& img": {
      width: "100%",
    },
  },
  similarQuestions: {
    border: "1px solid gray",
    padding: "10px",
    marginTop: "10px",
  },
  similarQuestionItem: {
    fontWeight: 500,
    color: theme.palette.text.secondary,
    fontSize: "1.1rem",
    padding: "0.8rem 0",
    "&:hover": {
      fontWeight: "bold",
    },
  },

  agreements: {
    border: `1px dotted ${theme.palette.primary.main}`,
    borderRadius: "4px",
    background: theme.palette.background.default,
    fontSize: "0.9rem",
    fontWeight: 600,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    background: "black",
  },
}));

const AskPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const captchRef = useRef();

  const classes = useStyles();
  const [errors, setErrors] = useState(null);
  const [similarQuestions, setSimilarQuestions] = useState([]);
  const [recaptcha, setRecaptcha] = useState(true);
  const [title, setTitle] = useState("");
  const queryTitle = useDebounce(title, 2000);
  const [touched, setToucehd] = useState(false);
  const [showSimilars, setShowSimilars] = useState(false);
  const similarQuestionsRef = useRef(null);

  useClickOutside(similarQuestionsRef, () => {
    setShowSimilars(false);
  });

  useEffect(() => {
    const findSimilarQuestions = async () => {
      const { result } = await API.questionService.getSimilarQuesitons({
        queryTitle,
      });

      setSimilarQuestions(result);
      setShowSimilars(true);
    };

    findSimilarQuestions();
  }, [queryTitle]);

  useEffect(() => {
    if (title !== "") {
      setErrors({
        ...errors,
        title: {
          valid: true,
          message: "",
        },
      });
    } else {
      setErrors({
        ...errors,
        title: {
          valid: false,
          message: "Title is required",
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  const [content, setContent] = useState("");

  useEffect(() => {
    if (getTextFromHtml(content) !== "") {
      setErrors({
        ...errors,
        content: {
          valid: true,
          message: "",
        },
      });
    } else {
      setErrors({
        ...errors,
        content: {
          valid: false,
          message: "Content is required",
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  const [tags, setTags] = useState([]);
  const tags_from_db = useSelector((state) => state.tag.tags);

  const handleChangeTags = (value) => {
    const newValue = value.map((item) => {
      if (typeof item === "string") {
        item = {
          title: item,
        };
      }

      return item;
    });

    setTags((prev) => (newValue.length < 6 ? newValue : prev));
  };
  const { currentUser: user, isAuthenticated, isAdmin, isMd } = useAuth();

  const alertUser = useCallback((e) => {
    e.preventDefault();
    e.returnValue = "";
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, [alertUser]);

  const onChangeTitle = (e) => {
    setToucehd(true);
    setTitle(e.target.value);
  };

  const onChangeContent = (value) => {
    setToucehd(true);
    setContent(value);
  };

  const isValid = () => {
    if (!errors) return false;

    for (let key in errors) {
      if (!errors[key].valid) return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = captchRef.current.getValue();

    if (!isValid()) {
      setToucehd(true);
      return;
    }

    if (!isAuthenticated) {
      dispatch(pushSnackbar("Please login to post your question", "warning"));
      dispatch(openModal("LOGIN_MODAL"));
      return;
    }
    if (token) {
      try {
        const res = await API.questionService.postQuestion({
          userID: user?.userID,
          title,
          content,
          tags,
        });

        if (res) {
          dispatch(
            pushSnackbar("Your questions is posted successfully", "success")
          );
          history.push("/questions");
        }
      } catch (error) {
        dispatch(
          pushSnackbar("Something went wrong, Please try againg!", "error")
        );
      }
    } else {
      setRecaptcha(false);
    }
  };
  const [disabledPost, setDisabledPost] = useState(false);

  useEffect(() => {
    if (title !== "" && content !== "") {
      setDisabledPost(false);
    } else {
      setDisabledPost(true);
    }
  }, [title, content]);

  const discardForm = () => {
    setTitle("");
    setContent("");
    setTags([]);
  };

  const paths = [
    {
      pathname: "Home",
      to: "/",
    },
    {
      pathname: "Questions",
      to: "/questions",
    },
    {
      pathname: "Ask",
      to: "/ask",
    },
  ];

  return (
    <Grid container>
      <Hidden mdDown>
        <Grid item md={3}>
          <BreadCrumb paths={paths} />
          <TagList />
        </Grid>
      </Hidden>
      <Grid
        item
        md={6}
        className={classNames(classes.formSection, "hidden-track")}
      >
        <Paper
          className={classes.askForm}
          component="form"
          onSubmit={handleSubmit}
        >
          <Box className={classes.title} ref={similarQuestionsRef}>
            <Typography variant="h6" component="h2">
              Question
            </Typography>
            <Typography component="p" variant="body1" className="description">
              Be specific and imagine you’re asking a question to another person
            </Typography>
            <TextField
              variant="outlined"
              size="small"
              name="title"
              type="text"
              onFocus={() => setShowSimilars(true)}
              onChange={onChangeTitle}
              value={title}
              placeholder="e.g. Why is Covid is so dangerous?"
              className={classes.inputTitle}
              autoComplete="off"
            />
            {errors &&
              touched &&
              errors.title &&
              errors.title.message !== "" && (
                <Box color="red">{errors.title.message}</Box>
              )}
            {showSimilars &&
              similarQuestions &&
              similarQuestions.length > 0 && (
                <Box className={classes.similarQuestions}>
                  {similarQuestions.map((question) => (
                    <Box
                      key={question._id}
                      width="100%"
                      maxHeight="10rem"
                      overflow="hidden"
                    >
                      <Link
                        href={`/questions/${question._id}/show`}
                        className={classes.similarQuestionItem}
                      >
                        {question.title}
                      </Link>
                    </Box>
                  ))}
                </Box>
              )}
          </Box>

          <Box className={classes.content}>
            <Typography variant="h6" component="h2">
              Details
            </Typography>
            <Typography component="p" variant="body1" className="description">
              Include any details that might help us answer your question
            </Typography>
            <Editor
              content={content}
              onlyText={!isMd || !isAdmin}
              onChangeContent={onChangeContent}
            />
            {errors &&
              touched &&
              errors.content &&
              errors.content.message !== "" && (
                <Box color="red">{errors.content.message}</Box>
              )}
          </Box>

          <Box className={classes.tags}>
            <Typography variant="h6" component="h2">
              Tags
            </Typography>
            <Typography className="description">
              Add up to 5 tags to describe what your question is about
            </Typography>
            <Autocomplete
              multiple
              filterSelectedOptions
              size="small"
              id="tags-outlined"
              value={tags}
              options={tags_from_db}
              freeSolo
              getOptionSelected={(option, value) =>
                option.title === value.title
              }
              getOptionLabel={(option) => option.title}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label=""
                  variant="outlined"
                  placeholder="Tags"
                  helperText={
                    tags.length > 4
                      ? "Reached limit of tags, to add new one , please remove another"
                      : ""
                  }
                />
              )}
              onChange={(e, value) => handleChangeTags(value)}
            />
          </Box>
          {!disabledPost && (
            <Box component="ul" py={1} px={3} className={classes.agreements}>
              {agreements.map((item) => (
                <Box
                  key={item}
                  component="li"
                  mt={1}
                  display="flex"
                  alignItems="center"
                >
                  <Box className={classes.dot}></Box>
                  <Box display="flex" ml={1}>
                    {item}
                  </Box>
                </Box>
              ))}
            </Box>
          )}
          {/* <Box>
                <Typography variant="h6" component="h2">
                  Photos & Files
                </Typography>
                <Typography
                  component="p"
                  variant="body1"
                  className="description"
                >
                  Please upload files and photos for more detailed info
                </Typography>
                <Box {...getRootProps()} className={classes.uploadZone}>
                  {files.map((file) => (
                    <Box className={classes.uploadedItem}>
                      {file.previewSrc && file.previewSrc !== "" ? (
                        <img
                          key={file.previewSrc}
                          src={file.previewSrc}
                          alt={file.data.name}
                        />
                      ) : (
                        <>{file.data.name}</>
                      )}
                    </Box>
                  ))}
                  <input {...getInputProps()} />
                  <Box className={classes.uploadButton}>
                    {isDragActive ? (
                      <Typography>Drop files here ...</Typography>
                    ) : (
                      <Typography>
                        Drag and Drop somefiles here, or click to select files
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Box> */}
          <ReCAPTCHA
            sitekey="6LfuOQEoAAAAAP3H672RFR1z5foC9lyDKKtygZaJ"
            id="recaptcha"
            ref={captchRef}
            style={{ padding: "10px" }}
          />
          {!recaptcha && (
            <p
              error={true}
              style={{ padding: "3px 7px", color: "red", margin: "0" }}
            >
              Verify you are a person
            </p>
          )}
          <Box className={classes.action}>
            <CustomButton
              type="submit"
              size="md"
              variant="contained"
              color="secondary"
              disabled={disabledPost || !recaptcha}
            >
              Agree and Post
            </CustomButton>
            <Button
              type="reset"
              variant="outlined"
              color="primary"
              onClick={discardForm}
            >
              Discard Your Post
            </Button>
          </Box>
        </Paper>
      </Grid>
      <Hidden>
        <Grid item md={3}>
          <RightSidebar />
        </Grid>
      </Hidden>
    </Grid>
  );
};
export default AskPage;
