const mongoose = require("mongoose");
const { Schema } = mongoose;

const likeOnCommentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    commentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },

  },
  { timestamps: true }
);

const LikeOnComment = mongoose.model("Like_On_Comment", likeOnCommentSchema);

module.exports = LikeOnComment;
