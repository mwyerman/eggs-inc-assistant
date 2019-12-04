import React from 'react';
import PropTypes from 'prop-types';
import {
  VictoryChart,
  VictoryLine,
  VictoryLabel,
  VictoryAxis,
} from 'victory';

import { formatCompactMinutes, formatLargeNumber } from '../../util';

function SecondaryGraph(props) {
  const {
    growthRate,
    limit,
    start,
    time,
    title,
  } = props;

  const optimal = (t) => (growthRate * t) + start;

  const capTime = (limit - start) / growthRate;
  const real = (t) => {
    if (t <= capTime) {
      return optimal(t);
    }
    return limit;
  };

  const maxY = Math.max(optimal(time), limit);

  return (
    <>
      <VictoryChart
        width={600}
        height={200}
        animate={{ duration: 1000 }}
        responsive={false}
        padding={{
          top: 50,
          bottom: 40,
          left: 75,
          right: 25,
        }}
        domain={{ x: [0, Math.max(time, 60)], y: [0, Math.max(maxY, 1000)] }}
      >
        <VictoryAxis
          tickFormat={(tick) => formatCompactMinutes(tick)}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(tick) => `${formatLargeNumber(tick)}`}
        />
        <VictoryLabel text={title} x={300} y={30} textAnchor="middle" />
        <VictoryLine
          style={{ data: { stroke: 'green' } }}
          samples={50}
          y={(d) => real(d.x)}
        />
        <VictoryLine
          style={{ data: { stroke: 'grey', opacity: 0.5 } }}
          samples={50}
          y={(d) => optimal(d.x)}
        />
        <VictoryLine
          style={{ data: { stroke: 'red' } }}
          samples={2}
          y={() => limit}
        />
      </VictoryChart>
    </>
  );
}

SecondaryGraph.propTypes = {
  title: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  growthRate: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  start: PropTypes.number.isRequired,
};

SecondaryGraph.defaultProps = {
};

export default SecondaryGraph;
