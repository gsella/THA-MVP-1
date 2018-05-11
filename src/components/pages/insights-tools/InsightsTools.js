import React from 'react';
import SearchForm from './search-form/SearchForm';
import PropTypes from 'prop-types';
import Select from 'components/common/select/Select';
import InsightsTable from './insights-table/InsightsTableContainer';
import ConfigurationPageWrapperContainer from 'components/common/configuration-page-wrapper/ConfigurationPageWrapperContainer';
import { getBEMClasses } from 'helper/BEMHelper';
import 'assets/styles/insights-tools.css';

const insightsTools = 'insights-tools';
const bemClasses = getBEMClasses([insightsTools]);

class InsightsTools extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGrouped: false,
      groupedBy: 'categories',
    };
  }

  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    dropdownValues: PropTypes.object,
  };

  static getDerivedStateFromProps(nextProps, prevProps) {
    const dropdownValues = nextProps.dropdownValues;
    if (dropdownValues) {
      const eventKey = dropdownValues.eventKey;

      if (eventKey === 1) {
        return { isGrouped: true, groupedBy: 'categories' };
      } else if (eventKey === 2) {
        return { isGrouped: true, groupedBy: 'tags' };
      } else {
        return { isGrouped: false };
      }
    }
    return null;
  }

  handleSearch(querry) {
    if ('searchForm' in querry) {
      if (querry.searchForm.trim().length > 0) {
        this.props.getMatchingData(querry.searchForm);
      }
    }
  }

  render() {
    const { items } = this.props;

    return (
      <ConfigurationPageWrapperContainer>
        <div className={bemClasses()}>
          <div className={bemClasses('search-panel')}>
            <SearchForm />
            <Select
              items={items}
              name={`dropdown.eventKey`}
              placeholder={'Group Same'}
              customClass="table-row-dropdown-select"
            />
          </div>
          <InsightsTable
            isGrouped={this.state.isGrouped}
            groupedBy={this.state.groupedBy}
          />
        </div>
      </ConfigurationPageWrapperContainer>
    );
  }
}

export default InsightsTools;
