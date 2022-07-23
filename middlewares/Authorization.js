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

  const decodedToken = jwt.verify(token, process.env.JWTTOKEN);
  if (!decodedToken.id) {
    const err = new Error("Invalid Token");
    err.status = 401;

    return next(err);
  }

  request.decodedToken = decodedToken;
  return next();
}

module.exports = auth
