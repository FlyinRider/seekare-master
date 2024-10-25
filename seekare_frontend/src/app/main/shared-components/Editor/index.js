import React, { useRef, forwardRef } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import QuillEditor from "react-quill";

const useStyles = makeStyles((theme) => ({
  root: {},
  quillEditor: {
    width: "100%",
    borderRadius: 12,
    border: `1px solid ${theme.palette.secondary.light}`,
    "& .ql-toolbar": {
      border: "none",
      display: ({ onlyText }) => (onlyText ? "none" : "block"),
    },
    "& .ql-container": {
      minHeight: "5rem",
      maxHeight: "10rem",
      overflow: "hidden auto",
      borderRadius: "6px",
      background: theme.palette.secondary.lightest,
      border: "none",
    },
    "& .ql-editor": {
      minHeight: ({ minHeight }) => (minHeight ? minHeight : "5rem"),
    },
  },
}));

function addLineBreaks(text) {
  var newText = text.replace(/<\/[^>]+>/g, function (match) {
    return match + "\n\n";
  });

  return newText;
}

const Editor = forwardRef(
  ({ id, content, onChangeContent, onlyText, minHeight, ...rest }, ref) => {
    const classes = useStyles({
      minHeight,
      onlyText,
    });
    const handleOnFocus = () => {
      ref.current = { qid: id, ...currentRef?.current };
    };
    const currentRef = useRef();
    const formattedContent = addLineBreaks(content);
    const modules = !onlyText
      ? {
          toolbar: [
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
            ],
            ["link", "_self"],
          ],
        }
      : {
          toolbar: [],
        };

    const formats = !onlyText
      ? [
          "bold",
          "italic",
          "underline",
          "strike",
          "blockquote",
          "list",
          "bullet",
          "indent",
          "link",
          "image",
        ]
      : [];
    const onMouseLeft = () => {
      const quill = currentRef.current?.getEditor();
      const html = quill?.root.innerHTML;
      onChangeContent(html);
    };

    return (
      <QuillEditor
        className={classes.quillEditor}
        theme="snow"
        linkTarget="_self"
        ref={currentRef}
        modules={modules}
        formats={formats}
        value={formattedContent}
        onFocus={handleOnFocus}
        onBlur={(a, b, c) => {
          onChangeContent(c.getHTML());
        }}
        {...rest}
      />
    );
  }
);

Editor.propTypes = {
  onlyText: PropTypes.bool,
};

Editor.defaultProps = {
  onlyText: false,
};

export default Editor;
