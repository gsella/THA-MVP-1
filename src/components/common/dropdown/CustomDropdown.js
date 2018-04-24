import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem, Dropdown } from 'react-bootstrap';
import 'assets/styles/dropdown.css';
import 'assets/styles/data-table-dropdown.css';

class CustomDropdown extends React.Component {
  renderListItems() {
    return this.props.options.map(item => (
      <MenuItem
        key={item.eventKey}
        className={this.props.bemClasses('menu-item')}
      >
        {item.name}
      </MenuItem>
    ));
  }

  render() {
    return (
      <Dropdown id="dropdown-custom" className={this.props.bemClasses()}>
        <Dropdown.Toggle
          id="dropdown-size-medium"
          className={this.props.bemClasses('button', 'default')}
        >
          {this.props.title}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {this.props.options && this.renderListItems()}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

CustomDropdown.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  bemClasses: PropTypes.func,
};

export default CustomDropdown;
