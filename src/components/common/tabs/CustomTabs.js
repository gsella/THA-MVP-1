import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { getBEMClasses } from 'helper/BEMHelper';
import 'assets/styles/components/tabs.css';

const tabs = 'tabs';
const bemClasses = getBEMClasses([tabs]);

class CustomTabs extends React.Component {
  static propTypes = {
    panelName1: PropTypes.string.isRequired,
    panelName2: PropTypes.string.isRequired,
    panelContent1: PropTypes.element.isRequired,
    panelContent2: PropTypes.element.isRequired,
  };

  render() {
    return (
      <Tabs className={bemClasses()}>
        <TabList className={bemClasses('list')}>
          <Tab>{this.props.panelName1}</Tab>
          <Tab>{this.props.panelName2}</Tab>
        </TabList>

        <TabPanel className={bemClasses('panel')}>
          <div className={bemClasses('panel-content-wrapper')}>
            {this.props.panelContent1}
          </div>
        </TabPanel>
        <TabPanel className={bemClasses('panel')}>
          <div className={bemClasses('panel-content-wrapper')}>
            {this.props.panelContent2}
          </div>
        </TabPanel>
      </Tabs>
    );
  }
}

export default CustomTabs;
