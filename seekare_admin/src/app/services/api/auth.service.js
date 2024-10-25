import API from "./api";

class AuthService {
  /**
   * Sign In With Email and Password
   * @param {Object} auth_data {}
   */
  async signInWithEmail(auth_data) {
    const res = await API.post("/v1/users/signin", auth_data);
    return res.data;
  }

  /**
   * Sign In With Email or Username and Password
   * @param {Object} auth_data {}
   */
  async signInWithEmailOrName(auth_data) {
    const res = await API.post("/v1/users/signin", auth_data);
    return res.data;
  }

  /**
   * Sign Up with Username, Email and Password
   * @param {Object} auth_data {}
   */
  async signUpWithEmail(auth_data) {
    const res = await API.post("/v1/users/signup", auth_data);

    return res;
  }

  /**
   *
   * username
   * email
   */
  async emailConfirm(auth_data) {
    const res = await API.post("/v1/users/email-confirm", auth_data);
    return res;
  }

  /**
   * Sign In With Token in Localstorage
   */
  async signInWithToken() {
    const res = await API.get("/v1/users/auth/token");
    return res.data;
  }

  /**
   * Get Users
   */
  async getUsers(params) {
    const res = await API.post(`/v1/users/getUsers`, params);

    return res.data;
  }

  /**
   * Forgot Password
   */
  async pwdChangeRequest(email) {
    const res = await API.get(`/v1/users/password-change?email=${email}`);

    return res;
  }

  /**
   * Change Password
   */
  async pwdChange(token, password) {
    const res = await API.post(`/v1/users/password-change`, {
      token,
      password,
    });

    return res;
  }

  /**
   * Recaptch Verification
   */
  async verifyRecaptcha(token) {
    const res = await API.post(`/v1/users/verifyCaptcha`, {
      token,
    });

    return res.data;
  }

  /**
   * Authentication with Google
   */
  async signUpWithGoogle(tokenId) {
    const res = await API.post(`/v1/users/signup/google`, {
      tokenId,
    });

    return res;
  }

  /**
   * Sign In with Google
   */
  async signInWithGoogle(tokenId) {
    const res = await API.post(`/v1/users/signin/google`, {
      tokenId,
    });

    return res;
  }
}

const instance = new AuthService();

export default instance;
