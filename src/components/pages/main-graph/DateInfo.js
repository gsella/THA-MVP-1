import React from 'react';
import SelectDateForm from './select-date-form/SelectDateForm';

class DateInfo extends React.Component {
  handleDateChange = async newDate => {
    if ('selectedDate' in newDate) {
      await this.props.handleDateChange(newDate);
    }
  };

  render() {
    return (
      <div>
        <SelectDateForm onSubmit={this.handleDateChange} />
      </div>
    );
  }
}

export default DateInfo;
