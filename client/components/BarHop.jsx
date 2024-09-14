/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  Row,
} from 'react-bootstrap';
import '../styling/BarHop.css';
import SearchBars from './barHopChildren/SearchBars.jsx';
import UserEvents from './barHopChildren/UserEvents.jsx';

const BarHop = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [eventName, setEventName] = useState('');
  const [selectedBars, setSelectedBars] = useState([]);
  const [userEvents, setUserEvents] = useState([]);

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
  const resetSearchQuery = () => setSearchQuery('');

  const handleAddBar = (bar) => {
    if (!selectedBars.includes(bar)) {
      setSelectedBars([...selectedBars, bar]);
      resetSearchQuery();
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
    <Container className="mt-4" style={{
      background: 'linear-gradient(135deg, #6b0042, #ffba0f)',
      borderRadius: '15px',
    }}>
      <SearchBars
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onAddBar={handleAddBar}
      />
      {/* Event Creation Form */}
      <Row className="mb-4">
        <Col md={6}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Event Name</Form.Label>
              <FormControl
                type="text"
                placeholder="Enter your event's name"
                value={eventName}
                onChange={handleEventNameChange}
              />
            </Form.Group>
            <Button
              variant="success"
              onClick={handleSubmitEvent}
              disabled={!eventName || selectedBars.length === 0}
            >
              Create Event
            </Button>
          </Form>
        </Col>
        {selectedBars.length > 0 && (
          <Col md={6}>
            <h5>Selected Bars for Event</h5>
            <ul className="list-group">
              {selectedBars.map((bar) => (
                <li
                  key={bar.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {bar.name}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleRemoveBar(bar.id)}
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          </Col>
        )}
      </Row>
      <UserEvents userEvents={userEvents} onDeleteEvent={handleDeleteEvent}/>
    </Container>
  );
};

export default BarHop;
