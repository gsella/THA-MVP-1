import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';
import Eye from 'react-icons/lib/fa/eye';
import EyeSlash from 'react-icons/lib/fa/eye-slash';
import Insight from './Insight/InsightContainer';
import { getBEMClasses } from 'helper/BEMHelper';
import 'assets/styles/components/left-sidebar.css';

const leftSidebar = 'left-sidebar';
const bemClasses = getBEMClasses([leftSidebar]);

class Category extends React.Component {
  isCategoryShown(categoryId) {
    return !(
      this.props.hiddenInsights[categoryId] &&
      this.props.hiddenInsights[categoryId].isAllInsightsInCategory
    );
  }

  isInsightShown(categoryId, categoryKey) {
    return !(
      this.props.hiddenInsights[categoryId] &&
      this.props.hiddenInsights[categoryId].categoryKeys.some(
        insight => insight === categoryKey
      )
    );
  }

  renderEyeIcon(categoryId, abbreviation) {
    return (
      <Eye
        size={16}
        className={bemClasses('category', 'visible-icon')}
        onClick={() =>
          this.props.toggleVisibleCategory(categoryId, abbreviation)
        }
      />
    );
  }

  renderEyeSlashIcon(categoryId, abbreviation) {
    return (
      <EyeSlash
        size={16}
        onClick={() =>
          this.props.toggleVisibleCategory(categoryId, abbreviation)
        }
      />
    );
  }

  renderPanelData() {
    return this.props.categories.map(item => (
      <Panel
        defaultExpanded
        key={item.category}
        style={{ borderLeft: `8px solid ${item.color}` }}
        className={bemClasses('category', 'disable-border')}>
        <Panel.Heading
          className={bemClasses('category', [
            'disable-border',
            'padding-heading',
          ])}>
          <div className={bemClasses('category', ['title', 'background'])}>
            <Panel.Title toggle className={bemClasses('category', 'underline')}>
              <span className={bemClasses('category', 'id')}>
                {item.abbreviation}
              </span>
              <span> &#8210; {item.category}</span>
            </Panel.Title>
            <div className={bemClasses('category', 'icon-align')}>
              {this.isCategoryShown(item.categoryId)
                ? this.renderEyeIcon(item.categoryId, item.abbreviation)
                : this.renderEyeSlashIcon(item.categoryId, item.abbreviation)}
            </div>
          </div>
        </Panel.Heading>
        <Panel.Collapse className={bemClasses('insight')}>
          {item.data.map(data => (
            <Insight
              key={data.id}
              id={data.id}
              categoryKey={data.categoryKey}
              categoryId={data.categoryId}
              insight={data.insight}
              isInsightShown={this.isInsightShown(
                data.categoryId,
                data.categoryKey
              )}
            />
          ))}
        </Panel.Collapse>
      </Panel>
    ));
  }

  render() {
    return (
      <div>
        <Panel
          defaultExpanded
          className={bemClasses('category', 'disable-border')}>
          {this.renderPanelData()}
        </Panel>
      </div>
    );
  }
}

Category.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  hiddenInsights: PropTypes.object.isRequired,
  toggleVisibleCategory: PropTypes.func,
};

export default Category;
