import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import transporter from "../utils/mailTransport.js";
import User from "../models/user.model.js";
import auth from "../middlewares/auth.middleware.js";
import logger from "../utils/logger.js"
const router = express.Router();

export async function signUp(req, res) {
  try {
    let {
      username,
      email,
      password,
      passwordCheck,
      firstName,
      lastName,
      address,
      age,
      phone,
      avatar,
      role,
    } = req.body;
    // validate
    if (!username || !email || !password || !passwordCheck)
    {
      logger.warn("Not all fields have been entered.");
      return res
        .status(400)
        .json({ message: "Not all fields have been entered." });}
    if (password.length < 5)
     { 
       logger.warn("The password needs to be at least 5 characters long.");
       return res
        .status(400)
        .json({
          message: "The password needs to be at least 5 characters long.",
        });}
    if (password !== passwordCheck)
      {
        logger.warn("Enter the same password twice for verification.");
        return res
        .status(400)
        .json({ message: "Enter the same password twice for verification." });}

    const existingUser = await User.findOne({ username: username });
    if (existingUser)
    {
      logger.warn("An account already exists with this username")
        return res
        .status(400)
        .json({ message: "An account with this username already exists." });}

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: passwordHash,
      firstName,
      lastName,
      address,
      age,
      phone,
      avatar,
      role,
    });
    const savedUser = await newUser.save();
    logger.info("Se registro un nuevo usuario");
    res.json(savedUser);
    try {
      const mailOptions = {
        from: "facundosarabia15@gmail.com",
        to: "facundosarabia15@gmail.com",
        subject: "New Register",
        html: `
        <h1>User information</h1>
        <span>Username: ${username}</span>
        <span>Email: ${email}</span>
        <span>firstName: ${firstName}</span>
        <span>lastName: ${lastName}</span>
        <span>Edad: ${age}</span>
        <span>Direccion: ${address}</span>
        <span>Telefono: ${phone}</span>
        <span>Rol: ${role}</span>
        `,
      };
      const response = await transporter.sendMail(mailOptions);
      logger.info("Email sent to registred user");
    } catch (error) {
      logger.fatal("Error, fail to send email to user");
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
     logger.fatal("Error to register");
  }
}

export async function signIn(req, res) {
  try {
    const { email, password } = req.body;

    // validate
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Not all fields have been entered." });

    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ message: "No account with this email has been registered." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRES_IN,
    });
    res.json({
      token,
      user: {
        id: user._id,
        name: user.firstName,
        apellido: user.lastName,
        email: user.email,
        role: user.role,
        funds: user.funds,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateUser(req, res) {
  const id = req.params.id;
  const body = req.body;
  const salt = await bcrypt.genSalt();
  if (body.password) {
    await bcrypt.hash(body.password, salt);
  }
  try {
    const userUpdated = await User.findByIdAndUpdate(id, body, {
      new: true,
      useFindAndModify: false,
    }).select("-password");

    res.json(userUpdated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function deleteUser(req, res) {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function tokenIsValid(req, res) {
  try {
    const token = req.header("Authorization");
    if (!token) return res.json(false);
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log(verified)
    if (!verified) return res.json(false);
    const user = await User.findById(verified.id);
    if (!user) return res.json(false);
    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getUsers(req, res) {
  await User.find({})
    .then((users) => {
      if (!users.length) {
        return res
          .status(404)
          .json({ success: false, error: `Users not found` });
      }
      return res.status(200).json({ success: true, data: users });
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
}

export async function getUserById(req, res) {
  await User.findById(req.params.id)
    .then((user) => {
      res.json({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        age: user.age,
        phone: user.phone,
        avatar: user.avatar,
        id: user._id,
        role: user.role,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json({ success: false, error: err });
    });
}
