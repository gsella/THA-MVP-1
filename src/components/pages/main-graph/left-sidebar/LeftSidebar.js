import React from 'react';
import PropTypes from 'prop-types';
import ThunderLogo from 'assets/images/logo-thunder.png';
import Category from 'components/pages/main-graph/left-sidebar/Categories/Category';
import { getBEMClasses } from 'helper/BEMHelper';
import ThunderIcon from 'assets/images/thunder-icon-small.svg';
import 'assets/styles/left-sidebar.css';

const leftSidebar = 'left-sidebar';
const bemClasses = getBEMClasses([leftSidebar]);

class LeftSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getChartData();
  }

  getChartData() {
    if (this.props.chartData && this.props.chartData.bubbles) {
      const chartData = this.props.chartData.bubbles.reduce((res, item) => {
        const category = this.props.chartData.categories[item.categoryId];
        res[category.name] = res[category.name] || {
          data: [],
          color: this.props.chartData.categories[item.categoryId].color,
        };

        res[category.name].data.push(item);

        return res;
      }, {});

      return Object.keys(chartData).map(key => ({
        category: key,
        color: chartData[key].color,
        data: chartData[key].data,
      }));
    }
  }

  render() {
    return (
      <div className={bemClasses()}>
        <div className={bemClasses('logo')}>
          <img src={ThunderLogo} alt="thunder-logo" width={240} />
        </div>
        <div className={bemClasses('insight-title')}>
          <div className={bemClasses('thunder-icon')}>
            <img src={ThunderIcon} alt="thunder" width={28} height={28} />
          </div>
          <div>Gogoro 2 Series</div>
        </div>
        <div>
          {this.props.chartData &&
            this.props.chartData.bubbles && (
              <Category categories={this.getChartData()} hiddenInsights={this.props.hiddenInsights} />
            )}
        </div>
      </div>
    );
  }
}

LeftSidebar.propTypes = {
  chartData: PropTypes.object.isRequired,
};

export default LeftSidebar;
