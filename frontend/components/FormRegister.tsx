import React from "react";
import { useRouter } from "next/router";
import client from "./Client";



export default function FormRegister() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    router.push('/login');
    const { email, password, username} = document.forms[0];
    const res = await client.post('/register',{
    "email": email.value,
    "password": password.value,
    "username": username.value
    })
    console.log(res.data);
    
  }
    return (
      <div className="wrapperRegister">
      <form onSubmit={handleSubmit}>
        {/* <label htmlFor="firstname"><b>First Name</b></label>
        <input type="text" id="firstname" name="firstname" required />
  
        <label htmlFor="lastname"><b>Last Name</b></label>
        <input type="text" id="lastname" name="lastname" required /> */}

        <label htmlFor="username"><b>Username</b></label>
        <input type="text" id="username" name="username" required />

        <label htmlFor="email"><b>Email</b></label>
        <input type="email" id="email" name="email" required />
  
        <label htmlFor="password"><b>Password</b></label>
        <input type="password" id="password" name="password" minLength={8}  required />
        <button type="submit"><b>Submit</b></button>
      </form>
      </div>
  )
}