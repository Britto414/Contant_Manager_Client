import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

const RegisterUser = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user: "",
    mail: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    const { user, mail, password } = formData;

    if (!user || !mail || !password) {
      alert("Please fill in all fields.");
    } else {
      props.Register(formData, navigate);
    }
  };

  return (
    <div className='w-3/4'>
      <div className="text-3xl font-mono text-center">Register</div>
      <form onSubmit={HandleSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="user">Name:</label>
          <input
            className="border rounded-lg p-2 w-full"
            type="text"
            name="user"
            value={formData.user}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="mail">Email:</label>
          <input
            className="border rounded-lg p-2 w-full"
            type="email"
            name="mail"
            value={formData.mail}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password:</label>
          <input
            className="border rounded-lg p-2 w-full"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-end mt-2 text-sky-900">
          <Link to="/">Login</Link>
        </div>

        <button type="submit" className="bg-sky-500 rounded-full px-4 py-2 text-white">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterUser;
