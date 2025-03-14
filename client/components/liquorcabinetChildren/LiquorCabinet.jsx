

import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styling/LiquorBottle.css';
import { Alert, Button } from 'react-bootstrap';

const LiquorCabinet = () => {
  const [show, setShow] = useState(false); // Initially set to false, will trigger when fillLevel is 25
  const [liquor, setLiquor] = useState([]);
  let navigate = useNavigate();
  const [showempty, setShowempty] = useState(false)

  useEffect(() => {
    axios.get('/api/liquor')
      .then((response) => {
        // Ensure each bottle starts with its own amountLeft as fillLevel
        const liquorWithLevels = response.data.map(bottle => ({
          ...bottle,
          fillLevel: bottle.amountLeft // Initialize fill level from DB
        }));
        setLiquor(liquorWithLevels);
      })
      .catch((err) => {
        console.error("There was a problem fetching your Liquor Cabinet", err);
      });
  }, []);

  const pourDrink = (id, currentFillLevel) => {
    const newFillLevel = Math.max(currentFillLevel - 6.25, 0); // Ensure it doesn't go negative

    // Update the UI first for instant feedback
    setLiquor((prevLiquor) =>
      prevLiquor.map((bottle) =>
        bottle.id === id ? { ...bottle, fillLevel: newFillLevel } : bottle
      )
    );

    axios.patch(`/api/liquor/${id}`, { amountLeft: newFillLevel })
      .then((response) => {
        console.log(`Updated bottle ${id} successfully`, response.data);

        // Show alert if the new fill level is 25%
        if (newFillLevel === 25) {
          setShow(true); // Show alert
        }
        if (newFillLevel === 0) {
          setShowempty(true)
        }
      })
      .catch((error) => {
        console.error(`Error updating liquor bottle ${id}`, error);
      });
  };

  const deleteBottle = (id) => {
    axios.delete(`/api/liquor/${id}`)
      .then((response) => {
        console.log(response);
        setLiquor(prevLiquor => prevLiquor.filter(bottle => bottle.id !== id));
      })
      .catch((err) => {
        console.error("Could not delete bottle,", err);
      });
  };

  return (
    <div className="liquor-cabinet">
      <h3>Your Virtual Liquor Cabinet</h3>
      <button onClick={() => navigate('/form')}>Create Bottle</button>

      {/* Conditionally render the alert when the fill level reaches 25% */}
      {show && (
        <Alert variant="danger">
          <Alert.Heading>Down to 25%</Alert.Heading>
          <p>
            You have consumed 75% of this bottle! If you are enjoying the drinks, you may want to reorder.
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={() => setShow(false)} variant="outline-danger">
              Close me
            </Button>
          </div>
        </Alert>
      )}
      {showempty && (
        <Alert variant="danger">
          <Alert.Heading>Bottle Empty</Alert.Heading>
          <div className="d-flex justify-content-end">
            <Button onClick={() => setShowempty(false)} variant="outline-danger">
              Close me
            </Button>
          </div>
        </Alert>
      )}
      <div className="liquor-list">
        {liquor.map(({ id, imageUrl, name, brand, ABV, typeLiquor, date, fillLevel }) => (
          <div key={id} className="liquor-item">
            <div className="liquor-container">
              <div className="bottle">
                <div className="liquid" style={{ height: `${fillLevel}%` }}></div>
              </div>
              <button
                onClick={() => pourDrink(id, fillLevel)}
                disabled={fillLevel <= 0}
              >
                Pour a Drink 🍷
              </button>
            </div>
            <img src={imageUrl} alt={name} className="liquor-image" style={{ width: '150px', height: 'auto' }} />
            <h4>{name}</h4>
            <div><strong>Brand:</strong> {brand}</div>
            <div><strong>ABV:</strong> {ABV}%</div>
            <div><strong>Type:</strong> {typeLiquor}</div>
            <div><strong>Date Acquired:</strong> {date}</div>
            <div><strong>Amount Left in Bottle:</strong> {fillLevel}%</div>
            <button onClick={() => deleteBottle(id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiquorCabinet;