const { Schema, model } = require("mongoose");

const storySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxLenght: 30,
      minLenght: 5,
    },
    topic: {
      type: String,
      default: "",
    },
    maxSentences: {
      type: Number,
      required: true,
      min: 3,
      max: 30,
    },
    sentences: {
      type: [String],
      default: [],
    },

    author: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      default: 0,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Story = model("story", storySchema);
module.exports = Story;
