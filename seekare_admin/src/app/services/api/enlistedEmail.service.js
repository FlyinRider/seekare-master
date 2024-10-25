import API from './api';

class EnlistedEmailService {
  /**
   * Add Email
   */
  async addEmail(address) {
    const res = await API.post(`/v1/enlisted`, {
      address,
    });

    return res;
  }

  /**
   * Get Enlisted Emails
   */
  async getEmails() {
    const res = await API.get('/v1/enlisted');

    return res;
  }
}

const instance = new EnlistedEmailService();

export default instance;
