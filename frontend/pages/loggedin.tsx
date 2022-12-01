import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import client from '../lib/Client'


const LoggedIn = () => {

    const [user, setUser] = useState([])

    useEffect(() => {
		const whoIsIt = async () => {
			const response = await client.get('/whoIsIt');
			const data = await response.data;

			try {
				if (!data){
					Router.push('/');
				}
				
				if (data.data.roles.includes('NORMAL_USER')) {
					Router.push('/profil');
				}

                if (data.data.roles.includes('ADMIN_USER')) {
					Router.push('/profil');
				}

				
			} catch (error) {
				console.error(error);
			}
		};
		whoIsIt();
	}, []);

    return <div>
        
    </div>
}

export default LoggedIn
