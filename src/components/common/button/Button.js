import React from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { getBEMClasses } from 'helper/BEMHelper';
import 'assets/styles/button.css';

const button = 'button';
const bemClasses = getBEMClasses([button]);

const customButton = props => (
  <ButtonToolbar>
    <Button
      bsSize="large"
      className={bemClasses('btn', props.buttonStyle)}
      onClick={props.onClickFunction}>
      {props.label}
    </Button>
  </ButtonToolbar>
);

export default customButton;
