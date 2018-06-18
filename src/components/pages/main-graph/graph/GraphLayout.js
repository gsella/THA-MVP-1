import React from 'react';
import PropTypes from 'prop-types';
import { getBEMClasses } from 'helper/BEMHelper';
import { mapSizes } from 'helper/radiusHelper';
import TagsSection from './TagsSection';
import { IMPACTS } from 'constants/impactConstants';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { graphSizeHelper, graphParamsInitialize } from 'helper/graphSizeHelper';
import { faThumbsUp, faThumbsDown } from '@fortawesome/fontawesome-free-solid';

import 'assets/styles/components/graph-layout.css';
import Graph from './Graph';

const graph = 'graph-layout';
const bemClasses = getBEMClasses([graph]);
const impactsClasses = {
  '1': 'pos',
  '0': 'zero',
  '-1': 'neg',
};

class GraphLayout extends React.Component {
  static propTypes = {
    tags: PropTypes.object.isRequired,
    categories: PropTypes.object.isRequired,
    insights: PropTypes.array.isRequired,
    fullScreen: PropTypes.bool.isRequired,
    hiddenInsights: PropTypes.object.isRequired,
  };

  renderGraphs = (impact, radiuses, graphSize) => {
    const { tags, categories, insights } = this.props;

    if (insights && radiuses && graphSize) {
      const tagsArray = Object.values(tags);

      const filledBubbles = insights.map(bubble => {
        bubble.category = categories[bubble.categoryId];
        bubble.tag = tags[bubble.tagId].name;
        return bubble;
      });

      const graphs = tagsArray.map((tag, i) => {
        const currentBubbles = insights.filter(
          bubble =>
            bubble.tag === tag.name &&
            bubble.impact === impact &&
            bubble.isActive &&
            !(
              this.props.hiddenInsights[bubble.categoryId] &&
              this.props.hiddenInsights[bubble.categoryId].categoryKeys.some(
                key => key === bubble.categoryKey
              )
            )
        );

        const items = mapSizes(
          currentBubbles.map(bubble => ({
            label: bubble.categoryKey,
            color: bubble.category.color,
            size: bubble.instances,
          }))
        );

        const key = `graph-${impactsClasses[impact]}-${i}`;

        return (
          <Graph
            key={key}
            id={key}
            customClass={graph}
            classModifiers={[impactsClasses[impact], key]}
            items={items}
            radiuses={radiuses}
            bubbles={filledBubbles}
            size={graphSize}
          />
        );
      });

      return graphs;
    }
  };

  resizeHandler = () => this.forceUpdate();

  clearTooltips() {
    const tooltips = document.getElementsByClassName('tooltips')[0];
    if (tooltips) {
      tooltips.innerHTML = '';
    }
  }

  clearBubbles() {
    let nodes = document.getElementsByClassName('graph__graph-container');
    nodes = Array.prototype.slice.call(nodes);
    nodes.forEach(node => {
      node.innerHTML = '';
    });
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler);
  }

  componentDidUpdate(prevProps) {
    if (this.props.fullScreen !== prevProps.fullScreen) {
      this.resizeHandler();
    }
  }

  render() {
    const {
      tags,
      categories,
      insights,
      zoom,
      graphCellExpandCounter,
      isCellCounterInitialized,
    } = this.props;

    const graphSize = graphSizeHelper(
      tags,
      { minWidth: 100, minHeigth: 100 },
      this.props.zoom,
      'main-graph__graph-layout-container'
    );

    const graphParams = graphParamsInitialize(
      tags,
      insights,
      categories,
      zoom,
      graphSize,
      graphCellExpandCounter
    );

    if (!isCellCounterInitialized) {
      this.props.setGraphCellExpandCounter(graphParams.counter, true);
    }

    this.clearTooltips();

    this.clearBubbles();

    return (
      <div className={bemClasses()}>
        <TagsSection
          tags={tags ? Object.values(tags) : []}
          size={graphParams.graphSize.width}
        />

        <div
          className={bemClasses('impact-block')}
          style={{ minHeight: graphParams.graphSize.height }}>
          <div className={bemClasses('impact-icon')}>
            <FontAwesomeIcon icon={faThumbsUp} />
          </div>
          {this.renderGraphs(
            IMPACTS.POS,
            graphParams.radiuses,
            graphParams.graphSize
          )}
        </div>

        <div
          className={bemClasses('impact-block')}
          style={{ minHeight: graphParams.graphSize.height }}>
          <div className={bemClasses('impact-icon')}>0</div>
          {this.renderGraphs(
            IMPACTS.ZERO,
            graphParams.radiuses,
            graphParams.graphSize
          )}
        </div>

        <div
          className={bemClasses('impact-block')}
          style={{ minHeight: graphParams.graphSize.height }}>
          <div className={bemClasses('impact-icon')}>
            <FontAwesomeIcon icon={faThumbsDown} />
          </div>
          {this.renderGraphs(
            IMPACTS.NEG,
            graphParams.radiuses,
            graphParams.graphSize
          )}
        </div>
      </div>
    );
  }
}

export default GraphLayout;
