import React, { useState } from "react";
import { Link } from "react-router-dom";
// import RegisterUser from "./Register_user";
import { useNavigate } from "react-router-dom";

const login = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ mail: "", password: "" });

  const HandleSubmit = (e) => {
    e.preventDefault();
    const { mail, password } = user;
    if (mail === "" || password === "") {
      alert("Enter the valid info");
    } else {
      // console.log(user);
      props.HandleLogin(user, navigate);
      setUser({ mail: "", password: "" });
    }
  };

  return (
    <div className="w-3/4">
      <form onSubmit={HandleSubmit}>
        <div className="flex flex-col gap-2">
          <label>Email</label>
          <input
            type="email"
            className="border rounded-lg p-2 w-[100%]"
            value={user.mail}
            onChange={(e) => {
              setUser({ ...user, mail: e.target.value });
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Password</label>
          <input
            type="password"
            className="border rounded-lg p-2 w-[100%] "
            value={user.password}
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
          />
        </div>
        {props.Error && (
          <p className="text-red-600 mt-2 text-sm">{props.Error}</p>
        )}
        <div className="flex justify-end mt-2 text-sky-900">
          <Link to={`/Register`}>Create Account</Link>
        </div>
        <div>
          <button
            className="bg-sky-500 rounded-full px-4 py-2 text-white"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default login;
