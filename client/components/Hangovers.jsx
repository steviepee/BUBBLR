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
    const lineChartHangoverArray = [];
    const lineChartSymptomArray = [];
    arr.forEach((nest) => {
      lineChartHangoverArray.push(nest[0]);
      lineChartSymptomArray.push(nest[1]);
    });
    return lineChartHangoverArray.map((item, i) => {
      console.log('checking symptom');
      console.log(lineChartSymptomArray[i]);
      const lineYear = +item.hangoverDate.toString().substring(0, 4);
      const lineMonth = +item.hangoverDate.toString().substring(5, 7);
      const lineDay = +item.hangoverDate.toString().substring(8, 10);

      return {
        x: new Date(lineYear, lineMonth, lineDay),
        y: lineChartSymptomArray[i].SymptomDuration,
      };
    });
  };

  const createBarChartInfo = (arr) => {
    console.log('the arr');
    console.log(arr);
    const barChartDrinkNamesAndValues = [];
    const drinksArray = [];
    arr.forEach((nest) => {
      drinksArray.push(nest[2]);
    });
    drinksArray.forEach((drinkObj) => {
      let tempArray = [];
      if (barChartDrinkNamesAndValues.every((tuple) => !tuple.includes(drinkObj.drink))) {
        tempArray.push(drinkObj.drink, 1);
        barChartDrinkNamesAndValues.push(tempArray);
        tempArray = [];
      } else {
        for (let i = 0; i < barChartDrinkNamesAndValues.length; i += 1) {
          if (barChartDrinkNamesAndValues[i].includes(drinkObj.drink)) {
            barChartDrinkNamesAndValues[i][1] += 1;
            break;
          }
        }
      }
    });
    return barChartDrinkNamesAndValues.map((set) => {
      // {label: 'drink', y: <frequency>}
      console.log('');
      return {
        label: set[0],
        y: set[1],
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
      titleFontColor: 'white',
      titleFontSize: 20,
      titleFontFamily: 'comic sans',

      suffix: ' hrs',
    },
    data: [
      {
        yValueFormatString: '## hrs',
        xValueFormatString: 'DD/MM/Y',
        type: 'spline',
        dataPoints: createLineChartInfo(hangData),
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
        dataPoints: createBarChartInfo(hangData),
      },
    ],
  };
  const closeForm = () => {
    // this is where I close the accordion and reset the form data visually.
  };
  return (
    <Container>
      <Row>
        <Col>
          <CanvasChart options={lineOptions} />
        </Col>
        <Col>
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
