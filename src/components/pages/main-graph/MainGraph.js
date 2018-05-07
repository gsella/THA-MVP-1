import React from 'react';
import PropTypes from 'prop-types';
import ThunderIconSmall from 'assets/images/thunder-icon-small.svg';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { MenuItem, ButtonToolbar, DropdownButton } from 'react-bootstrap';
import {
  faEllipsisV,
  faRedoAlt,
  faPlus,
  faMinus,
  faExpand,
} from '@fortawesome/fontawesome-free-solid';
import ThunderIcon from 'assets/images/thunder-background.svg';
import LeftSidebarContainer from './left-sidebar/LeftSidebarContainer';
import GraphLayout from './graph/GraphLayout';
import Notification from 'components/containers/Notification';
import Preloader from 'components/common/preloader/Preloader';
import DateInfo from './DateInfo';
import { getBEMClasses } from 'helper/BEMHelper';
import 'assets/styles/main-graph.css';

const mainGraph = 'main-graph';
const bemClasses = getBEMClasses([mainGraph]);

class MainGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFullScreen: false,
      zoom: 1,
    };
  }

  static propTypes = {
    isDataLoading: PropTypes.bool.isRequired,
    isRefresh: PropTypes.bool.isRequired,
    insights: PropTypes.array.isRequired,
    newInsights: PropTypes.array.isRequired,
    getInsights: PropTypes.func.isRequired,
    getNewInsights: PropTypes.func.isRequired,
    refreshThunder: PropTypes.func.isRequired,
  };

  static getDerivedStateFromProps(newProps) {
    let bubble = document.querySelectorAll('.graph-layout__graph-container');
    bubble = Array.prototype.slice.call(bubble);

    if (newProps.isRefresh) {
      bubble.forEach(item => (item.style.opacity = 0.25));
    } else {
      bubble.forEach(item => (item.style.opacity = 1));
    }
    return null;
  }

  componentDidMount() {
    this.props.getNewInsights();
    this.props.getInsights();
  }

  toggleFullScreenGraph() {
    this.setState({ isFullScreen: !this.state.isFullScreen });
  }

  refreshThunder() {
    this.props.refreshThunder().then(() => this.props.getNewInsights());
  }

  renderRefreshingPreloader() {
    return (
      <Preloader
        preloadIcon={
          <FontAwesomeIcon
            icon={faRedoAlt}
            size="10x"
            rotation={270}
            spin
            style={{ color: '#0070c0' }}
          />
        }
        title="Refreshing your Thunder..."
        description={
          'Depending om the amount of data, fetching it can take a while or two.' +
          '\n Good time to make yourself a cup of something'
        }
      />
    );
  }

  renderLaunchingPreloader() {
    return (
      <Preloader
        preloadIcon={<img src={ThunderIcon} alt="preloader-icon" width={150} />}
        title="Launching your Thunder..."
        description={
          'Depending om the amount of data, fetching it can take a while or two.' +
          '\n Good time to make yourself a cup of something'
        }
      />
    );
  }

  renderNavigationIcons() {
    return (
      <div style={{ position: 'fixed', right: 0 }}>
        <div className={bemClasses('navigate-icons')}>
          <div className={bemClasses('navigate-icons', 'self-icon')}>
            <FontAwesomeIcon
              icon={faRedoAlt}
              rotation={270}
              onClick={() => this.refreshThunder()}
              className={bemClasses('navigate-icons', 'size')}
            />
          </div>
          <div className={bemClasses('navigate-icons', 'self-icon')}>
            <FontAwesomeIcon
              icon={faExpand}
              className={bemClasses('navigate-icons', 'size')}
              onClick={() => this.toggleFullScreenGraph()}
            />
          </div>
          <div className={bemClasses('navigate-icons', 'self-icon')}>
            <ButtonToolbar>
              <DropdownButton
                title={
                  <FontAwesomeIcon
                    icon={faEllipsisV}
                    className={bemClasses('navigate-icons', 'size')}
                  />
                }
                pullRight
                id="button-pulL-right"
                className={bemClasses('navigate-icons', 'more-info-btn')}>
                <MenuItem eventKey="1">Edit Diagram</MenuItem>
                <MenuItem eventKey="2">Email Diagram</MenuItem>
                <MenuItem eventKey="3">Print Diagram</MenuItem>
              </DropdownButton>
            </ButtonToolbar>
          </div>
        </div>
      </div>
    );
  }

  renderGraphLayout() {
    const { insights } = this.props;

    return (
      <div className={bemClasses(null, 'padding')}>
        <GraphLayout
          data={insights}
          zoom={this.state.zoom}
          fullScreen={this.state.isFullScreen}
        />

        {this.props.isRefresh && this.renderRefreshingPreloader()}

        <div className={bemClasses('zoom')}>
          <FontAwesomeIcon
            icon={faPlus}
            className={bemClasses('zoom', 'color')}
            onClick={() => {
              this.setState({
                zoom:
                  this.state.zoom >= 2
                    ? this.state.zoom
                    : this.state.zoom + 0.1,
              });
            }}
          />
          <FontAwesomeIcon
            icon={faMinus}
            className={bemClasses('zoom', 'color')}
            onClick={() => {
              this.setState({
                zoom:
                  this.state.zoom <= 1
                    ? this.state.zoom
                    : this.state.zoom - 0.1,
              });
            }}
          />
        </div>
      </div>
    );
  }

  render() {
    const { isDataLoading } = this.props;

    return (
      <div className={bemClasses()}>
        {!this.state.isFullScreen && <LeftSidebarContainer />}
        <div className={bemClasses('graph-layout')}>
          {this.renderNavigationIcons()}
          <div className={bemClasses('graph-layout-container')}>
            {!isDataLoading ? (
              <React.Fragment>
                <div className={bemClasses('graph-layout-wrapper')}>
                  {this.renderGraphLayout()}
                </div>
                <DateInfo {...this.props} />
              </React.Fragment>
            ) : (
              this.renderLaunchingPreloader()
            )}
          </div>
        </div>

        {this.props.newInsights.length > 0 && (
          <Notification thunderIco={ThunderIconSmall} numberInsights={4} />
        )}
      </div>
    );
  }
}

export default MainGraph;
