const mongoose = require("mongoose");
const { Schema } = mongoose;

const discussionSchema = new Schema(
  {
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    text: {
      type: String,
      required: [true, "Text is required"],
      minlength: [30, "Text should should have at least 30 characters"],
      trim: true,
    },
    hashTags: [
      {
        type: String,
        trim: true,
      },
    ],
    image: { type: String, required: [true, "Thumbnail is required"] }, // thumbnail
    otherImages: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    likeBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "Like",
      },
    ],
    commmentedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true } // We wiil get createdOn by timestemp
);

const Discussion = mongoose.model("Discussion", discussionSchema);

module.exports = Discussion;
