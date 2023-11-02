hasCrossedFinishLine = carPosition => carPosition > selectedTrack.length;

addEventListener('keydown', event => {
    if(!carsCanMove) {
        return;
    }
    return new Promise((resolve, reject) => {
        switch (event.code) {
            case Constants.ARROW_UP : {
                const accelerationTime = Date.now();
                if(!hasCrossedFinishLine(player_2_car.getPosition())) {
                    player_2_car.incrementClickCountToTopSpeed();
                    updater2.postMessage({
                        raceId: raceId,
                        carId: player_2_car.getId(),
                        data: {
                            otherCarId: player_1_car.getId(),
                            clickCountToTopSpeed: player_2_car.getClickCountToTopSpeed(),
                            accelerationTime: accelerationTime
                        }
                    });
                }
                break;
            }
            case Constants.ARROW_LEFT : {
                const currentCarName = player_2_car.getCarNameInPrimaryScreen();
                const otherCarName = player_1_car.getCarNameInSecondaryScreen();
                HandlerHelper.animateMoveLeft(animator_player_2_car, currentCarName, otherCarName, Constants.ROAD_2, Constants.SCREEN_2);
                break;
            }
            case Constants.ARROW_RIGHT : {
                const currentCarName = player_2_car.getCarNameInPrimaryScreen();
                const otherCarName = player_1_car.getCarNameInSecondaryScreen();
                HandlerHelper.animateMoveRight(animator_player_2_car, currentCarName, otherCarName, Constants.ROAD_2, Constants.SCREEN_2);
                break;
            }
            case Constants.KEY_W : {
                const accelerationTime = Date.now();
                if(!hasCrossedFinishLine(player_1_car.getPosition())) {
                    updater1.postMessage({
                        raceId: raceId,
                        carId: player_1_car.getId(),
                        data: {
                            otherCarId: player_2_car.getId(),
                            clickCountToTopSpeed: player_1_car.incrementClickCountToTopSpeed(),
                            accelerationTime: accelerationTime
                        }
                    });
                }
                break;
            }
            case Constants.KEY_A : {
                const currentCarName = player_1_car.getCarNameInPrimaryScreen();
                const otherCarName = player_2_car.getCarNameInSecondaryScreen();
                HandlerHelper.animateMoveLeft(animator_player_1_car, currentCarName, otherCarName, Constants.ROAD_1, Constants.SCREEN_1);
                break;
            }
            case Constants.KEY_S : {
                const currentCarName = player_1_car.getCarNameInPrimaryScreen();
                const otherCarName = player_2_car.getCarNameInSecondaryScreen();
                HandlerHelper.animateMoveRight(animator_player_1_car, currentCarName, otherCarName, Constants.ROAD_1, Constants.SCREEN_1);
                break;
            }
        }
    });
},{
    capture: false
});