import React from 'react';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';
import { Field } from 'redux-form';
import { getBEMClasses } from 'helper/BEMHelper';

import 'assets/styles/components/data-table-input.css';

const baseClass = 'textarea-component';

export class TextareaComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textareaHeight: 20,
    };
  }

  render() {
    const classes = getBEMClasses([baseClass, this.props.customClass]);
    const { input } = this.props;

    return (
      <div className={classes('wrapper-1')}>
        <div className={classes('wrapper-2')}>
          <FormControl
            {...input}
            componentClass="textarea"
            maxLength="300"
            autoComplete="off"
            placeholder={this.props.placeholder}
            className={classes()}
          />
        </div>
      </div>
    );
  }
}

const Textarea = props => {
  return <Field name={props.name} component={TextareaComponent} {...props} />;
};

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  customClass: PropTypes.string,
  classModifiers: PropTypes.arrayOf(PropTypes.string),
};

Textarea.defaultProps = {
  customClass: 'custom-input-component',
  classModifiers: [],
};

export default Textarea;
