

import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styling/LiquorBottle.css';
import { Modal, Button } from 'react-bootstrap';

const LiquorCabinet = () => {
  const navigate = useNavigate();
  const [liquor, setLiquor] = useState([]);
  const [show, setShow] = useState(false);
  const [showempty, setShowempty] = useState(false);


  useEffect(() => {
    axios.get('/api/liquor')
      .then((response) => {
        const liquorWithLevels = response.data.map(bottle => ({
          ...bottle,
          fillLevel: bottle.amountLeft
        }));
        setLiquor(liquorWithLevels);
      })
      .catch((err) => {
        console.error("There was a problem fetching your Liquor Cabinet", err);
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

    // Send the PATCH request to update the fill level
    axios.patch(`/api/liquor/${id}`, { amountLeft: newFillLevel })
      .then(() => {

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
  const handleClose = () => setShow(false);
  const handleCloseEmpty = () => setShowempty(false);
  return (
    <div className="liquor-cabinet">
      {/* Alert for 25% fill level */}
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Down to 25%</Modal.Title>
          </Modal.Header>
          <Modal.Body>If you are enjoying this bottle, it might be time to reorder. </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>


      {/* Model for an empty bottle */}
      <>

        <Modal show={showempty} onHide={handleCloseEmpty}>
          <Modal.Header closeButton>
            <Modal.Title>Empty Bottle</Modal.Title>
          </Modal.Header>
          <Modal.Body>Time to Recycle!</Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleCloseEmpty}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>

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