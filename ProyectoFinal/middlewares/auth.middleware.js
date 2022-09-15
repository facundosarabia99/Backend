import jwt from "jsonwebtoken"


const auth = (req, res, next) => {
  try {
    console.log("Auth")
    const token = req.header("Authorization");
    if (!token)
      return res
        .status(401)
        .json({ msg: "No authentication token, authorization denied." });

    const splitedToken = token.split(' ')
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