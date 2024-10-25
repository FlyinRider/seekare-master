import API from './api';
class RoleService {
  constructor() {
    this._token = '';
  }

  /**
   * Get Roles
   */
  async getRoles() {
    const res = await API.get('/v1/users/roles');

    return res.data;
  }

  /**
   * Delete Role
   */
  async deleteRole(roleID) {
    const res = await API.delete(`/v1/roles/${roleID}`);

    return res.data;
  }

  /**
   * Update Role
   */
  async updateRole(roleID, title, desc) {
    const res = await API.patch(`/v1/roles/${roleID}`, {
      title,
      desc,
    });

    return res.data;
  }

  /**
   * Create Role
   */
  async createRole(title, desc) {
    const res = await API.post(`/v1/roles`, {
      title,
      desc,
    });

    return res.data;
  }
}

const instance = new RoleService();

export default instance;
