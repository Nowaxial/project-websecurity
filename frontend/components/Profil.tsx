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

const Profil = () => {
	const [loggedIn, setLoggedIn] = useState<any>([]);
	const router = useRouter();

	useEffect(() => {
		const whoIsIt = async () => {
			const response = await client.get('/whoIsIt');
			const data = await response.data;


			try {

				
				if (data.data.roles.includes('ADMIN_USER')) {
					router.push('/admin');
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
						<span>Här kommer alla dina uppgifter!</span>
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
							<div className="wrapperWelcome">
								<span>
									Här får du en liten film att titta på medans vi gör annat
								</span>
								<span>
									<iframe
										width="720"
										height="405"
										src="https://www.youtube.com/embed/YE7VzlLtp-4"
										title="Big Buck Bunny"
										frameBorder="0"
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
										allowFullScreen></iframe>
								</span>
							</div>
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

	return <div>{profilInfo}</div>;
};

export default Profil;
