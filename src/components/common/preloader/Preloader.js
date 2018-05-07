import React from 'react';
import { getBEMClasses } from 'helper/BEMHelper';
import 'assets/styles/preloader.css';

const preloader = 'preloader';
const bemClasses = getBEMClasses([preloader]);

const Preloader = props => (
  <div
    className={bemClasses('alignment')}
    style={{ width: props.isFullScreen && '100%' }}>
    <p>{props.preloadIcon}</p>
    <div className={bemClasses('description')}>
      <h2>{props.title}</h2>
      <h4>{props.description}</h4>
    </div>
  </div>
);

export default Preloader;
