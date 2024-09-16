import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, ListGroup } from 'react-bootstrap';
import StarRating from './StarRating';
import '../styling/Reviews.css';

const Reviews = () => {
  const { drinkId } = useParams();
  const [drink, setDrink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDrink = async () => {
      try {
        const response = await axios.get(`/api/drinks/${drinkId}`);
        setDrink(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching drink data:', error);
        setError('Failed to fetch drink data');
        setLoading(false);
      }
    };

    fetchDrink();
  }, [drinkId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Card className='reviews-card'>
      <Card.Img
        variant='top'
        src={drink.strDrinkThumb}
        className='card-img-top'
      />
      <Card.Body>
        <Card.Title>{drink.strDrink}</Card.Title>
        <Card.Subtitle className='mb-2 text-secondary'>
          {drink.strCategory}
        </Card.Subtitle>
        <Card.Subtitle className='mb-2 text-secondary'>
          {drink.strGlass}
        </Card.Subtitle>
        <Card.Text>
          {`${drink.strIngredient1}, ${drink.strIngredient2}, ${drink.strIngredient3}`}
        </Card.Text>

        {/* Display Ratings */}
        <StarRating
          initialRating={drink.ratings || 0}
          onRatingChange={(newRating) => console.log('New Rating:', newRating)}
        />

        {/* Display Comments */}
        <h6>Comments:</h6>
        <ListGroup variant="flush">
          {drink.comments && drink.comments.length > 0 ? (
            drink.comments.map((comment, index) => (
              <ListGroup.Item key={index}>{comment}</ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item>No comments yet.</ListGroup.Item>
          )}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default Reviews;
