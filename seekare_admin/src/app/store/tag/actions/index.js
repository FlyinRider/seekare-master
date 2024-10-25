import { pushSnackbar } from "../../ui/actions";
import { SET_TAGS } from "../types";
import { tagService } from "./../../../services/api";

export const postTag = async (tagTitle) => {
  return async (dispatch) => {
    try {
      await tagService.postTag(tagTitle);

      dispatch(getTags());
    } catch (error) {
      console.error(error);
    }
  };
};

/**
 * Get Tags Actions
 */
export const getTags = () => {
  return async (dispatch) => {
    try {
      const { tags } = await tagService.getTags();

      dispatch(setTags(tags));
    } catch (error) {}
  };
};

const setTags = (tags) => ({
  type: SET_TAGS,
  payload: {
    tags,
  },
});

/**
 * Delete Tag Action
 */
export const deleteTag = (tagId) => {
  return async (dispatch) => {
    try {
      const { tags } = await tagService.deleteTag(tagId);

      dispatch(setTags(tags));
      dispatch(pushSnackbar("Deleted Tag", "success"));
    } catch (error) {
      dispatch(pushSnackbar("Can not delete Tag", "error"));
    }
  };
};

export const addTag = ({ title, slug, description, category }) => {
  return async (dispatch) => {
    try {
      const { tags } = await tagService.postTag(
        title,
        slug,
        description,
        category
      );

      dispatch(setTags(tags));
      dispatch(pushSnackbar("Added Tag", "success"));
    } catch (error) {
      dispatch(pushSnackbar("Can not add Tag", "error"));
    }
  };
};
