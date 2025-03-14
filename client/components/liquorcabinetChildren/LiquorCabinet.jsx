

import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styling/LiquorBottle.css';

const LiquorCabinet = () => {
  const [liquor, setLiquor] = useState([]);
  let navigate = useNavigate();

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
      })
      .catch((error) => {
        console.error(`Error updating liquor bottle ${id}`, error);
      });


  }
  const deleteBottle = (id) => {
    axios.delete(`/api/liquor/${id}`)
      .then((response) => {
        console.log(response);
        // Update the liquor state by removing the deleted bottle
        setLiquor(prevLiquor => prevLiquor.filter(bottle => bottle.id !== id));
      })
      .catch((err) => {
        console.error("could not delete bottle,", err);
      });
  }

  return (
    <div className="liquor-cabinet">

      <h3>Your Virtual Liquor Cabinet</h3>
      <button onClick={() => navigate('/form')}>Creat Bottle</button>
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