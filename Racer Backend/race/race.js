class Race {
    #id;
    #track;
    #cars;
    #players;

    #playerCarInfo;
    #startTime;

    #gameOver;
    #gameOverText;

    #tieText = 'It is a tie';
    #winnerTextSuffix = 'is the winner';

    /**
     * @description Represents Race
     * @param id
     * @param track
     * @param cars
     * @param players
     * @param playerCarInfo
     */
    constructor(id, track, cars, players, playerCarInfo) {
        this.#id = id;
        this.#track = track;
        this.#cars = cars;
        this.#players = players;

        this.#playerCarInfo = playerCarInfo;

        this.#gameOver = false;
        this.#gameOverText = '';
    }

    /**
     * @description Check if game is over and sets game over
     * @param currentCarId
     * @returns none
     */
    #isGameOver(currentCarId) {
        const currentCarPosition = this.#cars.get(currentCarId).getPositionInTrack();
        if(currentCarPosition >= this.#track.getLength()) {
            this.#gameOver = true;
            for(const [playerName, player] of this.#players) {
                player.incrementRaceCount();
            }
        }
    }

    /**
     * @description Returns id
     * @param none
     * @returns Id
     */
    getId() {
        return this.#id;
    }

    /**
     * @description Sets start time of race
     * @param none
     * @returns {*} Start time
     */
    startRace() {
        this.#startTime = Date.now();
        return this.#startTime;
    }

    /**
     * @description Accelerate car and update car position in race
     * @param currentCarId
     * @param otherCarId
     * @param clickCountToTopSpeed
     * @param accelerationTime
     * @returns {*}
     */
    accelerateCar(currentCarId, otherCarId, clickCountToTopSpeed, accelerationTime) {
        let result = this.#cars.get(currentCarId).accelerate(clickCountToTopSpeed, accelerationTime);
        this.#isGameOver(currentCarId);
        result.isGameOver = this.#gameOver;
        this.#updateCarPositionInRace(currentCarId, otherCarId);
        return result;
    }

    /**
     * @description Backs off car and updates car position in race
     * @param currentCarId
     * @param otherCarId
     * @returns none
     */
    backoffCar(currentCarId, otherCarId) {
        this.#cars.get(currentCarId).backoff();
        this.#updateCarPositionInRace(currentCarId, otherCarId);
    }

    /**
     * @description Returns information about car, player and car position in track and race
     * @param none
     * @returns {*}
     */
    #getCarPositionInRaceForResponse() {
        let positions = [];
        let index = 0;
        for(const [carId, car] of this.#cars) {
            positions[index++] = { carId: carId, player: this.#playerCarInfo.get(carId).getName(),
                positionInTrack : car.getPositionInTrack(), position : car.getPositionInRace() };
        }
        return positions;
    };

    /**
     * @description Returns true if car crossed finish line
     * @param carId
     * @returns {Boolean}
     */
    #hasCrossedFinishLine(carId) {
        return this.#cars.get(carId).getPositionInTrack() >= this.#track.getLength();
    }

    /**
     * @description Sets cars positions in race
     * @param firstCarId
     * @param secondCarId
     * @param isTie
     * @returns none
     */
    #setPositions(firstCarId, secondCarId, isTie) {
        if(isTie) {
            this.#cars.get(firstCarId).setPositionInRace(1);
            this.#cars.get(secondCarId).setPositionInRace(1);
        }
        else {
            this.#cars.get(firstCarId).setPositionInRace(1);
            this.#cars.get(secondCarId).setPositionInRace(2);
        }
    }

    /**
     * @description Returns carIds of cars involved in this race
     * @param none
     * @returns {*} Car Ids
     */
    #getCarIds() {
        const carIds = [];
        let index = 0;
        for(const [carId, car] of this.#cars) {
            carIds[index++] = carId;
        }
        return carIds;
    }

    /**
     * @description Finds positions of cars in the race and sets the positions
     * @param currentCarId
     * @param otherCarId
     * @returns none
     */
    #updateCarPositionInRace(currentCarId, otherCarId) {
        const currentCarPosition = this.#cars.get(currentCarId).getPositionInTrack();
        const otherCarPosition = this.#cars.get(otherCarId).getPositionInTrack();
        if(currentCarPosition > otherCarPosition) {
            this.#setPositions(currentCarId, otherCarId, false);
        }
        else if(currentCarPosition < otherCarPosition) {
            this.#setPositions(otherCarId, currentCarId, false);
        }
        else {
            this.#setPositions(currentCarId, otherCarId, true);
        }
    }

    /**
     * @description Computes result of race and sets car positions and game over text
     * @param firstCarId
     * @param secondCarId
     * @returns none
     */
    #winOrTie(firstCarId, secondCarId) {
        const firstCarCrossedFinishLine = this.#hasCrossedFinishLine(firstCarId);
        const secondCarCrossedFinishLine = this.#hasCrossedFinishLine(secondCarId);
        if(firstCarCrossedFinishLine && secondCarCrossedFinishLine) {
            const firstCarLastAccelerationTime = this.#cars.get(firstCarId).getLastAccelerationTime();
            const secondCarLastAccelerationTime = this.#cars.get(secondCarId).getLastAccelerationTime();
            let winnerName;
            if(firstCarLastAccelerationTime === secondCarLastAccelerationTime) {
                this.#gameOverText = this.#tieText;
                this.#setPositions(firstCarId, secondCarId, true);
            }
            else {
                if (firstCarLastAccelerationTime < secondCarLastAccelerationTime) {
                    winnerName = this.#playerCarInfo.get(firstCarId).getName();
                    this.#setPositions(firstCarId, secondCarId, false);
                } else {
                    winnerName = this.#playerCarInfo.get(secondCarId).getName();
                    this.#setPositions(firstCarId, secondCarId, false);
                }
                this.#gameOverText = `${winnerName} ${this.#winnerTextSuffix}`;
            }
        }
        else if(firstCarCrossedFinishLine) {
            this.#gameOverText = `${this.#playerCarInfo.get(firstCarId).getName()} ${this.#winnerTextSuffix}`;
        }
        else {
            this.#gameOverText = `${this.#playerCarInfo.get(secondCarId).getName()} ${this.#winnerTextSuffix}`;
        }
    }

    /**
     * @description Returns information about race
     * @param none
     * @returns {*} Race information
     */
    getRaceInfoForResponse() {
        return {
            id: this.#id,
            cars: this.#getCarPositionInRaceForResponse()
        }
    }

    /**
     * @description Returns position of car in track
     * @param currentCarId
     * @returns {*} Object containing car position in track
     */
    getPositionForResponse(currentCarId) {
        return {
            position: this.#cars.get(currentCarId).getPositionInTrack()
        };
    }

    /**
     * @description Computes result and returns it
     * @param none
     * @returns {*} Object containing race result information
     */
    getResult() {
        const carIds = this.#getCarIds();
        this.#winOrTie(carIds[0], carIds[1]);
        let resultItems = [];
        let index = 0;
        for(const [carId, car] of this.#cars) {
            const timeTaken = car.getLastAccelerationTime() - this.#startTime;
            const currentPlayer = this.#playerCarInfo.get(carId);
            resultItems[index++] = {
                player: currentPlayer.getName(),
                timeTaken: timeTaken,
                position: car.getPositionInRace(),
                raceCount: currentPlayer.getRaceCount()
            };
        }
        return {
            gameOverText: this.#gameOverText,
            result: resultItems
        };
    }
}

module.exports = Race;