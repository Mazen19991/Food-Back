const joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Admins = require("../../models/admins");
const schema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

module.exports = async (req, res) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: "Missing Attributes",
        data: error,
      });
    }
    const isAdminExist = await Admins.findOne({
      email: req.body.email,
    });
    if (!isAdminExist) {
      return res.status(400).json({
        message: "Admin Does Not Exist",
      });
    }
    const comparePassword = await bcrypt.compare(
      req.body.password,
      isAdminExist.password
    );
    if (!comparePassword) {
      return res.status(400).json({
        message: "Wrong Credentials",
      });
    }
    const payload = {
      user: {
        id: isAdminExist._id,
      },
    };
    const encodedToken = await jwt.sign(payload, process.env.ACCESS_TOKEN);
    return res.status(200).json({
      message: "Success",
      data: encodedToken,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
