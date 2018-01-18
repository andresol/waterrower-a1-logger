# waterrower-a1-logger
Rasberry pi project for logging rowing on a WaterRower A1. It will track watt,
pace, lenght, time and laps. 

It now supports gpx. After a rowing session one can import the gpx file into
e.g strava.
![strava](strava.png "strava")

##Getting Started
Obviously the WaterRower A1 is needed. I also recommend a 2 EL Wire Splitter Cable and a rasberry pi. Please 
connect the WaterRower A1 sensor to the Raspberry Pi. Default this EL Wire Splitter is
to the GPID 4 and ground.  

##Prerequisites
A Raspberry Pi running with nodejs. I use nodejs 9.4. Recommend also use of
yarn. 

##Installing
```
git clone https://github.com/andresol/waterrower-a1-logger.git
yarn install
node app.js
``` 

##Using
After starting the app one can go to the web page..
Start so a activity. 

![web-gui](web-gui.png "gui")

##TODO
A lot of GUI. Automatic import into strava, live map.
....