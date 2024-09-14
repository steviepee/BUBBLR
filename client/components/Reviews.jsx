import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, ListGroup } from 'react-bootstrap';
import Rating from 'react-rating';

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
    <Card
      style={{ width: '18rem' }}
      className='text-center'
      bg='dark'
      text='light'
      border='light'
    >
      <Card.Body>
        <Card.Img
          variant='top'
          src={drink.strDrinkThumb}
          style={{ width: '160px', height: '160px' }}
        />
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
        <h6>Rating:</h6>
        <Rating
          initialRating={drink.ratings || 0}
          readonly
          fractions={2}
          emptySymbol="fa fa-star-o fa-2x"
          fullSymbol="fa fa-star fa-2x"
          style={{ color: '#ffd700' }}
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
