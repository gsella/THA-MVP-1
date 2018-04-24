import React from 'react';
import PropTypes from 'prop-types';
import CustomDropdown from 'components/common/dropdown/CustomDropdown';
import ThumbsUp from 'react-icons/lib/fa/thumbs-up';
import ThumbsDown from 'react-icons/lib/fa/thumbs-down';
import ThunderIcon from 'assets/images/thunder-icon.svg';
import { getBEMClasses } from 'helper/BEMHelper';
import 'assets/styles/data-table.css';

const tableRow = 'data-table-row';
const bemClasses = getBEMClasses([tableRow]);
const dropdownBemClasses = getBEMClasses(['data-table-dropdown']);

class TableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryKey: (props.item.categoryKey === '') ? 'ID' : props.item.categoryKey,
      category: (props.item.categoryId > 0) ? props.allCategories[props.item.categoryId].name : 'Category',
      description: (props.item.description === '') ? 'Description' : props.item.description,
      tag: (props.item.tagId > 0) ? props.allTags[props.item.tagId].name : 'Tag',
      impact: 0,
      color: (props.item.categoryId > 0) ? props.allCategories[props.item.categoryId].color : null,
    };
  }

  renderImpact() {
    const options = [
      { eventKey: 1, name: <ThumbsUp /> },
      { eventKey: 2, name: 'Impact' },
      { eventKey: 3, name: <ThumbsDown /> }
    ];

    return (
      <CustomDropdown
        id="impact-dropdown"
        title={this.renderCurrentImpact()}
        options={options}
        bemClasses={dropdownBemClasses}
      />
    );
  }

  renderCurrentImpact() {
    if (this.props.impact === 1) return <ThumbsUp />;
    if (this.props.impact === -1) return <ThumbsDown />;
    else return 'Impact';
  }

  renderCategory() {
    const options = [];
    const categories = this.props.allCategories;
    const title = (this.state.category !== '') ? `${this.state.category[0]} - ${this.state.category}` : this.state.category;

    Object.keys(categories).forEach(function (key) {
      options.push({ eventKey: key, name: categories[key].name })
    });

    return (
      <CustomDropdown
        id="category-dropdown"
        title={title}
        options={options}
        bemClasses={dropdownBemClasses}
      />
    );
  }

  renderTag() {
    const options = [];
    const tags = this.props.allTags;

    Object.keys(tags).forEach(function (key) {
      options.push({ eventKey: key, name: tags[key].name })
    });

    return (
      <CustomDropdown
        id="tags-dropdown"
        title={this.state.tag}
        options={options}
        bemClasses={dropdownBemClasses}
      />
    );
  }

  render() {
    const textColorModifier = (this.props.isNew) ? { modifiers: 'is-new' } : {};

    return (
      <tr className={bemClasses(textColorModifier)}>
        <td className={bemClasses('cell', 'for-icons')}>
          {(this.props.isNew) ? <img className={bemClasses('insight-icon')} alt="new insight"
                                     src={ThunderIcon} /> : null}
        </td>
        <td
          className={bemClasses('cell', ['for-text', 'for-color-cell'])}
          style={{ backgroundColor: this.state.color }}
        >
          {this.state.categoryKey}
        </td>
        <td
          className={bemClasses('cell', 'for-color-cell')}
          style={{ backgroundColor: this.state.color }}
        >
          {this.renderCategory()}
        </td>
        <td className={bemClasses('cell', 'for-text')}>{this.props.item.insight}</td>
        <td className={bemClasses('cell', 'for-text')}>{this.state.description}</td>
        <td className={bemClasses('cell')}>{this.renderTag()}</td>
        <td className={bemClasses('cell')}>{this.renderImpact()}</td>
      </tr>
    );
  }
}

TableRow.propTypes = {
  item: PropTypes.object.isRequired,
  isNew: PropTypes.bool,
  allCategories: PropTypes.object.isRequired,
  allTags: PropTypes.object.isRequired,
};

export default TableRow;
