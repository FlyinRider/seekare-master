import API from "./api";
class UserService {
  constructor() {
    this._token = "";
  }

  /**
   * Get Single User
   */
  async getUser(userID) {
    const res = await API.get(`/v1/users/${userID}`);

    return res.data;
  }

  /**
   * Create User by Admin
   */
  async createUser(username, email, password) {
    const res = await API.post(`/v1/users`, {
      username,
      email,
      password,
    });

    return res.data;
  }

  /**
   * Update User
   */
  async updateUser(userInfo) {
    const res = await API.put("/v1/users", {
      userInfo,
    });

    return res.data;
  }

  /**
   * Delete User
   */
  async deleteUser(userID) {
    const res = await API.delete(`/v1/users/${userID}`);

    return res.data;
  }

  /**
   * Deactivate User
   * @param {string} userID User ID
   * @param {boolean}
   */
  async deactivateUser(userID, activateStatus) {
    const res = await API.get(
      `/v1/users/${userID}/deactivate?status=${activateStatus}`
    );

    return res.data;
  }

  /**
   * Get MD Helpers
   */
  async getMDs() {
    const res = await API.get("/v1/users/mds");

    return res.data;
  }

  /**
   * Get Qusetions By User ID
   */
  async getQuestionsPosted(userID) {
    const res = await API.get(`/v1/users/${userID}/questions`);

    return res.data;
  }

  /**
   * Change Password
   */
  async changePassword({ userID, currentPwd, newPwd }) {
    const res = await API.post(`/v1/users/${userID}/pwchange`, {
      currentPwd,
      newPwd,
    });

    return res.data;
  }

  /**
   * Update Email
   */
  async updateEmail(userID, email) {
    const res = await API.post(`/v1/users/${userID}/email`, {
      email,
    });

    return res.data;
  }

  /**
   * Update User Info
   */
  async updateUserInfo(userID, username, intro) {
    const res = await API.post(`/v1/users/${userID}/info`, {
      username,
      intro,
    });

    return res.data;
  }

  async uploadFile(payload) {
    const res = await API.post(`/v1/users/upload`, payload);

    return res.data;
  }
}

const instance = new UserService();

export default instance;
