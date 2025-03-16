import React, { useState } from 'react';
import axios from 'axios';
import {
  Form,
  ListGroup,
  Button,
  Accordion,
  Container,
  Col,
  Row,
} from 'react-bootstrap';

const RegForm = ({ getAllHangoverInfo }) => {
  // set state for all table variables
  const [hangoverName, setHangoverName] = useState('');
  const [hangoverDate, setHangoverDate] = useState(0);
  const [hangoverAddSub, setHangoverAddSub] = useState(false);
  const [hangoverNote, setHangoverNote] = useState('');
  const [symptomNames, setSymptomNames] = useState([]);
  const [symptomSeverities, setSymptomSeverities] = useState([]);
  const [symptomDurations, setSymptomDurations] = useState([]);
  const [pastDrinks, setPastDrinks] = useState([]);
  const [pastShots, setPastShots] = useState([]);
  const [timespan, setTimeSpan] = useState([]);
  const [pastFood, setPastFood] = useState([]);

  console.log('on it now');
  return (
    <Container>
      <Accordion>
        <Accordion.Item eventKey='1'>
          <Accordion.Header>Accordion Form Test</Accordion.Header>
          <Accordion.Body>
            <Form>
              <Form.Group
                className='mb-3'
                controlId='exampleForm.ControlInput1'
              >
                <Row className="mb-3">
                <Form.Label>Hangover Assessment</Form.Label>
                <Col>
                <Form.Control type='text' placeholder='what did this to you' />
                </Col>
                <Col>
                <Form.Control type='date' placeholder='2/25/25' />
                </Col>
                <Col>
                <Form.Control type='text' placeholder='additional substances' />
                </Col>
                <Col>
                <Form.Control type='text' placeholder='what substances' />
                </Col>
                </Row>
                <Row className='mb-3'>
                  <Col>
                  <div>Name a pain</div>
                <Form.Control type='text' placeholder='Symptom' />
                  </Col>
                  <Col>
                <div>How bad 1-10</div>
                <Form.Control type='number' placeholder='11' />
                  </Col>
                  <Col>
                <div>How long did it last</div>
                <Form.Control type='number' placeholder='' />
                  </Col>
                </Row>
                <Row>
                  <Col>
                <div>What did you drink</div>
                <Form.Control type='text' placeholder='' />
                  </Col>
                  <Col>
                <div>How many</div>
                <Form.Control type='number' placeholder='3' />
                  </Col>
                  <Col>
                <div>Over how long</div>
                <Form.Control type='number' placeholder='in hours' />
                  </Col>
                </Row>
                <div>Did you eat anything?</div>
                <Form.Control type='text' placeholder='tacos' />
              </Form.Group>
              <Form.Group
                className='mb-3'
                controlId='exampleForm.ControlTextarea1'
              >
              </Form.Group>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default RegForm;
