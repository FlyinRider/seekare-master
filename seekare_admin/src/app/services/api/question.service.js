import API from "./api";

class QuestionService {
  constructor() {
    this._token = "";
  }

  /**
   *
   * @param {Object} questionData
   */
  async postQuestion(questionData) {
    const res = await API.post("/v1/questions", questionData);
    return res.data;
  }

  /**
   * Get Questions
   *
   * @param {String} searchQuery
   * @param {Number} perpage
   * @param {Number} page
   */
  async getQuestions(
    searchQuery,
    perpage,
    page,
    sortingSlug,
    userID,
    recents,
    tags,
    sortBy,
    dir
  ) {
    const res = await API.get(
      `/v1/questions?userID=${userID ? userID : ""}&q=${
        searchQuery ? searchQuery : ""
      }&perpage=${perpage ? perpage : ""}&page=${page ? page : ""}&slug=${
        sortingSlug ? sortingSlug : ""
      }&recents=${recents ? true : false}&tags=${
        tags ? JSON.stringify(tags) : ""
      }&sortBy=${sortBy}&dir=${dir}`
    );
    return res.data;
  }

  /**
   *
   * @param {*} id
   */
  async getSortedQuestions({
    slug,
    tab,
    q,
    qSetting,
    perpage,
    page,
    userID,
    activeWikiId,
    tags = [],
  }) {
    const res = await API.get(
      `/v1/questions/sorted?userID=${userID ? userID : ""}&q=${
        q ? q : ""
      }&perpage=${perpage ? perpage : "10"}&page=${page ? page : "0"}&slug=${
        slug ? slug : "latest"
      }&tab=${tab ? tab : "recents"}&qSetting=${
        qSetting ? qSetting : "any"
      }&tags=${encodeURIComponent(tags)}&activeWikiId=${activeWikiId}`
    );

    return res.data;
  }

  /**
   * getSingleQuestion
   * Get Single Question
   *
   * @param {} id
   */
  async getSingleQuestion(id) {
    const res = await API.get(`/v1/questions/${id}`);

    return res.data;
  }

  async postAnswer(questionID, questionData) {
    const res = await API.post(
      `/v1/questions/${questionID}/answers`,
      questionData
    );
    return res.data;
  }

  async deleteQuestion(questionID) {
    const res = await API.delete(`/v1/questions/${questionID}`);
    return res.data;
  }

  /**
   * Assign MD to Question
   */
  async assignMd(questionID, md) {
    const res = await API.post(`/v1/questions/${questionID}/assignMd`, {
      md,
    });

    return res.data;
  }

  /**
   * Vote the question
   */
  async vote(questionID, userID, vote) {
    const res = await API.post(`/v1/questions/${questionID}/vote`, {
      userID,
      vote,
    });

    return res.data;
  }

  /**
   * Update the Question
   */
  async update(questionID, updated_question) {
    const res = await API.patch(`/v1/questions/${questionID}`, {
      updated_question,
    });

    return res.data;
  }

  /**
   * Get Untagged Questions
   */
  async getUntaggedQuestions() {
    const res = await API.get(`/v1/questions/untagged`);

    return res.data;
  }

  async setBannedQuestion(questionID, bannedStatus) {
    const res = await API.get(
      `/v1/questions/${questionID}/banned?banned=${bannedStatus}`
    );

    return res.data;
  }

  /**
   * Add Tags
   */
  async addingTags(questionID, tags) {
    const res = await API.post(`/v1/questions/${questionID}/tags`, {
      tags,
    });

    return res.data;
  }

  /**
   * Get MD Questions
   */
  async getMDQuestions(mdID) {
    const res = await API.get(`/v1/questions/md/${mdID}`);

    return res.data;
  }

  /**
   * Get Questions Answered By User
   */
  async getQuestionsAnswered(userID) {
    const res = await API.get(`/v1/questions/answered/${userID}`);

    return res.data;
  }
  /**
   * post reference
   * @param {*} questionId
   * @param {*} userID
   * @param {*} books
   * @returns
   */
  async postReference(questionId, userID, books) {
    const res = await API.post(`/v1/questions/${questionId}`, {
      userID,
      books,
    });
    return res.data;
  }

  /**
   * Remove MD
   */
  async removeMD(questionID) {
    const res = await API.delete(`/v1/questions/${questionID}/removeMD`);

    return res.data;
  }

  /**
   * Get Similar Questons
   */
  async getSimilarQuesitons({ questionID = "", queryTitle = "" }) {
    return await API.post(`/v1/questions/similar`, {
      queryTitle: queryTitle || "",
      questionID: questionID || "",
    }).then((res) => res.data.result);
  }

  /**
   * Get Similar Queries
   */
  async getSimilarQueries(searchQuery) {
    const res = await API.get(
      `/v1/questions/similar-queries?searchQuery=${searchQuery}`
    );

    return res.data;
  }

  /**
   * API handler for Status setting
   *
   * @param {string} questionID Question ID
   * @param {string} status Status String
   * @returns {object} Response Data
   */
  async setStatus(questionID, status) {
    const res = await API.get(
      `/v1/questions/${questionID}/status?status=${status}`
    );

    return res.data;
  }
  /**
   * Get All Category data
   */

  async getAllWikiCategoryData() {
    return await API.get(`/v1/questions/tags`).then((res) => res.data);
  }

  /**
   * Add New Category
   */
  async addWikiCategoryData(title) {
    return await API.post(`/v1/questions/tags`, { title }).then(
      (res) => res.data
    );
  }

  /**
   * Add New Category
   */
  async updatedWikiCategoryData(id, title) {
    return await API.post(`/v1/questions/tags/${id}`, { title }).then(
      (res) => res.data
    );
  }

  async deleteWikiCategories(tagIds) {
    return await API.post(`/v1/questions/tags-delete`, { tagIds }).then(
      (res) => res.data
    );
  }
  async deleteReference(questionId, userID, activeWikiId) {
    const res = await API.post(`/v1/questions/${questionId}/delete`, {
      userID,
      activeWikiId,
    });
    return res.data;
  }
}

const instance = new QuestionService();

export default instance;
