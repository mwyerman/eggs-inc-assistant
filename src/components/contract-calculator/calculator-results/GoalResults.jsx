import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import GoalCard from './GoalCard';

function GoalResults(props) {
  const { goals } = props;

  const goalCards = [];
  let counter = 0;

  for (let i = 0; i < goals.length; i += 1) {
    if (goals[i] > 0) {
      counter += 1;
      goalCards.push(
        <Col key={i} md={{ span: 3 }} xs={{ span: 4 }}>
          <GoalCard
            goal={goals[i]}
            result={props.result}
            goalNum={counter}
          />
        </Col>,
      );
    }
  }

  return (
    <Row className="justify-content-md-center">
      {goalCards}
    </Row>
  );
}

GoalResults.propTypes = {
  goals: PropTypes.arrayOf(PropTypes.number).isRequired,
  result: PropTypes.number.isRequired,
};

export default GoalResults;
