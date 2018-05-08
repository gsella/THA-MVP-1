import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faAlignLeft } from '@fortawesome/fontawesome-free-solid';
import Button from 'components/common/button/Button';
import { getBEMClasses } from 'helper/BEMHelper';
import 'assets/styles/configuration-page-wrapper.css';

const configurationPageWrapper = 'configuration-page-wrapper';
const bemClasses = getBEMClasses([configurationPageWrapper]);

class ConfigurationPageWrapper extends React.Component {
  componentDidMount() {
    //TODO: call action to return data of user
  }

  static propTypes = {
    updateInsights: PropTypes.func.isRequired,
  };

  render() {
    const { updateInsights } = this.props;

    return (
      <div className={bemClasses()}>
        <div className={bemClasses('header')}>
          <FontAwesomeIcon
            icon={faAlignLeft}
            className={bemClasses('menu-icon')}
          />
          <p className={bemClasses('title')}>Gogoro 2 Series</p>
          <p className={bemClasses('user-name')}>John Doe</p>
        </div>
        {this.props.children}
        <div className={bemClasses('footer')}>
          <Button buttonStyle="default" label="Preview" />
          <Link to="/main-graph">
            <Button
              buttonStyle="primary"
              label="Launch"
              onClickFunction={updateInsights}
            />
          </Link>
        </div>
      </div>
    );
  }
}

export default ConfigurationPageWrapper;
