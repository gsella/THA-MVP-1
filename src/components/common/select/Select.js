import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Field, change } from 'redux-form';

import 'react-select/dist/react-select.css';
import './Select.css';

const SelectComponent = props => {
  const { customClass, items, input, meta, placeholder, ...otherProps } = props;

  return (
    <Select
      className={customClass}
      {...input}
      {...otherProps}
      placeholder={placeholder}
      options={items}
      onChange={item => {
        meta.dispatch(change(meta.form, input.name, +item.value));
      }}
      onBlur={() => {}}
      searchable={false}
    />
  );
};

SelectComponent.propTypes = {
  customClass: PropTypes.string,
  classModifiers: PropTypes.arrayOf(PropTypes.string).isRequired,
  items: PropTypes.array.isRequired,
};

SelectComponent.defaultProps = {
  customClass: 'custom-select',
  classModifiers: [],
};

export default props => {
  return <Field component={SelectComponent} {...props} />;
};
