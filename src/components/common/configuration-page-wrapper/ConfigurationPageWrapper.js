import React from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from 'react-icons/lib/fa/list-ul';
import Button from 'components/common/button/Button';
import { getBEMClasses } from 'helper/BEMHelper';
import 'assets/styles/configuration-page-wrapper.css';

const configurationPageWrapper = 'configuration-page-wrapper';
const bemClasses = getBEMClasses([configurationPageWrapper]);

class ConfigurationPageWrapper extends React.Component {
  componentDidMount() {
    //TODO: call action to return data of user
  }

  render() {
    return (
      <div className={bemClasses()}>
        <div className={bemClasses('header')}>
          <MenuIcon className={bemClasses('menu-icon')} />
          <p className={bemClasses('title')}>Gogoro 2 Series</p>
          <p className={bemClasses('user-name')}>John Doe</p>
        </div>
        {this.props.children}
        <div className={bemClasses('footer')}>
          <Button buttonStyle='default' label='Preview' />
          <Link to="/main-graph">
            <Button buttonStyle='primary' label='Launch' />
          </Link>
        </div>
      </div>
    );
  }
}

export default ConfigurationPageWrapper;
