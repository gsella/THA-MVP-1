import React from 'react';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';
import { Field } from 'redux-form';
import { getBEMClasses } from 'helper/BEMHelper';

import 'assets/styles/components/data-table-input.css';

const baseClass = 'input-component';

export const InputComponent = props => {
  const classes = getBEMClasses([baseClass, props.customClass]);
  const { input } = props;

  return (
    <FormControl
      {...input}
      autoComplete="off"
      placeholder={props.placeholder}
      className={classes()}
    />
  );
};

const Input = props => {
  return <Field name={props.name} component={InputComponent} {...props} />;
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  customClass: PropTypes.string,
  classModifiers: PropTypes.arrayOf(PropTypes.string),
};

Input.defaultProps = {
  customClass: 'custom-input-component',
  classModifiers: [],
};

export default Input;
