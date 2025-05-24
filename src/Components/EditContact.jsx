import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const EditContact = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const initialContact = location.state.contact || {};

  const [contact, setContact] = useState(initialContact);

  // console.log(contact);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, phone } = contact;

    if (name === "" || phone === "") {
      alert("Enter valid info");
    } else {
      props.UpdateContact(contact,contact._id , navigate); 
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800">Edit Contact</h2>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="mt-6 flex gap-8">
          <label className="w-29">Name</label>
          <input
            className="border rounded-lg p-2 w-[300px]"
            type="text"
            placeholder="Enter name"
            value={contact.name ?? ""}
            onChange={(e) => setContact({ ...contact, name: e.target.value })}
          />
        </div>
        <div className="mb-4 flex gap-8">
          <label>Contact Number</label>
          <input
            className="border rounded-lg p-2 w-[300px]"
            type="text"
            placeholder="Enter number"
            value={contact.phone ?? ""}
            onChange={(e) => setContact({ ...contact, phone: e.target.value })}
          />
        </div>
        <button className="border bg-teal-600 rounded-full w-[80px] text-white" type="submit" onClick={()=> handleSubmit}>
          Update
        </button>
      </form>
    </div>
  );
};

export default EditContact;
