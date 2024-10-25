const fs = require('fs');
const _ = require('lodash');
const exec = require('child_process').exec;
const dotenv = require('dotenv');
dotenv.config();

const dbOptions = {
  user:
    process.env.NODE_ENV === 'development' ? 'root' : process.env.MONGODB_USER,
  pass:
    process.env.NODE_ENV === 'development'
      ? 'user'
      : process.env.MONGODB_PASSWORD,
  host:
    process.env.NODE_ENV === 'development'
      ? 'localhost'
      : process.env.MONGODB_HOST,
  port: 27017,
  database: process.env.MONGODB_DBNAME,
  autoBackup: true,
  removeOldBackup: true,
  keepLastDaysBackup: 2,
  autoBackupPath: './db/backup'
};

/**
 * stringToDate
 * Return Date Object from Date String
 *
 * @param {string} dateString
 */
const stringToDate = function (dateString) {
  return new Date(dateString);
};

/**
 * empty
 * Check if variable is empty or not
 *
 * @param {Object} mixedVar
 */
const empty = function (mixedVar) {
  var undef, key, i, len;
  var emptyValues = [undef, null, false, 0, '', '0'];
  for (i = 0, len = emptyValues.length; i < len; i++) {
    if (mixedVar === emptyValues[i]) {
      return true;
    }
  }
  if (typeof mixedVar === 'object') {
    for (key in mixedVar) {
      return false;
    }
    return true;
  }
  return false;
};

// Auto backup script
exports.dbAutoBackUp = function () {
  // check for auto backup is enabled or disabled
  if (dbOptions.autoBackup == true) {
    const date = new Date();
    let beforeDate, oldBackupDir, oldBackupPath;
    currentDate = stringToDate(date); // Current date

    const newBackupDir =
      currentDate.getFullYear() +
      '-' +
      (currentDate.getMonth() + 1) +
      '-' +
      currentDate.getDate();
    const newBackupPath =
      dbOptions.autoBackupPath + 'mongodump-' + newBackupDir; // New backup path for current backup process
    // check for remove old backup after keeping # of days given in configuration
    if (dbOptions.removeOldBackup == true) {
      beforeDate = _.clone(currentDate);
      beforeDate.setDate(beforeDate.getDate() - dbOptions.keepLastDaysBackup); // Substract number of days to keep backup and remove old backup
      oldBackupDir =
        beforeDate.getFullYear() +
        '-' +
        (beforeDate.getMonth() + 1) +
        '-' +
        beforeDate.getDate();
      oldBackupPath = dbOptions.autoBackupPath + 'mongodump-' + oldBackupDir; // old backup(after keeping # of days)
    }

    const cmd =
      'mongodump --host ' +
      dbOptions.host +
      ' --port ' +
      dbOptions.port +
      ' --db ' +
      dbOptions.database +
      ' --username ' +
      dbOptions.user +
      ' --password ' +
      dbOptions.pass +
      ' --out ' +
      newBackupPath; // Command for mongodb dump process
    exec(cmd, function (error, stdout, stderr) {
      if (error) {
        console.error(error);
      }
      if (empty(error)) {
        // check for remove old backup after keeping # of days given in configuration
        if (dbOptions.removeOldBackup == true) {
          if (fs.existsSync(oldBackupPath)) {
            exec('rm -rf ' + oldBackupPath, function (err) {});
          }
        }
      }
    });
  }
};
