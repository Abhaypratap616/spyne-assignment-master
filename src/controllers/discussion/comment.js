const Discussion = require("../../models/Discussion");
const ReplyOnComment = require("../../models/ReplyOnComment");
const Comment = require("../../models/Comment");

const { responseTemplate, responseMessage } = require("../../utils/response");

const commentOnDiscusion = async (req, res) => {
  try {
    const { _id: creatorId } = req.user;
    const { discussionId } = req.params;
    const { text } = req.body;

    const newComment = await new Comment({
      userId: creatorId,
      discussionId,
      text,
    }).save();

    const [totatComments, newCommentOnDiscussion] = await Promise.all([
      Discussion.findById(discussionId, { commmentedBy: 1 }).populate({
        path: "commmentedBy",
        select: "text",
      }),
      Discussion.findByIdAndUpdate(discussionId, {
        $addToSet: { commmentedBy: newComment._id },
      }),
    ]);

    return res
      .status(200)
      .json(
        await responseTemplate(true, "Successfully commented on discussion", {
          totatComments,
          newCommentOnDiscussion,
        })
      );
  } catch (err) {
    console.error(`error : ${err}`);
    return res
      .status(500)
      .json(
        await responseTemplate(false, responseMessage.serverError, null, err)
      );
  }
};

const replyOnComment = async (req, res) => {
  try {
    const { _id: creatorId } = req.user;
    const { commentId } = req.params;
    const { text } = req.body;

    const newReply = await new ReplyOnComment({
      userId: creatorId,
      commentId,
      text
    }).save();

    const [totatReply, newReplyOnComment ] = await Promise.all([
        Comment.findById(commentId, { replyOnComment: 1 }).populate({
          path: "replyOnComment",
          select: "text",
        }),
        Comment.findByIdAndUpdate(commentId, {
          $addToSet: { replyOnComment: newReply._id },
        }),
      ]);
      return res
      .status(200)
      .json(
        await responseTemplate(true, "Successfully replied on comment", {
          totatReply, newReplyOnComment
        })
      );
  } catch (err) {
    console.error(`error : ${err}`);
    return res
    .status(500)
    .json(
      await responseTemplate(false, responseMessage.serverError, null, err)
    );
  }
};

module.exports = { commentOnDiscusion, replyOnComment };
