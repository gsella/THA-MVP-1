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
    this.state = {
      textareaHeight: 20,
    };
  }

  handleKeyUp(evt) {
    let newHeight = Math.max(Math.min(evt.target.scrollHeight + 2, 56), 20);
    if (newHeight !== this.state.textareaHeight) {
      this.setState({
        textareaHeight: newHeight,
      });
    }
  }

  render() {
    const classes = getBEMClasses([baseClass, this.props.customClass]);
    const { input } = this.props;
    let textareaStyle = { height: this.state.textareaHeight };

    return (
      <div className={classes('wrapper-1')}>
        <div className={classes('wrapper-2')}>
          <FormControl
            {...input}
            onKeyUp={this.handleKeyUp.bind(this)}
            style={textareaStyle}
            componentClass="textarea"
            autoComplete="off"
            placeholder={this.props.placeholder}
            className={classes()}
          />
        </div>
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
