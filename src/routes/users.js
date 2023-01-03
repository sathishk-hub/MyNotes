import { Router } from "express";
import jwt from "jsonwebtoken";

import User from "../db/user.js";
import constants from "../utils/constants.js";
import * as helper from "../utils/helper.js";
import auth from "../middleware/auth.js";

const router = Router();

/* register user */
router.post("/register", async (req, res) => {
  try {
    const { first_name, last_name = "", email } = req.body;

    if (!(first_name && email)) {
      return res.status(constants.BAD_REQUEST).json(
        helper.getStandardResponse({
          status: false,
          message: constants.ENTER_ALL_REQUIRED_INPUTS,
        })
      );
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(constants.CONFLICT).json(
        helper.getStandardResponse({
          status: false,
          message: constants.USER_ALREADY_EXIST,
        })
      );
    }

    const user = await User.create({
      first_name,
      last_name,
      email: email && email.toLowerCase(),
    });

    const access_token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "10m",
      }
    );

    const refresh_token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2 days",
      }
    );
    user.access_token = access_token;
    user.refresh_token = refresh_token;

    return res.status(constants.CREATED_SUCCESS).send(
      helper.getStandardResponse({
        status: true,
        message: constants.USER_CREATED_SUCCESSFULLY,
        data: user,
      })
    );
  } catch (error) {
    console.log(error);
  }
  return true;
});

/* login user */
router.post("/login", async (req, res) => {
  try {
    const { first_name, email } = req.body;

    if (!(email && first_name)) {
      return res.status(constants.BAD_REQUEST).send(
        helper.getStandardResponse({
          status: false,
          message: constants.ENTER_ALL_REQUIRED_INPUTS,
        })
      );
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user) {
      // Create token
      const access_token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "10m",
        }
      );

      const refresh_token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2 days",
        }
      );
      user.access_token = access_token;
      user.refresh_token = refresh_token;

      return res.status(constants.CREATED_SUCCESS).send(
        helper.getStandardResponse({
          status: true,
          message: constants.USER_CREATED_SUCCESSFULLY,
          data: user,
        })
      );
    }

    return res.status(constants.BAD_REQUEST).send(
      helper.getStandardResponse({
        status: false,
        message: constants.INVALID_CREDENTIALS,
      })
    );
  } catch (error) {
    console.log(error);
  }
  return true;
});

/* login user */
router.post("/home", auth, async (req, res) => {
  try {
    return res.status(constants.CREATED_SUCCESS).send(
      helper.getStandardResponse({
        status: true,
        message: constants.USER_CREATED_SUCCESSFULLY,
      })
    );
  } catch (error) {
    console.log(error);
  }
  return true;
});

export default router;
