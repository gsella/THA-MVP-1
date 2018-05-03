import React from 'react';
import SearchForm from './search-form/SearchForm';
import CustomDropdown from 'components/common/dropdown/CustomDropdown';
import InsightsTable from './insights-table/InsightsTableContainer';
import ConfigurationPageWrapper from 'components/common/configuration-page-wrapper/ConfigurationPageWrapper';
import { getBEMClasses } from 'helper/BEMHelper';
import 'assets/styles/insights-tools.css';

const insightsTools = 'insights-tools';
const bemClasses = getBEMClasses([insightsTools]);
const dropdownStyles = getBEMClasses(['dropdown']);

class InsightsTools extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGrouped: true,
      groupedBy: 'categories',
      showSearchResults: false,
    };

    this.handleGroupInsights = this.handleGroupInsights.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleGroupInsights(name, eventKey) {
    if (eventKey === 1) {
      this.setState({isGrouped: true, groupedBy: 'categories'});
    } else if (eventKey === 2) {
      this.setState({isGrouped: true, groupedBy: 'tags'});
    } else {
      this.setState({isGrouped: false});
    }
  }

  handleSearch(querry) {
    if ('searchForm' in querry) {
      if (querry.searchForm.trim().length > 0) {
        this.setState({showSearchResults: true}, () => this.props.getMatchingData(querry.searchForm));
      } else {
        this.setState({showSearchResults: false});
      } 
    } else {
      this.setState({showSearchResults: false});
    }
  }

  render() {
    return (
      <ConfigurationPageWrapper>
        <div className={bemClasses()}>
          <div className={bemClasses('search-panel')}>
            <SearchForm onSubmit={this.handleSearch} />
            <CustomDropdown
              id='group-same'
              title='Group Same'
              options={[{ eventKey: 0, name: `Don't group` }, { eventKey: 1, name: 'Category' }, { eventKey: 2, name: 'Tag' }]}
              handleChange={this.handleGroupInsights}
              bemClasses={dropdownStyles}
            />
          </div>
          <InsightsTable
            isGrouped={this.state.isGrouped}
            groupedBy={this.state.groupedBy}
            showSearchResults={this.state.showSearchResults}
          />
        </div>
      </ConfigurationPageWrapper>
    );
  }
}

export default InsightsTools;
