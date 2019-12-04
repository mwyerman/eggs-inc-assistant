import React from 'react';
import {
  Row,
  Col,
  Button,
  Collapse,
  Spinner,
} from 'react-bootstrap';
import localforage from 'localforage';

import CalculatorForm from './CalculatorForm/CalculatorForm';
import ContractResults from './CalculatorResults/ContractResults';

class ContractCalculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: {
        goal1: 0,
        goal2: 0,
        goal3: 0,
        days: 0,
        hours: 0,
        pop: 0,
        eggs: 0,
        layingRate: 0,
        hatchRate: 0,
        hatchSpace: 0,
        shipRate: 0,
        epic: 0,
      },
      defaultEpicLevel: 0,
      dbRead: false,
      formVisible: true,
      formsReady: 0,
    };

    this.toggleForm = this.toggleForm.bind(this);
    this.formReady = this.formReady.bind(this);
  }

  componentDidMount() {
    const { dbRead } = this.state;
    if (!dbRead) {
      localforage.keys()
        .then((keys) => {
          if (keys.includes('epic-research')) {
            localforage.getItem('epic-research').then((value) => {
              const { internalHatcheryCalm } = value;
              this.setState((prevState) => {
                const newState = prevState;
                newState.defaultEpicLevel = internalHatcheryCalm;
                newState.epic = internalHatcheryCalm;
                return newState;
              });
            });
          }
        });
      this.setState((prevState) => {
        const newState = prevState;
        newState.dbRead = true;
        return newState;
      });
    }
  }

  getResultInput() {
    const { input } = this.state;
    const {
      goal1,
      goal2,
      goal3,
      days,
      hours,
      pop,
      eggs,
      layingRate,
      hatchRate,
      hatchSpace,
      shipRate,
      epic,
    } = input;
    return {
      goals: [goal1, goal2, goal3],
      time: (days * 24) + hours,
      pop,
      eggs,
      layingRate,
      hatchRate,
      hatchSpace,
      shipRate,
      epic,
    };
  }

  formReady() {
    this.setState((prevState) => {
      const newState = prevState;
      newState.formsReady += 1;
      console.log(newState.formsReady)
      return newState;
    });
  }

  handleChange(field, value) {
    this.setState((prevState) => {
      const nextState = prevState;
      nextState.input[field] = (Number.isNaN(value) ? 0 : value);
      return nextState;
    });
  }

  toggleForm() {
    this.setState((prevState) => {
      const newState = prevState;
      newState.formVisible = !newState.formVisible;
      return newState;
    });
  }

  render() {
    const divStyle = {
      padding: 20,
    };

    const { defaultEpicLevel, formVisible, formsReady } = this.state;
    let loading = false;

    if (formsReady !== 12) {
      loading = true;
    }

    const style = { position: 'fixed', top: '50%', left: '50%' };

    return (
      <>
        <div id="center" style={style} hidden={!loading}>
          <Spinner animation="border">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
        <div style={divStyle} hidden={loading}>
          <h3>Contract Calculator</h3>
          <p>
            This page allows you to determine whether you will complete a contract based on your
            current pace. Enter information about your current contract on the left, and see how
            you are expected to do on the right. This is an estimate which will show your results
            if your silos never run out and you don&apost buy any new research, hatcheries, or
            vehicles. This calculator does not consider any other players that might be
            participating in a co-op contract.
          </p>
          <Button onClick={this.toggleForm}>Toggle Form</Button>
          <Row>
            {/* <Col xs={12} xl={6}> */}
            <Collapse style={{ padding: 0 }} in={formVisible}>
              <div>
                <CalculatorForm
                  id="calculator-form"
                  className="form"
                  defaultEpicLevel={defaultEpicLevel}
                  handleChange={(field, value) => this.handleChange(field, value)}
                  formReady={this.formReady}
                />
              </div>
            </Collapse>
            {/* </Col> */}
            <Col style={{ padding: 15 }}>
              <ContractResults data={this.getResultInput()} />
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default ContractCalculator;
