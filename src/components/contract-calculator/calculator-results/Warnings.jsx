import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Row, Col } from 'react-bootstrap';
import { formatMinutes } from '../../util';

function Warnings({ hatcheryCap, shippingCap, time }) {
  const warnings = [];

  const hc = time === null || hatcheryCap <= time;
  const sc = time === null || shippingCap <= time;

  let lSpacing = 12;
  if (hc && sc) {
    lSpacing = 6;
  }

  if (hc) {
    let timeText = `You will run out of hatchery space in ${formatMinutes(hatcheryCap)}.`;
    let type = 'warning';
    if (hatcheryCap === 0) {
      timeText = 'You have run out of hatchery space.';
      type = 'danger';
    }
    warnings.push(
      <Col xs={12} lg={lSpacing} key="hatchCapped">
        <Alert variant={type}>
          <Alert.Heading>You are limited by your hatchery capacity!</Alert.Heading>
          <p>{timeText}</p>
        </Alert>
      </Col>,
    );
  }

  if (sc) {
    let timeText = `You will run out of shipping capacity in ${formatMinutes(shippingCap)}.`;
    let type = 'warning';
    if (shippingCap === 0) {
      timeText = 'You have run out of shipping capacity.';
      type = 'danger';
    }
    warnings.push(
      <Col xs={12} lg={lSpacing} key="shipCapped">
        <Alert key="shipCapped" variant={type}>
          <Alert.Heading>You are limited by your shipping capacity!</Alert.Heading>
          <p>{timeText}</p>
        </Alert>
      </Col>,
    );
  }

  return (
    <>
      <Row>
        {[warnings]}
      </Row>
    </>
  );
}

Warnings.propTypes = {
  hatcheryCap: PropTypes.number,
  shippingCap: PropTypes.number,
  time: PropTypes.number,
};

Warnings.defaultProps = {
  hatcheryCap: null,
  shippingCap: null,
  time: null,
};

export default Warnings;
