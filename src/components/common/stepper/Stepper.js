import React from 'react';
import PropTypes from 'prop-types';
import BlueLightningIcon from 'assets/images/lightning-blue-background.svg';
import GreyLightningIcon from 'assets/images/lightning-disable-icon.svg';
import { getBEMClasses } from 'helper/BEMHelper';
import 'assets/styles/components/stepper.css';

const stepper = 'stepper';
const bemClasses = getBEMClasses([stepper]);

const titles = ['Integration', 'Display', 'Insights'];

class Stepper extends React.Component {
  static propTypes = {
    targetStep: PropTypes.number.isRequired,
  };

  renderIcon(index, targetStep) {
    const wrapperModifier = index === targetStep ? 'selected' : 'empty';
    const Icon = index <= targetStep ? BlueLightningIcon : GreyLightningIcon;

    return (
      <div className={bemClasses('icon-wrapper', wrapperModifier)}>
        <img className={bemClasses('icon')} alt={titles[index]} src={Icon} />
        <div className={bemClasses('title')}>{titles[index]}</div>
      </div>
    );
  }

  render() {
    const length = titles.length;

    return (
      <div className={bemClasses()}>
        {titles.map((item, index) => (
          <React.Fragment>
            {this.renderIcon(index, this.props.targetStep)}
            {index < length - 1 && (
              <div
                className={bemClasses(
                  'divider',
                  index < this.props.targetStep ? 'done' : 'disabled'
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }
}

export default Stepper;
