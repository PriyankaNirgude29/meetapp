import React,{ Component } from "react";
import "./App.css";
import "./nprogress.css";
import { Container, Row, Col } from "react-bootstrap";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import { OfflineAlert } from "./Alert";
import { getEvents, extractLocations, checkToken, getAccessToken } from "./api";
import WelcomeScreen from './WelcomeScreen';
import EventGenre from './EventGenre';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';


class App extends Component {
  state = {
    events: [],
    locations: [],
    locationSelected: 'all',
    numberOfEvents: 12,
    showWelcomeScreen: undefined
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
  
  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
         getEvents().then((events) => {
           if (this.mounted) {
           this.setState({ events, locations: extractLocations(events) });
          }
      }); 
   }
}

componentWillUnmount(){
    this.mounted = false;
}

getData = () => {
  const {locations, events} = this.state;
  const data = locations.map((location)=>{
    const number = events.filter((event) => event.location === location).length
    const city = location.split(', ').shift()
    return {city, number};
  })
  return data;
};

  render() {
    if (this.state.showWelcomeScreen === undefined) return <div className="App" />
    return (
      <div className="App">
          {!navigator.onLine && <OfflineAlert text={'You are currently offline, data may not be updated.'}/>}
        <Container>
           <Row className="d-flex justify-content-center align-item-center p-3 m-3">
             <Col md={6} className="d-flex flex-column align-items-center justify-content-center p-5">
                 <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />  
                 <NumberOfEvents updateEvents = { this.updateEvents }/>
             </Col>
             <Col md={6} className='data-vis-wrapper d-flex flex-column'>
              <h4>Distribution of type of Events</h4>
              <EventGenre events={this.state.events} locations={this.state.locations} />
             </Col>
             <Col  md={12} className="d-flex flex-column align-items-center justify-content-around p-5">
              <h4>Distribution of Events in each city</h4>
              <ResponsiveContainer height={300} >
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <CartesianGrid  strokeDasharray="3 3" />
                            <XAxis type="category" dataKey="city" name="City" />
                            <YAxis
                                    allowDecimals={false}
                                    type="number"
                                    dataKey="number"
                                    name="Events"
                            />
                       <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                       <Scatter data={this.getData()} fill="#8884d8" />
                   </ScatterChart>
              </ResponsiveContainer>
        </Col>
        </Row> 
        <Row>

        </Row>
        <EventList events={this.state.events} />
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen}
           getAccessToken={() => { getAccessToken() }} />
        </Container>
      </div>
    );
  }
}

export default App;
