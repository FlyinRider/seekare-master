import API from './api';
class TocService {
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
  async postToc(tocId) {
    const res = await API.post('/v1/toc', {
      tocId
    });
    return res.data;
  }

  async getToc() {
    const res = await API.get('/v1/toc');
    return res.data;
  }

}

const instance = new TocService();

export default instance;
