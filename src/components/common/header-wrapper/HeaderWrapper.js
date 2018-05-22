import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faAlignLeft } from '@fortawesome/fontawesome-free-solid';
import ExpandableMenu from './expandable-menu/ExpandableMenu';
import { getBEMClasses } from 'helper/BEMHelper';
import 'assets/styles/components/header-wrapper.css';

const headerWrapper = 'header-wrapper';
const bemClasses = getBEMClasses([headerWrapper]);

class HeaderWrapper extends React.Component {
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
    return (
      <div className={bemClasses()}>
        <div className={bemClasses('header')}>
          <span
            className={bemClasses('menu-icon-wrapper')}
            onClick={this.onMenuClick}>
            <FontAwesomeIcon
              icon={faAlignLeft}
              className={bemClasses('menu-icon')}
            />
          </span>
          <ExpandableMenu
            isMenuHidden={this.state.isMenuHidden}
            onClose={this.onMenuClick}
          />
          <p className={bemClasses('user-name')}>John Doe</p>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default HeaderWrapper;
