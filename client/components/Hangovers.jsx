import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import CanvasJSReact from '@canvasjs/react-charts';

// const Canvas = CanvasJSReact.CanvasJS;
const CanvasChart = CanvasJSReact.CanvasJSChart;

const Hangovers = () => {

  const [arr1, setArr1] = useState([]);
  const [arr2, setArr2] = useState([]);
  const [arr3, setArr3] = useState([]);
  const [arr4, setArr4] = useState([]);
  const [arr5, setArr5] = useState([]);

  const getAllHangoverInfo = () => {
    axios
      .get('api/hangover')
      .then(({ data }) => {
        console.log(data);
        setArr1(data[0]);
        setArr2(data[1]);
        setArr3(data[2]);
        setArr4(data[3]);
        setArr5(data[4]);
      })
      .catch((err) => console.error(err));
  };
  const lineCheck = () => {
    console.log('arr1');
    console.log(arr1);
    console.log('arr2');
    console.log(arr2);
    console.log('arr3');
    console.log(arr3);
    console.log('arr4');
    console.log(arr4);
    console.log('arr5');
    console.log(arr5);
  };

  useEffect(() => {
    getAllHangoverInfo();
  }, []);

  const barOptions = {
    backgroundColor: 'dark grey',
    width: 420,
    height: 300,
    title: {
      text: 'Hangover Frequency By Drink',
      fontColor: 'white',
      titleFontSize: 20,
      fontFamily: 'comic sans',
    },
    axisX: {
      labelFontColor: 'white',
      labelFontSize: 30,
      labelFontFamily: 'comic sans',
    },
    data: [
      {
        // (for each drink) dataPoints.push({label: drink, y: number})
        type: 'column',
        dataPoints: [
          { label: 'tequila', y: 3 },
          { label: 'rum', labelColor: 'white', y: 2 },
          { label: 'wine', labelColor: 'white', y: 1 },
          { label: 'vodka', labelColor: 'white', y: 0 },
        ],
      },
    ],
  };
  return (
    <Container>
      <div>Line chart hangs/time</div>
      <div>bar chart hangs by substance</div>
      <div>
        <CanvasChart options={barOptions} />
      </div>
      <div>piechart by given category</div>
      <button onClick={lineCheck}>CHECK CONSOLE</button>
    </Container>
  );
};

export default Hangovers;
