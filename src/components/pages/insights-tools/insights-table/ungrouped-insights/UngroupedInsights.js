import React from 'react';
import PropTypes from 'prop-types';
import TableRow from '../table-row/TableRowContainer';

const UngroupedInsights = props => {
  const {
    categories,
    tags,
    fields,
    searchQuery,
    categoryKeys,
    ...otherProps
  } = props;
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
          categories={categories}
          allTags={tags}
          isNew={false}
          categoryKey={categoryKeys[index].categoryKey}
          {...otherProps}
          disableMoveUp={index === 0}
          disableMoveDown={index === formValues.length - 1}
          moveInsightUp={() => fields.swap(index, index - 1)}
          moveInsightDown={() => fields.swap(index, index + 1)}
        />
      );
    }
    return null;
  });
};

UngroupedInsights.propTypes = {
  categories: PropTypes.object.isRequired,
  tags: PropTypes.object.isRequired,
  fields: PropTypes.object.isRequired,
  searchQuery: PropTypes.string.isRequired,
};

export default UngroupedInsights;
