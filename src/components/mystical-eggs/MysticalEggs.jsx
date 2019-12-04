import React from 'react';
import { Form, Container, Col } from 'react-bootstrap';

function MysticalEggs() {
  return (
    <Container>
      <Form>
        <Form.Row>
          <Col>
            <Form.Label>Soul Eggs</Form.Label>
            <Form.Control />
          </Col>
          <Col>
            <Form.Label>Prophecy Eggs</Form.Label>
            <Form.Control />
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Form.Label>Soul Food</Form.Label>
            <Form.Control />
          </Col>
          <Col>
            <Form.Label>Prophecy Bonus</Form.Label>
            <Form.Control />
          </Col>
        </Form.Row>
      </Form>
    </Container>
  );
}

export default MysticalEggs;
