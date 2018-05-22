import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/common/button/Button';
import { getBEMClasses } from 'helper/BEMHelper';
import 'assets/styles/components/footer.css';

const footer = 'footer';
const bemClasses = getBEMClasses([footer]);

class InsightsFooter extends React.Component {
  static propTypes = {
    updateInsights: PropTypes.func.isRequired,
  };

  render() {
    const { updateInsights } = this.props;

    return (
      <div className={bemClasses(null, 'for-insights')}>
        <Button
          buttonColor="default"
          label="Preview"
          onClickFunction={() => {}}
        />
        <Button
          buttonColor="primary"
          label="Launch"
          onClickFunction={updateInsights}
        />
      </div>
    );
  }
}

export default InsightsFooter;
