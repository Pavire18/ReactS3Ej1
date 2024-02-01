import React from "react";
import "./ContactItem.css";

const ContactItem = (props) => {
  console.log("Ejecutado render SpentItem: " + props.contact.name);

  return (
    <div className="spent-item" key={props.contact.id}>
      <img className="spent-item__image" src={props.contact.imageUrl} alt={"Imagen de " + props.contact.name} />
      <div className="spent-item__info">
        <p className="spent-item__name">{props.contact.name} {props.contact.secondName}</p>
        <p className="spent-item__ammount">{props.contact.telf}</p>
        <button className="spent-item__delete-button" onClick={() => props.deleteItem(props.contact)}>ELIMINAR</button>
      </div>
    </div>
  );
}

// const propsAreEqual = (previousProps, currentProps) => {
//   return previousProps.spent === currentProps.spent;
// }

// const SpentItemMemo = React.memo(SpentItem, propsAreEqual);

const ContactItemMemo = React.memo(ContactItem);

export default ContactItemMemo;