import React from 'react';
import { getBEMClasses } from 'helper/BEMHelper';
import 'assets/styles/components/thunder-title.css';

const thunderTitle = 'thunder-title';
const bemClasses = getBEMClasses([thunderTitle]);

const ThunderTitle = props => {
  return <p className={bemClasses()}>{props.title}</p>;
};

export default ThunderTitle;
