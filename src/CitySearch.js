// src/CitySearch.js

import React, { Component } from 'react';
import { InputGroup, FormControl, Col  } from "react-bootstrap";

class CitySearch extends Component {
    state = {
        query: '',
        suggestions: [],
        showSuggestions: undefined
      }
    handleInputChanged = (event) => {
        const value = event.target.value;
        const suggestions = this.props.locations.filter((location) => {
            return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
          });
        this.setState({
            query: value ,
            suggestions,
        });
      };

      handleItemClicked = (suggestion) => {
        this.setState({
          query: suggestion,
          showSuggestions: false
        });
      
        this.props.updateEvents(suggestion);
      }

  render() {
    
    return (
      <>
      <Col>
      {/* <div className="CitySearch">Choose a city to see the events having place there:</div> */}
      
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Events that have place in</InputGroup.Text>
        <FormControl
          placeholder="Type the name of the city you are looking for"
          aria-label="City"
          aria-describedby="basic-input"
          className="city" 
                id="inputGroup-sizing-default"
                value={this.state.query}
                onChange={this.handleInputChanged}
                onFocus={() => { this.setState({ showSuggestions: true }) }}
        />
      </InputGroup>
      
      <ul className="suggestions" style={this.state.showSuggestions ? {}: { display: 'none' }}>
          {this.state.suggestions.map((suggestion) => (
              <li key={suggestion} 
              onClick={() => this.handleItemClicked(suggestion)}>
                  {suggestion}</li>
          ))}
         <li onClick={() => this.handleItemClicked("all")}>
            <b>See all cities</b>
          </li>
      </ul>
      </Col>
        </>
    );
  }
}
export default CitySearch;