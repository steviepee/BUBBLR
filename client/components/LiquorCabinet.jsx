import React, { useState, useEffect } from "react";
import axios from 'axios'
const LiquorCabinet = () => {
  const [liquor, setLiquor] = useState([]);

  const getAllFromDB = () => {
    axios.get('/api/liquor')
      .then((responseObj) => {
        setLiquor(responseObj.data)
      })
      .catch((err) => {
        console.error("There was a problem Fething your Liquor Cabinet")
      })
  }
  useEffect(() => {
    getAllFromDB()
  }, [])
  return (
    <div>
      {console.log(liquor)}
      <h3>This is your personal Liquor Cabinet</h3>
    </div>
  )
}
export default LiquorCabinet