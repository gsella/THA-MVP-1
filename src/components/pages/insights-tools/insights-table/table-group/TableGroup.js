import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { getBEMClasses } from 'helper/BEMHelper';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/fontawesome-free-solid';

const tableRow = 'data-table-row';
const bemClasses = getBEMClasses([tableRow]);

class TableGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGrouped: true,
    };

    this.handleCollapseGroup = this.handleCollapseGroup.bind(this);
  }

  handleCollapseGroup() {
    const newIsGrouped = !this.state.isGrouped;

    this.setState({ isGrouped: newIsGrouped });
  }

  renderGroupRow() {
    const cellColorClass = this.props.color ? 'white-text' : '';

    return (
      <tr className={bemClasses()}>
        <td className={bemClasses('cell', 'for-icons')} />
        <td
          className={bemClasses('cell', `${cellColorClass}`)}
          style={{ backgroundColor: this.props.color }}
          colSpan="6">
          <Button
            onClick={this.handleCollapseGroup}
            className={bemClasses('group-cell')}>
            {this.props.groupName}
            {this.state.isGrouped
              ? ` (${this.props.content.length} Insights collapsed)`
              : ''}
            <span className={bemClasses('caret-icon')}>
              <FontAwesomeIcon
                icon={this.state.isGrouped ? faCaretDown : faCaretUp}
              />
            </span>
          </Button>
        </td>
      </tr>
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.renderGroupRow()}
        {!this.state.isGrouped ? this.props.content : null}
      </React.Fragment>
    );
  }
}

TableGroup.propTypes = {
  groupName: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  content: PropTypes.array.isRequired,
  color: PropTypes.string,
};

TableGroup.defaultProps = {
  color: null,
};

export default TableGroup;
