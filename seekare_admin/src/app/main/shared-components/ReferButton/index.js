import React from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";
import { emailService } from "app/services/api";
import useSafeDispatch from "app/hooks/useSafeDispatch";
import { useDispatch } from "react-redux";
import useAuth from "app/hooks/useAuth";
import { closeModal, openModal, pushSnackbar } from "app/store/ui/actions";
import CustomButton from "../Button";

const useStyles = makeStyles((theme) => ({
  referButtonWrapper: {
    textAlign: "center",
    padding: "10px 20px",
    background: theme.palette.secondary.light,
    color: "white",
    maxWidth: "fit-content",
    margin: "auto",
    borderRadius: "8px",
    position: "relative",
  },
  personPlus: {
    position: "absolute",
    left: "50%",

    padding: "10px",
    margin: "auto",
    marginTop: -90,
    maxWidth: "fit-content",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "8px",
    transform: "translateX(-50%)",
    "& img": {
      width: 100,
    },
  },
  referButton: {
    backgroundColor: "#2196f3",
    "&:hover": {
      backgroundColor: "#0069d9",
      borderColor: "#0062cc",
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#0062cc",
      borderColor: "#005cbf",
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    },
  },
}));

const ReferButton = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const safeDispatch = useSafeDispatch(dispatch);
  const {
    currentUser: { username, email },
  } = useAuth();

  const onClickInvite = () => {
    const curHref = document.location.href;
    safeDispatch(
      openModal("INVITE_USER_MODAL", {
        onSend: async (emails, subject, content) => {
          try {
            const { status, message } = await emailService.invite(
              emails,
              subject,
              content
            );
            dispatch(pushSnackbar(message, status));
            safeDispatch(closeModal());
          } catch (error) {
            dispatch(pushSnackbar("Unknown Error", "error"));
          }
        },
        onCancel: async () => {
          safeDispatch(closeModal());
        },
        defContent: `Hi! This is ${username}. <br/>
             Current page Link is <a href="${curHref}">${curHref}</a>
             <br/><br/> 

              Please contact me  <a href="mailto:${email}">${email}</a>.<br/>
              Regards.
              ${username}
            `,
      })
    );
  };
  return (
    <Box className={classes.referButtonWrapper}>
      <Box className={classes.personPlus}>
        <img src="/images/icons/inviteuser.png" alt="invite friend" />
      </Box>
      <Box my={2}>
        <Typography>Invite your Friends</Typography>
      </Box>
      <CustomButton
        variant="contained"
        size="md"
        // startIcon={<SendIcon />}
        color="secondary"
        onClick={onClickInvite}
      >
        Invite a friend
      </CustomButton>
    </Box>
  );
};

export default ReferButton;
