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
  toggleVisibleInsight() {
    const { categoryKey, categoryId, hideInsight } = this.props;

    hideInsight(categoryKey, categoryId);
  }

  renderEyeIcon() {
    return (
      <Eye
        size={16}
        onClick={() => this.toggleVisibleInsight()}
        className={bemClasses('insight', 'visible-icon')}
      />
    );
  }

  renderEyeSlashIcon() {
    return <EyeSlash size={16} onClick={() => this.toggleVisibleInsight()} />;
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
            {this.props.isInsightShown
              ? this.renderEyeIcon()
              : this.renderEyeSlashIcon()}
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
  categoryId: PropTypes.number.isRequired,
  isInsightShown: PropTypes.bool.isRequired,
};

export default Insight;
