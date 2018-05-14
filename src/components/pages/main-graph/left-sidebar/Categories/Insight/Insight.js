import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';
import Eye from 'react-icons/lib/fa/eye';
import EyeSlash from 'react-icons/lib/fa/eye-slash';
import { getBEMClasses } from 'helper/BEMHelper';
import 'assets/styles/components/left-sidebar.css';

const leftSidebar = 'left-sidebar';
const bemClasses = getBEMClasses([leftSidebar]);

class Insight extends React.Component {
  toggleVisibleCategory() {
    this.props.hidingInsight(this.props.categoryKey);
  }

  render() {
    return (
      <Panel.Body
        key={this.props.id}
        className={bemClasses('insight', ['background', 'padding'])}>
        <span className={bemClasses('insight', 'align')}>
          <span className={bemClasses('insight', 'id')}>
            {this.props.categoryKey}
          </span>
          <span className={bemClasses('insight', 'description')}>
            &#8210; {this.props.insight}
          </span>
          <span className={bemClasses('insight', 'eye-icon')}>
            {!this.props.hiddenInsights.some(
              insight => insight === this.props.categoryKey
            ) ? (
              <Eye
                size={14}
                onClick={() => this.toggleVisibleCategory()}
                className={bemClasses('insight', 'visible-icon')}
              />
            ) : (
              <EyeSlash
                size={14}
                onClick={() => this.toggleVisibleCategory()}
              />
            )}
          </span>
        </span>
      </Panel.Body>
    );
  }
}

Insight.propTypes = {
  id: PropTypes.number.isRequired,
  insight: PropTypes.string.isRequired,
  categoryKey: PropTypes.string.isRequired,
  hiddenInsights: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Insight;
