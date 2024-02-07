const logger = require("./logger");
const jwt = require("jsonwebtoken");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    console.log("hola estamos acá");
    return response.status(400).json({ error: error.message });
  } else if (error.name === "MongoError") {
    console.log("hola estamos acá2");
    return response.status(400).json({ error: "User data must be unique." });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: error.message });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({
      error: "token expired"
    });
  }

  next();
};

const getTokenFrom = (request, response, next) => {
  console.log("HOAL,AAAAAAAAAAAA");
  const authorization = request.get("authorization");
  console.log(authorization);
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", "");
  } else {
    request.token = null;
  }
  next();
};

const extractUser = (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    request.user = decodedToken;
    next();
  } catch (error) {
    logger.error(error.message);
    next();
  }
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  getTokenFrom,
  extractUser
};
