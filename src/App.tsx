import * as React from "react";
import { Contact, contacts } from "./data/contacts";

const ContactCard = ({ id, name, email, phone, address }: Contact) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.5rem",
        fontFamily: "sans-serif",
        border: "1px solid black",
        margin: "1rem",
        padding: "1rem",
        width: "50%",
      }}
    >
      <div>
        <h2>{name}</h2>
      </div>
      <div>
        <p>{email}</p>
        <p>{phone}</p>
        <p>{address}</p>
      </div>
    </div>
  );
};

export default () => {
  const [Search, setSearch] = React.useState<string>("");
  const [Contacts, setContacts] = React.useState<Contact[]>([]);

  const fetchContacts = () => {
    // isso seria no backend
    const palavras = Search.split(" ");
    const regExp = new RegExp(palavras.join("|"), "i");

    const filteredContacts = contacts.filter((contact) => { // ai seria feito o filtro no mongo 
      return regExp.test(contact.name);
    });

    setContacts(filteredContacts);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    fetchContacts();
  };

  return (
    <>
      <div
        id="search"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.5rem",
          fontFamily: "sans-serif",
        }}
      >
        <input type="text" value={Search} onChange={handleSearch} />
        <p>{`Search: ${Search}`}</p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {Contacts.length === 0 && <p>Nenhum contato encontrado</p>}
        {Contacts.map((contact) => (
          <ContactCard
            key={contact.id}
            id={contact.id}
            name={contact.name}
            email={contact.email}
            phone={contact.phone}
            address={contact.address}
          />
        ))}
      </div>
    </>
  );
};
