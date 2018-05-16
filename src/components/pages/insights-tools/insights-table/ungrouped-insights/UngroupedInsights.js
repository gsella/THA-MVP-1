import React from 'react';
import PropTypes from 'prop-types';
import TableRow from '../table-row/TableRowContainer';

class UngroupedInsights extends React.Component {
  render() {
    const {
      categories,
      tags,
      fields,
      searchQuery,
      categoryKeys,
      moveInsightUp,
      moveInsightDown,
    } = this.props;
    const formValues = fields.getAll();
    let matchingData = formValues;

    if (searchQuery.length > 0) {
      const queryRegexp = new RegExp(searchQuery, 'i');
      matchingData = matchingData.filter(
        item => ('insight' in item ? item.insight.match(queryRegexp) : false)
      );
    }

    return fields.map((insight, index) => {
      const filterInsightsByCategory = formValues.filter(
        insights => insights.categoryId === formValues[index].categoryId
      );

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
            filterInsightsByCategoryLength={filterInsightsByCategory.length}
            moveInsightUp={moveInsightUp}
            moveInsightDown={moveInsightDown}
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
  moveInsightUp: PropTypes.func,
  moveInsightDown: PropTypes.func,
};

export default UngroupedInsights;
