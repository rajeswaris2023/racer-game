class CarOptionsCreator {
    /**
     * @description Creates car element
     * @param cars
     * @param carImages
     * @param containerName
     * @param carButtonClass
     * @param isPlayer1
     * @returns none
     */
    static createCar(cars, carImages, containerName, carButtonClass, isPlayer1) {
        let carsContainer = document.getElementById(containerName);
        const playerId = isPlayer1 ? 1 : 2;

        for(const [id, car] of cars) {
            let carDiv = HTMLElementCreator.createDiv(`car-${id}-${playerId}-div`, 'car-div');

            let buttonDiv = CarOptionsCreator.createCarButton(`car-${id}-${playerId}`, carImages.get(id), carButtonClass);
            carDiv.appendChild(buttonDiv);

            let carInfoDiv = CarOptionsCreator.createCarInfo(`${id}-${playerId}`, car.driver, car.topSpeed, car.acceleration, car.backoffOnBarrierHit);
            carDiv.appendChild(carInfoDiv);

            carsContainer.appendChild(carDiv);
        }
    }

    /**
     * @description Creates car button element
     * @param id
     * @param imageSource
     * @param carButtonClass
     * @returns {*} Car button
     */
    static createCarButton(id, imageSource, carButtonClass) {
        const imageAlt = Constants.CAR_IMAGE_DID_NOT_LOAD;
        const buttonClassName = `car-button ${carButtonClass}`;

        let buttonDiv = HTMLElementCreator.createDiv(`${id}-button-div`, 'car-button-div');
        const carImage = HTMLElementCreator.createButtonImage(`${id}`, imageSource, imageAlt, buttonClassName);
        buttonDiv.appendChild(carImage);

        return buttonDiv;
    };

    /**
     * @description Creates Car Info element
     * @param id
     * @param driverName
     * @param topSpeed
     * @param acceleration
     * @param backoffOnBarrierHit
     * @returns {*} Car Info element
     */
    static createCarInfo(id, driverName, topSpeed, acceleration, backoffOnBarrierHit) {
        let carInfoDiv = HTMLElementCreator.createDiv(`car-${id}-info-div`, 'car-info-div');
        const carInfoString = `driver: ${driverName}, top speed: ${topSpeed}, acceleration : ${acceleration}, backoff : ${backoffOnBarrierHit}`;
        const carInfo = HTMLElementCreator.createSpan(`car-${id}-info`, carInfoString, 'car-info');
        const carIdElement = HTMLElementCreator.createHiddenElement(`car-${id}-id`, id, 'car-id');

        carInfoDiv.appendChild(carInfo);
        carInfoDiv.appendChild(carIdElement);

        return carInfoDiv;
    };
}