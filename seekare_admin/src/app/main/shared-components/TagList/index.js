import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Box, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { RiPriceTagLine } from "react-icons/ri";

import { getSortedQuestions } from "app/store/question/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0 2rem",
    overflow: "hidden auto",
    height: "82.5vh",
  },
  title: {
    color: theme.palette.text.primary,
    "& h4": {
      fontSize: "1.2rem",
      margin: "0.5rem",
    },
  },
  items: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
    paddingLeft: "1rem",
  },
  item: {
    textTransform: "capitalize",
    fontSize: "1rem",
    fontWeight: "500",
    marginBottom: "0.5rem",
    cursor: "pointer",
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: "4px",
    padding: "3px 5px",
    display: "flex",
    alignItems: "center",
    marginLeft: "5px",
    width: "fit-content",
    "&:hover": {
      color: theme.palette.secondary.main,
      fontWeight: 600,
    },
    "&.selected": {
      background: theme.palette.secondary.light,
      color: "white",
      fontWeight: "bold",
    },
  },
  itemTitle: {
    maxWidth: "100px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
}));

const TagList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.tag.tags);

  const categorizedTags = useMemo(() => {
    const catTags = [];
    tags.forEach((tagItem) => {
      if (!tagItem.category) {
        const childTags =
          tags.filter((item) => item.category === tagItem._id) || [];
        catTags.push({
          ...tagItem,
          subTags: childTags,
        });
      }
    });

    return catTags;
  }, [tags]);

  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    const fetchSearchQuestions = async () => {
      const tagTitles = [];
      selectedTags.forEach((id) => {
        const index = tags.findIndex((tagItem) => tagItem._id === id);
        tagTitles.push(tags[index]["title"]);
      });

      dispatch(
        getSortedQuestions({
          tags: tagTitles && tagTitles.length > 0 ? tagTitles.join("+") : "",
        })
      );
    };

    fetchSearchQuestions();
  }, [dispatch, selectedTags, tags]);

  const onClickTag = (tagId) => {
    const currTags = [...selectedTags];
    const index = currTags.findIndex((item) => item === tagId);

    if (index > -1) {
      currTags.splice(index, 1);
    } else {
      currTags.push(tagId);
    }

    setSelectedTags([...currTags]);
  };

  const isSelected = useCallback(
    (tagId) => {
      const index = selectedTags.findIndex((item) => item === tagId);

      if (index > -1) {
        return true;
      } else {
        return false;
      }
    },
    [selectedTags]
  );

  return (
    <Box className={classes.root}>
      <Box display="flex" alignItems="center" className={classes.title}>
        <img src="/images/icons/Category.png" alt="category icon" />
        <h4>10 Most Common Tags</h4>
      </Box>
      <Box component="ul" className={classes.items}>
        {categorizedTags &&
          categorizedTags.map((item) => (
            <React.Fragment key={`category_${item._id}`}>
              {!item?.category && (
                <React.Fragment>
                  <Box
                    component="li"
                    className={`${classes.item} ${
                      isSelected(item._id) && "selected"
                    }`}
                    onClick={() => onClickTag(item._id)}
                  >
                    <Box className={classes.itemTitle} component="span" mr={1}>
                      {item.title}
                    </Box>
                    <Box width="15px" flexShrink="1">
                      <RiPriceTagLine />
                    </Box>
                  </Box>
                  {item.subTags && item.subTags.length > 0 && (
                    <Box pl={2} display="flex" flexWrap="wrap">
                      {item.subTags.map((subItem, index) => (
                        <Box
                          component="li"
                          key={`subcategory_${subItem._id}_${index}`}
                          className={`${classes.item} ${
                            isSelected(subItem._id) && "selected"
                          }`}
                          onClick={() => onClickTag(subItem._id)}
                        >
                          <Box
                            component="span"
                            className={classes.itemTitle}
                            mr={1}
                          >
                            {subItem.title}
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  )}
                </React.Fragment>
              )}
            </React.Fragment>
          ))}
      </Box>
    </Box>
  );
};

export default TagList;
