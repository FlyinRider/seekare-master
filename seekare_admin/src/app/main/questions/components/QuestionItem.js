import React from 'react';
import { Link } from 'react-router-dom';

import { Box, Chip, Grid, makeStyles } from '@material-ui/core';
import Highlighter from 'react-highlight-words';
import { FaCheckDouble } from 'react-icons/fa';
import { BiLike, BiDislike } from 'react-icons/bi';

import { getTextFromHtml } from 'app/util/helper';
import AvatarComponent from 'app/main/shared-components/AvatarComponent';
import { postedTimeFormat } from 'app/util/date';
import useAuth from 'app/hooks/useAuth';

const useStyles = makeStyles({
  root: {
    borderBottom: '1px solid #B5BF97',
    padding: '1rem 0',
  },
  questionDetail: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  answerNumber: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& .number': {
      fontSize: '1.2rem',
    },
    '& p': {
      margin: '0',
    },
  },
  mdReview: {
    color: '#3c7f97',
    borderRadius: '0.2rem',
    padding: '1rem 0',
    textAlign: 'center',
    position: 'relative',
    '& p': {
      fontSize: '0.8rem',
      margin: 0,
    },
  },
  reactions: {
    display: 'flex',
    '& .reaction-item': {
      margin: '0 0.5rem',
      '&.likes': {},
      '&.dislikes': {},
    },
  },
  tags: {
    display: 'flex',
    alignItems: 'flex-end',
    flex: 1,
  },
  tagItem: {
    margin: '0 0.2rem',
  },
  questionTitle: {
    color: '#5a8797',

    '& h3': {
      margin: 0,
    },

    '&:hover': {
      color: '#3c7f97',
    },
  },
  questionContent: {
    margin: '0.5rem 0',
    maxHeight: '2.8rem',
    overflow: 'hidden',
    textOverflow: 'eclipse',
    height: 50,
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  questionBy: {
    display: 'flex',
    alignItems: 'center',
    '& .user-info': {
      marginLeft: '0.5rem',
      '& a': {
        fontWeight: 600,
      },
      '& p': {
        margin: '0.3rem 0',
        fontSize: '0.7rem',
      },
    },
  },
});

const QuestionItem = ({ question, queries }) => {
  const { isNormalUser, isPremiumUser, isAuthenticated } = useAuth();
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item md={1} className={classes.questionDetail}>
        <Box>
          <Box color='#019877' display='flex' alignItems='center'>
            <BiLike title='like' />
            &nbsp;
            <span>{question.likes ? question.likes : 0}</span>
          </Box>
          <Box color='#9e1f1f' display='flex' alignItems='center'>
            <BiDislike title='dislike' />
            &nbsp;
            {question.dislikes ? question.dislikes : 0}
          </Box>
        </Box>
        {question.mdReivewed && (
          <div className={classes.mdReview}>
            <FaCheckDouble />
          </div>
        )}
      </Grid>
      <Grid item md={11}>
        <Link
          to={`/questions/${question._id}/show`}
          className={classes.questionTitle}
        >
          <h3>
            <Highlighter
              highlightClassName='high-lighted'
              searchWords={queries ? queries : []}
              autoEscape={true}
              textToHighlight={question.title}
            />
          </h3>
        </Link>
        <p className={classes.questionContent}>
          <Highlighter
            highlightClassName='high-lighted'
            searchWords={queries ? queries : []}
            autoEscape={true}
            textToHighlight={getTextFromHtml(question.content)}
          />
        </p>
        <Box className={classes.footer} justifyContent='flex-end'>
          {!isNormalUser && !isPremiumUser && isAuthenticated && (
            <div className={classes.tags}>
              {question.tags &&
                question.tags.length > 0 &&
                question.tags.map((tag) => (
                  <Chip
                    key={tag._id}
                    label={tag.title}
                    className={classes.tagItem}
                    clickable
                  />
                ))}
            </div>
          )}
          <div className={classes.questionBy}>
            <AvatarComponent user={question.user} />
            <Box className='user-info'>
              {question.user && question.user.username}
              <p className='posted-time'>{postedTimeFormat(question.date)}</p>
            </Box>
          </div>
        </Box>
      </Grid>
    </Grid>
  );
};

export default QuestionItem;
