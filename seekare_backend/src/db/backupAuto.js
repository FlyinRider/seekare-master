const CronJob = require("cron").CronJob;
const backupWithJSON = require("./backupAll");
const { dbAutoBackUp: backupWithDump } = require("./backup");

const job = new CronJob(
  "59 * * * *",
  function () {
    // backupWithDump();
    backupWithJSON();
  },
  null,
  true,
  "America/Los_Angeles"
);

job.start();
