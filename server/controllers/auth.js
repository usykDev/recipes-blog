import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// register user
export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Error creating user. Required fields are missing",
      });
    } else if (/\s/.test(username)) {
      return res.json({
        message: "Error creating user. Username should not contain spaces",
      });
    } else if (username.length < 3) {
      return res.json({
        message:
          "Error creating user. Username must be at least 3 characters long",
      });
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password) ||
      password.length < 8
    ) {
      return res.json({
        message: "Error creating user. Password incorrect",
      });
    }

    const isUsed = await User.findOne({ username });

    if (isUsed) {
      return res.json({
        message: "This username already exists",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hash,
    });

    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    await newUser.save();

    res.json({
      newUser,
      token,
      message: "Registration completed successfully",
    });
  } catch (err) {
    res.json({
      message: "Error creating user",
    });
  }
};

// login user
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.json({
        message: "This username doesn't exist",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.json({
        message: "Wrong password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.json({
      token,
      user,
      message: "You are logged in",
    });
  } catch (err) {
    res.json({
      message: "Authorization error",
    });
  }
};

// get me  // works always after page refreshing
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.json({
        message: "This username doesn't exist",
      });
    }

    // creating new token
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.json({
      user,
      token,
    });
  } catch (err) {
    res.json({
      message: "No access",
    });
  }
};
