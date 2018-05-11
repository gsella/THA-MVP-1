import React from 'react';
import PropTypes from 'prop-types';
import TableRow from '../table-row/TableRowContainer';
import TableGroup from '../table-group/TableGroup';

const GroupedByCategoryInsights = props => {
  const options = [];
  const formName = 'insights';
  let filterField = '';
  const { categories, tags, formValues, fields, ...otherProps } = props;

  //TODO: Need to pass groupedBy into this component through global state as for now it's undefined and category is chosen as filter.
  if (props.groupedBy === 'tags') {
    Object.keys(tags).forEach(key => {
      options[key] = { name: tags[key].name };
    });
    filterField = 'tagId';
  } else {
    Object.keys(categories).forEach(key => {
      options[key] = {
        name: `${categories[key].name[0]} - ${categories[key].name}`,
        color: categories[key].color,
      };
    });
    filterField = 'categoryId';
  }

  const groups = options.map((item, key) => {
    const group = formValues.filter(item => item[filterField] === key);
    return (
      <TableGroup
        key={`-${key}`}
        groupName={item.name}
        color={'color' in item ? item.color : null}
        content={formValues
          .map((field, index) => {
            if (group.some(i => i.id === field.id) && field.isActive)
              return (
                <TableRow
                  namePrefix={`${formName}[${index}]`}
                  key={index}
                  categories={categories}
                  allTags={tags}
                  item={field}
                  isNew={false}
                  {...otherProps}
                  disableMoveUp={index === 0}
                  disableMoveDown={index === formValues.length - 1}
                  moveInsightUp={() => fields.swap(index, index - 1)}
                />
              );
            return null;
          })
          .filter(item => item)}
        categories={categories}
        allTags={tags}
        {...props}
      />
    );
  });

  // TODO: make sure this is working (no, its not working) after adding new insight feature
  // let ungrouped = matchingData.filter(item => item[filterField] === 0);
  // const amount = ungrouped.length;
  //
  // const ungroupedComponents = ungrouped.map((item, key) => (
  //   <TableRow
  //     key={item.id}
  //     item={item}
  //     categories={categories}
  //     allTags={tags}
  //     isNew={'isNew' in item ? item.isNew : false}
  //     {...this.props}
  //     disableMoveUp={key === 0}
  //     disableMoveDown={key === amount - 1}
  //   />
  // ));

  return (
    <React.Fragment>
      {groups}
      {/*{ungroupedComponents}*/}
    </React.Fragment>
  );
};

GroupedByCategoryInsights.propTypes = {
  categories: PropTypes.object.isRequired,
  tags: PropTypes.object.isRequired,
  formValues: PropTypes.array.isRequired,
  fields: PropTypes.object.isRequired,
};

export default GroupedByCategoryInsights;
