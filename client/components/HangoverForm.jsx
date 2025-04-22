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
  // const [hangoverName, setHangoverName] = useState('');
  // const [hangoverDate, setHangoverDate] = useState(0);
  // const [hangoverAddSub, setHangoverAddSub] = useState(false);
  // const [hangoverNote, setHangoverNote] = useState('');
  // const [symptomName, setSymptomName] = useState('');
  // const [symptomSeverity, setSymptomSeverity] = useState(0);
  // const [symptomDuration, setSymptomDuration] = useState(0);
  // const [pastDrink, setPastDrink] = useState('');
  // const [pastShot, setPastShot] = useState(0);
  // const [timespan, setTimespan] = useState(0);
  // const [pastFood, setPastFood] = useState('');
  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
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
    },
  });
  // not sure I need to set formData, pretty sure useForm is taking care of this..
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
      console.log(editArr);
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
      setValue('hangoverName', editArr[0].hangoverName, {
        shouldDirty: true,
        // shouldTouch: true,
        shouldUnregister: false,
      });
      setValue('hangoverDate', editArr[0].hangoverDate, {
        shouldDirty: true,
        // shouldTouch: true,
        shouldUnregister: false,
      });
      setValue('hangoverAddSub', editArr[0].hangoverAddSub, {
        shouldDirty: true,
        // shouldTouch: true,
        shouldUnregister: false,
      });
      setValue('hangoverNote', editArr[0].hangoverNote, {
        shouldDirty: true,
        // shouldTouch: true,
        shouldUnregister: false,
      });
      setValue('symptomName', editArr[1].symptomName, {
        shouldDirty: true,
        // shouldTouch: true,
        shouldUnregister: false,
      });
      setValue('symptomSeverity', editArr[1].symptomSeverity, {
        shouldDirty: true,
        // shouldTouch: true,
        shouldUnregister: false,
      });
      setValue('symptomDuration', editArr[1].symptomDuration, {
        shouldDirty: true,
        // shouldTouch: true,
        shouldUnregister: false,
      });
      setValue('pastDrink', editArr[2].drink, {
        shouldDirty: true,
        // shouldTouch: true,
        shouldUnregister: false,
      });
      setValue('pastShot', editArr[2].shot, {
        shouldDirty: true,
        // shouldTouch: true,
        shouldUnregister: false,
      });
      setValue('timespan', editArr[2].timespan, {
        shouldDirty: true,
        // shouldTouch: true,
        shouldUnregister: false,
      });
      setValue('pastFood', editArr[3].food, {
        shouldDirty: true,
        // shouldTouch: true,
        shouldUnregister: false,
      });
    }
  }, [editArr]);

  const submitForm = (data) => {
    const {
      hangoverName,
      hangoverDate,
      hangoverAddSub,
      hangoverNote,
      symptomName,
      symptomSeverity,
      symptomDuration,
      pastDrink,
      pastShot,
      timespan,
      pastFood,
    } = data;

    if (!editMode) {
      const info = {
        info: {
          hangoverName,
          hangoverDate,
          addSub: hangoverAddSub === 'on',
          hangoverNote,
          symptomName,
          symptomSeverity: +symptomSeverity,
          symptomDuration: +symptomDuration,
          drink: pastDrink,
          shot: +pastShot,
          timespan: +timespan,
          food: pastFood,
        },
      };
      axios
        .post('api/hangover', info)
        .then(() => {
          getAllHangoverInfo();
          reset();
        })
        .catch((err) => console.error('unable to post form', err));
    } else {
      const patchInfo = {
        hangInfo: {
          hangoverName,
          hangoverDate,
          addSub: hangoverAddSub === 'on',
          hangoverNote,
        },
        symInfo: {
          symptomName,
          symptomSeverity,
          symptomDuration,
        },
        drinkInfo: {
          drink: pastDrink,
          shot: pastShot,
          timespan,
        },
        foodInfo: {
          food: pastFood,
        },
      };
      // console.log('all ids', `0: ${editArr[0].id} 1: ${editArr[1].id} 2: ${editArr[2].id} 3: ${editArr[3].id}`)
      Promise.all([
        axios.patch(`/api/hangover/hangover/${editArr[0].id}`, patchInfo),
        axios.patch(`/api/hangover/symptom/${editArr[1].id}`, patchInfo),
        axios.patch(`/api/hangover/drink/${editArr[2].id}`, patchInfo),
        axios.patch(`/api/hangover/food/${editArr[3].id}`, patchInfo),
      ])
        .then(() => {
          setEditMode(false);
          getAllHangoverInfo();
          reset();
        })
        .catch((err) => console.error(err));
    }
  };
// accordion extended?
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
                      name='hangoverName'
                      placeholder='what caused this'
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      label='hangoverDate'
                      {...register('hangoverDate')}
                      type='date'
                      name='hangoverDate'
                      placeholder='2/25/25'
                    />
                  </Col>
                  <Col>
                    <div>other substances? click below</div>
                    <Form.Control
                      label='hangoverAddSub'
                      name='hangoverAddSub'
                      {...register('hangoverAddSub')}
                      type='radio'
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type='text'
                      label='hangoverNote'
                      name='hangoverNote'
                      {...register('hangoverNote')}
                      placeholder='what substances'
                    />
                  </Col>
                </Row>
                <Row className='mb-3'>
                  <Col>
                    <div>Worst symptom</div>
                    <Form.Control
                      type='text'
                      label='symptomName'
                      name='symptomName'
                      {...register('symptomName')}
                      placeholder='Symptom'
                    />
                  </Col>
                  <Col>
                    <div>1-10</div>
                    <Form.Control
                      label='symptomSeverity'
                      name='symptomSeverity'
                      {...register('symptomSeverity')}
                      type='number'
                      placeholder='How bad'
                    />
                  </Col>
                  <Col>
                    <div>How long did it last</div>
                    <Form.Control
                      type='number'
                      label='symptomDuration'
                      name='symptomDuration'
                      {...register('symptomDuration')}
                      placeholder=''
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div>Main drink</div>
                    <Form.Control
                      label='pastDrink'
                      name='pastDrink'
                      {...register('pastDrink')}
                      type='text'
                      placeholder=''
                    />
                  </Col>
                  <Col>
                    <div>How many</div>
                    <Form.Control
                      label='pastShot'
                      name='pastShot'
                      {...register('pastShot')}
                      type='number'
                    />
                  </Col>
                  <Col>
                    <div>Over how long</div>
                    <Form.Control
                      label='timespan'
                      name='timespan'
                      {...register('timespan')}
                      type='number'
                      placeholder='in hours'
                    />
                  </Col>
                </Row>
                <div>Did you eat anything?</div>
                <Form.Control
                  label='pastFood'
                  name='pastFood'
                  {...register('pastFood')}
                  type='text'
                  placeholder='tacos'
                />
              </Form.Group>
              <Form.Group className='mb-3'></Form.Group>
              {editMode ? (
                <Button type='submit'>Confirm edit</Button>
              ) : (
                <Button type='submit'>Submit</Button>
              )}
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default HangoverForm;
