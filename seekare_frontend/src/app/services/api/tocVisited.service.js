import API from './api';
class TocVisited {
  constructor() {
    this._token = '';
  }

  async getVisitor() {
    const res = await API.get('/v1/tocVisit');
    return res.data;
  }

  async updateVisitor(userId) {
    const res = await API.post('/v1/tocVisit', { userId });
    return res.data;
  }

  async postVisitor(userId) {
    const res = await API.post('/v1/tocVisit/new', { userId });
    return res.data;
  }

}

const instance = new TocVisited();

export default instance;
