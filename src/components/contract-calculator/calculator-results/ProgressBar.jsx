import React from 'react';
import PropTypes from 'prop-types';
import { VictoryAnimation, VictoryLabel, VictoryPie } from 'victory';

import { formatLargeNumber } from '../../util';

const ProgressBar = (props) => {
  const { result, goal } = props;
  let percent = result / goal;
  if (percent > 1) {
    percent = 100;
  } else if (Number.isNaN(percent)) {
    percent = 0;
  } else {
    percent *= 100;
  }

  const data = [{ x: 1, y: percent }, { x: 2, y: 100 - percent }];
  const text = percent === 100 ? 'Complete' : `${formatLargeNumber(result)} / ${formatLargeNumber(goal)}`;

  return (
    <div align="center">
      <svg viewBox="0 0 400 400" width="100%" height="100%">
        <VictoryPie
          standalone={false}
          animate={{ duration: 1000 }}
          width={400}
          height={400}
          data={data}
          innerRadius={120}
          cornerRadius={25}
          labels={() => null}
          style={{
            data: {
              fill: ({ datum }) => {
                let color = datum.y > 70 ? 'orange' : 'red';
                color = datum.y === 100 ? 'green' : color;
                return datum.x === 1 ? color : 'transparent';
              },
            },
          }}
        />
        <VictoryAnimation duration={1000} data={{ percent }}>
          {(newProps) => (
            <VictoryLabel
              textAnchor="middle"
              verticalAnchor="middle"
              x={200}
              y={200}
              text={`${Math.trunc(newProps.percent)}%`}
              style={{ fontSize: 45 }}
            />
          )}
        </VictoryAnimation>
      </svg>
      <p>{text}</p>
    </div>
  );
};

ProgressBar.propTypes = {
  result: PropTypes.number.isRequired,
  goal: PropTypes.number.isRequired,
};

export default ProgressBar;
