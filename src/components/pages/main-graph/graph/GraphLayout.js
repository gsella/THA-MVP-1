import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getBEMClasses } from 'helper/BEMHelper';
import TagsSection from './TagsSection';
import IMPACTS from 'constants/impactConstants';

import 'assets/styles/graph.css';
import Graph from './Graph';

const graph = 'graph';
const bemClasses = getBEMClasses([graph]);
const impactsClasses = {
	'1': 'pos',
	'0': 'zero',
	'-1': 'neg',
};

class GraphLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderGraphs = impact => {
    const tags = ['tag1', 'tag2'];
		const items = [
			{color: 'red', size: 1, label: 'Label1'},
			{color: 'red', size: 2, label: 'Label2'},
			{color: 'red', size: 3, label: 'Label3'},
			{color: 'red', size: 4, label: 'Label4'},
			{color: 'red', size: 5, label: 'Label5'},
		];

		return <Graph 
			customClass={`graph-${impactsClasses[impact]}-${tags[0]}`}
			items={items}
		 />;
  };

  render() {
    return (
      <div>
        <TagsSection />

        <div className={bemClasses('impact-block')}>
          <div className={bemClasses('impact-icon')}>1</div>
          {this.renderGraphs(IMPACTS.POS)}
        </div>

        <div className={bemClasses('impact-block')}>
          <div className={bemClasses('impact-icon')}>0</div>
          {this.renderGraphs(IMPACTS.ZERO)}
        </div>

        <div className={bemClasses('impact-block')}>
          <div className={bemClasses('impact-icon')}>-1</div>
          {this.renderGraphs(IMPACTS.NEG)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  chartData: state.app.chartData,
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GraphLayout);
