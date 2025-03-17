import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import CanvasJSReact from '@canvasjs/react-charts';
import HangoverForm from './HangoverForm.jsx';

// const Canvas = CanvasJSReact.CanvasJS;
const CanvasChart = CanvasJSReact.CanvasJSChart;

const Hangovers = () => {
  const [hangData, setHangData] = useState([]);

  const getAllHangoverInfo = () => {
    axios
      .get('api/hangover')
      .then(({ data }) => {
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
            if (element.HangoverId === set.id) {
              someData.push(element);
            }
          });
          data[2].forEach((element) => {
            if (element.HangoverId === set.id) {
              someData.push(element);
            }
          });
          data[3].forEach((element) => {
            if (element.HangoverId === set.id) {
              someData.push(element);
            }
          });
          fullData.push(someData);
        });
        setHangData(fullData);
      })
      .catch((err) => console.error(err));
  };
  const lineCheck = () => {
    console.log('all data');
    console.log(hangData);
  };
  const setGraphs = () => {};

  useEffect(() => {
    getAllHangoverInfo();
    setGraphs();
  }, []);

  const createLineChartInfo = (arr) => {
    console.log('arr');
    console.log(arr);
    const puller = [];
    for (let i = 0; i < arr.length; i += 1) {
      arr.forEach((nest) => {
        puller.push(nest[0]);
      });
    }
    return puller.map((item) => {
      const lineYear = +(item.hangoverDate.toString().substring(0, 4));
      const lineMonth = +(item.hangoverDate.toString().substring(5, 7));
      const lineDay = +(item.hangoverDate.toString().substring(8, 10));
      return {
        x: new Date(lineYear, lineMonth, lineDay),
        y: item.id,
      };
    });
  };

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
        xValueFormatString: 'DD/MM/Y',
        type: 'spline',
        dataPoints:
          createLineChartInfo(hangData),
          // [
          //   { x: new Date(2025, 11, 1), y: 6 },
          //   { x: new Date(2025, 1), y: 7 },
          //   { x: new Date(2025, 2), y: 12 },
          // ],
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
      <HangoverForm
        getAllHangoverInfo={getAllHangoverInfo}
        closeForm={closeForm}
      />
      <button onClick={lineCheck}>CHECK CONSOLE</button>
    </Container>
  );
};

export default Hangovers;
