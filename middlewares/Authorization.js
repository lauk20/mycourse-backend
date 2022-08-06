const jwt = require("jsonwebtoken")

const getToken = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")){
    return authorization.substring(7)
  }

  return null;
}

const auth = (request, response, next) => {
  const token = getToken(request);

  if (!token) {
    const err = new Error("No Token");
    err.status = 401;

    return next(err);
  }

  const decodedToken = jwt.verify(token, process.env.JWTTOKEN, (err, decoded) => {
    console.log(err)
    if (err && err.name == "TokenExpiredError") {
      return response.status(401).json({error: "expired token"})
    }

    return decoded;
  });
  if (!decodedToken.id) {
    const err = new Error("Invalid Token");
    err.status = 401;

    return next(err);
  }

  request.decodedToken = decodedToken;

  return next();
}

module.exports = auth
