const mongoose = require("mongoose");
const { Schema } = mongoose;

const goalSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
    progress: { type: Number, default: 0, min: 0, max: 100 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Goal", goalSchema);
