import React from 'react';
import PropTypes from 'prop-types';
import TableRow from '../table-row/TableRowContainer';

class UngroupedInsights extends React.Component {
  moveInsightUp = index => {
    this.props.fields.swap(index, index - 1);
  };

  moveInsightDown = index => {
    this.props.fields.swap(index, index + 1);
  };

  render() {
    const { categories, tags, fields, searchQuery, categoryKeys } = this.props;
    const formValues = fields.getAll();
    let matchingData = formValues;

    if (searchQuery.length > 0) {
      const queryRegexp = new RegExp(searchQuery, 'i');
      matchingData = matchingData.filter(
        item => ('insight' in item ? item.insight.match(queryRegexp) : false)
      );
    }

    return fields.map((insight, index) => {
      if (matchingData.includes(formValues[index])) {
        return (
          <TableRow
            namePrefix={insight}
            key={index}
            index={index}
            categories={categories}
            allTags={tags}
            isNew={false}
            categoryKey={categoryKeys[index].categoryKey}
            disableMoveUp={index === 0}
            disableMoveDown={index === formValues.length - 1}
            moveInsightUp={this.moveInsightUp}
            moveInsightDown={this.moveInsightDown}
          />
        );
      }
      return null;
    });
  }
}

UngroupedInsights.propTypes = {
  categories: PropTypes.object.isRequired,
  tags: PropTypes.object.isRequired,
  fields: PropTypes.object.isRequired,
  searchQuery: PropTypes.string.isRequired,
};

export default UngroupedInsights;
