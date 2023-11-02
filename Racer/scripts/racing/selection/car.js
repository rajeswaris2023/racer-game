class Car {
    #id;
    #driverName;
    #acceleration;
    #topSpeed;
    #backoffOnBarrierHit;
    #positionInTrack;
    #clickCountToTopSpeed;
    #isTopSpeed;
    #accelerationPixels;
    #topSpeedPixels;
    #carNameInPrimaryScreen;
    #carNameInSecondaryScreen;
    #backoffPixels;

    /**
     * @description Represents car
     */
    constructor(id, driver, acceleration, topSpeed, backoff, position, clickCountToTopSpeed, isTopSpeed, scale) {
        this.#id = id;
        this.#driverName = driver;
        this.#acceleration = acceleration;
        this.#topSpeed = topSpeed;
        this.#backoffOnBarrierHit = backoff;
        this.#positionInTrack = position;
        this.#clickCountToTopSpeed = clickCountToTopSpeed;
        this.#isTopSpeed = isTopSpeed;
        this.#accelerationPixels = this.#acceleration * scale;
        this.#topSpeedPixels = this.#topSpeed * scale;
        this.#backoffPixels = this.#backoffOnBarrierHit * scale;
    }

    /**
     * @description Returns id
     * @returns {*} Id
     */
    getId() {
        return this.#id;
    }

    /**
     * @description Returns acceleration
     * @returns {*} Acceleration
     */
    getAcceleration() {
        return this.#acceleration;
    }

    /**
     * @description Returns position in track
     * @returns {*} Position in track
     */
    getPosition() {
        return this.#positionInTrack;
    }

    /**
     * @description Returns click count to top speed
     * @returns {*} Click count to top speed
     */
    getClickCountToTopSpeed() {
        return this.#clickCountToTopSpeed;
    }

    /**
     * @description Returns if top speed
     * @returns {Boolean} True if topspeed else false
     */
    isTopSpeed() {
        return this.#isTopSpeed;
    }

    /**
     * @description Returns acceleration pixels
     * @returns {*} Acceleration pixels
     */
    getAccelerationPixels() {
        return this.#accelerationPixels;
    }

    /**
     * @description Returns top speed pixels
     * @returns {*} Top speed pixels
     */
    getTopSpeedPixels() {
        return this.#topSpeedPixels;
    }

    /**
     * @description Returns back off pixels
     * @returns {*} Back off pixels
     */
    getBackoffPixels() {
        return this.#backoffPixels;
    }

    /**
     * @description Increments click count to top speed
     * @returns {*} Click count to top speed
     */
    incrementClickCountToTopSpeed() {
        return ++this.#clickCountToTopSpeed;
    }

    /**
     * @description Sets click count to top speed
     * @returns none
     * @param clickCount
     */
    setClickCountToTopSpeed(clickCount) {
        this.#clickCountToTopSpeed = clickCount;
    }

    /**
     * @description Sets car name in primary screen
     * @returns none
     * @param carName
     */
    setCarNameInPrimaryScreen(carName) {
        this.#carNameInPrimaryScreen = carName;
    }

    /**
     * @description Sets car name in secondary screen
     * @returns none
     * @param carName
     */
    setCarNameInSecondaryScreen(carName) {
        this.#carNameInSecondaryScreen = carName;
    }

    /**
     * @description Returns car name in primary screen
     * @returns {*} Car name in primary screen
     */
    getCarNameInPrimaryScreen() {
        return this.#carNameInPrimaryScreen;
    }

    /**
     * @description Returns car name in secondary screen
     * @returns {*} Car name in secondary screen
     */
    getCarNameInSecondaryScreen() {
        return this.#carNameInSecondaryScreen;
    }

    /**
     * @description Sets car position in track
     * @returns none
     * @param carPosition
     */
    setPosition(carPosition) {
        this.#positionInTrack = carPosition;
    }

    /**
     * @description Sets top speed
     * @returns none
     * @param isTopSpeed
     */
    setTopSpeed(isTopSpeed) {
        this.#isTopSpeed = isTopSpeed;
    }
}