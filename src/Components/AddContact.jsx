import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddContact = (props) => {
  const [contact, setContact] = useState({ name: "", number: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, number } = contact;

    if (name === "" || number === "") {
      alert("Enter the valid info");
    } else {
      props.AddC(contact, navigate);
      setContact({ name: "", number: "" });
    }
  };

  return (
    <div >
      
      <h2 class="text-2xl font-semibold text-gray-800">Add Contact</h2>
      
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="mt-6 flex gap-8">
          <label>Name</label>
          <input
            className="border rounded-lg p-2 w[300px]"
            type="text"
            placeholder="Enter name"
            value={contact.name}
            onChange={(e) =>
              setContact({ ...contact, name: e.target.value })
            }
          />
        </div>
        <div className="mb-4 flex gap-8">
          <label>Contact Number</label>
          <input
            className="border rounded-lg p-2 w[300px]"
            type="text"
            placeholder="Enter number"
            value={contact.number}
            onChange={(e) =>
              setContact({ ...contact, number: e.target.value })
            }
          />
        </div>
        <button className="border bg-teal-600 rounded-full w-[80px] " type="submit">
           Add
        </button>
      </form>
    </div>
  );
};

export default AddContact;
