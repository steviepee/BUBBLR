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
  const [symptomName, setSymptomName] = useState('');
  const [symptomSeverity, setSymptomSeverity] = useState(0);
  const [symptomDuration, setSymptomDuration] = useState(0);
  const [pastDrink, setPastDrink] = useState('');
  const [pastShot, setPastShot] = useState(0);
  const [timespan, setTimeSpan] = useState(0);
  const [pastFood, setPastFood] = useState('');

  const handleInputChange = (key, event) => {
    this.setState({ [key]: event.target.value }, console.log(`${key} has changed!`));
  };

  const resetState = () => {};
  setHangoverName('');
  setHangoverDate(0);
  setHangoverAddSub(false);
  setHangoverNote('');
  setSymptomName('');
  setSymptomSeverity(0);
  setSymptomDuration(0);
  setPastDrink('');
  setPastShot(0);
  setTimeSpan('');
  setPastFood('');

  const postForm = () => {
    const info = {
      info: {
        hangoverName,
        hangoverDate,
        addSub: hangoverAddSub,
        hangoverNote,
        symptomName,
        symptomSeverity,
        symptomDuration,
        drink: pastDrink,
        shot: pastShot,
        timespan,
        food: pastFood,
      },
    };
    axios
      .post('api/hangovers', info)
      .then(resetState())
      .then(() => getAllHangoverInfo)
      .catch((err) => console.error('unable to post form', err));
  };
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
                <Row className='mb-3'>
                  <Form.Label>Hangover Assessment</Form.Label>
                  <Col>
                    <Form.Control
                      type='text'
                      placeholder='what did this to you'
                      onClick={(event) => handleInputChange('hangoverName', event)
                      }
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type='date'
                      placeholder='2/25/25'
                      onClick={(event) => handleInputChange('hangoverDate', event)
                      }
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type='text'
                      placeholder='additional substances'
                      onClick={(event) => handleInputChange('addSub', event)}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type='text'
                      placeholder='what substances'
                      onClick={(event) => handleInputChange('hangoverNote', event)
                      }
                    />
                  </Col>
                </Row>
                <Row className='mb-3'>
                  <Col>
                    <div>Name a pain</div>
                    <Form.Control
                      type='text'
                      placeholder='Symptom'
                      onClick={(event) => handleInputChange('symptomName', event)
                      }
                    />
                  </Col>
                  <Col>
                    <div>How bad 1-10</div>
                    <Form.Control
                      type='number'
                      placeholder='11'
                      onClick={(event) => handleInputChange('symptomSeverity', event)
                      }
                    />
                  </Col>
                  <Col>
                    <div>How long did it last</div>
                    <Form.Control
                      type='number'
                      placeholder=''
                      onClick={(event) => handleInputChange('symptomDuration', event)
                      }
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div>What did you drink</div>
                    <Form.Control
                      type='text'
                      placeholder=''
                      onClick={(event) => handleInputChange('pastDrink', event)
                      }
                    />
                  </Col>
                  <Col>
                    <div>How many</div>
                    <Form.Control
                      type='number'
                      placeholder='3'
                      onClick={(event) => handleInputChange('pastShot', event)}
                    />
                  </Col>
                  <Col>
                    <div>Over how long</div>
                    <Form.Control
                      type='number'
                      placeholder='in hours'
                      onClick={(event) => handleInputChange('timespan', event)}
                    />
                  </Col>
                </Row>
                <div>Did you eat anything?</div>
                <Form.Control
                  type='text'
                  placeholder='tacos'
                  onClick={(event) => handleInputChange('pastFood', event)}
                />
              </Form.Group>
              <Form.Group
                className='mb-3'
                controlId='exampleForm.ControlTextarea1'
              ></Form.Group>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default RegForm;
