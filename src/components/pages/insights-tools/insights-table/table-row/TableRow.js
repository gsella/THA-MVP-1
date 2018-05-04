import React from 'react';
import PropTypes from 'prop-types';
import {ContextMenu, MenuItem, ContextMenuTrigger, SubMenu} from 'react-contextmenu';
import CustomDropdown from 'components/common/dropdown/CustomDropdown';
import Input from 'components/common/input/InputField';
import ThumbsUp from 'react-icons/lib/fa/thumbs-up';
import ThumbsDown from 'react-icons/lib/fa/thumbs-down';
import ThunderIcon from 'assets/images/thunder-icon.svg';
import {getBEMClasses} from 'helper/BEMHelper';
import 'assets/styles/data-table.css';
import 'assets/styles/right-click-dropdown.css';

const tableRow = 'data-table-row';
const bemClasses = getBEMClasses([tableRow]);
const dropdownBemClasses = getBEMClasses(['data-table-dropdown']);
const inputClass = 'data-table-input';

class TableRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryId: props.item.categoryId,
      description: props.item.description,
      tagId: props.item.tagId,
      impact: 0,
      insight: props.item.insight,
      color: (props.item.categoryId > 0) ? props.allCategories[props.item.categoryId].color : null,
    };

    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.handleDropdownSelect = this.handleDropdownSelect.bind(this);
    this.updateData = this.updateData.bind(this);
    this.handleRightClickDropdown = this.handleRightClickDropdown.bind(this);
  }

  handleChangeValue(e) {
    e.preventDefault();

    this.setState({[e.target.name]: e.target.value}, () => this.updateData());
  }

  handleDropdownSelect(name, eventKey) {
    if (name === 'category') {
      this.setState({
        categoryId: Number(eventKey),
        color: this.props.allCategories[eventKey].color,
      }, () => this.updateData());
    } else if (name === 'tag') {
      this.setState({tagId: Number(eventKey)}, () => this.updateData());
    } else {
      this.setState({impact: Number(eventKey)}, () => this.updateData());
      this.props.changeFormValue('insightsTable', `${name}-${this.props.item.id}`, eventKey);
    }
  }

  updateData() {
    const {categoryId, description, tagId, impact, insight} = this.state;
    const item = {...this.props.item, categoryId, description, tagId, impact, insight};

    this.props.updateChartData(item);
  }

  handleRightClickDropdown(e, data, target) {
    if (data.action === 'move up') this.props.moveInsightUp(this.props.item.id);
    if (data.action === 'move down') this.props.moveInsightDown(this.props.item.id);
    if (data.action === 'delete') this.props.deleteInsight(this.props.item.id);
    /// TODO: handle all menu functions depends on data.action
  }

  renderImpact() {
    const options = [
      {eventKey: 1, name: <ThumbsUp />},
      {eventKey: 0, name: 'Impact'},
      {eventKey: -1, name: <ThumbsDown />},
    ];

    return (
      <CustomDropdown
        id="impact"
        title={this.renderCurrentImpact()}
        options={options}
        handleChange={this.handleDropdownSelect}
        bemClasses={dropdownBemClasses}
      />
    );
  }

  renderCurrentImpact() {
    if (this.state.impact === 1) return <ThumbsUp />;
    if (this.state.impact === -1) return <ThumbsDown />;
    else return 'Impact';
  }

  renderCategory() {
    const options = [];
    const categories = this.props.allCategories;
    const categoryName = (this.state.categoryId > 0) ? this.props.allCategories[this.state.categoryId].name : '';
    const title = (categoryName !== '') ? `${categoryName[0]} - ${categoryName}` : 'Category';

    Object.keys(categories).forEach(function (key) {
      options.push({eventKey: key, name: categories[key].name})
    });

    return (
      <CustomDropdown
        id="category"
        title={title}
        options={options}
        handleChange={this.handleDropdownSelect}
        bemClasses={dropdownBemClasses}
      />
    );
  }

  renderTag() {
    const options = [];
    const tags = this.props.allTags;
    const tagName = (this.state.tagId > 0) ? this.props.allTags[this.state.tagId].name : 'Tag';

    Object.keys(tags).forEach(function (key) {
      options.push({eventKey: key, name: tags[key].name})
    });

    return (
      <CustomDropdown
        id="tag"
        title={tagName}
        options={options}
        handleChange={this.handleDropdownSelect}
        bemClasses={dropdownBemClasses}
      />
    );
  }

  renderDropdown() {
    return (
      <ContextMenu id={`row-dropdown-${this.props.item.id}`}>
        <MenuItem
          disabled={(this.props.disableMoveUp)}
          onClick={this.handleRightClickDropdown}
          data={{action: 'move up'}}
        >
          Move Insight Up
        </MenuItem>
        <MenuItem
          disabled={(this.props.disableMoveDown)}
          onClick={this.handleRightClickDropdown}
          data={{action: 'move down'}}
        >
          Move Insight Down
        </MenuItem>
        <MenuItem onClick={this.handleRightClickDropdown} data={{action: 'delete'}}>Delete Selected Insight(s)</MenuItem>
        <SubMenu title="Mute Selected Insight(s)..">
          <MenuItem onClick={this.handleRightClickDropdown} data={{action: 'mute till tomorrow'}}>Mute till Tomorrow</MenuItem>
          <MenuItem onClick={this.handleRightClickDropdown} data={{action: 'mute for a week'}}>Mute for a Week</MenuItem>
          <MenuItem onClick={this.handleRightClickDropdown} data={{action: 'mute for a month'}}>Mute for a Month</MenuItem>
          <MenuItem onClick={this.handleRightClickDropdown} data={{action: 'mute forever'}}>Mute Forever</MenuItem>
        </SubMenu>
      </ContextMenu>
    );
  }

  render() {
    const cellColorClass = (this.state.color) ? 'for-color-cell' : '';
    const textColorModifier = (this.props.isNew) ? {modifiers: 'is-new'} : {};

    return (
      <tr className={bemClasses(textColorModifier)} id={`editable-row-${this.props.item.id}`}>
        <td className={bemClasses('cell', 'for-icons')}>
          {(this.props.isNew) ? <img className={bemClasses('insight-icon')} alt="new insight" src={ThunderIcon} /> : null}
          {this.renderDropdown()}
        </td>
        <td
          className={bemClasses('cell', `${cellColorClass} for-id for-text`)}
          style={{backgroundColor: this.state.color}}
        >
          <ContextMenuTrigger id={`row-dropdown-${this.props.item.id}`}>
            {(this.props.item.categoryKey !== '') ? this.props.item.categoryKey : 'ID'}
          </ContextMenuTrigger>
        </td>
        <td
          className={bemClasses('cell', `${cellColorClass}`)}
          style={{backgroundColor: this.state.color}}
        >
          <ContextMenuTrigger id={`row-dropdown-${this.props.item.id}`}>
            {this.renderCategory()}
          </ContextMenuTrigger>
        </td>
        <td className={bemClasses('cell', 'for-input')}>
          <ContextMenuTrigger id={`row-dropdown-${this.props.item.id}`}>
            <Input
              placeholder="Key words"
              name={`insight-${this.props.item.id}`}
              customClass={inputClass}
            />
          </ContextMenuTrigger>
        </td>
        <td className={bemClasses('cell', 'for-input')}>
          <ContextMenuTrigger id={`row-dropdown-${this.props.item.id}`}>
            <Input
              placeholder="Description"
              name={`description-${this.props.item.id}`}
              customClass={inputClass}
            />
          </ContextMenuTrigger>
        </td>
        <td className={bemClasses('cell')}>
          <ContextMenuTrigger id={`row-dropdown-${this.props.item.id}`}>
            {this.renderTag()}
          </ContextMenuTrigger>
        </td>
        <td className={bemClasses('cell')}>
          <ContextMenuTrigger id={`row-dropdown-${this.props.item.id}`}>
            {this.renderImpact()}
          </ContextMenuTrigger>
        </td>
      </tr>
    );
  }
}

TableRow.propTypes = {
  item: PropTypes.object.isRequired,
  isNew: PropTypes.bool,
  allCategories: PropTypes.object.isRequired,
  allTags: PropTypes.object.isRequired,
  changeFormValue: PropTypes.func.isRequired,
};

export default TableRow;
