import { useRouter } from 'next/router';
import {
	useState,
	useEffect,
	ReactElement,
	JSXElementConstructor,
	ReactFragment,
	Key,
	ReactPortal,
} from 'react';
import client from '../lib/Client';
import AdminProfil from './AdminProfil';

const Dashboard = () => {
	const [users, setUsers] = useState([]);
	const [loggedIn, setLoggedIn] = useState<any>([]);

	const router = useRouter();

	useEffect(() => {
		const whoIsIt = async () => {
			const response = await client.get('/whoIsIt');
			const data = await response.data;

			try {
				/* if (!data){
					router.push('/');
				}
				 */
				if (data.data.roles.includes('NORMAL_USER')) {
					router.push('/profil');
				}

				if (response.status == 200) {
					setLoggedIn([data.data]);
					console.log('Fetchad data |', data);
				}
			} catch (error) {
				console.error(error);
			}
		};
		whoIsIt();
	}, []);

	useEffect(() => {
		const fetchUsers = async () => {
			const res = await client.get('users');

			try {
				if (res.status == 200) {
					const users = await res.data;
					setUsers(users);
					console.log('<--------------------------------->');
					console.log('Här fetchar vi alla users i databasen!', users);
					console.log('<--------------------------------->');
				}
			} catch (error) {}
		};
		fetchUsers();
	}, []);

	const listUsers = users?.map((user) => {
		return (
			<tr key={user['userId']}>
				<td>{user['userId']}</td>
				<td>{user['username']}</td>
				<td>{user['email']}</td>
			</tr>
		);
	});

	const logout = async () => {
		const response = await client.get('logout');
		const data = await response.data;
		console.log(data);
		router.push('/');
	};

	const profilInfo = loggedIn?.map(
		(
			userz: {
				[x: string]:
					| string
					| number
					| boolean
					| ReactElement<any, string | JSXElementConstructor<any>>
					| ReactFragment
					| ReactPortal
					| null
					| undefined;
			},
			index: Key | null | undefined
		) => {
			return (
				<>
					<div className="wrapperWelcome">
						<h1> Välkommen {userz['iss']} !</h1>
						<span>
							<h2>Här är dina uppgifter om dig!!</h2>
						</span>
						<div>
							<table>
								<tbody>
									<tr>
										<th>
											<p>UserId</p>
										</th>
										<th>
											<p>Användarnamn</p>
										</th>
										<th>
											<p>Email</p>
										</th>
										<th>
											<p>Roll</p>
										</th>
									</tr>
									<tr key={index}>
										<td>{userz['id']}</td>
										<td>{userz['iss']}</td>
										<td>{userz['email']}</td>
										<td>{userz['roles']}</td>
									</tr>
								</tbody>
							</table>
							<br></br>
							<button className="btnWelcome" onClick={logout}>
								Logout
							</button>
						</div>
					</div>
				</>
			);
		}
	);

	return (
		<div>
			{profilInfo}
			<div className="wrapperWelcome">
				<h1> Användare i databasen!</h1>
				<div>
					<table>
						<tbody>
							<tr>
								<th>
									<p>UserId</p>
								</th>
								<th>
									<p>Användarnamn</p>
								</th>
								<th>
									<p>Email</p>
								</th>
							</tr>
							{listUsers}
						</tbody>
					</table>
					<br></br>
					<br></br>
					<button className="btnWelcome" onClick={logout}>
						Logout
					</button>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
