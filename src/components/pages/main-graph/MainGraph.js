import React from 'react';
import ThunderIcon from 'assets/images/thunder-icon-small.svg';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { MenuItem, ButtonToolbar, DropdownButton } from 'react-bootstrap';
import { faEllipsisV, faRedoAlt, faPlus, faMinus, faExpand } from '@fortawesome/fontawesome-free-solid';
import LeftSidebarContainer from './left-sidebar/LeftSidebarContainer';
import GraphLayout from './graph/GraphLayout';
import Notification from 'components/containers/Notification';
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

  componentDidMount() {
    this.props.getNewInsights();
    this.props.getChartData();
  }

  toggleFullScreenGraph() {
    this.setState({ isFullScreen: !this.state.isFullScreen });
  }

  renderNavigationIcons() {
    return (
      <div className={bemClasses('navigate-icons')}>
        <div className={bemClasses('navigate-icons', 'self-icon')}>
          <FontAwesomeIcon
            icon={faRedoAlt}
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

  render() {
    return (
      <div className={bemClasses()}>
        {!this.state.isFullScreen && <LeftSidebarContainer />}
        <div className={bemClasses('graph-content')}>
          {this.renderNavigationIcons()}

          <div className={bemClasses('graph-content', 'align')}>

            <div>
              <GraphLayout data={this.props.chartData} />
            </div>

            <div className={bemClasses('zoom')}>
              <FontAwesomeIcon icon={faPlus} className={bemClasses('zoom', 'color')} />
              <FontAwesomeIcon icon={faMinus} className={bemClasses('zoom', 'color')} />
            </div>
          </div>
        </div>

        {this.props.newInsights.length > 0 &&
        <Notification
          thunderIco={ThunderIcon}
          numberInsights={4}
        />
        }
      </div>
    );
  }
}

export default MainGraph;
