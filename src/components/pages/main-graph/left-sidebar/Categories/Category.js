import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';
import Insight from './Insight';
import { getBEMClasses } from 'helper/BEMHelper';
import 'assets/styles/left-sidebar.css';

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
        className={bemClasses('category', ['disable-border', `vertical-border-${item.color.slice(1)}`])}
      >
        <Panel.Heading className={bemClasses('category', ['disable-border', 'padding-heading'])}>
          <Panel.Title toggle className={bemClasses('category', 'underline')}>
            <span className={bemClasses('category', 'id')}>{item.category.slice(0, 1)} </span>
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
            />
          ))
          }
        </Panel.Collapse>
      </Panel>
    ));
  }

  render() {
    return (
      <div>
        <Panel defaultExpanded className={bemClasses('category', 'disable-border')}>
          {this.renderPanelData()}
        </Panel>
      </div>
    );
  }
}

Category.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Category;
