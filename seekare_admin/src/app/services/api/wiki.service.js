import API from './api';

class WikiService {
  constructor() {
    this._token = '';
  }

  /**
   * Get Wiki by TagId
   */
  async getWikiByTagId(tagId) {
    const res = await API.get(`/v1/wiki/tag/${tagId}`);

    return res.data;
  }

  async getWikiById(wikiId) {
    return API.get(`/v1/wiki/${wikiId}`).then((res) => res.data);
  }

  /**
   * Get All Wiki data
   */

  async getAllWikiData() {
    return API.get(`/v1/wiki`).then((res) => res.data);
  }
  /**
   * Get All Wiki data
   */

  async getWikiListByKeywoard(keyword) {
    return API.get(`/v1/wiki?key=${keyword}`).then((res) => res.data);
  }

  /**
   * Create Wiki Content
   *
   * @param {string} tagId Tag ID
   * @param {string} params Wiki Data Object
   */
  async createWiki(data, params) {
    return await API.post('/v1/wiki/create', {
      ...data,
      params,
    }).then((res) => res.data);
  }

  /**
   * Update Wiki Content's Question
   *
   * @param {string} wikiId wiki ID
   * @param {string} params Wiki Content question
   */
  async updateQuestionToWiki(wikiId, params) {
    return await API.post(`/v1/wiki/question/${wikiId}`, params).then(
      (res) => res.data
    );
  }

  /**
   * delet Wiki Content's id
   *
   * @param {string} wikiId wiki ID
   * @param {string} params Wiki question - should be include question id
   */
  async deleteQuestionToWiki(wikiId, quizId) {
    return await API.delete(`/v1/wiki/question/${wikiId}/${quizId}`).then(
      (res) => res.data
    );
  }

  /**
   * Update Wiki Content
   *
   * @param {string} wikiId wiki ID
   * @param {string} params Wiki Data Object
   */
  async updateWiki(wikiId, params) {
    const res = await API.post('/v1/wiki/update', {
      wikiId,
      params,
    });
    return res.data;
  }

  /**
   * Delete Wiki Content
   *
   * @param {string} wikiId wiki ID
   */
  async deleteWiki(wikiId) {
    const res = await API.delete(`/v1/wiki/${wikiId}`);

    return res.data;
  }
  async updateWikiCategory(wikiId, categories) {
    const res = await API.post(`/v1/wiki/category/${wikiId}`, { categories });
    return res.data;
  }
}

const instance = new WikiService();

export default instance;
