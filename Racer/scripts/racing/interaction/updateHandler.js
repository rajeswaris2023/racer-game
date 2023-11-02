handleUpdate = updatedPosition => isTopSpeed => currentCar => otherCar => currentCarAnimator => otherCarAnimator => screenName => {
    currentCar.setPosition(updatedPosition);
    currentCar.setTopSpeed(isTopSpeed);

    const offsetPixels = currentCar.isTopSpeed() ? currentCar.getTopSpeedPixels() : currentCar.getAccelerationPixels();

    PreCollisionDetector.rearEndCollision(currentCar.getCarNameInPrimaryScreen(), otherCar.getCarNameInSecondaryScreen(), offsetPixels)
        .then(collision => {
            if(!collision) {
                HandlerHelper.animateMoveForward(currentCarAnimator, otherCarAnimator, screenName);
                return true;
            }
            return false;
        })
        .then(goAhead => {
            if(goAhead) {
                return BarrierEvaluator.checkBarrierHit(screenName, currentCar.getCarNameInPrimaryScreen(), 0);
            }
            return false;
        })
        .then(async isBarrierHit => {
            if (isBarrierHit) {
                currentCar.setClickCountToTopSpeed(0);
                const carPosition = await backoff(currentCar.getId(), otherCar.getId());
                currentCar.setPosition(carPosition);
                await HandlerHelper.animateReposition(currentCarAnimator, currentCar.getBackoffPixels());
                return false;
            }
            return true;
        }).then(async goAhead => {
        if(goAhead) {
            if(isGameOver) {
                results = await gameResult;
                GameOver.showResult(results.gameOverText);
            }
        }
    });
}

updater1.addEventListener('message', message => {
    if(message.data.isGameOver) {
        isGameOver = true;
        gameResult = getResults();
    }
    handleUpdate(message.data.position)(message.data.topSpeed)(player_1_car)(player_2_car)(animator_player_1_car)(animator_player_2_car)('screen-1');
});

updater2.addEventListener('message', message => {
    if(message.data.isGameOver) {
        isGameOver = true;
        gameResult = getResults();
    }
    handleUpdate(message.data.position)(message.data.topSpeed)(player_2_car)(player_1_car)(animator_player_2_car)(animator_player_1_car)('screen-2');
});