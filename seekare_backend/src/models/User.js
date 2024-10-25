const mongoose = require('mongoose');
const Role = require('./Role');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    photoUrl: {
      type: String
    },
    gender: {
      type: String
    },
    age: {
      type: String
    },
    conditions: {
      type: [String]
    },
    intro: {
      type: String,
      default: ''
    },
    rank: {
      type: String
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: 'Role'
    },
    payment: {
      payroll: {
        type: String,
        default: ''
      },
      cardtype: {
        type: String,
        default: ''
      },
      holder: {
        type: String,
        default: ''
      },
      cardNumber: String,
      paid: { type: Boolean, default: false },
      session: {
        type: String
      },
      subscription: String,
      default: {}
    },
    medConcerns: [
      {
        type: String
      }
    ],
    searchHistory: {
      type: Array,
      default: Array(0)
    },
    pwdChangeToken: {
      type: String
    },
    createDate: {
      type: Date,
      default: Date.now
    },
    deactivated: {
      type: Boolean,
      default: false
    }
  },
  { strict: true }
);

userSchema.plugin(require('mongoose-beautiful-unique-validation'));

// userSchema.methods.addSearchHistory = async function (searchQuery) {
//   const searchHistory = this.searchHistory;
//   const index = searchHistory.findIndex((item) => item === searchQuery);

//   if (index < 0) {
//     if (searchHistory && searchHistory.length > 2) {
//       searchHistory.shift();
//     }
//     searchHistory.push(searchQuery);
//   }

//   return await mongoose.model("User").updateOne(
//     {
//       _id: mongoose.Types.ObjectId(this._id),
//     },
//     {
//       searchHistory,
//     }
//   );
// };

// Mongoose Verion (Users is a Schema)
// userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ username: 1 }, { unique: true, sparse: true });

userSchema.methods.getAnswers = async function () {
  return await mongoose.model('Answer').find({ userID: this._id });
};

userSchema.methods.getQuestions = async function () {
  return await mongoose.model('Question').find({ userID: this._id });
};

userSchema.methods.getRole = async function () {
  return await mongoose.model('Role').findById(this.role);
};

module.exports = mongoose.model('User', userSchema);
