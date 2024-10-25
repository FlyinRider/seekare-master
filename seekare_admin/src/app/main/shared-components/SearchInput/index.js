import React from "react";
import PropTypes from "prop-types";

import { FiSearch } from "react-icons/fi";
import { Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    width: "100%",
    background: "white",
    "& input": {
      border: "none",
      borderRadius: "0.5rem",
      padding: "0.7rem 0",
      width: "100%",
      fontSize: "1.2rem",
      outline: "none",
      color: theme.palette.primary.main,
    },
  },

  searchIcon: {
    color: theme.palette.text.primary,
    padding: "0 0.5rem",
  },
}));

const SearchInput = ({ onChange, onKeyUp, value, placeholder, ...rest }) => {
  const classes = useStyles();
  const { className } = rest;
  return (
    <Box className={`${classes.root} ${className}`}>
      <Box className={classes.searchIcon}>
        <FiSearch color="gray" />
      </Box>
      <input
        onChange={(e) => onChange(e.target.value)}
        onKeyUp={(e) => onKeyUp(e)}
        value={value}
        type="text"
        name="q"
        autoComplete="off"
        placeholder={
          placeholder
            ? placeholder
            : "Search Our Collocation of MD Questions and Answers"
        }
        {...rest}
      />
    </Box>
  );
};

SearchInput.propTypes = {
  onChange: PropTypes.func,
  onKeyUp: PropTypes.func,
};

SearchInput.defaultProps = {
  onChange: () => {},
  onKeyUp: () => {},
};

export default SearchInput;
