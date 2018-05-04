import React from 'react';
import SelectDateForm from './select-date-form/SelectDateForm';

class DateInfo extends React.Component {
  constructor(props) {
    super(props);

    this.handleDataChange = this.handleDataChange.bind(this);
  }

  handleDataChange(newDate) {
    const date = {};

    if ('selectedDate' in newDate) {
      date.selectedDate = newDate.selectedDate;
    }

    this.setState(date);
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
