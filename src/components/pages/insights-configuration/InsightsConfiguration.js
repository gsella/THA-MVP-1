import React from 'react';
import PropTypes from 'prop-types';
import TableRow from './table-row/TableRow';
import { getBEMClasses } from 'helper/BEMHelper';
import 'assets/styles/data-table.css';

const dataTable = 'data-table';
const bemClasses = getBEMClasses([dataTable]);

class InsightsConfiguration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getChartData();
  }
  
  renderTableContent(){
    const tags = this.props.chartData.tags;
    const categories = this.props.chartData.categories;

    return this.props.chartData.bubbles.map((item) => 
      <TableRow 
        key={`${item.categoryId}-${item.categoryKey}-${item.id}`}
        item={item}
        allCategories={categories}
        allTags={tags}
        isNew={('isNew' in item)}
        updateChartData={this.props.updateChartData}
        moveInsightUp={this.props.moveInsightUp}
        moveInsightDown={this.props.moveInsightDown}
        deleteInsight={this.props.deleteInsight}
      />
    )
  }

  //TODO collapse rows by category and tags
  //TODO create search
  render() {
    return (
      <table className={bemClasses()}>
        <tbody>
          {this.props.chartData.bubbles && this.renderTableContent()}
        </tbody>
      </table>
    );
  }
}

InsightsConfiguration.propTypes = {
  chartData: PropTypes.object.isRequired,
};

export default InsightsConfiguration;
