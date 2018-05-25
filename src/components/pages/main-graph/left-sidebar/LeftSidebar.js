import React from 'react';
import PropTypes from 'prop-types';
import ThunderLogo from 'assets/images/logo-thunder.png';
import Category from 'components/pages/main-graph/left-sidebar/Categories/Category';
import { getBEMClasses } from 'helper/BEMHelper';
import { insightsType } from '../../../../propTypes/insightType';
import ThunderIcon from 'assets/images/lightning-icon-small.svg';
import 'assets/styles/components/left-sidebar.css';

const leftSidebar = 'left-sidebar';
const bemClasses = getBEMClasses([leftSidebar]);

class LeftSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    categories: PropTypes.object.isRequired,
    insights: insightsType.isRequired,
    getInsights: PropTypes.func.isRequired,
    hideCategory: PropTypes.func.isRequired,
    thunderName: PropTypes.string.isRequired,
  };

  getChartData() {
    const { categories, insights } = this.props;

    if (insights.length) {
      const insightsObj = insights.reduce((res, item) => {
        const category = categories[item.categoryId];
        res[category.name] = res[category.name] || {
          data: [],
          color: categories[item.categoryId].color,
          abbreviation: categories[item.categoryId].abbreviation,
          categoryId: item.categoryId,
        };

        res[category.name].data.push(item);

        return res;
      }, {});

      return Object.keys(insightsObj).map(key => ({
        category: key,
        color: insightsObj[key].color,
        data: insightsObj[key].data,
        abbreviation: insightsObj[key].abbreviation,
        categoryId: insightsObj[key].categoryId,
      }));
    }
  }

  render() {
    const { insights } = this.props;

    return (
      <div className={bemClasses()}>
        <div className={bemClasses('logo', 'border')}>
          <img
            className={bemClasses('logo', 'align')}
            src={ThunderLogo}
            alt="thunder-logo"
            width={240}
          />
        </div>
        <div className={bemClasses('insight-title')}>
          <div className={bemClasses('thunder-icon')}>
            <img src={ThunderIcon} alt="thunder" width={28} height={28} />
          </div>
          <div>{this.props.thunderName}</div>
        </div>
        <div>
          {insights.length > 0 && (
            <Category
              categories={this.getChartData()}
              hiddenInsights={this.props.hiddenInsights}
              toggleVisibleCategory={(categoryId, abbreviation) =>
                this.props.hideCategory(categoryId, abbreviation)
              }
            />
          )}
        </div>
      </div>
    );
  }
}

export default LeftSidebar;
