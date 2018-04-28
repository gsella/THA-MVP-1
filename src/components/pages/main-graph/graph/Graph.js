import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as d3 from 'd3';
import { getBEMClasses } from 'helper/BEMHelper';

const chart = 'chart';
const bemClasses = getBEMClasses([chart]);

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
  };

  drawChart = () => {
    const { customClass, items, radiuses } = this.props;

    const diameter = 200;

    const bubble = d3
      .pack()
      .size([diameter, diameter])
      .padding(5);

    const svg = d3
      .select(`.${customClass}`)
      .append('svg')
      .attr('width', diameter)
      .attr('height', diameter)
      .attr('class', 'bubble');

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
        .attr('r', d => radiuses[d.value])
        .style('fill', d => d.data.color);

      node
        .append('text')
        .attr('dy', '.3em')
        .attr('fill', '#fff')
        .style('stroke', '#fff')
        .style('stroke-width', 0.7)
        .style('text-anchor', 'middle')
        .text(d => d.data.label.substring(0, d.r / 3));
    }

    d3.select(window.frameElement).style('height', diameter + 'px');
  };

  componentDidMount() {
    this.drawChart();
  }

  render() {
    const { customClass } = this.props;

    return <div className={customClass} />;
  }
}

export default Graph;
