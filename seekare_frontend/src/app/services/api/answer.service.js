import API from "./api";
class AnswerService {
  constructor() {
    this._token = "";
  }

  /**
   * Post Answer to the Question
   *
   * @param {String} questionID Question ID
   * @param {String} userID User ID
   * @param {String} content Html String
   */
  async postAnswer(questionID, userID, content, isMdAssigned, mdReviewed) {
    const res = await API.post("/v1/answers", {
      questionID,
      userID,
      content,
      isMdAssigned,
      mdReviewed,
    });

    return res.data;
  }
  async postReferenceAnswer(answerId, userID, books) {
    const res = await API.post(`/v1/answers/${answerId}`, {
      userID,
      books,
    });
    return res.data;
  }
  /**
   * Get Answers For Specific Questions
   *
   * @param {String} questionID
   */
  async getAnswers(questionID) {
    const res = await API.get("/v1/answers?questionID=" + questionID);

    return res.data;
  }

  async getReferencedAnswers(activeWikiId) {
    const res = await API.get(`/v1/answers/${activeWikiId}`);
    return res.data;
  }
  /**
   * Vote Answer
   */
  async voteAnswer(answerID, userID, vote) {
    const res = await API.post(`/v1/answers/${answerID}/vote`, {
      userID,
      vote,
    });

    return res.data;
  }

  /**
   * Update MD Answer
   */
  async updateAnswer(answerID, content, isShow) {
    const res = await API.patch(`/v1/answers/${answerID}`, {
      answer_data: {
        content,
        isShow,
      },
    });

    return res.data;
  }

  /**
   * Delete Answer
   */
  async deleteAnswer(answerID) {
    const res = await API.delete(`/v1/answers/${answerID}`);

    return res.data;
  }
  async deleteAnswerReference(answerID, userID, activeWikiId) {
    const res = await API.post(`/v1/answers/${answerID}/delete`, {
      userID,
      activeWikiId,
    });
    return res.data;
  }
}

const instance = new AnswerService();

export default instance;
