import React from 'react';
import PropTypes from 'prop-types';
import Category from 'components/pages/main-graph/left-sidebar/Categories/Category';
import { getBEMClasses } from 'helper/BEMHelper';
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
        res[category.name] = res[category.name] ||
          { data: [], color: this.props.chartData.categories[item.categoryId].color };

        res[category.name].data.push(item);

        return res;
      }, {});

      return Object.keys(chartData).map((key) => ({
        category: key,
        color: chartData[key].color,
        data: chartData[key].data,
      }));
    }
  }

  render() {
    return (
      <div className={bemClasses()}>
        <div className={bemClasses('logo')}>THINDERAct</div>
        <div className={bemClasses('series')}>
          <span>LogoTh</span>
          <span>Gogoro 2 Series</span>
        </div>
        <div>
          {(this.props.chartData && this.props.chartData.bubbles) &&
          <Category categories={this.getChartData()} />
          }
        </div>
      </div>
    );
  }
}

LeftSidebar.propTypes = {
  chartData: PropTypes.object.isRequired,
};

export default LeftSidebar;
