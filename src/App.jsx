import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import AddContact from "./Components/AddContact";
import ContactList from "./Components/ContactList";
import ContactDetails from "./Components/ContactDetails";
import { useState, useEffect } from "react";
import Login from "./Components/Login";
import RegisterUser from "./Components/Register_user";
import EditContact from "./Components/EditContact";
import { v4 as uuid } from "uuid";
import axios from "./api/axios";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContact] = useState([]);
  const [loginError , setLoginError] = useState("");
  const [searchTerm , setSearchTerm] = useState("");
  const [searchTermRes , setSearchTermRes] = useState([]);

  const HandleContact = async(contact, navigate) => {
    const token  = localStorage.getItem("token");
    const response = await axios.post(
      "/contacts/",
      contact,
      {
        headers: {
          Authorization: `Bearer ${token}`, // attach JWT token
        },
      }
    );
    const newContact = response.data.contact;
    console.log(newContact);
    
    setContact([...contacts, contact]);


    console.log("Contact added:", response.data);
    navigate("/list")
  }

  const HandleRegister = (user , navigate) => {
    console.log(user);
    
    axios.post("/user/register" , user)
    .then((res)=>{
      console.log(res.data);
      navigate("/");
    }).catch((err)=>{
      console.log(err);
    });

  }

  const Handlesearch = (term) => {
  const search = term.toLowerCase().trim();
  setSearchTerm(term);
  
  if (search !== "") {
    const filtered = contacts.filter((item) => {
      return (
        item.name.toLowerCase().includes(search) ||
        item.phone.includes(search)
      );
    });
    setSearchTermRes(filtered);
  } else {
    setSearchTermRes([]);
  }
};

  const HandleLogin = async (user, navigate) => {
  try {
    
    localStorage.removeItem("token");

    const res = await axios.post("/user/login", user);

    localStorage.setItem("token", res.data.token);
    setLoginError("");
    // console.log("Login success:", res.data);

    navigate("/list");
  } catch (err) {
    // Handle errors
    if (err.response) {
      setLoginError(err.response.data.message);
    } else {
      setLoginError("Something went wrong");
    }
    // console.log(loginError);
    
  }
  // console.log("Hi");
};

  const UpdateContact = async(contact, id , navigate)=>{
    try{
      const token  = localStorage.getItem("token");
      const res = await axios.put(`/contacts/${id}` , contact,{
        headers: {
          Authorization: `Bearer ${token}`, // attach JWT token
        },
      }
    );
    
    const updated = res.data.updated;
    const filtered = contacts.filter((item)=> item._id !=id);

    setContact([...filtered , updated]);

    console.log(res);
    
    navigate("/list")

    }catch(err){
      console.log(err);
      
    }
  }

useEffect(() => {
  const fetchContacts = async () => {
    try {
     const token = localStorage.getItem("token");
      if(token){
        

      const response = await axios.get("http://localhost:5000/api/contacts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const retrievedContacts = response.data;
      console.log(retrievedContacts);

      if (retrievedContacts) setContact(retrievedContacts);
      }
      
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
    }
  };

  fetchContacts();
}, []);


  useEffect(() => {
    
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const deleteContact = async (id) => {
      const token = localStorage.getItem("token");

  try {
    await axios.delete(`/contacts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Optionally update the local state after successful deletion
    setContact((prevContacts) => prevContacts.filter((c) => c._id !== id));
    console.log("Contact deleted");
  } catch (error) {
    console.error("Error deleting contact:", error.response?.data?.message || error.message);
  }

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
                <Login HandleLogin={HandleLogin} Error={loginError}/>
              }
            />

            <Route
              path="/Register"
              element={
                <RegisterUser
                  Register={HandleRegister}
                />
              }
            />
            <Route
            
              path="/list"
              element={
                <ContactList
                  contacts={searchTerm.length>=1 ? searchTermRes:contacts}
                  searchTerm={searchTerm}
                  deleteContact={deleteContact}
                  Handlesearch={Handlesearch}
                />
              }
            />
            <Route path="/add" element={<AddContact HandleContact={HandleContact} />} />
            <Route path="/edit" element={<EditContact UpdateContact={UpdateContact} />} />
            <Route path="/contact/:id" element={<ContactDetails />} />
           </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
