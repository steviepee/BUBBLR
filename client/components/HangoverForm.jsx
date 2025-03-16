import React, { useState } from 'react';
import axios from 'axios';
import DividedListItem from './DividedListItem.jsx';
import InputField from './InputField.jsx';
import { Container, Accordion, Button, ListGroup } from 'react-bootstrap';

const HangoverForm = ({ getAllHangoverInfo, closeForm }) => {
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
    'hangover_name',
    'substance_check',
    'substance_notes',
    'symptom',
    'symptom_severity',
    'symptom_duration',
    'span',
    'drink',
    'drink_amount',
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
      group: 'substance_check',
      helperText: 'did you take anything else?',
    },
    {
      label: 'notes',
      value: '',
      group: 'substance_notes',
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
      value: 0,
      group: 'symptom_severity',
      helperText: 'how bad is it? (1-10)',
    },
    {
      label: 'symptom_duration',
      value: 0,
      group: 'symptom_duration',
      helperText: 'how long did it last?',
    },
    {
      label: 'timespan',
      value: 0,
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
      value: 0,
      group: 'drink_amount',
      helperText: 'how many?',
    },
    {
      label: 'Food(s)',
      value: '',
      group: 'food',
      helperText: 'Add food',
    },
  ]);
  const changeInputValue = (key, newValue) => {
    const inputsCopy = [...inputValues];
    for (let i = 0; i < inputGroups.length; i += 1) {
      if (inputGroups[i].label === key) {
        inputsCopy[i + 1].value = newValue;
        setInputValues(inputsCopy);
        return;
      }
    }
  };
  const handleChange = (element) => {
    const inputsCopy = [...inputValues];
    const { id, value } = element.target;
    if (id === 'name') {
      formValues.name = value;
      inputsCopy[0].value = value;
      setInputValues(inputsCopy);
    } else {
      changeInputValue(id, value);
    }
  };

  const handleAddClick = (element) => {
    const { id } = element.target;
    const formCopy = { ...formValues };
    for (let i = 0; i < inputGroups.length; i += 1) {
      if (inputGroups[i] === id) {
        const currValue = inputValues[i + 1].value;
        if (!currValue) {
          return;
        }
        formCopy[id].push(currValue);
        setFormValues(formCopy);
        changeInputValue(id, '');
        return;
      }
    }
  };

  const postForm = () => {
    const info = {
      info: { formValues },
    };
    axios
      .post('api/hangovers', info)
      .then(/* reset form & state */)
      .then(() => getAllHangoverInfo)
      .catch((err) => console.error('unable to post form', err));
  };
  const createDividedList = (collection, collectionName) => (
    (
    <ul>
      {collection.map((element, i) => (
        <DividedListItem
          key={`${element}-${i * 2}`}
          element={element}
          index={i}
          collectionName={collectionName}
          formValues={formValues}
          setFormValues={setFormValues}
          changeInputValue={changeInputValue}
        />
      ))}
    </ul>
    )
  );
  return (
    <Container>
      <Accordion>
          <Accordion.Item>
        {inputValues.map((input, index) => (
            <InputField
            key={`${input.label}`}
            objValue={input}
            handleChange={handleChange}
            index={index}
            formValues={formValues}
            setFormValues={setFormValues}
             handleAddClick={handleAddClick}
            createDividedList={createDividedList}
            postForm={postForm}
            closeForm={closeForm}

            />
        ))}
          </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default HangoverForm;
