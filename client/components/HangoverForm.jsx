import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import {
  Form,
  // ListGroup,
  Button,
  Accordion,
  Container,
  Col,
  Row,
} from 'react-bootstrap';

const HangoverForm = ({
  getAllHangoverInfo,
  editMode,
  setEditMode,
  editArr,
}) => {
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
  const { register, handleSubmit, setValue } = useForm();
  const [formData, setFormData] = useState({
    hangoverName: '',
    hangoverDate: '',
    hangoverAddSub: false,
    hangoverNote: '',
    symptomName: '',
    symptomSeverity: 0,
    symptomDuration: 0,
    pastDrink: '',
    pastShot: 0,
    timespan: 0,
    pastFood: '',
  });

  useEffect(() => {
    if (editMode === true) {
      console.log(editArr)
      // const {
      //   hangoverName,
      //   hangoverDate,
      //   hangoverAddSub,
      //   hangoverNote,
      //   symptomName,
      //   symptomSeverity,
      //   symptomDuration,
      //   pastDrink,
      //   pastShot,
      //   timespan,
      //   pastFood,
      // } = editArr;
      setValue('hangoverName', editArr[0].hangoverName);
      setValue('hangoverDate', editArr[0].hangoverDate);
      setValue('hangoverAddSub', editArr[0].hangoverAddSub);
      setValue('hangoverNote', editArr[0].hangoverNote);
      setValue('symptomName', editArr[1].symptomName);
      setValue('symptomSeverity', editArr[1].symptomSeverity);
      setValue('symptomDuration', editArr[1].symptomDuration);
      setValue('pastDrink', editArr[2].pastDrink);
      setValue('pastShot', editArr[2].pastShot);
      setValue('timespan', editArr[2].timespan);
      setValue('pastFood', editArr[3].pastFood);
    }
  }, [editMode]);

  const handleInputChange = (key, event) => key(event.target.value);
  // const resetStateAndForm = () => {
  //   setHangoverName('');
  //   setHangoverDate(0);
  //   setHangoverAddSub(false);
  //   setHangoverNote('');
  //   setSymptomName('');
  //   setSymptomSeverity(0);
  //   setSymptomDuration(0);
  //   setPastDrink('');
  //   setPastShot(0);
  //   setTimespan(0);
  //   setPastFood('');
  // };
  useEffect(() => {
    if (editMode) {
      const chosenHangover = {
        hangoverName: editArr[0].hangoverName || '',
        hangoverDate: editArr[0].hangoverDate,
        hangoverAddSub: editArr[0].addSub,
        hangoverNote: editArr[0].hangoverNote || '',
        symptomName: editArr[1].symptomName,
        symptomSeverity: editArr[1].symptomSeverity,
        symptomDuration: editArr[1].symptomDuration,
        pastDrink: editArr[2].drink,
        pastShot: editArr[2].shot,
        timespan: editArr[2].timespan,
        pastFood: editArr[3].food || '',
      };
      setFormData(chosenHangover);
      Object.keys(chosenHangover).forEach((property) => {
        setValue(property, chosenHangover[property]);
      });
    }
  }, []);

  const postForm = () => {
    const info = {
      info: {
        hangoverName,
        hangoverDate,
        addSub: hangoverAddSub === 'on',
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
      .post('api/hangover', info)
      // .then(() => resetStateAndForm())
      .then(() => getAllHangoverInfo())
      .catch((err) => console.error('unable to post form', err));
  };

  const patchForm = () => {
    const patchInfo = {
      hangInfo: {
        hangoverName,
        hangoverDate,
        addSub: hangoverAddSub === 'on',
        hangoverNote,
      },
      symInfo: {
        SymptomName: symptomName,
        symptomSeverity,
        symptomDuration,
      },
      drinkInfo: {
        drink: pastDrink,
        shot: pastShot,
        timeSpan: timespan,
      },
      foodInfo: {
        food: pastFood || '',
      },
    };
    Promise.all([
      axios.patch(`/api/hangover/hangover/${editArr[0].id}`, patchInfo),
      axios.patch(`/api/hangover/symptom/${editArr[1].id}`, patchInfo),
      axios.patch(`/api/hangover/drink/${editArr[2].id}`, patchInfo),
      axios.patch(`/api/hangover/food/${editArr[3].id}`, patchInfo),
    ])
      .then(() => {
        setEditMode(false);
        setEditArr([]);
        // resetStateAndForm();
        getAllHangoverInfo();
      })
      .catch((err) => console.error(err));
  };

  const submitForm = () => (editMode ? patchForm : postForm);

  return (
    <Container>
      <Accordion className='hangover_accordion' data-bs-theme='dark'>
        <Accordion.Item eventKey='1'>
          <Accordion.Header>Hangover Assessment</Accordion.Header>
          <Accordion.Body>
            <Form onSubmit={handleSubmit(submitForm)}>
              <Form.Group className='mb-3' controlId='hangoverInfo'>
                <Row className='mb-3'>
                  <Form.Label>Hangover Basics</Form.Label>
                  <Col>
                    <Form.Control
                      label='hangover-name'
                      type='text'
                      {...register('hangoverName')}
                      // defaultValue={editArr.hangoverName || ''}
                      value={hangoverName}
                      placeholder='what caused this'
                      onChange={(event) =>
                        handleInputChange(setHangoverName, event)
                      }
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      label='hangoverDate'
                      {...register('hangoverDate')}
                      type='date'
                      value={hangoverDate}
                      name='date'
                      placeholder='2/25/25'
                      onChange={(event) =>
                        handleInputChange(setHangoverDate, event)
                      }
                    />
                  </Col>
                  <Col>
                    <div>other substances? click below</div>
                    <Form.Control
                      label='hangoverAddSub'
                      {...register('hangoverAddSub')}
                      type='radio'
                      onChange={(event) =>
                        handleInputChange(setHangoverAddSub, event)
                      }
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type='text'
                      label='hangoverNote'
                      {...register('hangoverNote')}
                      value={hangoverNote}
                      placeholder='what substances'
                      onChange={(event) =>
                        handleInputChange(setHangoverNote, event)
                      }
                    />
                  </Col>
                </Row>
                <Row className='mb-3'>
                  <Col>
                    <div>Worst symptom</div>
                    <Form.Control
                      type='text'
                      label='symptomName'
                      {...register('symptomName')}
                      value={symptomName}
                      placeholder='Symptom'
                      onChange={(event) =>
                        handleInputChange(setSymptomName, event)
                      }
                    />
                  </Col>
                  <Col>
                    <div>1-10</div>
                    <Form.Control
                      label='symptomSeverity'
                      {...register('symptomSeverity')}
                      type='number'
                      value={symptomSeverity}
                      placeholder='How bad'
                      onChange={(event) =>
                        handleInputChange(setSymptomSeverity, event)
                      }
                    />
                  </Col>
                  <Col>
                    <div>How long did it last</div>
                    <Form.Control
                      type='number'
                      label='symptomDuration'
                      {...register('symptomDuration')}
                      value={symptomDuration}
                      placeholder=''
                      onChange={(event) =>
                        handleInputChange(setSymptomDuration, event)
                      }
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div>Main drink</div>
                    <Form.Control
                      label='pastDrink'
                      {...register('pastDrink')}
                      type='text'
                      value={pastDrink}
                      placeholder=''
                      onChange={(event) =>
                        handleInputChange(setPastDrink, event)
                      }
                    />
                  </Col>
                  <Col>
                    <div>How many</div>
                    <Form.Control
                      label='pastShot'
                      {...register('pastShot')}
                      type='number'
                      value={pastShot}
                      // placeholder='3'
                      onChange={(event) =>
                        handleInputChange(setPastShot, event)
                      }
                    />
                  </Col>
                  <Col>
                    <div>Over how long</div>
                    <Form.Control
                      label='timespan'
                      {...register('timespan')}
                      type='number'
                      value={timespan}
                      placeholder='in hours'
                      onChange={(event) =>
                        handleInputChange(setTimespan, event)
                      }
                    />
                  </Col>
                </Row>
                <div>Did you eat anything?</div>
                <Form.Control
                  label='pastFood'
                  {...register('pastFood')}
                  type='text'
                  value={pastFood}
                  placeholder='tacos'
                  onChange={(event) => handleInputChange(setPastFood, event)}
                />
              </Form.Group>
              <Form.Group className='mb-3'></Form.Group>
              {editMode ? (
                <Button onClick={patchForm}>Confirm edit</Button>
              ) : (
                <Button onClick={postForm}>Submit</Button>
              )}
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default HangoverForm;
