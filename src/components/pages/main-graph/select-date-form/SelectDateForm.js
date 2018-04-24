import React from 'react'
import { reduxForm } from 'redux-form';
import { getBEMClasses } from 'helper/BEMHelper';
import DatePickerWrapper from 'components/common/date-picker/DatePicker';
import 'assets/styles/select-date-form.css';

const selectDateForm = 'select-date-form';
const bemClasses = getBEMClasses([selectDateForm]);

let DataPickersForm = props => {
  const { handleSubmit } = props
  
  return (
    <form
      onSubmit={handleSubmit}
      onBlur={handleSubmit}
      className={bemClasses()}
    >
      <div className={bemClasses('input')}>
        <DatePickerWrapper name="selectedDate" label="Select date:" />
      </div>      
    </form>
  )
}

export default reduxForm({form: 'mainGraphDatepickers'})(DataPickersForm)
