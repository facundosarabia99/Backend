import jwt from "jsonwebtoken"
import logger from "../utils/logger.js"


const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const splitedToken = token.split(' ')
    console.log(splitedToken[1]);
    if (!token)
      return res
        .status(401)
        .json({ msg: "No authentication token, authorization denied." });

    const verified = jwt.verify(splitedToken[1], process.env.JWT_SECRET);
    if (!verified)
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied." });

    req.user = verified.id;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default auth;