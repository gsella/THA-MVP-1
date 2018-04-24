import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as action from 'redux/modules/app/actions';
import SelectDateForm from './select-date-form/SelectDateForm';

class MainGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date(),
    };
    
    this.handleDataChange = this.handleDataChange.bind(this);
  }

  handleDataChange(newDate) {
    let date = {};

    if ('selectedDate' in newDate) {
      date.selectedDate = newDate.selectedDate;
    }

    this.setState(date);
  }

  render() {
    return (
      <div>
        <p>Hello world</p>
        <p>Selected date: {this.state.selectedDate.toDateString()}</p>
        <SelectDateForm onSubmit={this.handleDataChange} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  dataTable: state.app.dataTable,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getMainGraph: action.getMainGraph,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MainGraph);

