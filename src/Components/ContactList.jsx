import { useState } from "react";
import ContactCard from "./ContactCard";
import { useNavigate, Link } from "react-router-dom";

const ContactList = (props) => {
  const navigate = useNavigate();
  
  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="flex gap-3 mb-4">
        <input type="text" placeholder="Search Contacts" className="border h-10 rounded-l px-4 w-full"
        value={props.searchTerm}
        onChange={(e)=>props.Handlesearch(e.target.value)}/>
        <button
          className="bg-green-400 hover:bg-green-600 text-white font-semibold rounded-full px-6 h-10 "
          onClick={() => navigate("/add")}
        >
          Add
        </button>
      </div>
      {props.contacts.length > 0 ? (
        props.contacts.map((contact) => (
          <div className="space-y-4 mb-2" key={contact._id}>
            <div
              key={contact._id}
              className="border rounded-xl shadow-md hover:shadow-lg transition duration-300 bg-white"
            >
              <ul className="flex justify-between items-center p-4">
                <Link
                  to={`/contact/${contact._id}`}
                  state={{ contact }}
                  className="flex-1"
                >
                  <ContactCard contact={contact} />
                </Link>

                <div className="flex gap-2 ml-4">
                  <button
                    className="bg-red-400 hover:bg-red-500 text-white font-medium rounded-full px-4 py-1.5 transition"
                    onClick={() => props.deleteContact(contact._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-full px-4 py-1.5 transition"
                    onClick = {()=> navigate("/edit" , {state:{contact}})}
                  >
                    Edit
                  </button>
                </div>
              </ul>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600 mt-6">No Contact Found</p>
      )}

      <div className="flex justify-center mt-6">
        <button
          className="bg-blue-400 hover:bg-blue-600 text-white font-semibold rounded-full px-6 py-2 transition ml-2"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default ContactList;
