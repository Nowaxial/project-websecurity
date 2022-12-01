const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const db = require('./database');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const {authorization, adminAuthorization} = require ('./middleware/auth');
require('dotenv').config();

const app = express();

const port = process.env.PORT;
const tokenSecret = process.env.ACCESS_TOKEN_SECRET;

const whitelist = ['http://localhost:3000'];

app.use(cookieParser());
app.use(cors({ credentials: true, origin: whitelist, optionSuccessStatus: 200, }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Uncomment to init defaultRoles
//db.initRoles();


app.post('/api/login', async (req, res) => {
	try {
		
		const email = req.body.email;
		let password = req.body.password;
		
		const user = await db.getUserByEmail(email);
		if (!user) {
			return res.status(400).json({ message: 'Invalid email or password' });
		}
		

		if (!(await bcrypt.compare(password, user.password))) {
			return res.status(400).json({ message: 'Invalid email or password' });
		}

		const roles = await db.getRolesForUser(user.userId);
		
		const token = jwt.sign(
		  { email: email, id: user.userId, roles: roles.map((val) => val.rolename) },
		  tokenSecret,
		  {
			audience: 'http://localhost:3000',
			expiresIn: '10m',
			issuer: user.username,
		  }
		);
		return res
		  .cookie('token', token, {
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
		  })
		  .status(201)
		  .json({
			userId: user.userId,
			email: email,
			username: user.username,
			roles: roles.map((val) => val.rolename),
		  });

	} catch (err) {
		console.log('Error trying login: ', err);
		return res.sendStatus(400);
	}
});



app.get('/api/users',adminAuthorization,async (req, res) => {
	try {
		const users = await db.getUsersAdmin();
		return res.status(200).json(users);
	} catch (err) {
		console.log('Error getting users');
		return res.sendStatus(400);
	}
}); 





app.get('/api/whoIsIt', authorization, (req, res) => {
    console.log('----/API/LOGGEDIN-----');
    const token = req.cookies.token;
	const tokenObj = {loggedInWithToken: false};

	try {

		const data =jwt.verify(token, tokenSecret);

		console.log(data);

		if (data) {
			tokenObj.loggedInWithToken = true;
			tokenObj.data = data;
		}

		
	} catch (error) {
		tokenObj.errorMessage = 'Token expired';
	}

	res.json(tokenObj);

});



app.post('/api/register', async (req, res) => {
	try {
	  
	  const username = req.body.username;
	  const email = req.body.email;
	  let password = req.body.password;
	  // 1. Check for empty data
	  if (!username || !email || !password) {
		return res.sendStatus(400);
	  }
	  
	  const user = await db.getUserByEmail(email);
	  if (user) {
		return res.status(409).json({ message: 'User already exists' });
	  }
  
	  const hashedPassword = await bcrypt.hash(password, 10);
	  const userId = await db.createUser(username, email, hashedPassword);
	  // // 4. Assign ROLE to USER
	  await db.assignRoleToUser(userId, 1000);
	  //await db.assignRoleToUser(userId, 2000);
	  
	} catch (err) {
	  console.log('Error in register route: ', err);
	  res.sendStatus(400);
	}
  });

  
  

app.get('/api/logout', (req, res) => {
	res.clearCookie("token").status(200).json({ message: "Logged out" });	
	res.end();
});



app.listen(port, (err) => {
	if (err) {
		console.log(`Error listening on port: ${port}`, err);
	} else {
		console.log(`Succesfully listening on port: ${port}!`);
	}
});
