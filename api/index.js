const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const db = require('./database');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const {authorization, adminAuthorization, superAdminAuthorization, allTokensCheck, tokenCheck} = require ('./middleware/auth')
require('dotenv').config();

const app = express();

const port = process.env.PORT;
const tokenSecret = process.env.ACCESS_TOKEN_SECRET;

const whitelist = ['http://localhost:3000'];

app.use(cookieParser());
app.use(cors({ credentials: true, origin: whitelist }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Uncomment to init defaultRoles
//db.initRoles();


app.post('/api/login', async (req, res) => {
	try {
		/* console.log('LOGIN BODY:', req.body); */
		const email = req.body.email;
		let password = req.body.password;
		// 1. Check if user already exists
		const user = await db.getUserByEmail(email);
		if (!user) {
			return res.status(400).json({ message: 'Invalid email or password' });
		}
		// 2. Compare password
		if (!(await bcrypt.compare(password, user.password))) {
			return res.status(400).json({ message: 'Invalid email or password' });
		}

		// 5. Get ROLES for USER
		const roles = await db.getRolesForUser(user.userId);
		console.log(roles);
		// 6. Create a session
		// 7. Create refresh & accessTokens
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
			token: token,
		  });

	} catch (err) {
		console.log('Error trying login: ', err);
		return res.sendStatus(400);
	}
});

app.get('/api/users',adminAuthorization,async (req, res) => {
	try {
		const users = await db.getUsers();
		return res.status(200).json(users);
	} catch (err) {
		console.log('Error getting users');
		return res.sendStatus(400);
	}
});

app.get('/api/user/:id', async (req, res) => {
	try {
		const id = req.params.id;

		if (isNaN(Number(id))) {
			return res.status(400).json({ message: 'ID need to be integer' });
		}

		const user = await db.getUserById(id);

		return res.status(200).json(user);
	} catch (err) {
		console.log('Error in getting users: ', err);
		return res.sendStatus(400);
	}
});

app.post('/api/register', async (req, res) => {
	try {
	  // 0. Get data from body
	  const username = req.body.username;
	  const email = req.body.email;
	  let password = req.body.password;
	  // 1. Check for empty data
	  if (!username || !email || !password) {
		return res.sendStatus(400);
	  }
	  // 2. Check if user already exists in DB
	  const user = await db.getUserByEmail(email);
	  if (user) {
		return res.status(409).json({ message: 'User already exists' });
	  }
  
	  // 3. Hash password & Register USER
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
	return res
		.clearCookie('token')
		.status(200)
		.json({ message: 'Successfully logged out 😏 🍀' });
});

app.get("/api/whosLoggedIn", async (req, res) => {

	let token = req.cookies.token;
  console.log("Här är token från LoggedIn:" , [token]);
	});
  



app.listen(port, (err) => {
	if (err) {
		console.log(`Error listening on port: ${port}`, err);
	} else {
		console.log(`Succesfully listening on port: ${port}!`);
	}
});
