// const fs = require('fs');
// const User = require('../models/User');
const dotenv = require('dotenv');
dotenv.config();

const async = require("async");
const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const FAKE_DATA = require("./fakeUser.json");

const { dbUrl: databaseURL } = require("../misc/dbconfig");

// Role Schema
const roleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: false },
});
// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: "Username is required" },
  email: { type: String, required: "Email is required", unique: false },
  password: { type: String, required: "Your password is required" },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  roleTitle: { type: String, required: "Role is required" },
  intro: { type: String },
  payment: {
      payroll: { type: String },
      cardtype: { type: String },
      holder: { type: String },
      paid: { type: Boolean },
  },
  medConcerns: { type: Array },
  searchHistory: { type: Array },
  deactivated:  { type: Boolean },
}, { strict: true });

// userSchema.plugin(require('mongoose-beautiful-unique-validation'));

userSchema.pre("save", async function (next, err) {
  const user = this;

  if (!user.isNew && !user.isModified("password")) {
    return next();
  }
  const userRole = await mongoose
    .model("Role")
    .findOne({ title: user.roleTitle });
  const hashedPassword = await bcrypt.hash(user.password, 12);

  user.password = hashedPassword;
  user.role = userRole._id;
  next();
});

const User = mongoose.model("User", userSchema);
const Role = mongoose.model("Role", roleSchema);

async.series(
  [
    // First function - connect to MongoDB, then drop the database
    (callback) => {
      // Originally, I wanted to use mongoose to drop the database
      // but the code below doesn't drop the database, only clears
      // all documents. Refer to:
      //
      //https://github.com/LearnBoost/mongoose/issues/1654
      /*
        mongoose.connection.on('open', function() { 
        mongoose.connection.db.dropDatabase(function(err) {
            if (err) console.log(err);
    
            mongoose.connection.close(function(err) {
            callback(null, 'Dropped database');
            });
        });
        });
        */
      const client = new MongoClient(databaseURL, {
        useUnifiedTopology: true,
      });

      client.connect().then((client) => {
        // Drop database which is an asynchronous call
        client.db(process.env.MONGODB_DBNAME).dropDatabase((error, result) => {
          console.log("Database Dropped");
          // close database which is another asynchronous call
          callback(null, "SUCCESS - dropped database");
        });
      });
    },

    // Second Function - Mongoose connection
    (callback) => {
      mongoose
        .connect(databaseURL, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          autoIndex: true,
          useCreateIndex: true,
        })
        .then(() => {
          console.log("db connected via mongoose");

          // Execute callback now we have a successful connection to the DB
          // and move on to the third function below in async.series
          callback(null, "SUCCESS - Connected to mongodb");
        })
        .catch((err) => {
          console.log(err);
          process.exit(0);
        });
    },

    // Third Function - Remove Old Fake Users
    (callback) => {
      async.series(
        [
            function (callback) {
              console.log("email: " + process.env.FAKE_USER_EMAIL)
              User.deleteMany({ "email": process.env.FAKE_USER_EMAIL }, callback);
            }
        ],
        function (err) {
          if (err) console.dir(err);
            console.log("Finished aysnc.each in remove fake users db");
            callback(null, "SUCCESS - Remove Old Fake Users");
          }
      );
    },

    // Fourth Function - Create Fake Users
    (callback) => {
      // BEGIN SEED DATABASE
      const users = [];
      for (i = 0; i < FAKE_DATA.users.length; i++) {
        const user = new User({
          username: FAKE_DATA.users[i].username,
          email: FAKE_DATA.users[i].email,
          password: FAKE_DATA.users[i].password,
          roleTitle: FAKE_DATA.users[i].roleTitle,
          intro: FAKE_DATA.users[i].intro,
          payment: FAKE_DATA.users[i].payment,
          medConcerns: FAKE_DATA.users[i].medConcerns,
          searchHistory: FAKE_DATA.users[i].searchHistory,
          deactivated: FAKE_DATA.users[i].deactivated,
        });

        users.push(user);
      }

      console.log(users);

      async.eachSeries(
        users,
        (user, cb) => {
          user.save(function (err) {
            if (err) {
              console.dir(err);
            }

            console.log("Saving user: ", user.username);

            cb();
          });
        },
        (err) => {
          if (err) console.dir(err);
          console.log("Finished aysnc.each in creating fake users db");
          callback(null, "SUCCESS - Create Fake Users");
        }
      );
    },
  ],
  (err, results) => {
    console.log("\n\n--- Database seed fakeUser program completed ---");

    if (err) {
      console.log("Errors = ");
      console.dir(errors);
    } else {
      console.log("Results = ");
      console.log(results);
    }

    console.log("\n\n--- Exiting database seed fakeUser program ---");
    // Exit the process to get back to terrminal console
    process.exit(0);
  }
);

// fs.readFile("fake/fakeUser.json", 'utf8', async function (err, data) {
//     const fakeUsers = JSON.parse(data).users;
//     console.log(fakeUsers);
//     try {
//         await User.insertMany(fakeUsers);
//         console.log('Done!');
//         process.exit();
//     } catch (err) {
//         console.log(err);
//         process.exit();
//     }
// }); 