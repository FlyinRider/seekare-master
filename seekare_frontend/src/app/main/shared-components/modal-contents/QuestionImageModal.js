import React from "react";
import { Box } from "@material-ui/core";

const QuestionImage = ({ url }) => {
  console.log(url);
  return (
    <Box sx={{ marginBottom: "-1px" }}>
      <img
        src={url}
        alt="Question"
        style={{
          marginBottom: "-4px",
          width: "100%",
          height: "80%",
        }}
      />
    </Box>
  );
};

export default QuestionImage;
