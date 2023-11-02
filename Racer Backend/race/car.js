class Car {
    #id;
    #driverName;
    #acceleration;
    #backoffOnBarrierHit;
    #topSpeed;

    #positionInTrack;
    #positionInRace;

    #clickCountToTopSpeed;
    #lastAccelerationTime;

    /**
     * @description Represents Car
     * @param id
     * @param driverName
     * @param acceleration
     * @param backoffOnBarrierHit
     * @param topSpeed
     * @param clickCountToTopSpeed
     */
    constructor(id, driverName, acceleration, backoffOnBarrierHit, topSpeed, clickCountToTopSpeed) {
        this.#id = id;
        this.#driverName = driverName;
        this.#acceleration = acceleration;
        this.#backoffOnBarrierHit = backoffOnBarrierHit;
        this.#topSpeed = topSpeed;

        this.#positionInTrack = 0;
        this.#positionInRace = -1;

        this.#clickCountToTopSpeed = clickCountToTopSpeed;
        this.#lastAccelerationTime = 0;
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
    getPositionInTrack() {
        return this.#positionInTrack;
    }

    /**
     * @description Returns position in race
     * @returns {*} Position in race
     */
    getPositionInRace() {
        return this.#positionInRace;
    }

    /**
     * @description Returns driver name
     * @returns {*} Driver name
     */
    getDriverName() {
        return this.#driverName;
    }

    /**
     * @description Returns backoff on barrier hit value
     * @returns {*} Backoff on barrier hit
     */
    getBackoffOnBarrierHit() {
        return this.#backoffOnBarrierHit;
    }

    /**
     * @description Returns last acceleration time
     * @returns {*} Last acceleration time
     */
    getLastAccelerationTime() {
        return this.#lastAccelerationTime;
    }

    /**
     * @description Returns top speed
     * @returns {*} Top speed
     */
    getTopSpeed() {
        return this.#topSpeed;
    }

    /**
     * @description Returns click count to top speed
     * @returns {*} Click count to top speed
     */
    getClickCountToTopSpeed() {
        return this.#clickCountToTopSpeed;
    }

    /**
     * @description Returns car information
     * @returns {*} Car information
     */
    getCarInfo() {
        return  {
            id: this.#id,
            driverName: this.#driverName,
            acceleration: this.#acceleration,
            topSpeed: this.#topSpeed,
            backoffOnBarrierHit: this.#backoffOnBarrierHit
        };
    }

    /**
     * @description Sets position in race
     * @returns {*} none
     * @param position
     */
    setPositionInRace(position) {
        this.#positionInRace = position;
    }

    /**
     * @description Returns id
     * @returns {*} id
     */
    accelerate(clickCountToTopSpeed, accelerationTime) {
        this.#lastAccelerationTime = accelerationTime;
        let topSpeed = false;
        if(clickCountToTopSpeed > this.#clickCountToTopSpeed) {
            this.#positionInTrack = Number.parseFloat((this.#positionInTrack + this.#topSpeed).toFixed(1));
            topSpeed = true;
        }
        else {
            this.#positionInTrack = Number.parseFloat((this.#positionInTrack + this.#acceleration).toFixed(1));
        }
        return {
            position: this.#positionInTrack,
            topSpeed: topSpeed
        };
    }

    /**
     * @description Returns id
     * @returns {*} id
     */
    backoff() {
        this.#positionInTrack = Number.parseFloat((this.#positionInTrack - this.#backoffOnBarrierHit).toFixed(1));
    }
}

module.exports = Car;