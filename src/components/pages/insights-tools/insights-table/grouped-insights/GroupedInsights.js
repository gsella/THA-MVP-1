import React from 'react';
import PropTypes from 'prop-types';
import TableRow from '../table-row/TableRowContainer';
import TableGroup from '../table-group/TableGroup';
import { impactNames } from 'constants/impactConstants';

const mapGroupIdToProperty = {
  1: 'categories',
  2: 'tags',
  3: 'impact',
};

const GroupedByCategoryInsights = props => {
  const options = [];
  const formName = 'insights';
  let filterField = '';
  const {
    categories,
    tags,
    categoryKeys,
    formValues,
    groupId,
    searchQuery,
    ...otherProps
  } = props;

  if (mapGroupIdToProperty[groupId] === 'tags') {
    Object.keys(tags).forEach(key => {
      options[key] = { key: Number(key), name: tags[key].name };
    });
    filterField = 'tagId';
  } else if (mapGroupIdToProperty[groupId] === 'categories') {
    Object.keys(categories).forEach(key => {
      options[key] = {
        key: Number(key),
        name: `${categories[key].name[0]} - ${categories[key].name}`,
        color: categories[key].color,
      };
    });
    filterField = 'categoryId';
  } else {
    Object.keys(impactNames).forEach(key => {
      options[key] = { key: impactNames[key].id, name: impactNames[key].name };
    });
    filterField = 'impact';
  }

  let matchingData = formValues;

  if (searchQuery.length > 0) {
    const queryRegexp = new RegExp(searchQuery, 'i');
    matchingData = matchingData.filter(
      item => ('insight' in item ? item.insight.match(queryRegexp) : false)
    );
  }

  const groups = options.map((item, key) => {
    const group = formValues.filter(
      insight => insight[filterField] === item.key
    );

    return (
      <TableGroup
        key={`${item.name}-${key}`}
        groupName={item.name}
        color={'color' in item ? item.color : null}
        content={formValues
          .map((field, index) => {
            if (
              group.some(i => i.id === field.id) &&
              field.isActive &&
              matchingData.includes(field)
            )
              return (
                <TableRow
                  namePrefix={`${formName}[${index}]`}
                  key={index}
                  categories={categories}
                  allTags={tags}
                  isNew={false}
                  categoryKey={categoryKeys[index].categoryKey}
                  {...otherProps}
                  filterInsightsByCategoryLength={group.length}
                  moveInsightUp={props.moveInsightUp}
                  moveInsightDown={props.moveInsightDown}
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
  fields: PropTypes.object.isRequired,
  groupId: PropTypes.number.isRequired,
  searchQuery: PropTypes.string.isRequired,
  moveInsightUp: PropTypes.func,
  moveInsightDown: PropTypes.func,
};

export default GroupedByCategoryInsights;
