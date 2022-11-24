require('dotenv').config();
const jwt = require('jsonwebtoken');



const authorization = (req, res, next) => {
  const accessToken = req.cookies.token;
  if (!accessToken) {
    return res.status(403).json({ message: 'Ingen cookie här!' });;
  }
  try {
    const data = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    console.log('DATA I ACCESSTOKEN: ', data);
    req.userId = data.id;
    req.userRoles = data.roles;
    req.email = data.email;
    return next();
  } catch (e) {
    console.log('ERROR VERIFY TOKEN: ', e);
    return res.status(403).json({ message: "Hej hej hej!"});;
  }
};

const adminAuthorization = (req, res, next) => {
  const accessToken = req.cookies.token;
  if (!accessToken) {
    return res.sendStatus(401);
  }
  try {
    const data = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    if (!data.roles.includes('ADMIN_USER')) {
      return res.sendStatus(403);
    }
    req.userId = data.id;
    req.userRoles = data.roles;
    req.email = data.email;
    return next();
  } catch (e) {
    return res.sendStatus(401);
  }
};

const superAdminAuthorization = (req, res, next) => {
  const accessToken = req.cookies.token;
  if (!accessToken) {
    return res.sendStatus(401);
  }
  try {
    const data = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    if (!data.roles.includes('SUPER_USER')) {
      return res.sendStatus(403);
    }
    req.userId = data.id;
    req.userRoles = data.roles;
    req.email = data.email;
    return next();
  } catch (e) {
    return res.sendStatus(401);
  }
};

const allTokensCheck = (req, res, next) => {
  const accessToken = req.cookies.token;
  const match = tokenCheck(accessToken, res);
  if (!match){
    res.status(400).json({
      success: false,
      message: "Forbidden!",
    })
    return 
  }
  else if (
    match.role == "NORMAL_USER" ||
    match.role == "ADMIN_USER" ||
    match.role == "SUPER_USER"
  ) {
    req.role = match.role ; 
    next();
  } else {
    return res.status(400).json({
      success: false,
      message: "Auth token is not supplied",
    });
  }
};

const tokenCheck = (token, res) => {
  try{
    if (token) {
      return jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
      );
    } else {
     return null;
    }
  }catch(err){
    res.sendStatus(401)
  } 
};

module.exports = { authorization, adminAuthorization, superAdminAuthorization, allTokensCheck, tokenCheck };