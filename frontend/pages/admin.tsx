import { useRouter } from "next/router";
import client from '../components/Client'
import React, { useEffect, useState } from 'react'
const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const router = useRouter(); 

  useEffect(() => {
    const fetchUsers = async() => {
      const response = await client.get("users");
      if (response.status == 400) {
        console.log("Kunde inte hämta användare");
      } else if (response.status == 200) {
        const users = await response.data;
        setUsers(users);
        console.log("Hämtat användare");
      } else {
        console.log("Något gick fel här");
      }
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    async function loggedIn() {
      const response = await client.get("/whosLoggedIn");

      if (response.status == 400) {
        console.log("Inte inloggad");
      } else if (response.status == 200) {
        const data = await response.data;
        setUsers(data);
        
        console.log("Inloggad med token!");
      } else {
        
        console.log("something went wrong");
      }
    }
    loggedIn();
  }, []);



  const listUsers = users?.map((user) => {
  return <li key={user['userId']}><span>{user['userId']}. Användarnamn = {user['username']} | Email = {user['email']}</span><br></br><br></br></li>

})

  return (
    <>
      <div >
        <h1>Användare</h1>
      <div>
        <ol>
        {listUsers}
        </ol>
      </div>
      </div>
    </>
  );
};

export default Dashboard;
