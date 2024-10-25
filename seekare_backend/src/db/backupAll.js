// Backup DB
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const { dbUrl, dbBackupDir } = require('../misc/dbconfig');

module.exports = () => {
  const client = new MongoClient(dbUrl, {
    useUnifiedTopology: true,
  });

  client
    .connect()
    .then((client) => client.db('mdhelp1').listCollections().toArray())
    .then(async (collections) => {
      const dbCollections = [];
      for (const collection of collections) {
        const documents = await client
          .db('mdhelp1')
          .collection(collection.name)
          .find()
          .toArray();

        dbCollections.push({ name: collection.name, documents });
      }

      if (!fs.existsSync(dbBackupDir)) {
        fs.mkdirSync(dbBackupDir);
      }

      const stream = fs.createWriteStream(
        `${dbBackupDir}/backup_${Date.now()}.json`,
        {
          flags: 'a',
        }
      );

      stream.write(JSON.stringify(dbCollections));

      stream.on('error', function (err) {
        console.log(err);
        process.exit(1);
      });
    })
    .catch((error) => console.log(error))
    .finally(() => client.close());
};
