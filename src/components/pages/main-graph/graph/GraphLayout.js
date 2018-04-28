import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getBEMClasses } from 'helper/BEMHelper';
import radiusHelper from 'helper/radiusHelper';
import TagsSection from './TagsSection';
import IMPACTS from 'constants/impactConstants';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/fontawesome-free-solid';

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

  renderGraphs = (impact, radiuses) => {
    const { tags, bubbles, categories } = this.props.chartData;
    if (tags && bubbles && categories && radiuses) {
      const tagsArray = Object.values(tags);

      bubbles.forEach(bubble => {
        bubble.category = categories[bubble.categoryId];
        bubble.tag = tags[bubble.tagId].name;
      });

      const graphs = tagsArray.map((tag, i) => {
        const currenBubbles = bubbles.filter(bubble => bubble.tag === tag.name && bubble.popularity === impact);
        const items = currenBubbles.map(bubble => ({
          label: bubble.categoryKey,
          color: bubble.category.color,
          size: bubble.instances,
        }));

        return (
          <Graph
            key={`graph-${impactsClasses[impact]}-${i}`}
            customClass={`graph-${impactsClasses[impact]}-${i}`}
            items={items}
            radiuses={radiuses}
          />
        );
      });

      return graphs;
    }
  };

  render() {
    const { tags, bubbles, categories } = this.props.chartData;
    const radiuses = tags && bubbles && categories ? radiusHelper(tags, bubbles, categories) : undefined;

    return (
      <div>
        {tags && <TagsSection tags={Object.values(tags)} />}

        <div className={bemClasses('impact-block')}>
          <div className={bemClasses('impact-icon')}>
            <FontAwesomeIcon icon={faThumbsUp} />
          </div>
          {this.renderGraphs(IMPACTS.POS, radiuses)}
        </div>

        <div className={bemClasses('impact-block')}>
          <div className={bemClasses('impact-icon')}>0</div>
          {this.renderGraphs(IMPACTS.ZERO, radiuses)}
        </div>

        <div className={bemClasses('impact-block')}>
          <div className={bemClasses('impact-icon')}>
            <FontAwesomeIcon icon={faThumbsDown} />
          </div>
          {this.renderGraphs(IMPACTS.NEG, radiuses)}
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
