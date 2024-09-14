import React from 'react';
import {
  Accordion,
  Button,
  ListGroup,
  Row,
} from 'react-bootstrap';

const UserEvents = ({ userEvents, onDeleteEvent }) => (
  <Row>
    <h4>Your Events</h4>
    {userEvents.length > 0 ? (
      <Accordion defaultActiveKey='0' className='mb-4'>
        {userEvents.map((event, index) => (
          <Accordion.Item eventKey={index.toString()} key={event.id}>
            <Accordion.Header>{event.name}</Accordion.Header>
            <Accordion.Body>
              <h6>Bars for Event:</h6>
              {event.Bars && event.Bars.length > 0 ? (
                <ListGroup>
                  {event.Bars.map((bar) => (
                    <ListGroup.Item key={bar.id}>
                      {bar.name}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <p>No bars available for this event.</p>
              )}
              <Button
                variant='danger'
                onClick={() => onDeleteEvent(event.id)}
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
);

export default UserEvents;
