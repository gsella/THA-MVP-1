import React from 'react';
import PropTypes from 'prop-types';
import TableRow from './table-row/TableRow';
import { getBEMClasses } from 'helper/BEMHelper';
import 'assets/styles/data-table.css';

const dataTable = 'data-table';
const bemClasses = getBEMClasses([dataTable]);

class DataTable extends React.Component {
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
    const tableData = [].concat(this.props.chartData.bubbles);
    const tableLength = tableData.length + 1;

    for (let i = tableLength; i < tableLength + 4; i++) {
      tableData.push({
        id: i,
        categoryId: 0,
        tagId: 0,
        categoryKey: '',
        insight: 'Google Home',
        popularity: 0,
        instances: 555,
        description: '',
        isNew: true,
      });
    }

    return tableData.map((item) => 
      <TableRow 
        key={item.id}
        item={item}
        allCategories={categories}
        allTags={tags}
        isNew={('isNew' in item)}
      />
    )
  }

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

DataTable.propTypes = {
  chartData: PropTypes.object.isRequired,
};

export default DataTable;
