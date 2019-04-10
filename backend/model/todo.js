const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const modelSchema = new Schema(
  {
    title: String,
    todo: String,
    date:Date
  });

module.exports = mongoose.model("Todo", modelSchema);
