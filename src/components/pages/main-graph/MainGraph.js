import React from 'react';
import ThunderIconSmall from 'assets/images/thunder-icon-small.svg';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { MenuItem, ButtonToolbar, DropdownButton } from 'react-bootstrap';
import { faEllipsisV, faRedoAlt, faPlus, faMinus, faExpand } from '@fortawesome/fontawesome-free-solid';
import LeftSidebarContainer from './left-sidebar/LeftSidebarContainer';
import GraphLayout from './graph/GraphLayout';
import Notification from 'components/containers/Notification';
import Preloader from 'components/common/preloader/Preloader';
import ThunderIcon from 'assets/images/thunder-background.svg';
import { getBEMClasses } from 'helper/BEMHelper';
import 'assets/styles/main-graph.css';

const mainGraph = 'main-graph';
const bemClasses = getBEMClasses([mainGraph]);

class MainGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFullScreen: false,
    };
  }

  static getDerivedStateFromProps(newProps) {
    let bubble = document.getElementsByClassName('graph-item');
    bubble = Array.prototype.slice.call(bubble);

    if (newProps.isRefresh) {
      bubble.forEach(item => item.style.opacity = 0.25);
    } else {
      bubble.forEach(item => item.style.opacity = 1);
    }
    return null;
  }

  componentDidMount() {
    this.props.getNewInsights();
    this.props.getChartData();
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
            size='10x'
            rotation={270}
            spin
            style={{ color: '#0070c0' }}
          />
        }
        title='Refreshing your Thunder...'
        description=
          {'Depending om the amount of data, fetching it can take a while or two.' +
          '\n Good time to make yourself a cup of something'
          }
      />
    );
  }

  renderLaunchingPreloader() {
    return (
      <Preloader
        preloadIcon={
          <img src={ThunderIcon} alt="preloader-icon" width={150} />
        }
        title='Launching your Thunder...'
        description=
          {'Depending om the amount of data, fetching it can take a while or two.' +
          '\n Good time to make yourself a cup of something'
          }
      />
    );
  }

  renderNavigationIcons() {
    return (
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
              className={bemClasses('navigate-icons', 'more-info-btn')}
            >
              <MenuItem eventKey="1">Edit Diagram</MenuItem>
              <MenuItem eventKey="2">Email Diagram</MenuItem>
              <MenuItem eventKey="3">Print Diagram</MenuItem>
            </DropdownButton>
          </ButtonToolbar>
        </div>
      </div>
    );
  }

  renderGraphLayout() {
    return (
      <div className={bemClasses()}>
        <GraphLayout
          data={this.props.chartData}
          className={bemClasses('graph-layout', 'align')}
        />

        {this.props.isRefresh && this.renderRefreshingPreloader()}

        <div className={bemClasses('zoom')}>
          <FontAwesomeIcon icon={faPlus} className={bemClasses('zoom', 'color')} />
          <FontAwesomeIcon icon={faMinus} className={bemClasses('zoom', 'color')} />
        </div>
      </div>
    );
  }

  render() {
    const { tags, bubbles, categories } = this.props.chartData;

    return (
      <div className={bemClasses()}>
        {!this.state.isFullScreen && <LeftSidebarContainer />}
        <div className={bemClasses('graph-layout')}>
          {this.renderNavigationIcons()}

          {(tags && bubbles && categories) ?
            this.renderGraphLayout() :
            this.renderLaunchingPreloader()
          }
        </div>

        {this.props.newInsights.length > 0 &&
        <Notification
          thunderIco={ThunderIconSmall}
          numberInsights={4}
        />
        }
      </div>
    );
  }
}

export default MainGraph;
