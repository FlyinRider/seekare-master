const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const searchQuerySchema = new Schema({
  queryString: {
    type: String,
    required: true,
  },
});

searchQuerySchema.static("deleteById", (id, cb) => {
  this.remove({ _id: ObjectId(id) }, () => {
    const queries = this.find();
    cb(queries);
  });
});

module.exports = mongoose.model("SearchQuery", searchQuerySchema);
