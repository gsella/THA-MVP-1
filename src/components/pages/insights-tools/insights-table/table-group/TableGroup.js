import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import TableRow from '../table-row/TableRowContainer';
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
    const cellColorClass = this.props.color ? 'for-color-cell' : '';

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

  renderContent() {
    const amount = this.props.content.length;

    return this.props.content.map((item, key) => (
      <TableRow
        key={item.id}
        item={item}
        categories={this.props.categories}
        allTags={this.props.allTags}
        isNew={'isNew' in item ? item.isNew : false}
        {...this.props}
        disableMoveUp={key === 0}
        disableMoveDown={key === amount - 1}
      />
    ));
  }

  render() {
    if (this.props.content.length > 0) {
      return (
        <React.Fragment>
          {this.renderGroupRow()}
          {!this.state.isGrouped ? this.renderContent() : null}
        </React.Fragment>
      );
    } else {
      return null;
    }
  }
}

TableGroup.propTypes = {
  groupName: PropTypes.string.isRequired,
  content: PropTypes.arrayOf(PropTypes.object),
  color: PropTypes.string,
};

TableGroup.defaultProps = {
  color: null,
};

export default TableGroup;
