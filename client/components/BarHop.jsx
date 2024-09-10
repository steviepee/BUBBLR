import React, { useState } from 'react';
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

const BarHop = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [eventName, setEventName] = useState('');
  const [selectedBars, setSelectedBars] = useState([]);
  const [userEvents, setUserEvents] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [availableBars, setAvailableBars] = useState([
    {
      id: 1,
      name: 'Bar One',
      description: 'A great place to start your night.',
      imageUrl: 'bar-one-image-url',
    },
    {
      id: 2,
      name: 'Bar Two',
      description: 'Known for amazing cocktails.',
      imageUrl: 'bar-two-image-url',
    },
  ]);

  const handleEventNameChange = (e) => setEventName(e.target.value);
  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleAddBar = (bar) => {
    if (!selectedBars.includes(bar)) {
      setSelectedBars([...selectedBars, bar]);
    }
  };

  const handleRemoveBar = (barId) => {
    setSelectedBars(selectedBars.filter((bar) => bar.id !== barId));
  };

  const handleSubmitEvent = () => {
    // eslint-disable-next-line no-alert
    alert('Event Created');
    const newEvent = { id: Date.now(), name: eventName, bars: selectedBars };
    setUserEvents([...userEvents, newEvent]);
    setEventName('');
    setSelectedBars([]);
  };

  const handleDeleteEvent = (eventId) => {
    setUserEvents(userEvents.filter((event) => event.id !== eventId));
  };

  const filteredBars = availableBars.filter(
    (bar) => bar.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
          {filteredBars.length > 0 ? (
            filteredBars.map((bar) => (
              <Col md={4} className="mb-4" key={bar.id}>
                <Card>
                  <Card.Img variant="top" src={bar.imageUrl} alt={`${bar.name} image`} />
                  <Card.Body>
                    <Card.Title>{bar.name}</Card.Title>
                    <Card.Text>{bar.description}</Card.Text>
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
                    {event.bars.map((bar) => (
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
