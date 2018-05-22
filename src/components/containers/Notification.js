import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/fontawesome-free-regular';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import 'react-notifications/dist/react-notifications.css';
import 'assets/styles/components/notification.css';

class Notification extends React.Component {
  static propTypes = {
    thunderIcon: PropTypes.string.isRequired,
    numberInsights: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.createNotification()();
  }

  componentDidUpdate() {
    this.createNotification()();
  }

  notificationMessage = () => {
    return (
      <div>
        <FontAwesomeIcon
          onClick={this.removeNotification}
          icon={faTimesCircle}
          style={{
            position: 'absolute',
            right: 5,
            top: 5,
          }}
        />
        <div>
          <img
            src={this.props.thunderIcon}
            alt="thunder-icon"
            width={20}
            height={20}
          />
          &nbsp;
          <span>{this.props.numberInsights} new insights found</span>
        </div>
      </div>
    );
  };

  createNotification = () => {
    return () =>
      NotificationManager.create({
        id: 1,
        type: 'info',
        message: this.notificationMessage(),
        timeOut: 0,
      });
  };

  removeNotification = e => {
    e.preventDefault();

    this.props.onClose();
    NotificationManager.remove({ id: 1 });
  };

  render() {
    return (
      <Link to="/create-insights" className="disable-default-a-style">
        <NotificationContainer />
      </Link>
    );
  }
}

export default Notification;
