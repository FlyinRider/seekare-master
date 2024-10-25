const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tagSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  slug: {
    type: String,
    required: false,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Tag",
    require: false,
  },
  wiki: {
    type: Schema.Types.ObjectId,
    require: false,
  },
});

tagSchema.static("deleteById", (id, cb) => {
  this.remove({ _id: ObjectId(id) }, () => {
    const tags = this.find();
    cb(tags);
  });
});

tagSchema.static("getCategoryTags", async () => {
  return await this.find({
    category: { $ne: null },
  });
});

tagSchema.methods.getCategoryTag = async () => {
  const categoryTag = mongoose.model("Tag").findById(this.id);
  return categoryTag;
};

module.exports = mongoose.model("Tag", tagSchema);
