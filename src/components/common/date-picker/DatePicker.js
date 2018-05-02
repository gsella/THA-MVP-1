import React from 'react';
import PropTypes from 'prop-types';
import Pikaday from 'pikaday';
import { Field } from 'redux-form';
import { getBEMClasses } from 'helper/BEMHelper';
import { format, parse } from 'helper/dateHelper';
import 'pikaday/css/pikaday.css';
import 'assets/styles/date-picker.css';

const datepicker = 'datepicker';
const bemClasses = getBEMClasses([datepicker]);

class DatePicker extends React.Component {
  // TODO: choose supported formats
  static formats = {
    american: 'MM/DD/YYYY',
    international: 'DD/MM/YYYY'
  };

  static propTypes = {
    input: PropTypes.object.isRequired,
    label: PropTypes.string,
    customClass: PropTypes.string,
    dateFormat: PropTypes.string,
    customFormat: PropTypes.func,
    customParse: PropTypes.func,
    info: PropTypes.string,
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.string
    }),
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    initialOptions: PropTypes.object
  };

  static defaultProps = {
    label: 'Date',
    customClass: 'custom-datepicker',
    dateFormat: DatePicker.formats.international,
    info: '',
    disabled: false,
    required: false,
    initialOptions: {},
    customFormat: format,
    customParse: parse
  };

  constructor(props) {
    super(props);
    this.datepickerRef = null;
    this._picker = null;
  }

  componentDidMount() {
    const el = this.datepickerRef;
    const { dateFormat, customFormat, customParse, input } = this.props;

    this._picker = new Pikaday({
      field: el,
      format: dateFormat,
      toString: customFormat,
      parse: customParse,
      onSelect: input.onChange,
      ...this.props.initialOptions
    });

    this.addClassNames();
  }

  componentWillUnmount() {
    this._picker.destroy();
    this._picker = null;
  }

  getCustomClasses() {
    return getBEMClasses([this.props.customClass]);
  }

  addClassNames() {
    const customClasses = this.getCustomClasses();
    this._picker.el.classList.add(bemClasses('calendar'));
    this._picker.el.classList.add(customClasses('calendar'));
  }

  render() {
    const { label, meta, info, input, disabled, required } = this.props;
    const { onChange, onBlur, value, ...otherInputProps } = input;
    const customClasses = this.getCustomClasses();

    return (
      <div
        className={`form-group ${bemClasses('input-wrapper')} ${customClasses(
          'dpk-wrapper'
        )}`}>
        <label
          className={`ap--label ${bemClasses('label')} ${customClasses(
            'dpk-label'
          )}`}>
          {label}
        </label>
        <input
          ref={ref => (this.datepickerRef = ref)}
          className={`form-control ${bemClasses('input')} ${customClasses(
            'dpk-input'
          )}`}
          {...otherInputProps}
          {...{ disabled, required }}
          defaultValue={value}
          onBlur={() => onBlur(undefined)}
        />

        <small
          className={`form-text text-muted ${bemClasses(
            'info'
          )}  ${customClasses('dpk-info')}`}>
          {info}
        </small>
        {meta.dirty &&
          meta.error && (
            <span
              className={`text-danger ${bemClasses('error')}  ${customClasses(
                'dpk-error'
              )}`}>
              {meta.error}
            </span>
          )}
      </div>
    );
  }
}

export default function DatePickerWrapper(props) {
  return <Field name={props.name} component={DatePicker} {...props} />;
}

DatePickerWrapper.formats = DatePicker.formats;

export { DatePicker };
