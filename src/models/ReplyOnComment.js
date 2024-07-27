const mongoose = require("mongoose");
const { Schema } = mongoose;

const replyOnCommentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    commentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    text: {
      type: String,
      required: [true, "Text is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

const ReplyOnComment = mongoose.model("Reply_On_Comment", replyOnCommentSchema);

module.exports = ReplyOnComment;
