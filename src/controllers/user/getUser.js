const User = require("../../models/User");
const { responseTemplate, responseMessage } = require("../../utils/response");

const getUserByName = async (req, res) => {
  try {
    const { name } = req.params;
    const getUser = await User.findOne({
      name: { $regex: name, $options: "i" },
    });
    if (!getUser) {
      return res
        .status(404)
        .json(await responseTemplate(false, "User not found", null));
    }

    return res
      .status(200)
      .json(await responseTemplate(true, "User successfully fetched", getUser));
  } catch (err) {
    console.error(`error : ${err}`);
    return res
      .status(500)
      .json(
        await responseTemplate(false, responseMessage.serverError, null, err)
      );
  }
};

const getAllUser = async (req, res) => {
  try {
    const allUser = await User.find();

    if (!allUser) {
      return res
        .status(404)
        .json(await responseTemplate(false, "Users not found", null));
    }

    return res
      .status(200)
      .json(
        await responseTemplate(true, "Users successfully fetched", allUser)
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

module.exports = { getUserByName, getAllUser };
