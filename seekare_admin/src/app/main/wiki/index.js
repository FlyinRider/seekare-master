import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, Grid, Hidden } from '@material-ui/core';
import { FiMenu } from 'react-icons/fi';
import {
  openWikiLeftSidebar,
  openWikiRightSidebar,
} from 'app/store/wiki/actions';

import WikiLeftSidebar from './wikiLeftSidebar';
import WikiContent from './wikiContent';
import WikiRightSidebar from './wikiRightSidebar';

const useStyles = makeStyles((theme) => ({
  rootWrapper: {
    position: 'relative',
  },
  leftMenuIcon: {
    position: 'absolute',
    margin: '13px 0 0 13px',
    fontSize: 25,
    cursor: 'pointer',
  },
  rightMenuIcon: {
    top: 13,
    right: 13,
    position: 'absolute',
    fontSize: 25,
    cursor: 'pointer',
  },
}));

export default function Wiki() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const leftSidebarData = useSelector(
    (state) => state.wiki.wikiLeftSidebarData
  );
  const rightSidebarData = useSelector(
    (state) => state.wiki.wikiRightSidebarData
  );

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

  const handleClickMenu = (type) => () => {
    if (type === 'left') {
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

  let wikiContentGrid = 12;
  if (leftSidebarData.isOpen) wikiContentGrid -= 3;
  if (rightSidebarData.isOpen) wikiContentGrid -= 3;

  return (
    <Grid container className={classes.rootWrapper}>
      {leftSidebarData?.isOpen && (
        <Hidden>
          <Grid item md={3}>
            <WikiLeftSidebar />
          </Grid>
        </Hidden>
      )}
      <Grid item md={wikiContentGrid}>
        {!leftSidebarData?.isOpen && (
          <FiMenu
            className={classes.leftMenuIcon}
            onClick={handleClickMenu('left')}
          />
        )}
        <WikiContent />
        {!rightSidebarData?.isOpen && (
          <FiMenu
            className={classes.rightMenuIcon}
            onClick={handleClickMenu('right')}
          />
        )}
      </Grid>
      {rightSidebarData?.isOpen && (
        <Hidden>
          <Grid item md={3}>
            <WikiRightSidebar />
          </Grid>
        </Hidden>
      )}
    </Grid>
  );
}
