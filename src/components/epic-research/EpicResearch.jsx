import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import localforage from 'localforage';
import { Container } from 'react-bootstrap';

import EpicResearchCosts from './EpicResearchCosts';
import EpicResearchItem from './EpicResearchIItem';
import TotalCostCalculator from './TotalCostCalculator';

class EpicResearch extends React.Component {
  constructor(props) {
    super(props);
    this.researchKeys = Object.keys(EpicResearchCosts);

    this.state = {
      researchLevels: null,
    };

    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    localforage.keys()
      .then((keys) => {
        if (!(keys.includes('epic-research'))) {
          // init research values to 0
          const emptyResearch = {};
          this.researchKeys.forEach((element) => {
            emptyResearch[element] = 0;
          });

          localforage.setItem('epic-research', emptyResearch);
          this.setState((prevState) => {
            const newState = prevState;
            newState.researchLevels = emptyResearch;
            return newState;
          });
        } else {
          // load existing research values
          localforage.getItem('epic-research').then((value) => {
            this.setState((prevState) => {
              const newState = prevState;
              newState.researchLevels = value;
              return newState;
            });
          });
        }
      });
  }

  handleUpdate(event) {
    const { target } = event;
    let value;
    if (target.type === 'checkbox') {
      value = target.checked ? 1 : 0;
    } else {
      value = parseInt(target.value, 10);
    }
    const { name } = target;

    if (Number.isNaN(value)) {
      value = 0;
    }
    if (value > EpicResearchCosts[name].costs.length) {
      value = EpicResearchCosts[name].costs.length;
    }

    this.setState((prevState) => {
      const { researchLevels } = prevState;
      researchLevels[name] = value;
      return {
        researchLevels,
      };
    }, () => {
      const { researchLevels } = this.state;
      localforage.setItem('epic-research', researchLevels);
    });
  }

  render() {
    const { researchLevels } = this.state;

    if (researchLevels === null) {
      const style = { position: 'fixed', top: '50%', left: '50%' };
      return (
        <div id="center" style={style}>
          <Spinner animation="border">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      );
    }

    const add = (a, b) => a + b;
    const { researchKeys } = this;
    let totalCost = 0;
    if (researchLevels !== null) {
      for (let i = 0; i < researchKeys.length; i += 1) {
        const researchN = researchKeys[i];
        const { costs } = EpicResearchCosts[researchN];
        const remaining = costs.slice(researchLevels[researchN]).reduce(add, 0);
        totalCost += remaining;
      }
    }

    const rows = researchKeys.map((researchName) => (
      <EpicResearchItem
        level={researchLevels[researchName]}
        researchName={researchName}
        key={researchName}
        handleChange={(i) => this.handleUpdate(i)}
      />
    ));

    return (
      <Container>
        <h3>Epic Research Calculator</h3>
        <p>
          This page allows you to enter which epic research you have completed.
          These values will be used for other areas of the app when necessary.
        </p>
        <TotalCostCalculator totalCost={totalCost} />
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th className="text-center">Bonus</th>
              <th className="text-center">Level</th>
              <th className="text-center">Next</th>
              <th className="text-center">Remaining</th>
              <th className="text-center">Total</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </Container>
    );
  }
}

export default EpicResearch;
