import React from "react";
import PropTypes from "prop-types";

import st from "./ContactList.module.css";

import ContactListItem from "../ContactListItem/ContactListItem";

const ContactList = ({ contacts, deleteContacts }) => {
  return (
    <ul className={st.list}>
      <ContactListItem contacts={contacts} deleteContact={deleteContacts} />
    </ul>
  );
};

export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  deleteContacts: PropTypes.func,
};
