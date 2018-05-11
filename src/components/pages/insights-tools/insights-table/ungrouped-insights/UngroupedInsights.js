import React from 'react';
import PropTypes from 'prop-types';
import TableRow from '../table-row/TableRowContainer';

const UngroupedInsights = props => {
  const { categories, tags, formValues, fields, ...otherProps } = props;

  return fields.map((insight, index) => {
    return (
      <TableRow
        namePrefix={insight}
        key={index}
        categories={categories}
        allTags={tags}
        isNew={false}
        item={formValues[index]}
        {...otherProps}
        disableMoveUp={index === 0}
        disableMoveDown={index === formValues.length - 1}
        moveInsightUp={() => fields.swap(index, index - 1)}
        moveInsightDown={() => fields.swap(index, index + 1)}
      />
    );
  });
};

UngroupedInsights.propTypes = {
  categories: PropTypes.object.isRequired,
  tags: PropTypes.object.isRequired,
  formValues: PropTypes.array.isRequired,
  fields: PropTypes.object.isRequired,
};

export default UngroupedInsights;
