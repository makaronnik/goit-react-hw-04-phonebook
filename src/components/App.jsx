import { useEffect, useMemo, useReducer, useState } from 'react';
import { nanoid } from 'nanoid';
import Phonebook from './Phonebook/Phonebook';
import Filter from './ContactList/Filter/Filter';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';

const CONTACTS_STORAGE_KEY = 'contacts';

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_CONTACT':
      const { name, number } = action.payload;

      if (state.some(contact => contact.name === name)) {
        alert(`${name} is already in contacts.`);

        return state;
      }

      const contact = {
        id: nanoid(),
        name,
        number,
      };

      return [...state, contact];

    case 'REMOVE_CONTACT':
      return state.filter(contact => contact.id !== action.payload);

    default:
      return state;
  }
};

const App = () => {
  const [contacts, dispatch] = useReducer(
    reducer,
    [],
    initialState =>
      JSON.parse(localStorage.getItem(CONTACTS_STORAGE_KEY)) ?? initialState
  );

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(CONTACTS_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const filteredContacts = useMemo(() => {
    const normalizedFilter = filter.toLowerCase();

    if (!filter || !contacts.length) {
      return contacts;
    }

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  }, [contacts, filter]);

  return (
    <Phonebook>
      <h1>Phonebook</h1>
      <ContactForm dispatch={dispatch} />

      <h2>Contacts</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <ContactList contacts={filteredContacts} dispatch={dispatch} />
    </Phonebook>
  );
};

export default App;
