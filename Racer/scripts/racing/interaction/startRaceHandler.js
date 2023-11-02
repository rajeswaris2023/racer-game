startRaceWorker.addEventListener('message', message => {
    document.getElementById('start-race-button').remove();
    if(message.data === Constants.SUCCESS) {
        carsCanMove = true;
    }
});