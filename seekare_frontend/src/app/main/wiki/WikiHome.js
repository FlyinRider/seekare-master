import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  forwardRef,
  useLayoutEffect,
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
import { tourSteps, responsiveSteps } from "app/util/tourSteps";
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
      display: "none",
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
      display: "none",
      width: "100% !important",
    },
  },
  mainContent: {
    padding: "10px",
    width: "45%",
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
  mask: {
    position: "absolute",
    bottom: "78px",
    height: "20px",
    width: "70px",
    right: "57%",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  maskright: {
    position: "absolute",
    bottom: "78px",
    height: "20px",
    width: "70px",
    left: "57%",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  whole: {
    position: "absolute",
    width: "95%",
    height: "52%",
    bottom: "125px",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  first: {
    position: "absolute",
    top: "50%",
    left:'45%',
    width: "10px !important",
    height: "10px !important",
    backgroundColor: 'transparent !important'
  },
  second: {
    position: "absolute",
    backgroundColor: 'transparent !important'
  }
}));

export default function WikiHome() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  const leftSidebarData = useSelector(
    (state) => state.wiki.wikiLeftSidebarData
  );
  const rightSidebarData = useSelector(
    (state) => state.wiki.wikiRightSidebarData
  );
  const isTourRun = useSelector((state) => state.ui.content.isTourRun);
  const step = useSelector((state) => state.ui.content.step);

  const [tempTourSteps, setTempTourSteps] = useState([]);
  const [dimensions, setDimensions] = React.useState(window.innerWidth);
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  const [top, setTop] = React.useState(0);
  const [left, setLeft] = React.useState(0);

  const ref = useRef();
  const responsive = useSelector((state) => state.ui.responsive.responsiveType);
  // const handleResize = () => {
  //   setDimensions(window.innerWidth);
  // };
  const getElementSize = () => {
    const h = document.getElementsByClassName('welcome-part')[0]?.clientHeight
    const w = document.getElementsByClassName('welcome-part')[0]?.clientWidth
    const t = document.getElementsByClassName('welcome-part')[0]?.getBoundingClientRect().top
    const l = document.getElementsByClassName('welcome-part')[0]?.getBoundingClientRect().left
    setWidth(w);
    setHeight(h);
    setTop(t);
    setLeft(l);
  }
  useEffect(() => {
    getElementSize()
  })
  useLayoutEffect(() => {
    window.addEventListener("resize", getElementSize, false);
    const temp = tourSteps 
    if (isAuthenticated) {
      const newSteps = temp.splice(0, tourSteps.length - 1);
      setTempTourSteps(newSteps);
    } else {
      console.log(temp,'temp here')
      setTempTourSteps(temp);
    }
  }, []);

  useEffect(() => {
    dispatch(
      openWikiLeftSidebar({
        isOpen: true,
      })
    );
    dispatch(
      openWikiRightSidebar({
        isOpen: true,
      })
    );
  }, [dispatch]);

  useLayoutEffect(() => {
    const h = document.getElementsByClassName('welcome-part')[0]?.clientHeight
    const w = document.getElementsByClassName('welcome-part')[0]?.clientWidth
    const t = document.getElementsByClassName('welcome-part')[0]?.getBoundingClientRect().top
    const l = document.getElementsByClassName('welcome-part')[0]?.getBoundingClientRect().left
    window.addEventListener("resize", getElementSize, false);
    setWidth(w);
    setHeight(h);
    setTop(t);
    setLeft(l);
    console.log(width, height, top, left)
  },[])

  const handleClickMenu = (type) => () => {
    if (type === "left") {
      dispatch(
        openWikiLeftSidebar({
          isOpen: true,
        })
      );
    } else {
      dispatch(
        openWikiRightSidebar({
          isOpen: true,
        })
      );
    }
  };

  const [tourState, setTourState] = useLocalStorage("tourstate", {
    isTourRun: false,
    step: 0,
  });

  const handleCallback = useCallback(
    (data) => {
      const { action, index, status, type } = data;

      setTourState({
        ...tourState,
        step: index,
      });

      if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
        dispatch(
          setIsRunTour(true, index + (action === ACTIONS.PREV ? -1 : 1))
        );
      } else if (
        [STATUS.FINISHED, STATUS.SKIPPED].includes(status) ||
        [ACTIONS.CLOSE].includes(action)
      ) {
        dispatch(setIsRunTour(false));
      }
    },

    [dispatch, setTourState, tourState]
  );

  return (
    <WikiContextProvider>
      <Box className={classes.rootWrapper}>
        <ReactJoyride
          continuous={true}
          steps={tempTourSteps}
          run={isTourRun}
          stepIndex={step}
          callback={handleCallback}
          styles={{
            options: {
              arrowColor: "#0a7fc1",
              backgroundColor: "#0a7fc1",
              overlayColor: "rgba(47, 39, 166, 0.59)",
              primaryColor: "#FFFFFF",
              textColor: "#FFFFFF",
            },
            overlay: {
              backgroundColor: "rgba(47, 39, 166, 0.59)",
            },
            buttonNext: {
              color: "#0a7fc1",
              background: "#FFFFFF",
            },
          }}
          tooltipComponent={CustomTourTooltip}
          responsive
        />
        {leftSidebarData?.isOpen && (
          <Hidden>
            <div
              item
              className={classes.leftPanel}
              style={{
                display: responsive === "kareBook" ? "block" : "",
              }}
            >
              <WikiHomeLeftRoute />
            </div>
          </Hidden>
        )}
        <div className={`${classes.mainContent}`}>
          {!leftSidebarData?.isOpen && (
            <BsArrowBarRight
              className={classes.leftMenuIcon}
              onClick={handleClickMenu("left")}
            />
          )}
          <div
            className={`${classes.mask} kareBook-responsive`}
            style={{
              display: responsive === "landing" ? "block" : "none",
            }}
          ></div>
          <div
            className={`${classes.maskright} karePost-responsive`}
            style={{
              display: responsive === "landing" ? "block" : "none",
            }}
          ></div>
          <div
            className={`${classes.whole} welcome-responsive`}
            style={{
              display: responsive === "landing" ? "block" : "none",
            }}
          ></div>
          <div
           className={`${classes.first} welcome-post`}
            style={{
              display: responsive === "" ? "block" : "none",
            }}
          ></div> 
          <div
           className={`${classes.second} welcome-here`}
            style={{
              width,
              height,
              top: top * 0.85,
              left: left
            }}
          ></div> 
          <WikiHomeRoute ref={ref} />
          {!rightSidebarData?.isOpen && (
            <BsArrowBarLeft
              className={classes.rightMenuIcon}
              onClick={handleClickMenu("right")}
            />
          )}
        </div>
        <Hidden>
          <div
            className={classes.rightPanel}
            style={{
              width: rightSidebarData?.isOpen ? "35%" : 50,
              transition: "width 0.3s ease-in-out",
              display: responsive === "karePost" ? "block" : "",
            }}
          >
            <WikiRightSidebar ref={ref} />
          </div>
        </Hidden>
      </Box>
    </WikiContextProvider>
  );
}

const WikiHomeRoute = forwardRef((prop, ref) => {
  return (
    <Switch>
      <Route path="/wiki/search" component={WikiSearchList} />
      <Route path="/wiki/question/ask" component={AddPost} />
      <Route
        path="/wiki/question/:questionID/:questionTitle/show"
        component={WikiQuestionContent}
      />
      <Route component={() => <WikiContent ref={ref} />} />
    </Switch>
  );
});

function WikiHomeLeftRoute() {
  return (
    <Switch>
      <Route path="/wiki/question/ask" component={AskQuestionLeft} />
      <Route component={WikiLeftSidebar} />
    </Switch>
  );
}
