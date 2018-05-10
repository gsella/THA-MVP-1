import React from 'react';
import PropTypes from 'prop-types';
import {
  ContextMenu,
  MenuItem,
  ContextMenuTrigger,
  SubMenu,
} from 'react-contextmenu';
import Select from 'components/common/select/Select';
import Input from 'components/common/input/InputField';
import ThumbsUp from 'react-icons/lib/fa/thumbs-up';
import ThumbsDown from 'react-icons/lib/fa/thumbs-down';
import ThunderIcon from 'assets/images/thunder-icon.svg';
import { getBEMClasses } from 'helper/BEMHelper';
import { categoriesType } from '../../../../../propTypes/categoryType';

import 'assets/styles/data-table.css';
import 'assets/styles/right-click-dropdown.css';

const tableRow = 'data-table-row';
const bemClasses = getBEMClasses([tableRow]);
const inputClass = 'data-table-input';

class TableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    namePrefix: PropTypes.string.isRequired,
    item: PropTypes.object.isRequired,
    isNew: PropTypes.bool,
    categories: categoriesType.isRequired,
    allTags: PropTypes.object.isRequired,
    changeFormValue: PropTypes.func.isRequired,
  };

  static defaultProps = {
    namePrefix: '',
  };

  handleRightClickDropdown = (e, data, target) => {
    if (data.action === 'move up') this.props.moveInsightUp();
    if (data.action === 'move down')
      this.props.moveInsightDown(this.props.item.id);
    if (data.action === 'delete') this.props.deleteInsight(this.props.item.id);
    /// TODO: handle all menu functions depends on data.action
  };

  renderImpact() {
    const { namePrefix } = this.props;
    const options = [
      { value: 1, label: <ThumbsUp /> },
      { value: 0, label: 'Impact' },
      { value: -1, label: <ThumbsDown /> },
    ];

    return <Select items={options} name={`${namePrefix}.impact`} />;
  }

  renderCategory() {
    const { namePrefix, categories } = this.props;

    const options = Object.keys(categories).map(key => {
      return { value: key, label: categories[key].name };
    });

    return (
      <Select
        items={options}
        name={`${namePrefix}.categoryId`}
        customClass="table-row-category-select"
      />
    );
  }

  renderTag() {
    const { namePrefix, allTags } = this.props;

    const options = Object.keys(allTags).map(key => {
      return { value: key, label: allTags[key].name };
    });

    return (
      <Select
        items={options}
        name={`${namePrefix}.tagId`}
        customClass="table-row-tag-select"
      />
    );
  }

  renderDropdown() {
    return (
      <ContextMenu id={`row-dropdown-${this.props.item.id}`}>
        <MenuItem
          disabled={this.props.disableMoveUp}
          onClick={this.handleRightClickDropdown}
          data={{ action: 'move up' }}>
          Move Insight Up
        </MenuItem>
        <MenuItem
          disabled={this.props.disableMoveDown}
          onClick={this.handleRightClickDropdown}
          data={{ action: 'move down' }}>
          Move Insight Down
        </MenuItem>
        <MenuItem
          onClick={this.handleRightClickDropdown}
          data={{ action: 'delete' }}>
          Delete Selected Insight(s)
        </MenuItem>
        <SubMenu title="Mute Selected Insight(s)..">
          <MenuItem
            onClick={this.handleRightClickDropdown}
            data={{ action: 'mute till tomorrow' }}>
            Mute till Tomorrow
          </MenuItem>
          <MenuItem
            onClick={this.handleRightClickDropdown}
            data={{ action: 'mute for a week' }}>
            Mute for a Week
          </MenuItem>
          <MenuItem
            onClick={this.handleRightClickDropdown}
            data={{ action: 'mute for a month' }}>
            Mute for a Month
          </MenuItem>
          <MenuItem
            onClick={this.handleRightClickDropdown}
            data={{ action: 'mute forever' }}>
            Mute Forever
          </MenuItem>
        </SubMenu>
      </ContextMenu>
    );
  }

  addDropdownTrigger(item, component) {
    if ('id' in item) {
      return (
        <ContextMenuTrigger id={`row-dropdown-${item.id}`}>
          {component}
        </ContextMenuTrigger>
      );
    } else {
      return component;
    }
  }

  render() {
    const { isNew, item, namePrefix, categories } = this.props;
    const textColorModifier = isNew ? { modifiers: 'is-new' } : {};
    const color = categories[item.categoryId].color;

    return (
      <tr
        className={bemClasses(textColorModifier)}
        id={`editable-row-${item.id}`}>
        <td className={bemClasses('cell', 'for-icons')}>
          {isNew ? (
            <img
              className={bemClasses('insight-icon')}
              alt="new insight"
              src={ThunderIcon}
            />
          ) : null}
          {this.renderDropdown()}
        </td>
        <td
          className={bemClasses('cell', ['id', 'for-text'])}
          style={{ backgroundColor: color }}>
          {this.addDropdownTrigger(
            item,
            item.categoryKey ? item.categoryKey : 'ID'
          )}
        </td>
        <td
          className={bemClasses('cell', ['category'])}
          style={{ backgroundColor: color }}>
          {this.addDropdownTrigger(item, this.renderCategory())}
        </td>
        <td className={bemClasses('cell', 'for-input')}>
          {this.addDropdownTrigger(
            item,
            <Input
              placeholder="Key words"
              name={`${namePrefix}.insight`}
              customClass={inputClass}
            />
          )}
        </td>
        <td className={bemClasses('cell', 'for-input')}>
          {this.addDropdownTrigger(
            item,
            <Input
              placeholder="Description"
              name={`${namePrefix}.description`}
              customClass={inputClass}
            />
          )}
        </td>
        <td className={bemClasses('cell', ['tag'])}>
          {this.addDropdownTrigger(item, this.renderTag())}
        </td>
        <td className={bemClasses('cell')}>{this.renderImpact()}</td>
      </tr>
    );
  }
}

export default TableRow;
