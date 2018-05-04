import React from 'react';
import SelectDateForm from './select-date-form/SelectDateForm';

class DateInfo extends React.Component {
  constructor(props) {
    super(props);

    this.handleDataChange = this.handleDataChange.bind(this);
  }

  handleDataChange(newDate) {
    if ('selectedDate' in newDate) {
      this.props.refreshThunder().then(() => this.props.getNewInsights());
    }
  }

  render() {
    return (
      <div>
        <SelectDateForm onSubmit={this.handleDataChange} />
      </div>
    );
  }
}

export default DateInfo;
