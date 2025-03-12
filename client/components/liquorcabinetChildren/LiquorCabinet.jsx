

import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../../styling/LiquorBottle.css';

const LiquorCabinet = () => {
  const [liquor, setLiquor] = useState([]);

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

  const pourDrink = (id) => {
    setLiquor((prevLiquor) =>
      prevLiquor.map((bottle) =>
        bottle.id === id
          ? { ...bottle, fillLevel: Math.max(bottle.fillLevel - 6.25, 0) }
          : bottle
      )
    );
  };

  return (
    <div className="liquor-cabinet">
      <h3>This is your personal Liquor Cabinet</h3>
      <div className="liquor-list">
        {liquor.map(({ id, imageUrl, name, brand, ABV, typeLiquor, date, fillLevel }) => (
          <div key={id} className="liquor-item">
            <div className="liquor-container">
              <div className="bottle">
                <div className="liquid" style={{ height: `${fillLevel}%` }}></div>
              </div>
              <button onClick={() => pourDrink(id)}>Pour a Drink 🍷</button>
            </div>
            <img src={imageUrl} alt={name} className="liquor-image" style={{ width: '150px', height: 'auto' }} />
            <h4>{name}</h4>
            <div><strong>Brand:</strong> {brand}</div>
            <div><strong>ABV:</strong> {ABV}%</div>
            <div><strong>Type:</strong> {typeLiquor}</div>
            <div><strong>Date Acquired:</strong> {date}</div>
            <div><strong>Amount Left in Bottle:</strong> {fillLevel}%</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiquorCabinet;