import React from 'react';
import PropTypes from 'prop-types';
import TableRow from './table-row/TableRow';
import TableGroup from './table-group/TableGroup';
import { getBEMClasses } from 'helper/BEMHelper';
import { categoriesType } from '../../../../propTypes/categoryType';

import 'assets/styles/data-table.css';

const dataTable = 'data-table';
const bemClasses = getBEMClasses([dataTable]);

class InsightsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    tags: PropTypes.object.isRequired,
    categories: categoriesType,
    chartData: PropTypes.object.isRequired,
    changeFormValue: PropTypes.func.isRequired,
    getInsights: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getInsights();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.chartData.bubbles && nextProps.chartData.bubbles) {
      this.props.initialize(nextProps.initialValues);
    }
  }

  renderTableContent() {
    const { tags, categories } = this.props;
    const { bubbles } = this.props.chartData;
    const querry = this.props.searchQuerry;
    const insightsFormData = this.props.insightsFormData;
    let matchingData = bubbles;

    if (querry.length > 0) {
      matchingData = matchingData.filter(
        item =>
          insightsFormData[`insight-${item.id}`]
            .toLowerCase()
            .indexOf(querry.toLowerCase()) > -1
      );
    }

    if (!this.props.isGrouped) {
      const amount = matchingData.length;

      return matchingData.map((item, key) => (
        <TableRow
          key={item.id}
          item={item}
          categories={categories}
          allTags={tags}
          isNew={'isNew' in item ? item.isNew : false}
          {...this.props}
          disableMoveUp={key === 0}
          disableMoveDown={key === amount - 1}
        />
      ));
    } else {
      const options = [];
      const data = matchingData;
      let filterField = '';

      if (this.props.groupedBy === 'tags') {
        Object.keys(tags).forEach(function(key) {
          options[key] = { name: tags[key].name };
        });
        filterField = 'tagId';
      } else {
        Object.keys(categories).forEach(function(key) {
          options[key] = {
            name: `${categories[key].name[0]} - ${categories[key].name}`,
            color: categories[key].color,
          };
        });
        filterField = 'categoryId';
      }

      const groups = options.map((item, key) => (
        <TableGroup
          key={`${this.state.groupedBy}-${key}`}
          groupName={item.name}
          color={'color' in item ? item.color : null}
          content={data.filter(item => item[filterField] === key)}
          categories={categories}
          allTags={tags}
          {...this.props}
        />
      ));
      let ungrouped = data.filter(item => item[filterField] === 0);
      const amount = ungrouped.length;

      ungrouped = ungrouped.map((item, key) => (
        <TableRow
          key={item.id}
          item={item}
          categories={categories}
          allTags={tags}
          isNew={'isNew' in item ? item.isNew : false}
          {...this.props}
          disableMoveUp={key === 0}
          disableMoveDown={key === amount - 1}
        />
      ));

      return (
        <React.Fragment>
          {groups}
          {ungrouped}
        </React.Fragment>
      );
    }
  }

  renderEmptyRow() {
    const { tags, categories } = this.props;
    const { bubbles } = this.props.chartData;
    let newId = 0;

    if (bubbles) {
      bubbles.forEach(element => {
        if (newId < element.id) newId = element.id;
      });

      newId += 1;
    }

    const newInsight = {
      id: newId,
      categoryId: 0,
      tagId: 0,
      categoryKey: '',
      insight: '',
      popularity: 0,
      instances: 0,
      description: '',
      isNew: true,
    };

    return (
      <TableRow
        key={newInsight.id}
        item={newInsight}
        categories={categories}
        allTags={tags}
        isNew={true}
        {...this.props}
        disableMoveUp={true}
        disableMoveDown={true}
      />
    );
  }

  render() {
    const { bubbles } = this.props.chartData;

    return (
      <div className={bemClasses()}>
        <form>
          <table className={bemClasses('content')}>
            <tbody>
              {bubbles && this.renderTableContent()}
              {/*bubbles && this.renderEmptyRow()*/}
            </tbody>
          </table>
        </form>
      </div>
    );
  }
}

export default InsightsTable;
