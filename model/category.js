const mongoose = require("mongoose");

const categories = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  id: { type: String },
  category: { type: String },
  cateimg: { type: String },
  subCategory: { type: Array },
});

module.exports = mongoose.model("Categories", categories);
