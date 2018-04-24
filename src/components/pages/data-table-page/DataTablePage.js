import React from 'react';
import DataTableContainer from './data-table/DataTableContainer';
import { getBEMClasses } from 'helper/BEMHelper';
import 'assets/styles/data-table-page.css';

const dataTable = 'data-table-page';
const bemClasses = getBEMClasses([dataTable]);

class DataTablePage extends React.Component {
  render() {
    return (
      <div className={bemClasses()}>
        <DataTableContainer />
      </div>
    );
  }
}

export default DataTablePage;
