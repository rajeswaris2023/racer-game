carsOptionsFetcher.addEventListener('message', message => {
    const data = message.data;

    for(let index = 0; index < data.length; index++) {
        const car = {
            id: data[index].id,
            driver: data[index].driverName,
            acceleration: data[index].acceleration,
            topSpeed: data[index].topSpeed,
            backoffOnBarrierHit: data[index].backoffOnBarrierHit
        };
        cars.set(car.id, car);
    }
    CarOptionsCreator.createCar(cars, carImages, Constants.PLAYER_ONE_CAR_SELECTION, Constants.PLAYER_ONE, true);
    CarOptionsCreator.createCar(cars, carImages, Constants.PLAYER_TWO_CAR_SELECTION, Constants.PLAYER_TWO, false);
    addCarButtonEventListener();
});