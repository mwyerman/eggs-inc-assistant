import React from 'react';
import PropTypes from 'prop-types';
import { Col, Card } from 'react-bootstrap';

import ProgressBar from './ProgressBar';

function GoalCard(props) {
  const {
    goal,
    result,
    goalNum,
  } = props;

  return (
    <Card>
      <Card.Header>{`Goal ${goalNum}`}</Card.Header>
      <Card.Body>
        <ProgressBar goal={goal} result={result} num={goalNum} />
      </Card.Body>
    </Card>
  );
}

GoalCard.propTypes = {
  goal: PropTypes.number.isRequired,
  result: PropTypes.number.isRequired,
  goalNum: PropTypes.number.isRequired,
};

GoalCard.defaultProps = {
};

export default GoalCard;
