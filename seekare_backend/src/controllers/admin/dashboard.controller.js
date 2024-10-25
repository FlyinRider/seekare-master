const mongoose = require('mongoose');
const Users = require('../../models/User');
const Questions = require('../../models/Question');
const Wikis = require('../../models/Wiki');
const EnlistedEmail = require('../../models/EnlistedEmail');

const getWeeklyUsers = async () => {
  const now = new Date();
  const day = now.getDay();
  const startDate = new Date();
  startDate.setMonth(now.getMonth() - 4);
  const dayPush = [];
  let endWeekDate = new Date();
  let startWeekDate = new Date();
  startWeekDate.setHours(0);
  startWeekDate.setMinutes(0);
  startWeekDate.setSeconds(0);
  startWeekDate.setMilliseconds(0);
  startWeekDate.setDate(startWeekDate.getDate() - day);

  while (startWeekDate > startDate) {
    dayPush.push({
      start: new Date(startWeekDate),
      end: new Date(endWeekDate),
    });
    endWeekDate = new Date(startWeekDate);
    startWeekDate.setDate(startWeekDate.getDate() - 7);
  }

  return await Promise.all(
    dayPush.map(async ({ start, end }) => {
      const condition = {
        createDate: {
          $gt: start,
          $lte: end,
        },
      };

      const count = await Users.find(condition).count();
      return {
        start,
        end,
        count,
      };
    })
  );
};
const getWeeklyEmails = async () => {
  const now = new Date();
  const day = now.getDay();
  const startDate = new Date();
  startDate.setMonth(now.getMonth() - 4);
  const dayPush = [];
  let endWeekDate = new Date();
  let startWeekDate = new Date();
  startWeekDate.setHours(0);
  startWeekDate.setMinutes(0);
  startWeekDate.setSeconds(0);
  startWeekDate.setMilliseconds(0);
  startWeekDate.setDate(startWeekDate.getDate() - day);

  while (startWeekDate > startDate) {
    dayPush.push({
      start: new Date(startWeekDate),
      end: new Date(endWeekDate),
    });
    endWeekDate = new Date(startWeekDate);
    startWeekDate.setDate(startWeekDate.getDate() - 7);
  }

  return await Promise.all(
    dayPush.map(async ({ start, end }) => {
      const condition = {
        date: {
          $gt: start,
          $lte: end,
        },
      };

      const count = await EnlistedEmail.find(condition).count();
      return {
        start,
        end,
        count,
      };
    })
  );
};

exports.getWeeklyUserReports = async (req, res) => {
  const { type } = req.body;

  const analysis = await getWeeklyUsers();
  res.status(200).json({
    analysis,
  });
};

exports.getTotalDataReports = async (req, res) => {
  const [users, quizs, wikis, emails] = await Promise.all([
    await Users.find().count(),
    await Questions.find().count(),
    await Wikis.find().count(),
    await EnlistedEmail.find().count(),
  ]);
  res.status(200).json({
    users,
    quizs,
    wikis,
    emails,
  });
};

exports.getSendWeeklyEmails = async (req, res) => {
  const { type } = req.body;

  const emails = await getWeeklyEmails();
  res.status(200).json(emails);
};
