import { tocVisited } from "./../../../services/api";

export const getVisitor = async () => {
    try {
      const res = await tocVisited.getVisitor();
      return res;
    } catch (error) {
      console.error(error);
    }
};

/**
 * Get Tags Actions
 */
export const updateVisitor = async (userId) => {
    try {
      const res = await tocVisited.updateVisitor(userId);
      return res;
    } catch (error) {}
};

export const postVisitor = async (userId) => {
  try {
    const res = await tocVisited.postVisitor(userId);
    return res;
  } catch (error) {}
};
