import PropTypes from 'prop-types';
import Button from 'components/UI/Button/Button';
import ContactListStyled from './ContactListStyled';

const ContactList = ({ contacts, dispatch }) => {
  return (
    <ContactListStyled>
      {contacts.map(({ id, name, number }) => (
        <li key={id}>
          <div>
            {name}: {number}{' '}
            <Button
              small
              type="submit"
              onClick={() => dispatch({ type: 'REMOVE_CONTACT', payload: id })}
            >
              Delete
            </Button>
          </div>
        </li>
      ))}
    </ContactListStyled>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  dispatch: PropTypes.func.isRequired,
};

export default ContactList;
