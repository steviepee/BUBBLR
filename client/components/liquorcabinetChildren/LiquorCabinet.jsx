

import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styling/LiquorBottle.css';
import { Alert, Button } from 'react-bootstrap';

const LiquorCabinet = () => {
  const navigate = useNavigate();
  const [liquor, setLiquor] = useState([]);
  const [show, setShow] = useState(false);
  const [showempty, setShowempty] = useState(false);

  // Fetch liquor data on component mount
  useEffect(() => {
    axios.get('/api/liquor')
      .then((response) => {
        const updatedLiquor = response.data.map((bottle) => {
          // Ensure fillLevel is a valid number
          const fillLevel = isNaN(bottle.fillLevel) ? 100 : bottle.fillLevel; // Default to 100 if NaN
          return { ...bottle, fillLevel };
        });
        setLiquor(updatedLiquor);
      })
      .catch((err) => {
        console.error("Error fetching liquor data", err);
      });
  }, []);

  // Handle pour drink action
  const pourDrink = (id, currentFillLevel) => {
    const newFillLevel = Math.max(currentFillLevel - 6.25, 0); // Ensure it doesn't go negative

    // Update the UI first for instant feedback
    setLiquor((prevLiquor) =>
      prevLiquor.map((bottle) =>
        bottle.id === id ? { ...bottle, fillLevel: newFillLevel } : bottle
      )
    );

    console.log(`Sending PATCH request to update bottle ${id} with new fill level: ${newFillLevel}`);

    // Send the PATCH request to update the fill level
    axios.patch(`/api/liquor/${id}`, { amountLeft: newFillLevel })
      .then((response) => {
        console.log('PATCH request successful:', response.data);
        if (newFillLevel === 25) {
          setShow(true); // Show alert at 25%
        }
        if (newFillLevel === 0) {
          setShowempty(true); // Show alert if empty
        }
      })
      .catch((error) => {
        console.error('Error during PATCH request:', error);
      });
  };

  // Handle delete bottle action
  const deleteBottle = (id) => {
    axios.delete(`/api/liquor/${id}`)
      .then(() => {
        setLiquor(prevLiquor => prevLiquor.filter(bottle => bottle.id !== id));
      })
      .catch((err) => {
        console.error("Error deleting bottle", err);
      });
  };

  return (
    <div className="liquor-cabinet">
      {/* Alert for 25% fill level */}
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

      {/* Alert for empty bottle */}
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

      <h3>Your Virtual Liquor Cabinet</h3>
      <button onClick={() => navigate('/form')}>Create Bottle</button>

      <div className="liquor-list">
        {liquor.map(({ id, imageUrl, name, brand, ABV, typeLiquor, date, fillLevel }) => (
          <div key={id} className="liquor-item">
            <div className="liquor-container">
              <div className="bottle">
                <div className="liquid" style={{ height: `${fillLevel}%` }}></div>
              </div>
              <button onClick={() => pourDrink(id, fillLevel)} disabled={fillLevel <= 0}>
                Pour a Drink 🍷
              </button>
            </div>

            {/* Render image with the imageUrl */}
            <img
              src={imageUrl}
              alt={name}
              className="liquor-image"
              style={{ width: '150px', height: 'auto' }}
            />

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