import user from '../assets/iD_cARD.webp';
import { useLocation } from "react-router-dom";
const ContactDetails = (props) => {

    const location = useLocation();
    const { contact } = location.state || {};
    console.log(contact);
    

    return (

        <div className="flex flex-col justify-center items-center gap-2 w-full">
            <div className="">
                <img className="h-[150px] w-[150px] " src={user} alt="user" />
            </div>
            <div >
                <div className="header">{contact.name}</div>
                <div className="meta">{contact.number}</div>
                <div className="description">Contact Details</div>
            </div>
    </div>
    )

}

export default ContactDetails;