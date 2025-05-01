import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import AddContact from "./Components/AddContact";
import ContactList from "./Components/ContactList";
import ContactDetails from "./Components/ContactDetails";
import { useState, useEffect } from "react";
import Login from "./Components/Login";
import RegisterUser from "./Components/Register_user";
import { v4 as uuid } from "uuid";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContact] = useState([]);

  const AddC = (contact, navigate) => {
    const isDuplicate = contacts.some(
      (c) =>
        c.name.toLowerCase() === contact.name.toLowerCase() ||
        c.number.toLowerCase() === contact.number.toLowerCase()
    );

    if (!isDuplicate) {
      const newcontact = { id: uuid(), ...contact };
      setContact([...contacts, newcontact]);
      navigate("/"); // Only navigate if the contact is added successfully
    } else {
      alert("Contact already exists!");
    }
  };

  useEffect(() => {
    const retrievedContacts = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY)
    );
    console.log(retrievedContacts);

    if (retrievedContacts) setContact(retrievedContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const deleteContact = (id) => {
    const filtered = contacts.filter((contact) => id !== contact.id);
    // console.log("Hi");
    setContact(filtered);
  };

  return (
    <div className="flex justify-center mt-4 bg-">
      <div className="flex flex-col items-center border w-3/4 p-4 rounded-lg shadow-lg">
        <Router>
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <Login/>
              }
            />

            <Route
              path="/Register"
              element={
                <RegisterUser
                />
              }
            />
            <Route
            
              path="/list"
              element={
                <ContactList
                  contacts={contacts}
                  deleteContact={deleteContact}
                />
              }
            />
            <Route path="/add" element={<AddContact AddC={AddC} />} />

            <Route path="/contact/:id" element={<ContactDetails />} />
           </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
