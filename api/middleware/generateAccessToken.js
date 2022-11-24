require('dotenv').config();
const jwt = require('jsonwebtoken');


const tokenSecret = process.env.ACCESS_TOKEN_SECRET;


const generateAccessToken = (email) => {
	console.log('MY SECRET TOKEN : ',tokenSecret );

	
	return jwt.sign({email:email}, tokenSecret, { expiresIn: '3600s' });
}

module.exports = generateAccessToken;


