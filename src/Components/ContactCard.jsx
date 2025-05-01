
const ContactCard = (props) => {
  console.log(props.contact);
  return (
    <div className="font-semibold text-md">
      <div >{props.contact.name}</div>
      <div>{props.contact.number}</div>
  
    </div>
  );
};

export default ContactCard;
