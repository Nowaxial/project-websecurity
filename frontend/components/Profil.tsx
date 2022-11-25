import React, { useEffect, useState } from 'react'
import Tickets from './tickets'
import client from './Client';
import { useRouter } from 'next/router';

const Profil = () => {
  const router = useRouter();

  const [user, setUser] = useState({});

  useEffect(() => {
    const meProfil = async() => {
      const response = await client.get('/me');

      if (response.status == 400) {
        console.log("Inte inloggad");

      } else if (response.status == 200) {
        const data = response.data;
        console.log(data);
        setUser(data);
        console.log("Inloggad med token!");

      } else if (response.status == 403) {
        console.log("Bad request");

      } else{

        router.push('/')
        

        console.log("Bad request");
      }
    }
    meProfil();
  }, []);

  return (
    <div>
        <section>Här är jag!</section>
    </div>
  )
}

export default Profil;