import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import ContactFormStyled from './ContactFormStyled';
import FormGroup from 'components/UI/FormGroup/FormGroup';
import Button from 'components/UI/Button/Button';

const ContactForm = ({ dispatch }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = useCallback(event => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  }, []);

  const handleSubmit = useCallback(
    event => {
      event.preventDefault();

      dispatch({ type: 'ADD_CONTACT', payload: { name, number } });

      setName('');
      setNumber('');
    },
    [dispatch, name, number]
  );

  return (
    <ContactFormStyled onSubmit={handleSubmit}>
      <FormGroup>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup>
        <label htmlFor="number">Number</label>
        <input
          type="tel"
          id="number"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleChange}
        />
      </FormGroup>

      <Button type="submit">Add contact</Button>
    </ContactFormStyled>
  );
};

ContactForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default ContactForm;
