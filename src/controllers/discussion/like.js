const Discussion = require("../../models/Discussion");
const Like = require("../../models/Like");
const LikeOnComment = require("../../models/LikeOnComment");
const Comment = require("../../models/Comment");

const { responseTemplate, responseMessage } = require("../../utils/response");

const likeOnDiscusion = async (req, res) => {
  try {
    const { _id: creatorId } = req.user;
    const { discussionId } = req.params;

    const newLike = await new Like({
      userId: creatorId,
      discussionId,
    }).save();
    const [totalLikes] = await Promise.all([
      Discussion.findById(discussionId, { likeBy: 1 }),
      Discussion.findByIdAndUpdate(discussionId, {
        $addToSet: { likeBy: newLike._id },
      }),
    ]);
    return res.status(200).json(
      await responseTemplate(true, "Successfully liked discussion", {
        totalLikes: totalLikes?.likeBy?.length + 1,
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

const likeOnComment = async (req, res) => {
  try {
    const { _id: creatorId } = req.user;
    const { commentId } = req.params;

    const newLike = await new LikeOnComment({
      userId: creatorId,
      commentId,
    }).save();

    const [totalLikes] = await Promise.all([
      Comment.findById(commentId, { likeOnComment: 1 }),
      Comment.findByIdAndUpdate(commentId, {
        $addToSet: { likeOnComment: newLike._id },
      }),
    ]);
    return res.status(200).json(
      await responseTemplate(true, "Successfully liked the comment", {
        totalLikes: totalLikes?.likeOnComment?.length + 1,
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

module.exports = { likeOnDiscusion, likeOnComment };
