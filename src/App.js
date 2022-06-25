import React,{ Component } from "react";
import "./App.css";
import "./nprogress.css";
import { Container, Row } from "react-bootstrap";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import { OfflineAlert } from "./Alert";
import { getEvents, extractLocations, checkToken, getAccessToken } from "./api";
import WelcomeScreen from './WelcomeScreen';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip
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
        <Container className="Cont_Back">
        <Row className="d-flex justify-content-between p-3 m-3">
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />  <NumberOfEvents updateEvents = { this.updateEvents }/>
        </Row>
        <h4>Events in each city</h4>

        <ScatterChart
                width={400}
                height={400}
                margin={{
                             top: 20, right: 20, bottom: 20, left: 20,
                        }}
        >
        <CartesianGrid />
        <XAxis type="number" dataKey="x" name="stature" unit="cm" />
        <YAxis type="number" dataKey="y" name="weight" unit="kg" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="A school" data={this.getData()} fill="#8884d8" />
        </ScatterChart>
        <EventList events={this.state.events} />
       
        </Container>
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen}
           getAccessToken={() => { getAccessToken() }} />
      </div>
    );
  }
}

export default App;
