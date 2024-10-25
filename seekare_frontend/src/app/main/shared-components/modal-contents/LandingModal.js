import React, { useState } from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";
import CustomButton from "../Button";
import { closeModal, openModal } from "app/store/ui/actions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getVisitor } from "app/store/tocVisited/actions";
import useAuth from "app/hooks/useAuth";
import { getToc } from "app/store/toc/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: "87vh",
    borderRadius: "8px",
    backgroundColor: "white",
    padding: "2rem",
    overflow: "hidden auto",
    [theme.breakpoints.down("sm")]: {
      minWidth: "20rem",
      padding: "0.4rem",
    },
  },
  pageTitle: {
    color: theme.palette.text.primary,
    fontWeight: "bold",
  },
  pageContentCard: {
    background: "white",
    borderRadius: "8px",
    overflow: "hidden",
  },
  whoweareDesc: {
    marginBottom: "2rem",
    fontSize:'23px',
    fontWeight:'bold'
  },
  bannerImage: {
    backgroundImage: "url(images/about_us.jpg)",
    backgroundPosition: "top",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    minHeight: "15rem",
    height: "400px",
    [theme.breakpoints.down("sm")]: {
      height: "250px",
    },
  },
  detailItem: {
    border: "1px solid gray",
    borderRadius: "8px",
    padding: "1rem",
  },
  detailTitle: {
    color: theme.palette.text.main,
    fontSize: "1.6rem",
    fontWeight: "bold",
  },
}));

// const items = [
//   {
//     title: "100+ million",
//     description: "Monthly Visitors ",
//   },
//   {
//     title: "100+ million",
//     description: "Monthly Visitors ",
//   },
//   {
//     title: "100+ million",
//     description: "Monthly Visitors ",
//   },
//   {
//     title: "100+ million",
//     description: "Monthly Visitors ",
//   },
// ];

const LandingModal = () => {
  const [toc, setToc] = useState({});
  const {currentUser} = useAuth();
  const [accept, setAccept] = useState(false)
  const classes = useStyles();
  const dispatch = useDispatch()

  const tocVisitorGetter = async (userId) => {
    const res = await getVisitor();
    let flag = true;
    let flag2 = false;
    const tocT = await getToc();
    res.visitors.map(visitor => {
      if (visitor.userId == userId){
        if(tocT.tocs[0].updated > visitor.visited){
          flag = false
          return
        } 
      }
    })
    res.visitors.map(visitor => {
      if (visitor.userId == userId){
        flag2 = true;
        return
      }
    })
    if(!flag || !flag2) {
      dispatch(openModal('TERMS_MODAL', 'HIDECLOSE'))
    }
  }

  const handleClickAccept = async () => {
    window.sessionStorage.setItem('landingModal', 'landed')
    dispatch(closeModal('LANDINGMODAL'))
    setAccept(true);
    if(currentUser?.userID) {
      await tocVisitorGetter(currentUser.userID)
    } else {
      dispatch(openModal('TERMS_MODAL', 'HIDECLOSE'))
    }
  }

  useEffect(() => {
    const tocGetter = async () => {
      const res = await getToc()
      setToc(res?.tocs)
    }
    tocGetter()
  }, [])

  return (
    <Box className={classes.root}>
      <Box className={classes.pageContentCard}>
        <Box padding={2}>
          <Typography variant="body2" className={classes.whoweareDesc}>
          The information provided on this site is for educational purposes 
          and cannot substitute for the advice of a licensed medical 
          professional. Use of and access to information on this site does 
          not create a physician-patient relationship. Seekare.org is not 
          responsible for your use of this educational material or its 
          consequences.
          </Typography>
        </Box>
        <Box style={{ display:'flex', textAlign: 'center'}}>
            <CustomButton 
            size="md"
            variant="contained"
            color="secondary"
            style={{margin: '0 auto'}}
            onClick={handleClickAccept}
            >ACCEPT</CustomButton>
        </Box>
      </Box>
    </Box>
  );
};

export default LandingModal;
