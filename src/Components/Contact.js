

const Contact = ({person,delContact}) => {
    return (
        <li>{person.name} {person.number} 
        <button onClick={() => delContact(person.id)}>delete</button>
        </li>
    )
  } 

export default Contact;