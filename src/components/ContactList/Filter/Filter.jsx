import PropTypes from 'prop-types';
import FormGroup from 'components/UI/FormGroup/FormGroup';

const Filter = ({ filter, setFilter }) => {
  return (
    <FormGroup>
      <label htmlFor="filter">Find contacts by name</label>
      <input
        type="text"
        id="filter"
        name="filter"
        value={filter}
        onChange={({ target }) => setFilter(target.value)}
      />
    </FormGroup>
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default Filter;
