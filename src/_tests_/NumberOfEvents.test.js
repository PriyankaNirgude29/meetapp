import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

//Feature 2: Specify number of events

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents updateEvents={() => {}}/>);
  });

  test('render text input', () => {
    expect(NumberOfEventsWrapper.find('.number-of-events')).toHaveLength(1);
  });

  //Once state changes updates state
  test('react to state change', () => {
    NumberOfEventsWrapper.setState({ numberOfEvents: 16 });
    expect(NumberOfEventsWrapper.state('numberOfEvents')).toEqual(16);
});

//After changing the # of events to display, state changes
test('change numberOfEvents state when number input changes', () => {
    NumberOfEventsWrapper.setState({ numberOfEvents: 16 });
    NumberOfEventsWrapper.find('.number-of-events').simulate('change', { target: { value: 8 } });
    expect(NumberOfEventsWrapper.state('numberOfEvents')).toEqual(8);
});

})