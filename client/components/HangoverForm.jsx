import React, { useState } from 'react';
import axios from 'axios';
import { Container, Accordion, Button, ListGroup } from 'react-bootstrap';

const HangoverForm = () => {
  // set state for all table variables
  // const [hangoverName, setHangoverName] = useState('');
  // const [hangoverWater, setHangoverWater] = useState(0);
  // const [hangoverAddSub, setHangoverAddSub] = useState(false);
  // const [hangoverNote, setHangoverNote] = useState('');
  // const [symptomNames, setSymptomNames] = useState([]);
  // const [symptomSeverities, setSymptomSeverities] = useState([]);
  // const [symptomDurations, setSymptomDurations] = useState([]);
  // const [pastDrinks, setPastDrinks] = useState([]);
  // const [pastShots, setPastShots] = useState([]);
  // const [timespan, setTimeSpan] = useState([]);
  // const [pastFood, setPastFood] = useState([]);

  const [formValues, setFormValues] = useState({
    hangoverName: '',
    hangoverAddSub: false,
    hangoverNote: '',
    symptomNames: [],
    symptomSeverities: [],
    symptomDurations: [],
    timeSpan: [],
    pastDrinks: [],
    pastAmt: [],
    pastFood: [],
  });
  const inputGroups = [
    'hangover',
    'substance',
    'symptom',
    'span',
    'drink',
    'food',
  ];
  const [extras, toggleExtras] = useState(false);
  const [inputValues, setInputValues] = useState([
    {
      label: 'name',
      value: '',
      group: 'hangover_name',
      helperText: 'name the night(what did this to you?)',
    },
    {
      label: 'Additional substances',
      value: false,
      group: 'substance',
      helperText: 'did you take anything else?',
    },
    {
      label: 'notes',
      value: '',
      group: 'substance',
      helperText: 'what else? (you can trust us)',
    },
    {
      label: 'symptom_name',
      value: '',
      group: 'symptom',
      helperText: 'add a symptom',
    },
    {
      label: 'symptom_severity',
      value: null,
      group: 'symptom',
      helperText: 'how bad is it? (1-10)',
    },
    {
      label: 'symptom_duration',
      value: null,
      group: 'symptom',
      helperText: 'how long did it last?',
    },
    {
      label: 'timespan',
      value: null,
      group: 'span',
      helperText: 'over how long were you drinking',
    },
    {
      label: 'Drink(s)',
      value: '',
      group: 'drink',
      helperText: 'Add a drink',
    },
    {
      label: 'Amount',
      value: null,
      group: 'drink',
      helperText: 'how many?',
    },
    {
      label: 'Food(s)',
      value: '',
      group: 'food',
      helperText: 'Add food',
    },
  ]);

  const postForm = () => {
    const info = {
      info: { formValues },
    };
    axios
      .post('api/hangovers', info)
      .then(/*reset form & state*/)
      .then(() => getAllHangoverInfo)
      .catch((err) => console.error('unable to post form', err));
  };
  return (
    <Container>
      <Accordion>
        <Accordion.Item>
          <Accordion.Header></Accordion.Header>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};
