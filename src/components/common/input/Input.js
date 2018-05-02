import React from 'react';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';
import { getBEMClasses } from 'helper/BEMHelper';

import 'assets/styles/data-table-input.css';

const baseClass = 'input-component';

const Input = (props) => {
  const classes = getBEMClasses([baseClass, props.customClass]);
  
  return (
    <FormControl
      value={props.value}
      placeholder={props.placeholder}
      name={props.name}
      onChange={props.handleChange}
      className={classes()}
    />
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  customClass: PropTypes.string,
  classModifiers: PropTypes.arrayOf(PropTypes.string),
};

Input.defaultProps = {
  customClass: 'custom-input-component',
  classModifiers: [],
};

export default Input;
