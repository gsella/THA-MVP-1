import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { getBEMClasses } from 'helper/BEMHelper';
import 'assets/styles/graph.css';

const graph = 'graph';
const bemClasses = getBEMClasses([graph]);

class Graph extends React.Component {
  static propTypes = {
    customClass: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        size: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired,
      }),
    ).isRequired,
    radiuses: PropTypes.shape({
      '1': PropTypes.number,
      '2': PropTypes.number,
      '3': PropTypes.number,
      '4': PropTypes.number,
      '5': PropTypes.number,
    }),
    bubbles: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        categoryId: PropTypes.number.isRequired,
        tagId: PropTypes.number.isRequired,
        categoryKey: PropTypes.string.isRequired,
        insight: PropTypes.string.isRequired,
        popularity: PropTypes.number.isRequired,
        instances: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        category: PropTypes.shape({
          name: PropTypes.string.isRequired,
          color: PropTypes.string.isRequired,
        }).isRequired,
        tag: PropTypes.string.isRequired,
      }),
    ).isRequired,
  };

  getTooltipContent = key => {
    const item = this.props.bubbles.find(bubble => bubble.categoryKey === key);

    return `<div
		class=${bemClasses('tooltip')}
	>
		<div>
			<span class="text-bold">Category:</span> ${item.category.name}
		</div>
		<div>
			<span class="text-bold">Insight:</span> ${item.insight}
		</div>
		<div>
			<span class="text-bold">Instances:</span> ${item.instances}
		</div>
		<div>
			<span class="text-bold">Description:</span> ${item.description}
		</div>
	</div>`;
  };

  drawChart = (customClass, items, radiuses) => {
    const diameter = 200;

    const tooltip = d3
      .select('body')
      .append('div')
      .style('position', 'absolute')
      .style('z-index', '10')
      .style('visibility', 'hidden')
      .style('padding', '8px')
      .style('border-radius', '2px')
      .style('background-color', '#fff')
      .style('box-shadow', '0 0 30px 0 rgba(0, 0, 0, 0.15)');

    const bubble = d3
      .pack()
      .radius(d => radiuses[d.value])
      .size([diameter, diameter])
      .padding(5);

    const svg = d3
      .select(`.${customClass}`)
      .append('svg')
      .attr('width', diameter)
      .attr('height', diameter)
      .attr('class', bemClasses());

    const root = d3
      .hierarchy({ children: items })
      .sum(d => d.size)
      .sort((a, b) => b.size - a.size);

    bubble(root);

    if (root.children) {
      const node = svg
        .selectAll('.node')
        .data(root.children)
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', d => 'translate(' + d.x + ',' + d.y + ')');

      node
        .append('circle')
        .attr('r', d => d.r)
        .style('fill', d => d.data.color)
        .on('mouseover', d => {
          tooltip.html(this.getTooltipContent(d.data.label));
          tooltip.style('visibility', 'visible');
        })
        .on('mousemove', () =>
          tooltip.style('top', d3.event.pageY - 130 + 'px').style('left', d3.event.pageX - 100 + 'px'),
        )
        .on('mouseout', () => tooltip.style('visibility', 'hidden'));

      node
        .append('text')
        .attr('dy', '.3em')
        .attr('fill', '#fff')
        .style('stroke', '#fff')
        .style('stroke-width', 0.7)
        .style('text-anchor', 'middle')
        .text(d => d.data.label.substring(0, d.r / 3))
        .on('mouseover', d => {
          tooltip.html(this.getTooltipContent(d.data.label));
          tooltip.style('visibility', 'visible');
        })
        .on('mousemove', () =>
          tooltip.style('top', d3.event.pageY - 130 + 'px').style('left', d3.event.pageX - 100 + 'px'),
        )
        .on('mouseout', () => tooltip.style('visibility', 'hidden'));
    }

    d3.select(window.frameElement).style('height', diameter + 'px');
  };

  componentWillReceiveProps(newProps) {
    const { customClass, items, radiuses } = newProps;
    this.drawChart(customClass, items, radiuses);
  }

  componentDidMount() {
    const { customClass, items, radiuses } = this.props;
    this.drawChart(customClass, items, radiuses);
  }

  render() {
    const { customClass } = this.props;

    return <div className={`${customClass} graph-item`} />;
  }
}

export default Graph;
