import React from 'react';
import PropTypes from 'prop-types';
import { Form, Card, Col } from 'react-bootstrap';

class TotalCostCalculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentGoldenEggs: '',
      piggyBankEggs: '',
      piggyBankLevel: '',
      totalGoldenEggs: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { target } = event;
    const { name, value } = target;
    if (value === '' || !Number.isNaN(parseInt(value, 10))) {
      this.setState((prevState) => {
        const newState = prevState;
        let temp;
        if (value === '') temp = ''; else temp = parseInt(value, 10);
        newState[name] = temp;
        return newState;
      });
    }
  }

  render() {
    const { totalCost } = this.props;
    const {
      currentGoldenEggs,
      piggyBankEggs,
      piggyBankLevel,
    } = this.state;

    let goldEggsNum;
    let piggyEggsNum;
    let piggyLevelNum;

    if (currentGoldenEggs === '') goldEggsNum = 0; else goldEggsNum = currentGoldenEggs;
    if (piggyBankEggs === '') piggyEggsNum = 0; else piggyEggsNum = piggyBankEggs;
    if (piggyBankLevel === '') piggyLevelNum = 0; else piggyLevelNum = piggyBankLevel;

    let piggyBonus = 1;
    if (piggyLevelNum === 1) {
      piggyBonus = 1.02;
    } else if (piggyLevelNum === 2) {
      piggyBonus = 1.25;
    } else if (piggyLevelNum > 2) {
      piggyBonus = 1.1 + (0.1 * piggyLevelNum);
    }

    const totalPiggyEggs = Math.trunc(piggyEggsNum * piggyBonus);
    const totalGoldenEggs = goldEggsNum + totalPiggyEggs;

    return (
      <Card body>
        <Form.Row>
          <Col sm={4} lg={2}>
            <Form.Label>Golden Eggs</Form.Label>
            <Form.Control name="currentGoldenEggs" placeholder={0} value={currentGoldenEggs} onChange={this.handleChange} />
          </Col>
          <Col sm={4} lg={2}>
            <Form.Label>Piggy Bank</Form.Label>
            <Form.Control name="piggyBankEggs" placeholder={0} value={piggyBankEggs} onChange={this.handleChange} />
          </Col>
          <Col sm={4} lg={2}>
            <Form.Label>Piggy Bank Level</Form.Label>
            <Form.Control name="piggyBankLevel" placeholder={0} value={piggyBankLevel} onChange={this.handleChange} />
          </Col>
          <Col sm={4} lg={2}>
            <Form.Label>Total Piggy Bank Eggs</Form.Label>
            <Form.Control name="totalPiggyEggs" disabled value={totalPiggyEggs} />
          </Col>
          <Col sm={4} lg={2}>
            <Form.Label>Total Golden Eggs Available</Form.Label>
            <Form.Control name="totalGoldenEggs" disabled value={totalGoldenEggs} />
          </Col>
          <Col sm={4} lg={2}>
            <Form.Label>Remaining Research Cost</Form.Label>
            <Form.Control name="totalCost" disabled value={totalCost} />
          </Col>
        </Form.Row>
      </Card>
    );
  }
}

TotalCostCalculator.propTypes = {
  totalCost: PropTypes.number.isRequired,
};

export default TotalCostCalculator;
