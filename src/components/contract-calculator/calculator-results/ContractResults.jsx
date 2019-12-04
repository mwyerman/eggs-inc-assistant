import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import Warnings from './Warnings';
import GoalResults from './GoalResults';
import { formatLargeNumber } from '../../util';
import MainGraph from './MainGraph';
import SecondaryGraph from './SecondaryGraph';

function ContractResults({ data }) {
  const {
    goals,
    shipRate,
    pop,
    layingRate,
    habSpace,
    hatchRate,
    eggs,
    epicLvl,
  } = data;

  const time = data.time * 60;

  const epicBonus = epicLvl * 0.1;
  const a = (2 * hatchRate * layingRate * (1 + epicBonus)) / Math.max(pop, 1);
  const b = layingRate;
  const c = eggs;

  const findCap = (limit, start, growthRate) => {
    const cap = (limit - start) / growthRate;
    return Number.isNaN(cap) ? 0 : cap;
  }

  const eggsPerChickenPerMinute = layingRate / Math.max(pop, 1);
  const layingRateGrowthRate = eggsPerChickenPerMinute * 4 * hatchRate * (1 + epicBonus);
  const shippingCap = findCap(shipRate, layingRate, layingRateGrowthRate);
  const hatcheryCap = findCap(habSpace, pop, hatchRate);

  function optimalResults(t) {
    const result = (a * (t ** 2)) + (b * t) + c;
    if (Number.isNaN(result)) {
      return 0;
    }
    return result;
  }

  function resultsIgnoreShipping(t) {
    if (t < hatcheryCap) {
      return optimalResults(t);
    }
    const midPoint = optimalResults(hatcheryCap);
    const result = midPoint + (habSpace * eggsPerChickenPerMinute * (t - hatcheryCap));
    if (Number.isNaN(result)) {
      return 0;
    }
    return result;
  }

  function resultsIgnoreHatchery(t) {
    if (t < shippingCap) {
      return optimalResults(t);
    }
    const midPoint = optimalResults(shippingCap);
    const result = midPoint + (shipRate * (t - shippingCap));
    if (Number.isNaN(result)) {
      return 0;
    }
    return result;
  }

  function realResults(t) {
    return Math.min(resultsIgnoreHatchery(t), resultsIgnoreShipping(t));
  }

  const eq = `${a}x^2 + ${b}x + ${c}`;

  return (
    <>
      <h5 justify="center">{`Expected egg count: ${formatLargeNumber(realResults(time))}`}</h5>
      <Warnings shippingCap={shippingCap} hatcheryCap={hatcheryCap} time={time} />
      <GoalResults goals={goals} result={realResults(time)} />
      <Row>
        <Col xs={12} lg={6}>
          <MainGraph
            time={time}
            optimalResults={optimalResults}
            realResults={realResults}
            goals={goals}
          />
        </Col>
        <Col xs={12} lg={6}>
          <Row>
            <Col xs={6} md={12}>
              <SecondaryGraph
                title="Chickens Over Time"
                time={time}
                growthRate={hatchRate}
                limit={habSpace}
                start={pop}
              />
            </Col>
            <Col xs={6} md={12}>
              <SecondaryGraph
                title="Laying Rate Over Time"
                time={time}
                growthRate={eggsPerChickenPerMinute * 4 * hatchRate * (1 + epicBonus)}
                limit={shipRate}
                start={layingRate}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <p>{eq}</p>
      <p>
        {`Final: ${formatLargeNumber(realResults(time))}`}
        {`Final Without Restrictions: ${formatLargeNumber(optimalResults(time))}`}
      </p>
      <p>{JSON.stringify(data)}</p>
    </>
  );
}

ContractResults.propTypes = {
  data: PropTypes.shape({
    goals: PropTypes.arrayOf(PropTypes.number),
    time: PropTypes.number,
    pop: PropTypes.number,
    eggs: PropTypes.number,
    layingRate: PropTypes.number,
    hatchRate: PropTypes.number,
    habSpace: PropTypes.number,
    shipRate: PropTypes.number,
    epicLvl: PropTypes.number,
  }).isRequired,
};

ContractResults.defaultProps = {
};

export default ContractResults;
