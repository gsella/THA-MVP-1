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
import LightningIcon from 'assets/images/lightning-icon.svg';
import { getBEMClasses } from 'helper/BEMHelper';
import { categoriesType } from '../../../../../propTypes/categoryType';

import 'assets/styles/components/data-table-dropdown.css';
import 'assets/styles/components/data-table.css';
import 'assets/styles/components/right-click-dropdown.css';

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
    disableMoveUp: PropTypes.bool.isRequired,
    disableMoveDown: PropTypes.bool.isRequired,
    deleteInsight: PropTypes.func.isRequired,
    moveInsightUp: PropTypes.func.isRequired,
    moveInsightDown: PropTypes.func.isRequired,
  };

  static defaultProps = {
    namePrefix: '',
  };

  renderImpact() {
    const { namePrefix } = this.props;
    const options = [
      { value: 1, label: <ThumbsUp /> },
      { value: 0, label: 'Impact' },
      { value: -1, label: <ThumbsDown /> },
    ];

    return (
      <Select
        items={options}
        name={`${namePrefix}.impact`}
        customClass={bemClasses('select')}
        placeholder="Impact"
      />
    );
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
        customClass={bemClasses('select', 'colored-category')}
        placeholder="Category"
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
        customClass={bemClasses('select')}
        placeholder="Tag"
      />
    );
  }

  renderDropdown() {
    return (
      <ContextMenu id={`row-dropdown-${this.props.item.id}`}>
        <MenuItem
          disabled={this.props.disableMoveUp}
          onClick={() => this.props.moveInsightUp()}
          data={{ action: 'move up' }}>
          Move Insight Up
        </MenuItem>
        <MenuItem
          disabled={this.props.disableMoveDown}
          onClick={() => this.props.moveInsightDown()}
          data={{ action: 'move down' }}>
          Move Insight Down
        </MenuItem>
        <MenuItem
          onClick={() => this.props.deleteInsight(this.props.namePrefix)}
          data={{ action: 'delete' }}>
          Delete Selected Insight(s)
        </MenuItem>
        <SubMenu title="Mute Selected Insight(s)..">
          <MenuItem onClick={() => {}} data={{ action: 'mute till tomorrow' }}>
            Mute till Tomorrow
          </MenuItem>
          <MenuItem onClick={() => {}} data={{ action: 'mute for a week' }}>
            Mute for a Week
          </MenuItem>
          <MenuItem onClick={() => {}} data={{ action: 'mute for a month' }}>
            Mute for a Month
          </MenuItem>
          <MenuItem onClick={() => {}} data={{ action: 'mute forever' }}>
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
    const { isNew, item, namePrefix, categories, categoryKey } = this.props;
    const textColorModifier = isNew ? { modifiers: 'is-new' } : {};
    const idCellModifiers = ['id', 'for-text'];
    const categoryCellModifiers = ['category'];
    
    if (categoryKey) {
      idCellModifiers.push('white-text');
      categoryCellModifiers.push('white-text');
    }
    const selectedCategory = categories[item.categoryId];
    const color = selectedCategory ? selectedCategory.color : null;

    if (!this.props.item.isActive) return null;

    return (
      <tr
        className={bemClasses(textColorModifier)}
        id={`editable-row-${item.id}`}>
        <td className={bemClasses('cell', 'for-icons')}>
          {isNew ? (
            <img
              className={bemClasses('insight-icon')}
              alt="new insight"
              src={LightningIcon}
            />
          ) : null}
          {this.renderDropdown()}
        </td>
        <td
          className={bemClasses('cell', idCellModifiers)}
          style={{ backgroundColor: color }}>
          {this.addDropdownTrigger(item, categoryKey ? categoryKey : 'ID')}
        </td>
        <td
          className={bemClasses('cell', categoryCellModifiers)}
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
