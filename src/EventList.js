// src/EventList.js

import React, { Component } from 'react';
import Event from "./Event";
import { Row, Col } from 'react-bootstrap';

class EventList extends Component {
  render() {
    const { events } = this.props;
    return (
      <Row className="Eventlist d-flex justify-content-center">
         {events.map((event) => (
          <Col lg={3} md={4} sm={6} key={event.id}>
            <Event event={event} />
          </Col>
        ))}
      </Row>
     );
  }
}

export default EventList;