const User = require("../../models/User");
const { responseTemplate, responseMessage } = require("../../utils/response");

const followUser = async (req, res) => {
  try {
    const { _id } = req.user;
    const { userId } = req.params;
    if (userId == _id) {
      return res
        .status(422)
        .json(
          await responseTemplate(false, "You can't follow youself", null, err)
        );
    }

    const alreadyFollowed = await User.findOne({
      $and: [{ _id }, { following: { $in:  userId } }],
    });

    if(alreadyFollowed){
        return res
            .status(422)
            .json(
            await responseTemplate(false, "Already followed", null)
            );
    }
    await Promise.all([
      User.findByIdAndUpdate(
        _id,
        { $addToSet: { following: userId } },
        { new: true }
      ),
      User.findByIdAndUpdate(
        userId,
        { $addToSet: { followers: _id } },
        { new: true }
      ),
    ]);

    return res
      .status(200)
      .json({
        success: true,
        message: "Successfully Follow.",
        isFollowing: true,
      });
  } catch (err) {
    console.error(`error : ${err}`);
    return res
      .status(500)
      .json({
        success: false,
        message: responseMessage.serverError,
        error: err.message,
      });
  }
};

module.exports = { followUser };
