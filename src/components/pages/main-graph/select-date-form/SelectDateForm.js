import React from 'react';
import { reduxForm } from 'redux-form';
import { getBEMClasses } from 'helper/BEMHelper';
import Calendar from 'react-icons/lib/fa/calendar';
import DatePickerWrapper from 'components/common/date-picker/DatePicker';
import 'assets/styles/components/select-date-form.css';

const selectDateForm = 'select-date-form';
const bemClasses = getBEMClasses([selectDateForm]);

const DataPickersForm = () => {
  return (
    <form className={bemClasses()}>
      <div className={bemClasses('input')}>
        <DatePickerWrapper name="selectedDate" label="Select date:" />
        <Calendar size={16} className={bemClasses('icon')} />
      </div>
      <span className={bemClasses('update')}>Last Update: 6:49 PM | Feb 6</span>
    </form>
  );
};

export default reduxForm({
  form: 'mainGraphDatepickers',
  initialValues: {
    selectedDate: new Date(),
  },
  destroyOnUnmount: false,
})(DataPickersForm);
