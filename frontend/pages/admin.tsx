import { useRouter } from "next/router";
import client from '../components/Client'
import React, { useEffect, useState } from 'react'
const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const router = useRouter(); 

  useEffect(() => {
    const fetchUsers = async() => {
      const res = await client.get("users");

      if (res.status == 400) {
        console.log("Kunde inte hämta användare");
      } else if (res.status == 200) {
        const users = await res.data;
        setUsers(users);
        console.log("Hämtat användare");
      } else if (res.status == 403){

        console.log("Något gick fel här");
      }
    }
    fetchUsers();
  }, []);


  const listUsers = users?.map((user) => {

    

      return <tr key={user['userId']}><td>{user['username']}</td><td>{user['email']}</td></tr>



    
    // return <li key={user['userId']}><span>{user['userId']}. Användarnamn = {user['username']} | Email = {user['email']}</span><br></br><br></br></li>


  
});

return (
  <div className="container">
    <div>
      <h1> mockUsers</h1>
    <div>

    <table>
      <tbody>
<tr>
  <th>Användarnamn</th>
  <th>Email</th>
</tr>
{listUsers}
</tbody>
</table>

    </div>
    </div>
  </div>
);
};

/*   return (
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
}; */

export default Dashboard;
