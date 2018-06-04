import React from 'react';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';
import { Field } from 'redux-form';
import { getBEMClasses } from 'helper/BEMHelper';

import 'assets/styles/components/data-table-input.css';

const baseClass = 'textarea-component';

export class TextareaComponent extends React.Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
    this.textareaElement = null;
  }

  componentDidMount() {
    this.textareaElement = this.containerRef.current.getElementsByTagName(
      'textarea'
    )[0];

    this.addChangeHeightListeners();
  }

  componentWillUnmount() {
    this.removeChangeHeightListeners();
  }

  addChangeHeightListeners = () => {
    this.textareaElement.addEventListener('change', this.resize, false);
    this.textareaElement.addEventListener('cut', this.delayedResize, false);
    this.textareaElement.addEventListener('paste', this.delayedResize, false);
    this.textareaElement.addEventListener('drop', this.delayedResize, false);
    this.textareaElement.addEventListener('keydown', this.delayedResize, false);

    // taken from https://stackoverflow.com/questions/454202/creating-a-textarea-with-auto-resize?page=1&tab=votes#tab-top
    // it seems like it works without these commented lines but I leave just in case
    // this.textareaElement.focus();
    // this.textareaElement.select();
    this.resize();
  };

  removeChangeHeightListeners = () => {
    this.textareaElement.removeEventListener('change', this.resize);
    this.textareaElement.removeEventListener('cut', this.delayedResize);
    this.textareaElement.removeEventListener('paste', this.delayedResize);
    this.textareaElement.removeEventListener('drop', this.delayedResize);
    this.textareaElement.removeEventListener('keydown', this.delayedResize);
  };

  resize = () => {
    this.textareaElement.style.height = 'auto';
    this.textareaElement.style.height =
      this.textareaElement.scrollHeight + 'px';
  };

  /* 0-timeout to get the already changed text */
  delayedResize = () => {
    window.setTimeout(this.resize, 0);
  };

  render() {
    const classes = getBEMClasses([baseClass, this.props.customClass]);
    const { input } = this.props;

    return (
      <div className={classes('wrapper')} ref={this.containerRef}>
        <FormControl
          {...input}
          ref={'ref'}
          componentClass="textarea"
          maxLength="511"
          autoComplete="off"
          rows="1"
          wrap="soft"
          placeholder={this.props.placeholder}
          className={classes()}
        />
      </div>
    );
  }
}

const Textarea = props => {
  return <Field name={props.name} component={TextareaComponent} {...props} />;
};

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  customClass: PropTypes.string,
  classModifiers: PropTypes.arrayOf(PropTypes.string),
};

Textarea.defaultProps = {
  customClass: 'custom-input-component',
  classModifiers: [],
};

export default Textarea;
