import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryLabel,
} from 'victory';

import { formatCompactMinutes, formatLargeNumber } from '../../util';


class MainGraph extends React.Component {
  constructor(props) {
    super(props);

    this.optimalResults = props.optimalResults;
    this.realResults = props.realResults;
    this.goalVals = props.goals;
    this.time = props.time;

    // this.state = {
    //   realGraphEnabled: true,
    //   optimalGraphEnabled: true,
    //   goalsEnabled: Array(this.goals.length).fill(true),
    // };
  }

  render() {
    const {
      optimalResults,
      realResults,
      goals,
      time,
    } = this.props;
    const goalVals = goals.filter((value) => value > 0);

    let maxY = 0;
    for (let i = 0; i < goalVals.length; i += 1) {
      if (goalVals[i] > maxY) {
        maxY = goalVals[i];
      }
    }
    maxY = Math.max(maxY, optimalResults(time), realResults(time));

    const goalLines = goalVals.map((value, index) => (
      <VictoryLine
        name={`Goal ${index + 1}`}
        key={value}
        style={{ data: { stroke: 'red' } }}
        samples={2}
        y={() => value}
      />
    ));

    const goalToggles = goalVals.map((value, index) => (
      <Button key={value}>{`Goal ${index + 1}`}</Button>
    ));

    return (
      <>
        <ButtonToolbar className="justify-content-center" style={{ padding: 15 }}>
          <ButtonGroup className="mr-2">
            <Button>Results</Button>
            <Button>Optimal Results</Button>
          </ButtonGroup>
          <ButtonGroup className="mr-2">
            {goalToggles}
          </ButtonGroup>
        </ButtonToolbar>
        <VictoryChart
          width={600}
          height={400}
          animate={{ duration: 1000 }}
          padding={{
            top: 50,
            bottom: 40,
            left: 75,
            right: 25,
          }}
          domain={{ x: [0, Math.max(time, 60)], y: [0, Math.max(maxY, 1000)] }}
          domainPadding={{ x: [0, 1], y: [0, 2] }}
        >
          <VictoryAxis
            tickFormat={(tick) => formatCompactMinutes(tick)}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(tick) => formatLargeNumber(tick)}
          />
          <VictoryLabel text="Eggs Delivered Over Time" x={300} y={30} textAnchor="middle" />
          <VictoryLine
            name="End"
            x={() => time}
          />
          <VictoryLine
            name="Eggs"
            style={{ data: { stroke: 'green' } }}
            samples={50}
            y={(d) => realResults(d.x)}
          />
          <VictoryLine
            name="Optimal"
            style={{ data: { stroke: 'grey', opacity: 0.5 } }}
            samples={50}
            y={(d) => optimalResults(d.x)}
          />
          {goalLines}
        </VictoryChart>
      </>
    );
  }
}

MainGraph.propTypes = {
  time: PropTypes.number.isRequired,
  optimalResults: PropTypes.func.isRequired,
  realResults: PropTypes.func.isRequired,
  goals: PropTypes.arrayOf(PropTypes.number).isRequired,
};

MainGraph.defaultProps = {
};

export default MainGraph;
