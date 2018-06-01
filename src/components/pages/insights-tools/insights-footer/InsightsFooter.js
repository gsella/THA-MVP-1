import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/common/button/Button';
import { getBEMClasses } from 'helper/BEMHelper';
import 'assets/styles/components/footer.css';

const footer = 'footer';
const bemClasses = getBEMClasses([footer]);

class InsightsFooter extends React.Component {
  static propTypes = {
    isLaunching: PropTypes.bool.isRequired,
    updateInsights: PropTypes.func.isRequired,
  };

  render() {
    const { updateInsights, isLaunching } = this.props;

    return (
      <div className={bemClasses(null, 'for-insights')}>
        <Button
          buttonColor="default"
          label="Preview"
          onClickFunction={() => {}}
        />
        <Button
          buttonColor="primary"
          label={isLaunching ? 'Loading...' : 'Launch'}
          disabled={isLaunching}
          onClickFunction={updateInsights}
        />
      </div>
    );
  }
}

export default InsightsFooter;
