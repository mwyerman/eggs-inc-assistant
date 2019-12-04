import React, { useReducer, useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import localforage from 'localforage';

import ContractForm from './calculator-form/ContractForm';
import ContractResults from './calculator-results/ContractResults';
import { getLargeNumberUnits, getLocalForageValues } from '../util';

const ContractCalculator = () => {
  const [formInputs, setFormInputs] = useReducer((prevForm, updatedItem) => ({
    ...prevForm,
    ...updatedItem,
  }), {
    goal1: {
      value: '',
      rawValue: 0,
      selectedIndex:
      0,
      realValue: 0,
    },
    goal2: {
      value: '',
      rawValue: 0,
      selectedIndex: 0,
      realValue: 0,
    },
    goal3: {
      value: '', rawValue: 0, selectedIndex: 0, realValue: 0,
    },
    days: {
      value: '', rawValue: 0, selectedIndex: 0, realValue: 0,
    },
    hours: {
      value: '', rawValue: 0, selectedIndex: 0, realValue: 0,
    },
    eggs: {
      value: '', rawValue: 0, selectedIndex: 0, realValue: 0,
    },
    pop: {
      value: '', rawValue: 0, selectedIndex: 0, realValue: 0,
    },
    layingRate: {
      value: '', rawValue: 0, selectedIndex: 0, realValue: 0,
    },
    hatchRate: {
      value: '', rawValue: 0, selectedIndex: 0, realValue: 0,
    },
    habSpace: {
      value: '', rawValue: 0, selectedIndex: 0, realValue: 0,
    },
    shipRate: {
      value: '', rawValue: 0, selectedIndex: 0, realValue: 0,
    },
    epicLvl: {
      value: '', rawValue: 0, selectedIndex: 0, realValue: 0,
    },
  });

  const formatInputs = () => ({
    goals: [formInputs.goal1.realValue, formInputs.goal2.realValue, formInputs.goal3.realValue],
    time: (formInputs.days.realValue * 24) + formInputs.hours.realValue,
    pop: formInputs.pop.realValue,
    eggs: formInputs.eggs.realValue,
    layingRate: formInputs.layingRate.realValue,
    hatchRate: formInputs.hatchRate.realValue,
    habSpace: formInputs.habSpace.realValue,
    shipRate: formInputs.shipRate.realValue,
    epicLvl: formInputs.epicLvl.realValue,
  });

  const [dbRead, setDbRead] = useState(false);

  const units = getLargeNumberUnits();

  useEffect(() => {
    if (!dbRead) {
      getLocalForageValues('contract-calculator', (obj) => {
        setFormInputs({ ...obj });
        setDbRead(true);
      });
    }

    window.addEventListener('beforeunload', () => {
      localforage.setItem('contract-calculator', formInputs);
    });
  });

  const handleInput = (event) => {
    const { name, value } = event.target;
    if (!Number.isNaN(parseFloat(value)) || value === '') {
      let { rawValue } = formInputs[name];
      const { selectedIndex } = formInputs[name];
      rawValue = value === '' ? 0 : parseFloat(value);
      const obj = {};
      const modifier = units[selectedIndex].value;
      const realValue = modifier * rawValue;
      obj[name] = {
        value, rawValue, selectedIndex, realValue,
      };
      setFormInputs(obj);
    }
  };

  const handleSelection = (name, selectedIndex) => {
    const { value, rawValue } = formInputs[name];
    const obj = {};
    const modifier = units[selectedIndex].value;
    const realValue = modifier * rawValue;
    obj[name] = {
      value, rawValue, selectedIndex, realValue,
    };
    setFormInputs(obj);
  };

  return (
    <Container>
      {/* <h3>Contract Calculator</h3>
      <p>
        This page allows you to determine whether you will complete a contract based on your
        current pace. Enter information about your current contract on the left, and see how
        you are expected to do on the right. This is an estimate which will show your results
        if your silos never run out and you don&apost buy any new research, hatcheries, or
        vehicles. This calculator does not consider any other players that might be
        participating in a co-op contract.
      </p> */}
      <ContractForm
        handleInput={handleInput}
        handleSelection={handleSelection}
        formInputs={formInputs}
      />
      <ContractResults data={formatInputs()} />
      <p>
        {JSON.stringify(formatInputs())}
      </p>
    </Container>
  );
};

export default ContractCalculator;
