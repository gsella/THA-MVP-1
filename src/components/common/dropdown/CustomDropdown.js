import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem, Dropdown } from 'react-bootstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/fontawesome-free-solid';
import 'assets/styles/dropdown.css';
import 'assets/styles/data-table-dropdown.css';

class CustomDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleOptionClick = this.handleOptionClick.bind(this);
  }

  handleOptionClick(eventKey) {
    this.props.handleChange(this.props.id, eventKey);
  }

  renderListItems() {
    return this.props.options.map(item => (
      <MenuItem
        key={item.eventKey}
        className={this.props.bemClasses('menu-item')}
        eventKey={item.eventKey}
        onSelect={this.handleOptionClick}
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
          <span className={this.props.bemClasses('caret-icon')}>
            <FontAwesomeIcon icon={faCaretDown} />
          </span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {this.props.options && this.renderListItems()}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

CustomDropdown.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  options: PropTypes.array.isRequired,
  handleChange: PropTypes.func,
  bemClasses: PropTypes.func,
};

export default CustomDropdown;
