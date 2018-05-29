import React from 'react';
import SearchForm from './search-form/SearchForm';
import PropTypes from 'prop-types';
import Select from 'components/common/select/Select';
import InsightsTable from './insights-table/InsightsTableContainer';
import InsightsFooter from './insights-footer/InsightsFooter';
import ThunderTitle from 'components/common/thunder-title/ThunderTitle';
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
    return null;
  }

  componentDidMount() {
    this.props.getThunders();
  }

  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    groupId: PropTypes.number,
    currentThunder: PropTypes.object,
    updateInsights: PropTypes.func.isRequired,
  };

  render() {
    const { items, currentThunder } = this.props;
    return (
      <React.Fragment>
        <ThunderTitle
          title={'name' in currentThunder ? currentThunder.name : ''}
        />

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

        <InsightsFooter updateInsights={this.props.updateInsights} />
      </React.Fragment>
    );
  }
}

export default InsightsTools;
