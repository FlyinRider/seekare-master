import React from "react";
import PropTypes from "prop-types";
import { Avatar, makeStyles } from "@material-ui/core";

import { getUserAvatarInfo } from "app/util/avatarHelper";

const useStyles = makeStyles((theme) => ({
  root: {
    width: (props) => (props.size === "small" ? "20px" : "30px"),
    height: (props) => (props.size === "small" ? "20px" : "30px"),
    fontSize: (props) => (props.size === "small" ? "0.5rem" : "0.7rem"),
  },
}));

const AvatarComponent = ({ user, size }) => {
  const classes = useStyles({ size });
  if (user) {
    const { username, photo } = user;
    if (photo) {
      return <Avatar src={photo} alt={username} />;
    }
    const avatarInfo = getUserAvatarInfo(username);

    if (username) {
      return (
        <Avatar
          style={{ backgroundColor: avatarInfo.color }}
          className={classes.root}
        >
          {avatarInfo.letters}
        </Avatar>
      );
    }
  }

  return null;
};

AvatarComponent.propTypes = {
  user: PropTypes.object,
  size: PropTypes.oneOf(["small", "medium"]),
};

AvatarComponent.defaultProps = {
  user: {},
  size: "small",
};

export default AvatarComponent;
