var updater1 = new Worker('./scripts/racing/worker/updater.js');
var updater2 = new Worker('./scripts/racing/worker/updater.js');
var commentGenerator = new Worker('./scripts/racing/worker/commentGenerator.js');
var startRaceWorker = new Worker('./scripts/racing/worker/startRace.js');
var gameOverWorker = new Worker('./scripts/racing/worker/results.js');
var carsCanMove = false;
var player_1_car;
var player_2_car;
var animator_player_1_car;
var animator_player_2_car;
var screen1Track;
var screen2Track;
var selectedTrack;
var raceId;
var pixelScale = 200;
var isGameOver;
var carImages = new Map([[1, '../../images/red_car.png'], [2, '../../images/blue_car.png'], [3, '../../images/yellow_car.png']]);
var gameResult;
var results;

addCars = carPrimaryContainer => carSecondaryContainer => carId => {
    const carImage = carImages.get(carId);
    const altText = Constants.CAR_CANNOT_BE_LOADED;
    CarAdder.addCar(carPrimaryContainer, carImage, altText);
    CarAdder.addCar(carSecondaryContainer, carImage, altText);
}

createCar = player_car => {
    return new Car(player_car.id, player_car.driver, player_car.acceleration, player_car.topSpeed, player_car.backoffOnBarrierHit,
        0, 0, false, pixelScale);
}

initializeAnimators = () => {
    animator_player_1_car = new Animator(player_1_car, selectedTrack.length, screen1Track, screen2Track);
    animator_player_2_car = new Animator(player_2_car, selectedTrack.length, screen1Track, screen2Track);
}

setCarNames = player_car => carNameInPrimaryScreen => carNameInSecondaryScreen => {
    player_car.setCarNameInPrimaryScreen(carNameInPrimaryScreen);
    player_car.setCarNameInSecondaryScreen(carNameInSecondaryScreen);
}

initializeTracks = () => {
    screen1Track = new Track(selectedTrack.length, selectedTrack.barriers, Constants.SCREEN_1, 10, 200);
    screen2Track = new Track(selectedTrack.length, selectedTrack.barriers, Constants.SCREEN_2, 10, 200);
    screen1Track.computeTrackPortion(player_1_car.getCarNameInPrimaryScreen(), 600);
    screen2Track.computeTrackPortion(player_2_car.getCarNameInPrimaryScreen(), 600);
}

getSelection = () => {
    raceId = localStorage.raceId;
    selectedTrack = JSON.parse(localStorage.selectedTrack);
    player_1_car = createCar(JSON.parse(localStorage.player_1_selected_car));
    setCarNames(player_1_car)(Constants.CAR_1)(Constants.SCREEN_2_CAR_1);
    player_2_car = createCar(JSON.parse(localStorage.player_2_selected_car));
    setCarNames(player_2_car)(Constants.CAR_2)(Constants.SCREEN_1_CAR_2);
}

getPlayers = () => {
    player1 = localStorage.player_1_name;
    player2 = localStorage.player_2_name;
}

fetchComments = () => {
    commentGenerator.postMessage({ raceId: raceId });
}

initialize = event => {
    getSelection();
    getPlayers();
    addCars(player_1_car.getCarNameInPrimaryScreen())(player_1_car.getCarNameInSecondaryScreen())(player_1_car.getId());
    addCars(player_2_car.getCarNameInPrimaryScreen())(player_2_car.getCarNameInSecondaryScreen())(player_2_car.getId());
    initializeTracks();
    initializeAnimators();
    fetchComments();
};

populateRow = rowDetail => rowId => {
    let parentDiv = document.getElementById('results-table-container');
    let rowDiv = HTMLElementCreator.createDiv(`row-${rowId}`, 'result-row');

    const playerDiv = HTMLElementCreator.createDiv('','player-div');
    playerDiv.appendChild(HTMLElementCreator.createSpan('', rowDetail.player, 'result-row-text'));
    rowDiv.appendChild(playerDiv);

    const timeTakenDiv = HTMLElementCreator.createDiv('', 'time-taken-div');
    timeTakenDiv.appendChild(HTMLElementCreator.createSpan('', rowDetail.timeTaken, 'result-row-text'));
    rowDiv.appendChild(timeTakenDiv);

    const positionDiv = HTMLElementCreator.createDiv('', 'position-div');
    positionDiv.appendChild(HTMLElementCreator.createSpan('', rowDetail.position, 'result-row-text'));
    rowDiv.appendChild(positionDiv);

    const raceCountDiv = HTMLElementCreator.createDiv('', 'race-count-div');
    raceCountDiv.appendChild(HTMLElementCreator.createSpan('', rowDetail.raceCount, 'result-row-text'));
    rowDiv.appendChild(raceCountDiv);

    parentDiv.appendChild(rowDiv);
}

populateResultsTable = () => {
    for(let index = 0; index < results.result.length; index++) {
        const currentRow = results.result[index];
        populateRow(currentRow)(index);
    }
}

resultsTable = () => {
    const resultsTableButton = document.getElementById('results-table-button');
    resultsTableButton.addEventListener('click', event => {
        const gameOverScreen = document.getElementById('game-over-screen');
        gameOverScreen.hidden = true;

        populateResultsTable();
        const resultsScreen = document.getElementById('results-screen');
        resultsScreen.display = 'block';
        resultsScreen.hidden = false;
    });
}

startRaceHandle = () => {
    let startRaceButtonElement = document.getElementById('start-race-button');
    startRaceButtonElement.addEventListener('click', event => {
        startRaceWorker.postMessage(raceId);
    }, {
        capture: false
    });
}

addEventListener('load', event => {
    initialize(event);
    startRaceHandle();
    resultsTable();
}, {
    capture: false
});