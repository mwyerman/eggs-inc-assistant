import React from 'react';
import PropTypes from 'prop-types';
import { Form, InputGroup, Col } from 'react-bootstrap';

import DropdownSelection from './DropdownSelection';

const ContractForm = ({ handleInput, handleSelection, formInputs }) => (
  <>
    <Form>
      <Form.Label>Goals</Form.Label>
      <Form.Row>
        <Col>
          <Form.Group>
            <InputGroup>
              <Form.Control name="goal1" placeholder={0} value={formInputs.goal1.value} onChange={handleInput} />
              <DropdownSelection name="goal1" num={6} selected={formInputs.goal1.selectedIndex} handleSelection={handleSelection} />
            </InputGroup>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <InputGroup>
              <Form.Control name="goal2" placeholder={0} value={formInputs.goal2.value} onChange={handleInput} />
              <DropdownSelection name="goal2" num={6} selected={formInputs.goal2.selectedIndex} handleSelection={handleSelection} />
            </InputGroup>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <InputGroup>
              <Form.Control name="goal3" placeholder={0} value={formInputs.goal3.value} onChange={handleInput} />
              <DropdownSelection name="goal3" num={6} selected={formInputs.goal3.selectedIndex} handleSelection={handleSelection} />
            </InputGroup>
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Label>Time Remaining</Form.Label>
      <Form.Row>
        <Col>
          <Form.Group>
            <InputGroup>
              <Form.Control name="days" placeholder={0} value={formInputs.days.value} onChange={handleInput} />
              <InputGroup.Append>
                <InputGroup.Text>days</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <InputGroup>
              <Form.Control name="hours" placeholder={0} value={formInputs.hours.value} onChange={handleInput} />
              <InputGroup.Append>
                <InputGroup.Text>hours</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Row>
        <Col md={6} lg={3}>
          <Form.Group>
            <Form.Label>Eggs Delivered</Form.Label>
            <InputGroup>
              <Form.Control name="eggs" placeholder={0} value={formInputs.eggs.value} onChange={handleInput} />
              <DropdownSelection name="eggs" num={6} selected={formInputs.eggs.selectedIndex} handleSelection={handleSelection} />
              <InputGroup.Append>
                <InputGroup.Text>eggs</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
        </Col>
        <Col md={6} lg={3}>
          <Form.Group>
            <Form.Label>Hab Capacity</Form.Label>
            <InputGroup>
              <Form.Control name="habSpace" placeholder={0} value={formInputs.habSpace.value} onChange={handleInput} />
              <DropdownSelection name="habSpace" num={4} selected={formInputs.habSpace.selectedIndex} handleSelection={handleSelection} />
              <InputGroup.Append>
                <InputGroup.Text>chickens</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
        </Col>
        <Col md={6} lg={3}>
          <Form.Group>
            <Form.Label>Farm Population</Form.Label>
            <InputGroup>
              <Form.Control name="pop" placeholder={0} value={formInputs.pop.value} onChange={handleInput} />
              <DropdownSelection name="pop" num={4} selected={formInputs.pop.selectedIndex} handleSelection={handleSelection} />
              <InputGroup.Append>
                <InputGroup.Text>chickens</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
        </Col>
        <Col md={6} lg={3}>
          <Form.Group>
            <Form.Label>Internal Hatchery Rate</Form.Label>
            <InputGroup>
              <Form.Control name="hatchRate" placeholder={0} value={formInputs.hatchRate.value} onChange={handleInput} />
              <InputGroup.Append>
                <InputGroup.Text>chickens/min/hab</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
        </Col>
        <Col md={6} lg={4}>
          <Form.Group>
            <Form.Label>Egg Laying Rate</Form.Label>
            <InputGroup>
              <Form.Control name="layingRate" placeholder={0} value={formInputs.layingRate.value} onChange={handleInput} />
              <DropdownSelection name="layingRate" num={6} selected={formInputs.layingRate.selectedIndex} handleSelection={handleSelection} />
              <InputGroup.Append>
                <InputGroup.Text>eggs/min</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
        </Col>
        <Col md={6} lg={4}>
          <Form.Group>
            <Form.Label>Max Shipping Rate</Form.Label>
            <InputGroup>
              <Form.Control name="shipRate" placeholder={0} value={formInputs.shipRate.value} onChange={handleInput} />
              <DropdownSelection name="shipRate" num={6} selected={formInputs.shipRate.selectedIndex} handleSelection={handleSelection} />
              <InputGroup.Append>
                <InputGroup.Text>eggs/min</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
        </Col>
        <Col md={6} lg={4}>
          <Form.Group>
            <Form.Label>Internal Hatchery Calm Level</Form.Label>
            <InputGroup>
              <Form.Control name="epicLvl" placeholder={0} value={formInputs.epicLvl.value} onChange={handleInput} />
              <InputGroup.Append>
                <InputGroup.Text>{`+${formInputs.epicLvl.rawValue * 10}%`}</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
        </Col>
      </Form.Row>
    </Form>
  </>
);

ContractForm.propTypes = {
  handleInput: PropTypes.func.isRequired,
  handleSelection: PropTypes.func.isRequired,
  formInputs: PropTypes.shape({
    goal1: PropTypes.shape({
      value: PropTypes.string.isRequired,
      selectedIndex: PropTypes.number.isRequired,
    }).isRequired,
    goal2: PropTypes.shape({
      value: PropTypes.string.isRequired,
      selectedIndex: PropTypes.number.isRequired,
    }).isRequired,
    goal3: PropTypes.shape({
      value: PropTypes.string.isRequired,
      selectedIndex: PropTypes.number.isRequired,
    }).isRequired,
    days: PropTypes.shape({
      value: PropTypes.string.isRequired,
    }).isRequired,
    hours: PropTypes.shape({
      value: PropTypes.string.isRequired,
    }).isRequired,
    eggs: PropTypes.shape({
      value: PropTypes.string.isRequired,
      selectedIndex: PropTypes.number.isRequired,
    }).isRequired,
    habSpace: PropTypes.shape({
      value: PropTypes.string.isRequired,
      selectedIndex: PropTypes.number.isRequired,
    }).isRequired,
    pop: PropTypes.shape({
      value: PropTypes.string.isRequired,
      selectedIndex: PropTypes.number.isRequired,
    }).isRequired,
    hatchRate: PropTypes.shape({
      value: PropTypes.string.isRequired,
    }).isRequired,
    layingRate: PropTypes.shape({
      value: PropTypes.string.isRequired,
      selectedIndex: PropTypes.number.isRequired,
    }).isRequired,
    shipRate: PropTypes.shape({
      value: PropTypes.string.isRequired,
      selectedIndex: PropTypes.number.isRequired,
    }).isRequired,
    epicLvl: PropTypes.shape({
      value: PropTypes.string.isRequired,
      rawValue: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ContractForm;
