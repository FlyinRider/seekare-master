import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  forwardRef,
} from "react";
import ReactJoyride, { ACTIONS, EVENTS, STATUS } from "react-joyride";
import { Route, Switch } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { makeStyles, Hidden, Box } from "@material-ui/core";
import { BsArrowBarRight, BsArrowBarLeft } from "react-icons/bs";

import {
  openWikiLeftSidebar,
  openWikiRightSidebar,
} from "app/store/wiki/actions";

import WikiLeftSidebar from "./wikiLeftSidebar";
import WikiContent from "./wikiContent";
import WikiRightSidebar from "./wikiRightSidebar";
import { WikiQuestionContent } from "./WikiQuestion";
import AddPost from "./wikiContent/AddPost";
import WikiSearchList from "./wikiContent/WikiSearchList";
import AskQuestionLeft from "./wikiLeftSidebar/AskQuestionLeft";
import CustomTourTooltip from "./tourTooltip";

import useAuth from "app/hooks/useAuth";
import { tourSteps } from "app/util/tourSteps";
import { setIsRunTour } from "app/store/ui/actions";
import { useLocalStorage } from "app/hooks/useLocalstorage";

import { WikiContextProvider } from "./wikiContext";

const useStyles = makeStyles((theme) => ({
  rootWrapper: {
    position: "relative",
    display: "flex",
    height: "100%",
    overflowY: "auto !important",
    [theme.breakpoints.down("sm")]: {
      flexWrap: "wrap",
    },
  },

  leftPanel: {
    width: "20%",
    flexGrow: 1,
    padding: 10,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  rightPanel: {
    position: "relative",
    width: "30%",
    height: "100%",
    paddingBottom: "10px",
    zIndex: 0,
    [theme.breakpoints.down("sm")]: {
      width: "100% !important",
    },
  },
  mainContent: {
    padding: "10px",
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "100% !important",
    },
  },

  leftMenuIcon: {
    position: "absolute",
    margin: "13px 0 0 13px",
    fontSize: 25,
    cursor: "pointer",
  },
  rightMenuIcon: {
    top: 15,
    right: 15,
    position: "absolute",
    fontSize: 25,
    cursor: "pointer",
    zIndex: 10001,
  },
}));

export default function WikiHome() {
  return <WikiContextProvider></WikiContextProvider>;
}
