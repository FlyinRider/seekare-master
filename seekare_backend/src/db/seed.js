/**
 * Seeding
 **/
const async = require("async");
const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const SEED_DATA = require("./seed.json");

const { dbUrl: databaseURL } = require("../misc/dbconfig");

// Role Schema
const roleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: false },
});
// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: "Name is required" },
  email: { type: String, required: "Email is required", unique: true },
  password: { type: String, required: "Your password is required" },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  roleTitle: { type: String, required: "Role is reuided" },
});

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

    // Third function - Seed Role
    (callback) => {
      // BEGIN SEED DATABASE
      const roles = [];
      for (i = 0; i < SEED_DATA.roles.length; i++) {
        const role = new Role({
          title: SEED_DATA.roles[i].title,
          description: SEED_DATA.roles[i].description,
        });

        roles.push(role);
      }

      async.eachSeries(
        roles,
        (role, callback) => {
          role.save(function (err) {
            if (err) {
              console.dir(err);
            }

            console.log("Saving role: ", role.title);

            callback();
          });
        },
        (err) => {
          if (err) console.dir(err);
          console.log("Finished aysnc.each in seeding db");
          callback(null, "SUCCESS - Seed Roles");
        }
      );
    },
    // Fourth Function - Seed Admin User
    (callback) => {
      // BEGIN SEED DATABASE
      const users = [];
      for (i = 0; i < SEED_DATA.users.length; i++) {
        const user = new User({
          name: SEED_DATA.users[i].name,
          email: SEED_DATA.users[i].email,
          password: SEED_DATA.users[i].password,
          roleTitle: SEED_DATA.users[i].roleTitle,
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

            console.log("Saving user: ", user.name);

            cb();
          });
        },
        (err) => {
          if (err) console.dir(err);
          console.log("Finished aysnc.each in seeding users db");
          callback(null, "SUCCESS - Seed Users");
        }
      );
    },
  ],
  (err, results) => {
    console.log("\n\n--- Database seed progam completed ---");

    if (err) {
      console.log("Errors = ");
      console.dir(errors);
    } else {
      console.log("Results = ");
      console.log(results);
    }

    console.log("\n\n--- Exiting database seed progam ---");
    // Exit the process to get back to terrminal console
    process.exit(0);
  }
);
