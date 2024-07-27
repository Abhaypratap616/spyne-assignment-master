const User = require("../models/User");
const bcrypt = require("bcrypt");
const { responseTemplate, responseMessage } = require("../utils/response");
const { JWTEncryptAccess } = require("../middlewares/auth");
const strongPasswords =
    /^(?=.*\d)(?=.*[!@#$%^&*-?])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
  salt = 10;

const registerUser = async (req, res) => {
  try {
    const { name, mobileNo, email } = req.body;
    let { password }= req.body;

    const existingUser = await User.findOne({
      email: email.trim().toLowerCase(),
    });
    if (existingUser)
      return res
        .status(400)
        .json(
          await responseTemplate(
            false,
            responseMessage.alreadyRegistered,
            null,
            null
          )
        );

    if (strongPasswords.test(password)) {
      password = await bcrypt.hash(password, salt);
      const newUser = new User({
        name,
        mobileNo,
        email,
        password,
      });
      const savedUser = await newUser.save();
      //creating access token
      const accessToken = JWTEncryptAccess(savedUser);
      return res
        .status(201)
        .json(
          await responseTemplate(
            true,
            responseMessage.registerSuccess,
            accessToken,
          )
        );
    } else {
      return res
        .status(400)
        .json(
          await responseTemplate(
            false,
            "Password should have minimum 8 characters and include at least one digit,one uppercase letter, one lowercase letter and one special character",
          )
        );
    }
  } catch (err) {
    console.error(`error : ${err}`);
    return res
      .status(400)
      .json(
        await responseTemplate(false, responseMessage.badRequest, null, err)
      );
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUser = await User.findOne({ email: email.trim().toLowerCase() });
    if (!findUser)
      return res
        .status(401)
        .json(
          await responseTemplate(
            false,
            responseMessage.unauthorizedAccess,
          )
        );

    const verifyPassword = await bcrypt.compare(password, findUser.password);
    if (!verifyPassword)
      return res
        .status(401)
        .json(
          await responseTemplate(
            false,
            responseMessage.invalidCredentials,
          )
        );

    //creating access token
    const accessToken = JWTEncryptAccess(findUser);

    return res
      .status(200)
      .json(
        await responseTemplate(
          true,
          responseMessage.loginSuccess,
          accessToken,
        )
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

module.exports = { userLogin, registerUser };
