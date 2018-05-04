import React from 'react';
import { connect } from 'react-redux';
import { getBEMClasses } from 'helper/BEMHelper';
import { radiusHelper } from 'helper/radiusHelper';
import TagsSection from './TagsSection';
import IMPACTS from 'constants/impactConstants';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { graphSizeHelper } from 'helper/graphSizeHelper';
import { faThumbsUp, faThumbsDown } from '@fortawesome/fontawesome-free-solid';
import Preloader from 'components/common/preloader/Preloader';
import ThunderIcon from 'assets/images/thunder-background.svg';

import 'assets/styles/graph-layout.css';
import Graph from './Graph';

const graph = 'graph-layout';
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

  renderLaunchingPreloader() {
    return (
      <Preloader
        preloadIcon={<img src={ThunderIcon} alt="preloader-icon" width={150} />}
        title="Launching your Thunder..."
        description={
          'Depending om the amount of data, fetching it can take a while or two.' +
          '\n Good time to make yourself a cup of something'
        }
      />
    );
  }

  renderGraphs = (impact, radiuses, graphSize) => {
    const { tags, bubbles, categories } = this.props.chartData;

    if (tags && bubbles && categories && radiuses && graphSize) {
      const tagsArray = Object.values(tags);

      const filledBubbles = bubbles.map(bubble => {
        bubble.category = categories[bubble.categoryId];
        bubble.tag = tags[bubble.tagId].name;
        return bubble;
      });

      const graphs = tagsArray.map((tag, i) => {
        const currentBubbles = bubbles.filter(
          bubble =>
            bubble.tag === tag.name &&
            bubble.popularity === impact &&
            !this.props.hiddenInsights.some(a => a === bubble.categoryKey),
        );

        const items = currentBubbles.map(bubble => ({
          label: bubble.categoryKey,
          color: bubble.category.color,
          size: bubble.instances,
        }));

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

  componentDidMount() {
    window.addEventListener('resize', this.resizeHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler);
  }

  render() {
    const { tags, bubbles, categories } = this.props.chartData;

    const graphSize = graphSizeHelper(tags, { minWidth: 150, minHeigth: 150 }, this.props.zoom);

    const radiuses = tags && bubbles && categories ? radiusHelper(tags, bubbles, categories, graphSize) : undefined;

    let nodes = document.getElementsByClassName('graph__graph-container');
    nodes = Array.prototype.slice.call(nodes);
    nodes.forEach(node => {
      node.innerHTML = '';
    });

    return (
      <div className={bemClasses()}>
        {<TagsSection tags={tags ? Object.values(tags) : []} size={graphSize.width} />}

        <div className={bemClasses('impact-block')} style={{ minHeight: graphSize.height }}>
          <div className={bemClasses('impact-icon')}>
            <FontAwesomeIcon icon={faThumbsUp} />
          </div>
          {this.renderGraphs(IMPACTS.POS, radiuses, graphSize)}
        </div>

        <div className={bemClasses('impact-block')} style={{ minHeight: graphSize.height }}>
          <div className={bemClasses('impact-icon')}>0</div>
          {this.renderGraphs(IMPACTS.ZERO, radiuses, graphSize)}
        </div>

        <div className={bemClasses('impact-block')} style={{ minHeight: graphSize.height }}>
          <div className={bemClasses('impact-icon')}>
            <FontAwesomeIcon icon={faThumbsDown} />
          </div>
          {this.renderGraphs(IMPACTS.NEG, radiuses, graphSize)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  chartData: state.app.chartData,
  hiddenInsights: state.app.hiddenInsights,
});

export default connect(mapStateToProps, null)(GraphLayout);
