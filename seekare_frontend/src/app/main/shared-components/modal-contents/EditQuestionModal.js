import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

import { closeModal } from "app/store/ui/actions";
import useSafeDispatch from "app/hooks/useSafeDispatch";
import CustomButton from "../Button";
import Editor from "../Editor";
import useAuth from "app/hooks/useAuth";
import { FiUpload } from "react-icons/fi";

const IMGBB_API_KEY = "68cd0deda511f86e4c948c6ea8542416";
const IMGBB_API_ENDPOINT = "https://api.imgbb.com/1/upload";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1rem 2rem",
    backgroundColor: "white",
    [theme.breakpoints.down("sm")]: {
      minWidth: "20rem",
    },
  },
  header: {
    marginBottom: "1rem",
  },
  askForm: {
    padding: "1rem",
    minHeight: "60vh",
    "& p.description": {
      margin: "0 0 1rem",
    },
  },
  title: {
    marginBottom: "2rem",
  },
  inputTitle: {
    width: "100%",
  },
  content: {
    marginBottom: "2rem",
  },
  quillEditor: {
    borderRadius: "0.5rem",
    "& .ql-container": {
      minHeight: "15rem",
      maxHeight: "15rem",
      overflow: "hidden auto",
    },
    "& .ql-editor": {
      "& p": {
        minHeight: "5rem",
      },
    },
  },
  tags: {},
  action: {
    padding: "1rem 0",
    "& button": {
      marginRight: "1rem",
    },
  },
  tipsSection: {
    padding: "3rem 2rem",
  },
  tipsPaper: {
    padding: "2rem 1rem",
    backgroundColor: "#e6e38a",
  },
  uploadWrapper: {
    position: "relative",
  },
  uploadInput: {
    height: " 1.5rem",
    width: " 1.5rem",
    opacity: "0",
    padding: "4px",
    position: "absolute",
    top: "50%",
    left: "2px",
    cursor: "pointer",
    marginLeft: "-71px",
    zIndex: "1000",
    transform: "translateY(-50%)",
    [theme.breakpoints.down("sm")]: {
      left: "80px",
    },
  },
  uploadIcon: {
    height: "50px",
    width: "33px",
    marginBottom: "10px",
    paddingLeft: "0.5rem",
    cursor: "pointer",
  },
}));

const EditQuestionModal = ({ question, updateQuestion }) => {
  const dispatch = useDispatch();
  const ref = useRef();
  const safeDispatch = useSafeDispatch(dispatch);
  const { isMd, isAdmin } = useAuth();
  const classes = useStyles();
  const [title, setTitle] = useState(() => {
    return question.title;
  });
  const [content, setContent] = useState(() => {
    return question.content;
  });

  const [imageUrl, setImageUrl] = useState(() => {
    return question.imageUrl;
  });

  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
    handleImageUpload(event.target.files[0]);
  };
  const handleImageUpload = (imageFile) => {
    if (!imageFile) {
      console.error("No image file selected");
      return;
    }

    if (!["image/jpeg", "image/png", "image/gif"].includes(imageFile.type)) {
      console.error(
        "Invalid image file format. Only JPEG, PNG and GIF are supported"
      );
      return;
    }

    if (imageFile.size > 32 * 1024 * 1024) {
      console.error(
        "Image file size exceeds the maximum allowed size of 32 MB"
      );
      return;
    }

    const formData = new FormData();
    formData.append("key", IMGBB_API_KEY);
    formData.append("image", imageFile);

    axios
      .post(IMGBB_API_ENDPOINT, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Image uploaded successfully:", response.data);
        setImageUrl(response.data.data.url);
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  const [tags, setTags] = useState(() => {
    return question.tags;
  });

  const tags_from_db = useSelector((state) => state.tag.tags);

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeContent = (value) => {
    setContent(value);
  };

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

  const discardForm = () => {
    safeDispatch(closeModal());
  };

  const onClickHandler = () => {
    updateQuestion({
      title,
      content,
      tags,
      imageUrl,
    });
  };
  return (
    <Box className={classes.root}>
      <Box className={classes.title}>
        <Typography variant="h6" component="h2">
          Title
        </Typography>
        <Typography component="p" variant="body1" className="description">
          Be specific and imagine you’re asking a question to another person
        </Typography>
        <TextField
          variant="outlined"
          size="small"
          name="title"
          type="text"
          onChange={onChangeTitle}
          value={title}
          placeholder="e.g. is so dangerous?"
          className={classes.inputTitle}
        />
      </Box>
      <Box className={classes.content}>
        <Typography variant="h6" component="h2">
          Details
        </Typography>
        <Typography component="p" variant="body1" className="description">
          Include any details that might help us answer your question
        </Typography>
        <Editor
          ref={ref}
          onlyText={!isMd || !isAdmin}
          content={content}
          onChangeContent={onChangeContent}
        />
      </Box>
      <Box>
        <Box style={{ display: "flex" }}>
          <Typography variant="h6" component="h2" style={{ paddingTop: "9px" }}>
            Images
          </Typography>
          <br />
          <div class={classes.uploadWrapper}>
            <FiUpload className={classes.uploadIcon}></FiUpload>
            <input
              class="input"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={classes.uploadInput}
            />
            <Typography
              variant="h6"
              component="h6"
              style={{
                fontSize: "13px",
                marginTop: "-15px",
              }}
            >
              {imageFile?.name}
            </Typography>
          </div>
        </Box>
        <Typography className="description">
          Include images related to this question
        </Typography>
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
          getOptionSelected={(option, value) => option.title === value.title}
          getOptionLabel={(option) => option.title}
          renderInput={(params) => (
            <TextField
              {...params}
              label={""}
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
      <Box className={classes.action}>
        <CustomButton
          variant="contained"
          type="submit"
          size="md"
          color="secondary"
          onClick={onClickHandler}
        >
          Update Question
        </CustomButton>
        <Button
          type="reset"
          variant="outlined"
          color="secondary"
          onClick={discardForm}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

EditQuestionModal.propTypes = {
  question: PropTypes.object.isRequired,
  updateQuestion: PropTypes.func.isRequired,
};

EditQuestionModal.defaultProps = {
  updateQuestion: () => {},
};

export default EditQuestionModal;
