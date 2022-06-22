import React,{ Component } from "react";
import "./App.css";
import "./nprogress.css";
import { Container, Row } from "react-bootstrap";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import { OfflineAlert } from "./Alert";
import { getEvents, extractLocations } from "./api";


class App extends Component {
  state = {
    events: [],
    locations: [],
    locationSelected: 'all',
    numberOfEvents: 12,
  }

  updateEvents = (location, eventCount) => {
    if (eventCount === undefined) {
      eventCount = this.state.numberOfEvents;
  } else(
      this.setState({ numberOfEvents: eventCount })
  )
  if (location === undefined) {
      location = this.state.locationSelected;
  }
  console.log(eventCount, location)
  getEvents().then((events) => {
      let locationEvents = location === "all" ?
          events :
          events.filter((event) => event.location === location);
      this.setState({
          events: locationEvents.slice(0, eventCount),
          numberOfEvents: eventCount,
          locationSelected: location,
      }); 
   })
  }
  
  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount(){
    this.mounted = false;
  }
  render() {
    return (
      <div className="App">
          {!navigator.onLine && <OfflineAlert text={'You are currently offline, data may not be updated.'}/>}
        <Container>
        <Row className="d-flex justify-content-between p-3 m-3">
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />  <NumberOfEvents updateEvents = { this.updateEvents }/>
        </Row>
        <EventList events={this.state.events} />
       
        </Container>
      </div>
    );
  }
}

export default App;
