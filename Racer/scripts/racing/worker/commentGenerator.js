addEventListener('message', async message => {
    const uri = `http://localhost:8080/race/${message.data.raceId}`;
    const response = await fetch(uri);
    const responseObject = await response.json();

    const car1PositionInTrack = Number.parseFloat(responseObject.cars[0].positionInTrack.toFixed(1));
    const car2PositionInTrack = Number.parseFloat(responseObject.cars[1].positionInTrack.toFixed(1));

    let comment;
    if(car1PositionInTrack === 0 && car1PositionInTrack === car2PositionInTrack) {
        comment = 'Race is yet to begin';
    }
    else if(car1PositionInTrack === car2PositionInTrack) {
        comment = 'Both players are leading';
    }
    else if(car1PositionInTrack > car2PositionInTrack) {
        comment = `${responseObject.cars[0].player} is leading`;
    }
    else {
        comment = `${responseObject.cars[1].player} is leading`;
    }
    postMessage(comment);
});