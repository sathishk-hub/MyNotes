import { verify } from "jsonwebtoken";
import constants from "../utils/constants.js";
import * as helper from "../utils/helper.js";

const config = process.env;

const auth = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers.access_token;

  if (!token) {
    return res.status(constants.FORBIDDEN).send(
      helper.getStandardResponse({
        status: false,
        message: constants.TOKEN_IS_REQUIRED_FOR_AUTHENTICATION,
      })
    );
  }
  try {
    const decoded = verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(constants.UNAUTHORIZED).send(
      helper.getStandardResponse({
        status: false,
        message: constants.INVALID_TOKEN,
      })
    );
  }
  return next();
};

export default auth;
