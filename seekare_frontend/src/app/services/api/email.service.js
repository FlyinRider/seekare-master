import API from './api';

class EmailService {
  /**
   * Send Email
   */
  async send(fullname, email, message) {
    const res = await API.post('/v1/email/send', {
      fullname,
      email,
      message,
    });
    return res.data;
  }

  /**
   * Send MD answer
   * @param {Object} user {userID, username}
   * @param {Object} question {questionID, title}
   * @param {Object} mdUser {mdID, mdname}
   * @param {Object} mdAnswer {answerID, content}
   */
  async sendMdAnswer(
    userID,
    username,
    questionID,
    title,
    mdID,
    mdname,
    answerID,
    content
  ) {
    const res = await API.post('/v1/email/sendMdAnswer', {
      user: {
        userID,
        username,
      },
      question: {
        questionID,
        title,
      },
      mdUser: {
        mdID,
        mdname,
      },
      mdAnswer: {
        answerID,
        content,
      },
    });

    return res.data;
  }

  /**
   * Send Emails to invite
   */
  async invite(emails, subject, content) {
    const res = await API.post(`/v1/email/invite`, {
      emails,
      subject,
      content,
    });

    return res.data;
  }
  async sendEmail({email, content}) {
    console.log(email, content)
    const res = await API.post(`/v1/service/email-service`, {
      email,
      content
    })
    return res.data
  }
}

const instance = new EmailService();

export default instance;
