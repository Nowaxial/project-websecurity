import React, { useEffect, useState } from 'react'
import Tickets from './tickets'
import client from './Client';

const Profil = () => {

  const [user, setUser] = useState({});

  useEffect(() => {
    async function loggedIn() {
      const response = await client.get("/whosLoggedIn");

      if (response.status == 400) {
        console.log("Inte inloggad");
      } else if (response.status == 200) {
        const data = await response;
        setUser(data);
        
        console.log("Inloggad med token!");
      } else {
        
        console.log("something went wrong");
      }
    }
    loggedIn();
  }, []);

  return (
    <div>
        <section>Här är jag!</section>
        <Tickets/>
    </div>
  )
}

export default Profil