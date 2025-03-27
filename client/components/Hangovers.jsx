import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';
import CanvasJSReact from '@canvasjs/react-charts';
import HangoverForm from './HangoverForm.jsx';

// const Canvas = CanvasJSReact.CanvasJS;
const CanvasChart = CanvasJSReact.CanvasJSChart;

const Hangovers = () => {
  const [hangData, setHangData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editArr, setEditArr] = useState([]);

  const getAllHangoverInfo = () => {
    axios
      .get('api/hangover')
      .then(({ data }) => {
        const fullData = [];
        /**
         * Data as it comes in from base:
         * Array 1(0 index): Main hangover info
         * Array 2(1 index): Symptom info
         * Array 3(2 index): Drink info
         * Array 4(3 index): Food name
         *
         * Items are sorted in the array according to the corresponding index number of
         *  their related main hangover info object. Sorting below is focused on separating
         * each set by index number for sorting
         *
         * NOTE: everything except the hangover info comes out null no matter what
         * I write into the form. This leads me to believe the issue resides in
         * the form/post portion of the program
         *
         * UPDATE: The graph issue was, in fact,  a form/post issue.
         *  The name changes to the schema/routing, etc, didn't make the merge and reverted.
         * problem resolved. CURRENT ISSUE: Screen blanks out after submitting a post from the form
         * refresh fixes it, so I don't believe it's a GET problem. the error says
         * the properties of symptomDuration are undefined..
         *
         * Just tried to recreate and didn't cause an issue...
         * Just tried again.. This issue has apparently fixed itself.
         * Moving on to deletion.
         */
        console.log(data);
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

  const sortToSpecificHangover = (matrix, title) => {
    const rightSet = [];
    for (let i = 0; i < matrix.length; i += 1) {
      if (matrix[i][0].hangoverName === title) {
        const [hang, symptom, drink, food] = matrix[i];
        rightSet.push(hang, symptom, drink, food);
        break;
      }
    }
    setEditArr(rightSet);
    setEditMode(true);
  };

  const setOfHangovers = [];
  hangData.forEach((group) => {
    setOfHangovers.push(group[0]);
  });
  useEffect(() => {
    getAllHangoverInfo();
  }, []);
  const createLineChartInfo = (arr) => {
    const lineChartHangoverArray = [];
    const lineChartSymptomArray = [];
    arr.forEach((nest) => {
      lineChartHangoverArray.push(nest[0]);
      lineChartSymptomArray.push(nest[1]);
    });
    return lineChartHangoverArray.map((item, i) => {
      const lineYear = +item.hangoverDate.toString().substring(0, 4);
      const lineMonth = +item.hangoverDate.toString().substring(5, 7);
      const lineDay = +item.hangoverDate.toString().substring(8, 10);

      return {
        x: new Date(lineYear, lineMonth, lineDay),
        y: lineChartSymptomArray[i].symptomDuration,
      };
    });
  };

  const createBarChartInfo = (arr) => {
    const barChartDrinkNamesAndValues = [];
    const drinksArray = [];
    arr.forEach((nest) => {
      drinksArray.push(nest[2]);
    });
    drinksArray.forEach((drinkObj) => {
      let tempArray = [];
      if (
        barChartDrinkNamesAndValues.every(
          (tuple) => !tuple.includes(drinkObj.drink),
        )
      ) {
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
      labelFontSize: 20,
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
  // const closeForm = () => {
  //   // this is where I close the accordion and reset the form data visually.
  // };

  // Delete hangover and all subcategories
  const handleDelete = (id) => {
    axios
      .delete(`api/hangover/${id}`)
      .then(() => {
        getAllHangoverInfo();
      })
      .catch((err) => console.error(err));
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
      <HangoverForm
        getAllHangoverInfo={getAllHangoverInfo}
        editMode={editMode}
        setEditMode={setEditMode}
        editArr={editArr}
        setEditArr={setEditArr}
      />
      <Row>
        <ul>
          {setOfHangovers.map((hangover) => (
            <Col key={hangover.id}>
              <li>
                <button onClick={() => handleDelete(hangover.id)}>🗑️</button>
                <Button
                  onClick={() => {
                    sortToSpecificHangover(hangData, hangover.hangoverName);
                  }}
                >
                  Edit
                </Button>
                {hangover.hangoverName}
              </li>
            </Col>
          ))}
        </ul>
      </Row>
    </Container>
  );
};

export default Hangovers;
