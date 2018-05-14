import React from 'react';
import SearchForm from './search-form/SearchForm';
import PropTypes from 'prop-types';
import Select from 'components/common/select/Select';
import InsightsTable from './insights-table/InsightsTableContainer';
import ConfigurationPageWrapperContainer from 'components/common/configuration-page-wrapper/ConfigurationPageWrapperContainer';
import { getBEMClasses } from 'helper/BEMHelper';
import 'assets/styles/components/insights-tools.css';

const insightsTools = 'insights-tools';
const bemClasses = getBEMClasses([insightsTools]);

class InsightsTools extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGrouped: false,
    };
  }

  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    groupId: PropTypes.number,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const groupId = nextProps.groupId;
    if (groupId !== undefined) {
      if (prevState.isGrouped) {
        if (groupId !== 0) {
          return null;
        } else {
          return { isGrouped: false };
        }
      } else {
        if (groupId !== 0) {
          return { isGrouped: true };
        } else {
          return null;
        }
      }
    }
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
              name={`groupId`}
              placeholder={'Group Same'}
              customClass="table-row-dropdown-select"
            />
          </div>
          <InsightsTable isGrouped={this.state.isGrouped} />
        </div>
      </ConfigurationPageWrapperContainer>
    );
  }
}

export default InsightsTools;
