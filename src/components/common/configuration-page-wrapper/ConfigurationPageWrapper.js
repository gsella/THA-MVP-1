import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faAlignLeft } from '@fortawesome/fontawesome-free-solid';
import Button from 'components/common/button/Button';
import ExpandableMenu from './expandable-menu/ExpandableMenu';
import { getBEMClasses } from 'helper/BEMHelper';
import 'assets/styles/components/configuration-page-wrapper.css';

const configurationPageWrapper = 'configuration-page-wrapper';
const bemClasses = getBEMClasses([configurationPageWrapper]);

class ConfigurationPageWrapper extends React.Component {
  static propTypes = {
    updateInsights: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isMenuHidden: true,
    };

    this.onMenuClick = this.onMenuClick.bind(this);
  }

  onMenuClick() {
    this.setState({ isMenuHidden: !this.state.isMenuHidden });
  }

  render() {
    const { updateInsights } = this.props;

    return (
      <div className={bemClasses()}>
        <div className={bemClasses('header')}>
          <span onClick={() => this.onMenuClick()}>
            <FontAwesomeIcon
              icon={faAlignLeft}
              className={bemClasses('menu-icon')}
            />
          </span>
          <ExpandableMenu
            isMenuHidden={this.state.isMenuHidden}
            onClose={this.onMenuClick}
          />
          <p className={bemClasses('title')}>Gogoro 2 Series</p>
          <p className={bemClasses('user-name')}>John Doe</p>
        </div>
        {this.props.children}
        <div className={bemClasses('footer')}>
          <Button
            buttonColor="default"
            label="Preview"
            onClickFunction={() => {}}
          />
          <Button
            buttonColor="primary"
            label="Launch"
            onClickFunction={updateInsights}
          />
        </div>
      </div>
    );
  }
}

export default ConfigurationPageWrapper;
