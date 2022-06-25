# Meet-App

## Objective

This app has beed developed as a part of careerfoundry fullstack web-development project. The goal of this project is to build a serverless, progressive web application (PWA) with React using a test-driven development (TDD) technique. The application uses the Google Calendar API to fetch upcoming events.

## Technical Requirements

* Javascript
* HTML
* CSS
* React
* Google Calendar API and OAuth2
* AWS Lambda

## Key features

* Filter events by city.
* Show/hide event details.
* Specify number of events.
* Use the app when offline.
* Add an app shortcut to the home screen.
* View a chart showing the number of upcoming events by city.

## Dependencies

* Jest-Cucumber
* Enzyme
* gh-pages
* Puppetear

## User stories and tesing scenarios

FEATURE : SHOW/HIDE AN EVENT'S DETAILS 

User Story- As a user I want to be able to click on an event so that I will be able to expand the event and see more detail about that event.  

Scenario 1: An event element is collapsed by default 

• Given a user is on the main page and hasn't started search yet 

• When nothing is clicked  

• Then the event details will be collapsed  

Scenario 2: User can expand an event to see its details  

• Given a user want more detail about a specific event  

• When the user clicks on a specific event  

• Then the event expands for more detail 

 Scenario 3: User can collapse an event to hide its details  

• Given user no longer wants to see an event detail 

• When the user clicks on expanded detail  

• Then the expanded detail will collapse to see less detail  

 

FEATURE : SPECIFY NUMBER OF EVENTS 

User Story : As a user I should be able to choose the number of events that I want to see so that I can manage the number of events on my screen  

Scenario 1: When user hasn’t specified a number, 32 is the default number  

• Given a user has not specified the number of events he wants to see 

• When the user opens the page  

• Then the user sees 32 events by default  

Scenario 2: User can change the number of events they want to see  

• Given the user wants to specify the number of events he wants to see 

• When the user clicks on dropdown 

• Then the user will be able to choose the number of events that they want to see at one time.  

 

FEATURE : USE THE APP WHEN OFFLINE 

User Story : As a user I should be able to use the app even if it`s offline to get information without needing internet connection. 

Scenario 1: Show cached data when there’s no internet connection  

• Given user wants to use app when there is no internet connection 

• When the user uses app 

• Then the app uses cached data to display the events 

Scenario 2: Show error when user changes the settings (city, time range) 

• Given user wants to change settings and has no internet connection  

• When the user attempts to change settings  

• Then user will get an error message 

 

FEATURE : DATA VISUALIZATION 

User Story : As a user I should be able to see a chart showing the upcoming events by dates in each city that I can quickly find events in the time range that interests me  

Scenario 1: Show a chart with the number of upcoming events in each city 

• Given user wants to see how many events are coming up 

• When user clicks on chart  

• Then user will see a chart with the number of upcoming events in each city 