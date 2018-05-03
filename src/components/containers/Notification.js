import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/dist/react-notifications.css';
import 'assets/styles/notification.css'

class Notification extends React.Component {
  static propTypes = {
    thunderIco: PropTypes.string.isRequired,
    numberInsights: PropTypes.number.isRequired,
  };

  componentDidMount() {
    this.createNotification()();
  }

  createNotification = () => {
    return () => NotificationManager.create({
      id: 1,
      type: 'info',
      message: (
        <div>
          <img src={this.props.thunderIco} alt="thunder-icon" width={20} height={20} /> &nbsp;
          <span>{this.props.numberInsights} new insights found</span>
        </div>
      ),
      timeOut: 0,
    });
  };

  render() {
    return (
      <Link to="/create-insights" className='disable-default-a-style'>
        <div>
          <NotificationContainer />
        </div>
      </Link>
    );
  }
}

export default Notification;
