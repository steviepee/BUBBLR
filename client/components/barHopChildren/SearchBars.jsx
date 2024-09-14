import React, { useState } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  FormControl,
  Row,
} from 'react-bootstrap';
import axios from 'axios';

const SearchBars = ({ searchQuery, onSearchQueryChange, onAddBar }) => {
  const [availableBars, setAvailableBars] = useState([]);

  const fetchBars = async (query) => {
    if (!query) return;
    try {
      const response = await axios.get('/api/bars', {
        params: { query },
      });
      setAvailableBars(response.data.data);
    } catch (error) {
      throw new Error('Error fetching bars:', error);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    onSearchQueryChange(query);
    fetchBars(query);
  };

  return (
    <>
      {/* Search Bar */}
      <Row className='mt-4 mb-4'>
        <Col>
          <Form>
            <Form.Label>Bar Search</Form.Label>
            <FormControl
              type='text'
              placeholder='Search for a bar...'
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Form>
        </Col>
      </Row>
      {/* Available Bars */}
      {searchQuery && (
        <Row className="mb-4">
          <h5>Available Bars</h5>
          {availableBars.length > 0 ? (
            availableBars.map((bar) => (
              <Col md={4} className="mb-4" key={bar.google_id}>
                <Card className='bar-card'>
                  <Card.Img variant="top" src={bar.photos_sample[0].photo_url} alt={`${bar.name} image`} />
                  <Card.Body>
                    <Card.Title>{bar.name}</Card.Title>
                    <Card.Subtitle>
                      <>
                        {bar.street_address}<br />
                        {bar.city}, {bar.state} {bar.zipcode}
                      </>
                    </Card.Subtitle>
                    <Button variant="primary" onClick={() => onAddBar(bar)}>
                      Add to Event
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p>No bars match your search.</p>
          )}
        </Row>
      )}
    </>
  );
};

export default SearchBars;
