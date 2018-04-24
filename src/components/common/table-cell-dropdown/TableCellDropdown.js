import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem, Dropdown } from 'react-bootstrap';
import { getBEMClasses } from 'helper/BEMHelper';
import 'assets/styles/data-table-dropdown.css';

const dropdown = 'data-table-dropdown';
const bemClasses = getBEMClasses([dropdown]);

class TableCellDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderDropdownMenu() {
    return this.props.options.map((item) =>
      <MenuItem
        key={item.eventKey}
        eventKey={item.eventKey}
        className={bemClasses('menu-element')}
      >
        {item.name}
      </MenuItem>
    );
  }

  render() {
    return (
      <Dropdown id={this.props.id} className={bemClasses()}>
        <Dropdown.Toggle className={bemClasses('button')}>
          {this.props.title}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {this.renderDropdownMenu()}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

TableCellDropdown.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  options: PropTypes.array.isRequired,
};

export default TableCellDropdown;
