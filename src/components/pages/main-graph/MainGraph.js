import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import ThunderIconSmall from 'assets/images/lightning-icon-small.svg';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { MenuItem, ButtonToolbar, DropdownButton } from 'react-bootstrap';
import {
  faEllipsisV,
  faRedoAlt,
  faPlus,
  faMinus,
  faExpand,
} from '@fortawesome/fontawesome-free-solid';
import ThunderIcon from 'assets/images/lightning-blue-background.svg';
import LeftSidebarContainer from './left-sidebar/LeftSidebarContainer';
import GraphLayout from './graph/GraphLayoutContainer';
import Notification from 'components/containers/Notification';
import Preloader from 'components/common/preloader/Preloader';
import { getBEMClasses } from 'helper/BEMHelper';
import SelectDateForm from './select-date-form/SelectDateForm';
import 'assets/styles/components/main-graph.css';

const mainGraph = 'main-graph';
const bemClasses = getBEMClasses([mainGraph]);
const ZOOM_CONST = {
  minimum: 0.35,
  breakpoint: 0.8,
  maximum: 2,
  step: 0.2,
};

const refreshThunderText =
  'Depending on the amount of data, fetching it can take a while or two.' +
  '\n Good time to make yourself a cup of something';

class MainGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFullScreen: false,
      zoom: 1,
      isHiddenNotification: false,
    };
  }

  static propTypes = {
    isDataLoading: PropTypes.bool.isRequired,
    isRefresh: PropTypes.bool.isRequired,
    insights: PropTypes.array.isRequired,
    newInsights: PropTypes.array.isRequired,
    lastUpdatedInMilliseconds: PropTypes.number.isRequired,
    getInsights: PropTypes.func.isRequired,
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

  async componentDidMount() {
    await this.props.getTags();
    await this.props.getCategories();
    await this.props.getInsights();
    this.props.setGraphCellExpandCounter(0, false);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.selectedDate &&
      prevProps.selectedDate !== this.props.selectedDate
    ) {
      this.refreshThunder();
    }
  }

  toggleFullScreenGraph() {
    this.setState({ isFullScreen: !this.state.isFullScreen });
  }

  async refreshThunder() {
    await this.props.refreshThunder(4, this.props.selectedDate);
    this.setState({ isHiddenNotification: false });
  }

  zoomIn() {
    let zoom = this.state.zoom;

    if (zoom < ZOOM_CONST.maximum) {
      if (zoom >= ZOOM_CONST.breakpoint) {
        zoom += ZOOM_CONST.step;
      } else {
        zoom += ZOOM_CONST.step / 2;
      }
    }

    this.setState({ zoom: zoom });
  }

  zoomOut() {
    let zoom = this.state.zoom;

    if (zoom > ZOOM_CONST.minimum) {
      if (zoom > ZOOM_CONST.breakpoint) {
        zoom -= ZOOM_CONST.step;
      } else {
        zoom -= ZOOM_CONST.step / 2;
      }
    }

    this.setState({ zoom: zoom });
  }

  renderRefreshingPreloader() {
    return (
      <Preloader
        isFullScreen={this.state.isFullScreen}
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
        description={refreshThunderText}
      />
    );
  }

  renderLaunchingPreloader() {
    return (
      <Preloader
        preloadIcon={<img src={ThunderIcon} alt="preloader-icon" width={150} />}
        title="Launching your Thunder..."
        description={refreshThunderText}
      />
    );
  }

  renderNavigationIcons() {
    return (
      <div>
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
            onClick={() => this.zoomIn()}
          />
          <FontAwesomeIcon
            icon={faMinus}
            className={bemClasses('zoom', 'color')}
            onClick={() => this.zoomOut()}
          />
        </div>
      </div>
    );
  }

  render() {
    const { isDataLoading, lastUpdatedInMilliseconds } = this.props;
    const lastUpdatedInsight = format(
      lastUpdatedInMilliseconds,
      'h.mm A | MMM D'
    );

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
                  <SelectDateForm lastUpdatedInsight={lastUpdatedInsight} />
                </div>
              </React.Fragment>
            ) : (
              this.renderLaunchingPreloader()
            )}
          </div>
        </div>

        {!this.state.isHiddenNotification &&
          this.props.newInsights.length > 0 && (
            <Notification
              thunderIcon={ThunderIconSmall}
              numberInsights={this.props.newInsights.length}
              onClose={() => this.setState({ isHiddenNotification: true })}
            />
          )}
        <div className="tooltips" />
      </div>
    );
  }
}

export default MainGraph;
