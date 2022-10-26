const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema(
  {
    username: { type: String, require: true, trim: true, unique: true },
    password: { type: String, require: true, trim: true },
    created: { type: Date, default: Date.now() },
  },
  {
    collection: "users",
  }
);

const model = mongoose.model("User", schema);

module.exports = model;
