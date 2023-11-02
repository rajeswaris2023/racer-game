const db = require('../db/localDB');
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({origin: process.env.ORIGIN, credentials: process.env.CREDENTIALS}));

const localDB = db.createInstance();

app.get('/tracks', (request, response) => {
    const allTracks = localDB.getAllTracks();
    response.json(allTracks);
});

app.get('/cars', (request, response) => {
    const allCars = localDB.getAllCars();
    response.json(allCars);
});

app.get('/race/:raceId', (request, response) => {
    const raceId = Number.parseInt(request.params.raceId);

    const raceInfo = localDB.getRaceForResponse(raceId);

    response.json(raceInfo);
});

app.post('/create_race', (request, response) => {
    const raceId = localDB.createRace(request.body.playerCar, request.body.track);

    response.json(raceId);
});

app.post('/start_race/:raceId', (request, response) => {
    const raceId = Number.parseInt(request.params.raceId);

    const startTime = localDB.getRaceForId(raceId).startRace();

    response.status(200).send('Success');
});

app.post('/accelerate/:raceId/:carId', (request, response) => {
    const raceId = Number.parseInt(request.params.raceId);
    const carId = Number.parseInt(request.params.carId);
    const otherCarId = Number.parseInt(request.body.otherCarId);
    const clickCountToTopSpeed = Number.parseInt(request.body.clickCountToTopSpeed);
    const accelerationTime = Number.parseInt(request.body.accelerationTime);

    const race = localDB.getRaceForId(raceId);
    const result = race.accelerateCar(carId, otherCarId, clickCountToTopSpeed, accelerationTime);

    response.json(result);
});

app.post('/backoff/:raceId/:carId', (request, response) => {
    const raceId = Number.parseInt(request.params.raceId);
    const carId = Number.parseInt(request.params.carId);
    const otherCarId = Number.parseInt(request.body.otherCarId);

    const race = localDB.getRaceForId(raceId);
    race.backoffCar(carId, otherCarId);

    response.json(localDB.getRaceForId(raceId).getPositionForResponse(carId));
});

app.get('/results/:raceId', (request, response) => {
    const raceId = Number.parseInt(request.params.raceId);

    const result = localDB.getRaceForId(raceId).getResult();

    response.json(result);
});

app.listen(process.env.LISTENING_PORT);

