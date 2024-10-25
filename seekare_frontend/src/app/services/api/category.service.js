import API from './api';

/**
 * Category Service
 */
class CategoryService {
  constructor() {
    this._token = '';
  }

  /**
   * Get Category Items
   *
   * @returns {Object} Category Items
   */
  async getCategories() {
    const res = await API.get('/v1/categories');

    return res.data;
  }

  /**
   * Create Category
   */
  async createCategory({ title, tag, description }) {
    const res = await API.post('/v1/categories', {
      title,
      tag,
      description,
    });

    return res.data;
  }

  /**
   * Delete Categories
   *
   * @param {Array} categoryIds Category IDs to delete
   * @returns
   */
  async deleteCategory(categoryIds) {
    const res = await API.delete('/v1/categories', {
      categoryIds,
    });

    return res.data;
  }

  /**
   * Update Category
   *
   * @param {*} category
   * @param {String} category.categoryId Category ID
   * @param {String} category.title  Category Title
   * @param {String} category.tag  Category Tag
   * @param {String} category.description Category Description
   * @returns
   */
  async updateCategory({ categoryId, title, tag, description }) {
    const res = await API.put('/v1/categories', {
      categoryId,
      title,
      tag,
      description,
    });

    return res.data;
  }
}

const instance = new CategoryService();

export default instance;
