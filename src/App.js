import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

import Section from "./components/Section";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Filter from "./components/Filter";

const App = ({ defaultContacts, defaulFilter }) => {
  const [contacts, setContacts] = useState(defaultContacts);
  const [filter, setFilter] = useState(defaulFilter);

  const addNewContact = ({ name, number }) => {
    const idContact = uuidv4();
    const contact = {
      id: idContact,
      name,
      number,
    };

    contacts.some(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    )
      ? alert(`${name} is already in contacts.`)
      : contacts.some(({ number }) => number === contact.number)
      ? alert(`${number} is already in contacts.`)
      : setContacts((prevState) => [contact, ...prevState]);
  };

  const deleteContact = (contactId) => {
    setContacts((prevState) => prevState.filter(({ id }) => id !== contactId));
  };

  const changeFilter = (e) => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContact = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(normalizedFilter) ||
        contact.number.includes(filter)
    );
  };

  useEffect(() => {
    const localContacts = localStorage.getItem("contacts");
    const parcedLocalContacts = JSON.parse(localContacts);
    if (parcedLocalContacts) {
      setContacts(parcedLocalContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="App">
      <Section title="Phonebook">
        <ContactForm onSubmit={addNewContact} />
      </Section>
      <Section title="Contacts">
        <Filter value={filter} onChange={changeFilter} />
        <ContactList
          contacts={getVisibleContact()}
          deleteContacts={deleteContact}
        />
      </Section>
    </div>
  );
};

export default App;

App.defaultProps = {
  defaultContacts: [
    { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
    { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
    { id: "id-3", name: "Eden Clements", number: "645-17-79" },
    { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
  ],
  defaulFilter: "",
};

App.propTypes = {
  defaultContacts: PropTypes.array.isRequired,
  defaulFilter: PropTypes.string,
};
