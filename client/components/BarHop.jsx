/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Accordion,
  Button,
  Card,
  Col,
  Container,
  Form,
  FormControl,
  ListGroup,
  Row,
} from 'react-bootstrap';
import '../styling/BarHop.css';

const BarHop = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [eventName, setEventName] = useState('');
  const [selectedBars, setSelectedBars] = useState([]);
  const [userEvents, setUserEvents] = useState([]);
  const [availableBars, setAvailableBars] = useState([]);

  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        const response = await axios.get('/events');

        setUserEvents(response.data);
      } catch (error) {
        throw new Error('Error fetching events', error);
      }
    };
    fetchUserEvents();
  }, []);

  const fetchBars = async (query) => {
    if (!query);
    try {
      const response = await axios.get('/api/bars', {
        params: { query },
      });

      setAvailableBars(response.data.data);
    } catch (error) {
      throw new Error('Error fetching bars:', error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`/events/${eventId}`);

      setUserEvents(userEvents.filter((event) => event.id !== eventId));
      alert('Event Removed');
    } catch (error) {
      alert('Failed to remove event');
      throw new Error('Error removing event', error);
    }
  };

  const handleEventNameChange = (e) => setEventName(e.target.value);
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    fetchBars(e.target.value);
  };

  const handleAddBar = (bar) => {
    if (!selectedBars.includes(bar)) {
      setSelectedBars([...selectedBars, bar]);
      setSearchQuery('');
    }
  };

  const handleRemoveBar = (barId) => {
    setSelectedBars(selectedBars.filter((bar) => bar.id !== barId));
  };

  const handleSubmitEvent = async () => {
    const barDetails = selectedBars.map((bar) => ({
      name: bar.name,
      city: bar.city,
      state: bar.state,
      zipcode: bar.zipcode,
    }));
    const newEvent = { name: eventName, bars: barDetails };

    try {
      const response = await axios.post('/events', newEvent);

      setUserEvents([...userEvents, response.data]);
      setEventName('');
      setSelectedBars([]);
      alert('Event Created');
    } catch (error) {
      alert('Failed to save event');
      throw new Error('Error saving event', error);
    }
  };

  return (
    <Container className="mt-4">
      {/* Search Bar */}
      <Row className='mb-4'>
        <Col>
          <FormControl
            type='text'
            placeholder='Search for a bar...'
            value={searchQuery}
            onChange={handleSearchChange}
          />
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
                    <Card.Text>{bar.about.summary}</Card.Text>
                    <Button variant="primary" onClick={() => handleAddBar(bar)}>Add to Event</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p>No bars match your search.</p>
          )}
        </Row>
      )}
      {/* Event Creation Form */}
      <Row className="mb-4">
        <Col md={6}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Event Name</Form.Label>
              <FormControl
                type="text"
                placeholder="Enter event name"
                value={eventName}
                onChange={handleEventNameChange}
              />
            </Form.Group>
            <Button variant="success" onClick={handleSubmitEvent} disabled={!eventName || selectedBars.length === 0}>
              Create Event
            </Button>
          </Form>
        </Col>
        {selectedBars.length > 0 && (
          <Col md={6}>
            <h5>Selected Bars for Event</h5>
            <ul className="list-group">
              {selectedBars.map((bar) => (
                <li key={bar.id} className="list-group-item d-flex justify-content-between align-items-center">
                  {bar.name}
                  <Button variant="danger" size="sm" onClick={() => handleRemoveBar(bar.id)}>Remove</Button>
                </li>
              ))}
            </ul>
          </Col>
        )}
      </Row>
      {/* User Events */}
      <Row>
        <h4>Your Events</h4>
        {userEvents.length > 0 ? (
          <Accordion defaultActiveKey='0'>
            {userEvents.map((event, index) => (
              <Accordion.Item eventKey={index.toString()} key={event.id}>
                <Accordion.Header>{event.name}</Accordion.Header>
                <Accordion.Body>
                  <h6>Bars for Event:</h6>
                  <ListGroup>
                    {event.Bars.map((bar) => (
                      <ListGroup.Item key={bar.id}>{bar.name}</ListGroup.Item>
                    ))}
                  </ListGroup>
                  <Button
                    variant='danger'
                    onClick={() => handleDeleteEvent(event.id)}
                    className='mt-2'
                  >
                    Delete
                  </Button>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        ) : (
          <p>Add some events!</p>
        )}
      </Row>
    </Container>
  );
};

export default BarHop;
