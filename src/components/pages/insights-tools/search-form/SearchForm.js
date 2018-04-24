import React from 'react';
import SearchIcon from 'react-icons/lib/fa/search';
import { FormGroup, FormControl, InputGroup } from 'react-bootstrap';
import { reduxForm, Field } from 'redux-form';
import { getBEMClasses } from 'helper/BEMHelper';
import 'assets/styles/search-form.css';

const searchForm = 'search-form';
const bemClasses = getBEMClasses([searchForm]);

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static formInput({ input }) {
    return (
      <FormGroup>
        <InputGroup>
          <InputGroup.Addon className={bemClasses('input', ['border', 'addon-border'])}>
            <SearchIcon className={bemClasses('input', 'search-icon')} />
          </InputGroup.Addon>
          <FormControl
            placeholder="Search for anything"
            onChange={input.onChange}
            className={bemClasses('input', 'border')}
          />
        </InputGroup>
      </FormGroup>
    );
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <form
          onSubmit={handleSubmit}
          className={bemClasses('form')}
        >
          <Field
            name="searchForm"
            type="text"
            component={SearchForm.formInput}
          />
        </form>
      </div>
    );
  }
}

export default reduxForm({ form: 'searchForm' })(SearchForm);
