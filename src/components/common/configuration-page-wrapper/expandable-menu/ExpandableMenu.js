import React from 'react';
import { Link } from 'react-router-dom';
import { getBEMClasses } from 'helper/BEMHelper';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/fontawesome-free-solid';
import ThunderLogo from 'assets/images/logo-thunder.png';
import 'assets/styles/components/expandable-menu.css';

const expandableMenuStyles = 'expandable-menu';
const bemClasses = getBEMClasses([expandableMenuStyles]);

class ExpandableMenu extends React.Component {
  onCloseClick() {
    this.props.onClose();
  }

  render() {
    return (
      <div
        className={bemClasses(
          null,
          !this.props.isMenuHidden ? 'visible' : null
        )}>
        <span
          className={bemClasses('menu-icon')}
          onClick={() => this.onCloseClick()}>
          <FontAwesomeIcon icon={faArrowLeft} size="lg" />
        </span>
        <div>
          <img
            className={bemClasses('logo', 'align')}
            src={ThunderLogo}
            alt="thunder-logo"
            width={170}
          />
        </div>
        <ul className={bemClasses('list')}>
          <li className={bemClasses('list-element')}>
            <Link to="/" className={bemClasses('link')}>
              Thunders Dashboard
            </Link>
          </li>
          <li className={bemClasses('list-element')}>
            <a href="https://thunderact.com/" className={bemClasses('link')}>
              About
            </a>
          </li>
          <li className={bemClasses('list-element')}>
            <a
              href="https://thunderact.com/help"
              className={bemClasses('link')}>
              Help
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default ExpandableMenu;
