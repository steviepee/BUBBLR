import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import CanvasJSReact from '@canvasjs/react-charts';
import HangoverForm from './HangoverForm.jsx';
import RegForm from './RegForm.jsx';

// const Canvas = CanvasJSReact.CanvasJS;
const CanvasChart = CanvasJSReact.CanvasJSChart;

const Hangovers = () => {
  const [arr1, setArr1] = useState([]);
  const [arr2, setArr2] = useState([]);
  const [arr3, setArr3] = useState([]);
  // const [arr4, setArr4] = useState([]);
  // const [creatingHangover, toggleCreatingHangover] = useState;

  const getAllHangoverInfo = () => {
    axios
      .get('api/hangover')
      .then(({ data }) => {
        // console.log(data);
        const fullData = [];
        data[0].forEach((set) => {
          const someData = [];
          // const collate = (array, num) => {
          //   if (array.length) {
          //     array.forEach((element) => {
          //       if (element.HangoverId === num) {
          //         someData.push(element);
          //       }
          //     });
          //   }
          // };
          someData.push(set);
          data[1].forEach((element) => {
            console.log('current element');
            console.log(element);
            // console.log(`checking... element hID:${element.HangoverId} ${}`);
            if (element.HangoverId === set.id) {
              someData.push(element);
              console.log("post push");
              console.log(someData);
            }
          });
          data[2].forEach((element) => {
            console.log('current element');
            console.log(element);
            if (element.HangoverId === set.id) {
              someData.push(element);
              console.log("post push");
              console.log(someData);
            }
          });
          data[3].forEach((element) => {
            console.log('current element');
            console.log(element);
            if (element.HangoverId === set.id) {
              someData.push(element);
              console.log("post push");
              console.log(someData);
            }
          });
          // collate((data[1], set.id), (data[2], set.id), (data[3], set.id)),
          console.log('some or none or all data');
          console.log(someData);
          fullData.push(someData);
        });
        setArr1(fullData);
        // setArr2(data[1]);
        // setArr3(data[2]);
        // setArr4(data[3]);
      })
      .catch((err) => console.error(err));
  };
  const lineCheck = () => {
    console.log('all data');
    console.log(arr1);
    // console.log('arr2');
    // console.log(arr2);
    // console.log('arr3');
    // console.log(arr3);
    // console.log('arr4');
    // console.log(arr4);
  };

  useEffect(() => {
    getAllHangoverInfo();
  }, []);

  const lineOptions = {
    animationEnabled: true,
    backgroundColor: 'dark grey',
    width: 420,
    height: 300,
    title: {
      text: 'Hangovers over time',
      fontColor: 'white',
      fontFamily: 'comic sans',
    },
    axisX: {
      valueFormatString: 'DD',
      labelFontColor: 'white',
      labelFontFamily: 'comic sans',
    },
    axisY: {
      title: 'timeSpan of symptoms',
      suffix: ' hrs',
    },
    data: [
      {
        yValueFormatString: '## hrs',
        xValueFormatString: 'DDDD',
        type: 'spline',
        dataPoints: [
          { x: new Date(2025, 0), y: 6 },
          { x: new Date(2025, 1), y: 7 },
          { x: new Date(2025, 2), y: 12 },
        ],
      },
    ],
  };

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
          // { label: 'vodka', labelColor: 'white', y: 0 },
        ],
      },
    ],
  };
  const closeForm = () => {
    // toggleCreatingHangover(!creatingHangover);
    console.log('form closed');
  };
  return (
    <Container>
      <Row>
        <Col>
          <div>Line chart hangs/time</div>
          <CanvasChart options={lineOptions} />
        </Col>
        <Col>
          <div>bar chart hangs by substance</div>
          <div>
            <CanvasChart options={barOptions} />
          </div>
        </Col>
      </Row>
      <div>piechart by given category</div>
      <RegForm getAllHangoverInfo={getAllHangoverInfo} closeForm={closeForm} />
      <button onClick={lineCheck}>CHECK CONSOLE</button>
    </Container>
  );
};

export default Hangovers;
