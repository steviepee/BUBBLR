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
  const [timespan, setTimespan] = useState(0);
  const [pastFood, setPastFood] = useState('');

  const handleInputChange = (key, event) => key(event.target.value);
  // const extras = () => {
  //   if (hangoverAddSub == 'on') {return true} else {return false}
  // }
  const resetState = () => {
    setHangoverName('');
    setHangoverDate(0);
    setHangoverAddSub(false);
    setHangoverNote('');
    setSymptomName('');
    setSymptomSeverity(0);
    setSymptomDuration(0);
    setPastDrink('');
    setPastShot(0);
    setTimespan('');
    setPastFood('');
  };

  const postForm = () => {
    const info = {
      info: {
        hangoverName,
        hangoverDate,
        addSub: (hangoverAddSub === 'on'),
        hangoverNote,
        SymptomName: symptomName,
        symptomSeverity,
        SymptomDuration: symptomDuration,
        drink: pastDrink,
        shot: pastShot,
        timeSpan: timespan,
        food: pastFood,
      },
    };
    console.log('info:');
    console.log(info);
    axios
      .post('api/hangover', info)
      .then(() => resetState())
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
                      onChange={(event) => handleInputChange(setHangoverName, event)
                      }
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type='date'
                      name='date'
                      placeholder='2/25/25'
                      onChange={(event) => handleInputChange(setHangoverDate, event)
                      }
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type='radio'
                      placeholder='additional substances'
                      onChange={(event) => handleInputChange(setHangoverAddSub, event)}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type='text'
                      placeholder='what substances'
                      onChange={(event) => handleInputChange(setHangoverNote, event)
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
                      onChange={(event) => handleInputChange(setSymptomName, event)
                      }
                    />
                  </Col>
                  <Col>
                    <div>1-10</div>
                    <Form.Control
                      type='number'
                      placeholder='How bad'
                      onChange={(event) => handleInputChange(setSymptomSeverity, event)
                      }
                    />
                  </Col>
                  <Col>
                    <div>How long did it last</div>
                    <Form.Control
                      type='number'
                      placeholder=''
                      onChange={(event) => handleInputChange(setSymptomDuration, event)
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
                      onChange={(event) => handleInputChange(setPastDrink, event)
                      }
                    />
                  </Col>
                  <Col>
                    <div>How many</div>
                    <Form.Control
                      type='number'
                      placeholder='3'
                      onChange={(event) => handleInputChange(setPastShot, event)}
                    />
                  </Col>
                  <Col>
                    <div>Over how long</div>
                    <Form.Control
                      type='number'
                      placeholder='in hours'
                      onChange={(event) => handleInputChange(setTimespan, event)}
                    />
                  </Col>
                </Row>
                <div>Did you eat anything?</div>
                <Form.Control
                  type='text'
                  placeholder='tacos'
                  onChange={(event) => handleInputChange(setPastFood, event)}
                />
              </Form.Group>
              <Form.Group
                className='mb-3'
                controlId='exampleForm.ControlTextarea1'
              ></Form.Group>
              <Button onClick={postForm}>Submit</Button>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default RegForm;
