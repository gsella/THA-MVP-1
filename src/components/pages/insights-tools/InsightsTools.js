import React from 'react';
import SearchForm from './search-form/SearchForm';
import CustomDropdown from 'components/common/dropdown/CustomDropdown';
import DataTableContainer from 'components/pages/data-table/DataTableContainer';
import ConfigurationPageWrapper from 'components/common/configuration-page-wrapper/ConfigurationPageWrapper';
import { getBEMClasses } from 'helper/BEMHelper';
import 'assets/styles/insights-tools.css';

const insightsTools = 'insights-tools';
const bemClasses = getBEMClasses([insightsTools]);
const dropdownStyles = getBEMClasses(['dropdown']);

class InsightsTools extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ConfigurationPageWrapper>
        <div className={bemClasses()}>
          <div className={bemClasses('search-panel')}>
            <SearchForm onSubmit={() => this.props.getMatchingData()} />
            <CustomDropdown
              title='Group Same'
              options={[{ eventKey: 1, name: 'Category' }, { eventKey: 2, name: 'Tag' }]}
              bemClasses={dropdownStyles}
            />
          </div>
          <DataTableContainer />
        </div>
      </ConfigurationPageWrapper>
    );
  }
}

export default InsightsTools;
