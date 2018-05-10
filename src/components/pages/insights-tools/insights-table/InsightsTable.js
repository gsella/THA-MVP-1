import React from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'redux-form';
import TableRow from './table-row/TableRowContainer';
import TableGroup from './table-group/TableGroup';
import { getBEMClasses } from 'helper/BEMHelper';
import { categoriesType } from '../../../../propTypes/categoryType';
import { insightsType } from '../../../../propTypes/insightType';

import 'assets/styles/data-table.css';

const dataTable = 'data-table';
const formName = 'insights';
const bemClasses = getBEMClasses([dataTable]);

class InsightsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    tags: PropTypes.object.isRequired,
    categories: categoriesType,
    insights: insightsType.isRequired,
    formValues: PropTypes.array,
    changeFormValue: PropTypes.func.isRequired,
    getInsights: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getInsights();
    this.props.initialize(this.props.initialValues);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.insights.length && nextProps.insights.length) {
      this.props.initialize(nextProps.initialValues);
    }
  }

  renderTableContent() {
    const { tags, categories, searchQuery, formValues } = this.props;

    if (!formValues) {
      return null;
    }

    let matchingData = formValues;

    if (searchQuery.length > 0) {
      const queryRegexp = new RegExp(searchQuery, 'i');
      matchingData = matchingData.filter(item =>
        item.insight.match(queryRegexp)
      );
    }

    if (!this.props.isGrouped) {
      return this.renderForm(this.renderUngrouped);
    } else {
      const options = [];
      let filterField = '';

      if (this.props.groupedBy === 'tags') {
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
        const group = matchingData.filter(item => item[filterField] === key);

        return (
          <TableGroup
            key={`${this.state.groupedBy}-${key}`}
            groupName={item.name}
            color={'color' in item ? item.color : null}
            content={this.renderForm(
              this.getRenderContentFunctionForGroup(group)
            )}
            categories={categories}
            allTags={tags}
            {...this.props}
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
    }
  }

  renderUngrouped = ({ fields }) => {
    const { categories, tags, formValues, ...otherProps } = this.props;

    return fields
      .map((insight, index) => {
        return (
          <TableRow
            namePrefix={insight}
            key={index}
            item={formValues[index]}
            categories={categories}
            allTags={tags}
            isNew={false}
            {...otherProps}
            disableMoveUp={index === 0}
            disableMoveDown={index === formValues.length - 1}
            moveInsightUp={() => fields.swap(index, index - 1)}
            moveInsightDown={() => fields.swap(index, index + 1)}
          />
        );
      })
      .filter(item => item.props.item.isActive);
  };

  getRenderContentFunctionForGroup = group => {
    return props => {
      return this.renderUngrouped(props).filter(insightItem =>
        group.some(i => i.id === insightItem.props.item.id)
      );
    };
  };

  renderForm(component) {
    return <FieldArray name={formName} component={component} />;
  }

  render() {
    const { insights } = this.props;

    return (
      <div className={bemClasses()}>
        <form>
          <table className={bemClasses('content')}>
            <tbody>{insights && this.renderTableContent()}</tbody>
          </table>
        </form>
      </div>
    );
  }
}

export default InsightsTable;
