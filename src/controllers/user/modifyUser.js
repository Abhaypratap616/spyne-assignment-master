const User = require("../../models/User");
const { responseTemplate, responseMessage } = require("../../utils/response");
const { JWTEncryptAccess } = require("../../middlewares/auth");


const updateUser = async (req, res) => {
  try {
    const { name, mobileNo, email } = req.body;
    const { _id: id } = req.user;

    const findUser = await User.findOne({
      $or: [{ email: email.trim().toLowerCase() }, { mobileNo }],
    });
    if (findUser)
      return res
        .status(400)
        .json(
          await responseTemplate(
            false,
            "Mobile or email already in use, can't be updated",
          )
        );
    const updatedUser = await User.findByIdAndUpdate(id, {
      $set: {
        name,
        mobileNo,
        email,
      },
    });
    const savedUser = await updatedUser.save();

    //Re-creating access token to update token
    const accessToken = JWTEncryptAccess(savedUser);
    return res
      .status(200)
      .json(
        await responseTemplate(
          true,
          "User details updated Successfully",
          {accessToken, savedUser}
        )
      );
  } catch (err) {
    console.error(`error : ${err}`);
    return res
      .status(400)
      .json(
        await responseTemplate(false, responseMessage.badRequest, null, err)
      );
  }
};

const deletUser = async (req, res) => {
  try {
    const { _id: id } = req.user;

    const findUser = await User.findByIdAndDelete(id);
    if (!findUser)
      return res
        .status(400)
        .json(
          await responseTemplate(
            false,
            "User not exists",
          )
        );

    return res
      .status(200)
      .json(
        await responseTemplate(
          true,
          "User successfully deleted",
        )
      );
  } catch (err) {
    console.error(`error : ${err}`);
    return res
      .status(500)
      .json(
        await responseTemplate(false, responseMessage.badRequest, null, err)
      );
  }
};

module.exports = { updateUser, deletUser };
