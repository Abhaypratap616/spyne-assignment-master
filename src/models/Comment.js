const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    discussionId: {
      type: Schema.Types.ObjectId,
      ref: "Discussion",
    },
    text: {
      type: String,
      required: [true, "Text is required"],
      trim: true,
    },
    replyOnComment:[ {
      type: Schema.Types.ObjectId,
      ref: "Reply_On_Comment",
    }],
    likeOnComment:[{
      type: Schema.Types.ObjectId,
      ref: "Like_On_Comment",
    }]
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
