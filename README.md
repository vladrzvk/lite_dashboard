# Dashboard 

This project is a web application which is a customizable dashboard. 
The dashboard provides several widgets (see below) using exeternal apis. Its design is based on the macOs UI.

## Authors

- [Antonin FREREJACQUES](antonin.frerejacques@epitech.eu)
- [Vladislav RAZYVIKA](vladislav.razyvika@epitech.eu)
- [Pierre-Alexandre BOLTEAU](pierre-alexandre.bolteau@epitech.eu)

### Language used

The project is divided into 2 parts :

- Backend : Spring boot / gradle (Java11)
- Fronted : React / Craco

For the database, we used an embedded database called h2.

### services / widget

Here is a list of all exeternal service used : 

- **OpenWeatherMap**([Api documentation](https://openweathermap.org/api))
	- weather widget : search by city and display weather information.
- **YahooFinance**([Api documentation](https://financequotes-api.com/))
	- finance widget : search by stock and display some information about it
- **Spotify**([Api documentation](https://developer.spotify.com/documentation/web-api/))
	- music widget : connection to your spotify account 
- **DailyMontion**([Api documentation](https://developer.dailymotion.com/))
	- dailymotion widget : watch every dailymotion video that you want
- **Minecraft**
	- minecraft widget : play Minecraft online !
- **xTerminal**
	- terminal widget : it's funny, it's a fake terminal

## Installation

As the project is divided, one need to launch the backend and the frontend in order to run this app.

### Backend

Go into `backendJava` and build the gradle project using :
```
./gradlew build
```

Then, run it :
```
gralde bootRun
```

Unit tests can be invoked with:
```
./gradlew test
```

### Frontend

To install the React application, go into the folder `frontendReact` and run :
```
npm install
```

Then, one can run it using :
```
npm start
```