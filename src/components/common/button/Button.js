import React from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { getBEMClasses } from 'helper/BEMHelper';
import 'assets/styles/components/button.css';

const button = 'button';
const bemClasses = getBEMClasses([button]);

const CustomButton = props => {
  const { buttonColor, onClickFunction, label, ...other } = props;

  const modifiers = [buttonColor];

  if (props.disabled) {
    modifiers.push('disabled');
  }

  return (
    <ButtonToolbar>
      <Button
        bsSize="large"
        className={bemClasses('btn', modifiers)}
        onClick={onClickFunction}
        {...other}>
        {label}
      </Button>
    </ButtonToolbar>
  );
};

export default CustomButton;
