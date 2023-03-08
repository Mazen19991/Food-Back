const Admins = require("../../models/admins");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const bcrypt = require("bcrypt");

const schema = joi.object({
  fullName: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  phoneNumber: joi.string().required(),
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
    if (isAdminExist) {
      console.log("Admin Exists");
      return res.status(400).json({
        message: "Admin Exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(req.body.password, salt);
    const admin = await Admins.create({
      ...req.body,
      password: newPassword,
    });
    const payload = {
      user: {
        id: admin._id,
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
