import React from "react";
import "./Agenda.css";
import ContactItemMemo from "../ContactItem/ContactItem";
import { useDebounce } from 'use-debounce';


const Agenda = React.memo(() => {

  const API_URL = "http://localhost:4000/contacts?q=";
  const API_URL_DELETE = "http://localhost:4000/contacts";


  const [agenda, setAgenda] = React.useState([]);
  const [newContact, setNewContact] = React.useState({ name: "", secondName: "", telf: "", imageUrl: "" });
  const [total, setTotal] = React.useState(0);
  const [filter, setFilter] = React.useState("");
  const [filterWithTime] = useDebounce(filter, 1000);




  React.useEffect(() => {
        fetch(`${API_URL}${filterWithTime}`)
        .then((response) => response.json())
        .then((data) => {
          setAgenda(data);
        })
        .catch((error) => {
            alert("ERROR API");
            console.log(error +" - ERROR API");
        });
  }, [filterWithTime]);


  React.useEffect(() => {
    setTotal(agenda.length);
  }, [agenda]);

  React.useEffect(() => {
    getAllContactsFromApi();
  }, []);

  const getAllContactsFromApi = () => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => setAgenda(data));
  }

  const deleteContact = React.useCallback((contact) => {
    fetch(`${API_URL_DELETE}/${contact.id}`, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then(() => getAllContactsFromApi());
  }, []);

  const addNewContact = (event) => {
    event.preventDefault();

    fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(newContact),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(() => {
        getAllContactsFromApi();
        setNewContact({
          name: "",
          secondName: "",
          telf: "",
          imageUrl: ""
        });
      });
  }

  return (
    <div className="spent-linst">
      <h2>Mi agenda {'(' + total + ')'}:</h2>

      {/* listado de gastos */}
      {agenda.map(contact =>
        <ContactItemMemo
          key={contact.id}
          contact={contact}
          deleteItem={deleteContact}
        ></ContactItemMemo>)}

      <h2>Buscar:</h2>
      <input type="text" value={filter} onChange={(event) => setFilter(event.target.value)} />
      <h2>Añadir nuevo contacto</h2>
      <form onSubmit={(event) => addNewContact(event)}>
        <p>
          <label>Nombre:</label>
          <input type="text" name="name" id="name" value={newContact.name} onChange={(event) => setNewContact({
            ...newContact,
            name: event.target.value,
          })} />
        </p>
        <p>
          <label>Apellidos:</label>
          <input type="text" name="secondName" id="secondName" value={newContact.secondName} onChange={(event) => setNewContact({
            ...newContact,
            secondName: event.target.value,
          })} />
        </p>
        <p>
          <label>Teléfono:</label>
          <input type="text" name="tlf" id="tlf" value={newContact.telf} onChange={(event) => setNewContact({
            ...newContact,
            telf: event.target.value,
          })} />
        </p>
        <p>
          <label>URL de la imagen:</label>
          <input type="text" name="imageUrl" id="imageUrl" value={newContact.imageUrl} onChange={(event) => setNewContact({
            ...newContact,
            imageUrl: event.target.value,
          })} />
        </p>

        <button type="submit">Añadir contacto</button>

      </form>
    </div>
  );

});

export default Agenda;