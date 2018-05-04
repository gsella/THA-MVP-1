import React from 'react';
import PropTypes from 'prop-types';
import TableRow from './table-row/TableRow';
import TableGroup from './table-group/TableGroup';
import {getBEMClasses} from 'helper/BEMHelper';
import 'assets/styles/data-table.css';

const dataTable = 'data-table';
const bemClasses = getBEMClasses([dataTable]);

class InsightsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getChartData();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.chartData.bubbles && nextProps.chartData.bubbles) {
      this.props.initialize(nextProps.initialValues);
    }
  }

  renderTableContent() {
    const tags = this.props.chartData.tags;
    const categories = this.props.chartData.categories;
    let matchingData = [];
    if (!this.props.showSearchResults) {
      matchingData = this.props.chartData.bubbles;
    } else {
      matchingData = this.props.chartData.bubbles.filter(item => {
        const matchingId = this.props.matchingData.filter(id => (item.id === id));

        return (matchingId.length > 0);
      });
    }

    if (!this.props.isGrouped) {
      const amount = matchingData.length;

      return matchingData.map((item, key) =>
        <TableRow
          key={item.id}
          item={item}
          allCategories={categories}
          allTags={tags}
          isNew={('isNew' in item) ? item.isNew : false}
          {...this.props}
          disable={(key === 0) ? 'moveUp' : (key === amount - 1) ? 'moveDown' : 'none'}
        />
      );
    } else {
      const options = [];
      const data = matchingData;
      let filterField = '';

      if (this.props.groupedBy === 'tags') {
        Object.keys(tags).forEach(function (key) {
          options[key] = {name: tags[key].name}
        });
        filterField = 'tagId';
      } else {
        Object.keys(categories).forEach(function (key) {
          options[key] = {name: `${categories[key].name[0]} - ${categories[key].name}`, color: categories[key].color}
        });
        filterField = 'categoryId';
      }

      const groups = options.map((item, key) =>
        <TableGroup
          key={`${this.state.groupedBy}-${key}`}
          groupName={item.name}
          color={('color' in item) ? item.color : null}
          content={data.filter(item => (item[filterField] === key))}
          allCategories={categories}
          allTags={tags}
          {...this.props}
        />
      );
      let ungrouped = data.filter(item => (item[filterField] === 0));
      const amount = ungrouped.length;

      ungrouped = ungrouped.map((item, key) =>
        <TableRow
          key={item.id}
          item={item}
          allCategories={categories}
          allTags={tags}
          isNew={('isNew' in item) ? item.isNew : false}
          {...this.props}
          disable={(key === 0) ? 'moveUp' : (key === amount - 1) ? 'moveDown' : 'none'}
        />
      );

      return (
        <React.Fragment>
          {groups}
          {ungrouped}
        </React.Fragment>
      )
    }
  }

  renderEmptyRow() {
    let newId = 0;

    if (this.props.chartData.bubbles) {
      this.props.chartData.bubbles.forEach(element => {
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
    }

    return (
      <TableRow
        key={newInsight.id}
        item={newInsight}
        allCategories={this.props.chartData.categories}
        allTags={this.props.chartData.tags}
        isNew={true}
        {...this.props}
        disable="none"
      />
    )
  }

  render() {
    return (
      <div className={bemClasses()}>
        <form>
          <table className={bemClasses('content')}>
            <tbody>
              {this.props.chartData.bubbles && this.renderTableContent()}
              {/*this.props.chartData.bubbles && this.renderEmptyRow()*/}
            </tbody>
          </table>
        </form>
      </div>
    );
  }
}

InsightsTable.propTypes = {
  chartData: PropTypes.object.isRequired,
};

export default InsightsTable; 
