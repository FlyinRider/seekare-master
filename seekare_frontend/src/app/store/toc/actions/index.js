import { tocService } from "./../../../services/api";

export const postToc = async (tocId) => {
    try {
      const res = await tocService.postToc(tocId);
      return res;
    } catch (error) {
      console.error(error);
    }
};

/**
 * Get Tags Actions
 */
export const getToc = async () => {
    try {
      const res = await tocService.getToc();
      return res;
    } catch (error) {}
};
