import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const RegisterUser = () => {

    const navigate = useNavigate();
    const [user , setUser] = useState({name:"", email:"" , password:""});

    const HandleSubmit = (e) => {
        e.preventDefault();
        const {name , email , password} = user;
        if(name === "" || email === "" || password === ""){
            alert("Enter the valid info");
        }else{
            console.log(user);

            setUser({name:"", email:"" , password:""})
            navigate("/")
        }
    }

    return (
        <div className='w-3/4'>
            <form onSubmit={HandleSubmit}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="name">Name:</label>
                    <input
                        className="border rounded-lg p-2 w-[100%]"
                        type="text"
                        value={user.name} 
                        onChange={(e)=>{setUser({...user , name:e.target.value})}}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="email">Email:</label>
                    <input
                        className="border rounded-lg p-2 w-[100%]"
                        type="email"
                        value={user.email} 
                        onChange={(e)=>{setUser({...user , email:e.target.value})}}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="password">Password:</label>
                    <input
                        className="border rounded-lg p-2 w-[100%]"
                        type="password"
                        value={user.password} 
                        onChange={(e)=>{setUser({...user , password:e.target.value})}}
                    />
                </div>
                <div className="flex justify-end mt-2 text-sky-900">
                    <Link to={`/`}>Login</Link>
                </div>
                <button type="submit" className="bg-sky-500 rounded-full px-4 py-2 text-white">Register</button>
            </form>
        </div>
    );
};

export default RegisterUser;