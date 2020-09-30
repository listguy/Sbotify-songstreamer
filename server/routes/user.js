const router = require("express").Router();
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { loginValidation } = require("../validation");

router.post("/register", async (req, res) => {
  //All validations are done by sequelize.

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  //overrun old password
  req.body.password = hashPassword;
  //Create a new user. If one of the validation fails, the respond will be 400
  //and a proper error message will be sent
  try {
    const newUser = await User.create(req.body, {
      fields: ["username", "email", "password"],
    });

    res.json({ msg: `Welcome to Sbotify ${newUser.toJSON().username}!` });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/login", async (req, res) => {
  //Validate the data
  console.log(req.body);
  const { error } = loginValidation(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, msg: error.details[0].message });
  //Checking if username exists in DB
  let candidUser = await User.findOne({
    where: {
      username: req.body.username,
    },
  });
  if (!candidUser)
    return res
      .status(400)
      .json({ success: false, msg: "Wrong username or password" });

  //If user exists--
  //Checking if given password matches the hashed one we got from the DB
  //Extracting only the json from user object
  candidUser = candidUser.toJSON();
  const passwordMatch = await bcrypt.compare(
    req.body.password,
    candidUser.password
  );
  if (!passwordMatch)
    return res
      .status(400)
      .json({ success: false, msg: "Wrong username or password" });

  //Create and assign token
  const token = jwt.sign(
    {
      id: candidUser.id,
    },
    process.env.TOKEN_SECRET, //Token secret
    { expiresIn: "7d" }
  );
  res.json({ success: true, token }); //Sending the token in the headers
});
module.exports = router;
