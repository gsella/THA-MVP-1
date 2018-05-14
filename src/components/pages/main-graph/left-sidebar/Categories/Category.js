import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';
import Insight from './Insight/InsightContainer';
import { getBEMClasses } from 'helper/BEMHelper';
import 'assets/styles/components/left-sidebar.css';

const leftSidebar = 'left-sidebar';
const bemClasses = getBEMClasses([leftSidebar]);

class Category extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isVisible: true,
    };
  }

  renderPanelData() {
    return this.props.categories.map(item => (
      <Panel
        key={item.category}
        style={{ borderLeft: `8px solid ${item.color}` }}
        className={bemClasses('category', 'disable-border')}>
        <Panel.Heading
          className={bemClasses('category', [
            'disable-border',
            'padding-heading',
          ])}>
          <Panel.Title toggle className={bemClasses('category', 'underline')}>
            <span className={bemClasses('category', 'id')}>
              {item.abbreviation}
            </span>
            <span> &#8210; {item.category}</span>
          </Panel.Title>
        </Panel.Heading>
        <Panel.Collapse className={bemClasses('insight')}>
          {item.data.map(data => (
            <Insight
              key={data.id}
              id={data.id}
              categoryKey={data.categoryKey}
              insight={data.insight}
              hiddenInsights={this.props.hiddenInsights}
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
  hiddenInsights: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Category;
