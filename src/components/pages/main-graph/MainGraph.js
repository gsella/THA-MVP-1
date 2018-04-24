import React from 'react';
import LeftSidebarContainer from './left-sidebar/LeftSidebarContainer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as action from 'redux/modules/app/actions';
import GraphLayout from './graph/GraphLayout';

class MainGraph extends React.Component {
  render() {
    return (
      <div style={{ height: '100%', width: '100%', display: 'flex' }}>
        <div style={{ height: '100vh', flexBasis: '240px' }}>
          <LeftSidebarContainer />
        </div>
        <div style={{ height: '100vh', flexGrow: 1 }}>
          <GraphLayout data={this.props.chartData} />
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.props.getChartData();
  }
}

const mapStateToProps = state => ({
  chartData: state.app.chartData,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getChartData: action.getChartData,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(MainGraph);
