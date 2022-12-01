import { useRouter } from 'next/router';
import {
	useState,
	useEffect,
	JSXElementConstructor,
	Key,
	ReactElement,
	ReactFragment,
	ReactPortal,
} from 'react';
import client from '../lib/Client';

const AdminProfil = () => {
	const [loggedIn, setLoggedIn] = useState<any>([]);
	const [users, setUsers] = useState([]);

	const router = useRouter();

	useEffect(() => {
		const whoIsIt = async () => {
			const response = await client.get('/whoIsIt');
			const data = await response.data;

			try {
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
						<span>
							<h1> Välkommen {userz['iss']} !</h1>
						</span>
						<span>Här kommer alla dina uppgifter!</span>
						<button className="btnWelcome" onClick={logout}>
							Logout
						</button>
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
						</div>
					</div>
				</>
			);
		}
	);

	return <div>{profilInfo}</div>;
};

export default AdminProfil;
