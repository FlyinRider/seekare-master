import API from './api';
class TagService {
  constructor() {
    this._token = '';
  }

  /**
   * Post Answer to the Question
   *
   * @param {String} questionID Question ID
   * @param {String} userID User ID
   * @param {String} content Html String
   */
  async postTag(title, slug, description, category) {
    const res = await API.post('/v1/tags', {
      title,
      slug,
      description,
      category,
    });

    return res.data;
  }

  /**
   * Get Tags
   */
  async getTags() {
    const res = await API.get('/v1/tags');

    return res.data;
  }

  /**
   * Delete Tag
   */
  async deleteTag(tagId) {
    const res = await API.delete(`/v1/tags/${tagId}`);

    return res.data;
  }
}

const instance = new TagService();

export default instance;
