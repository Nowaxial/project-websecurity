import { useRouter } from "next/router";
import client from "./Client";
import React, { useEffect, useState } from 'react'
import Router from "next/router";

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

  const listUsers = users?.map((user) => {
  return <li key={user['userId']}><p>{user['username']}</p></li>
})

  return (
    <>
      <div>
        <p>Användare</p>
      <div>
        <ul>
        {listUsers}
        </ul>
      </div>
      </div>
    </>
  );
};

export default Dashboard;
