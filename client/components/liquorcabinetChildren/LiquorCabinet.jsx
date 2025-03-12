import React, { useState, useEffect } from "react";
import axios from 'axios'

const LiquorCabinet = (props) => {
  const [liquor, setLiquor] = useState([]);
  const getAllFromDB = () => {
    axios.get('/api/liquor')
      .then((responseObj) => {
        setLiquor(responseObj.data)
      })
      .catch((err) => {
        console.error("There was a problem Fething your Liquor Cabinet", err)
      })
  }
  useEffect(() => {
    getAllFromDB()
  }, [])
  return (
    <div className="liquor-cabinet">
      {console.log(liquor)}
      <h3>This is your personal Liquor Cabinet</h3>
      <div className="liquor-list">
        {liquor.map(({ id, imageUrl, name, brand, ABV, typeLiquor, date, amountLeft }) => (
          <div key={id} className="liquor-item">
            <img src={imageUrl} alt={name} style={{ width: '150px', height: 'auto' }} className="liquor-image" />
            <h4>{name}</h4>
            <div><strong>Brand:</strong> {brand}</div>
            <div><strong>ABV:</strong> {ABV}%</div>
            <div><strong>Type:</strong> {typeLiquor}</div>
            <div><strong>Date Acquired:</strong> {date}</div>
            {/* Later this will be a graphic that decreces when a button is pressed */}
            <div><strong>Amount Left in Bottle</strong>{amountLeft}% </div>
          </div>
        ))}
      </div>
    </div>

  )
}
export default LiquorCabinet