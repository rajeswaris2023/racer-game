const Track = require('../race/track');
const Race = require('../race/race');
const Car = require('../race/car');
const Player = require('../race/player');
const BarrierComputer = require('../race/barrierComputer');
class LocalDB {
    #tracks;
    #cars;
    #players;

    #races;
    #latestRaceId;

    /**
     * @description Represents LocalDB
     */
    constructor() {
        this.#tracks = new Map();
        this.#tracks.set(1, new Track(1, 'short', 50, 'short track with many barriers', BarrierComputer.compute(50, 2.4, 1)));
        this.#tracks.set(2, new Track(2, 'long', 80, 'long track with few barriers', BarrierComputer.compute(80, 9.6, 1)));
        this.#cars = new Map();

        this.#cars.set(1, new Car(1, 'Tin Tin', 0.2, 0.4, 0.4, 10));
        this.#cars.set(2, new Car(2, 'Gru Gru', 0.3, 0.6, 0.6, 10));
        this.#cars.set(3, new Car(3, 'Peabody', 0.4, 0.8, 0.8, 10));
        this.#races = new Map();
        this.#players = new Map();
        this.#latestRaceId = 0;
    }

    /**
     * @description Creates new instance of LocalDB
     * @returns {LocalDB} LocalDB class instance
     */
    static createInstance() {
        return new LocalDB();
    }

    /**
     * @description Returns latest race id
     * @returns {number} Latest race id
     */
    #createRaceId() {
        ++this.#latestRaceId;
    }

    /**
     * @description Creates a map of playerId -> player, carId -> player, carId -> car
     * @param playerCar Contains information about player and car
     * @returns {{playerInfo: Map<any, any>, playerCarInfo: Map<any, any>, carInfo: Map<any, any>}} Object containing maps of playerId -> player, carId -> player, carId -> car
     */
    #getPlayerCarInfo(playerCar) {
        let playerInfo = new Map();
        let playerCarInfo = new Map();
        let carInfo = new Map();

        for(let index = 0; index < playerCar.length; index++) {
            const currentPlayer = playerCar[index].player;
            const carId = Number.parseInt(playerCar[index].car);

            if(!this.#players.has(currentPlayer)) {
                this.#players.set(currentPlayer, new Player(currentPlayer));
            }

            playerInfo.set(currentPlayer, this.#players.get(currentPlayer));
            playerCarInfo.set(carId, this.#players.get(currentPlayer));
            carInfo.set(carId, this.#cloneCar(this.#cars.get(carId)));
        }

        return {
            playerInfo: playerInfo,
            playerCarInfo: playerCarInfo,
            carInfo: carInfo
        }
    }

    /**
     * @description Creates new race
     * @param playerCar Contains information about player and car
     * @param trackId
     * @returns {function(*): {id: *}} Newly created race id
     */
    createRace(playerCar, trackId) {
        this.#createRaceId();
        const playerCarResult = this.#getPlayerCarInfo(playerCar);
        const track = this.#tracks.get(Number.parseInt(trackId));
        this.#races.set(this.#latestRaceId, new Race(this.#latestRaceId, track, playerCarResult.carInfo,
                                                     playerCarResult.playerInfo, playerCarResult.playerCarInfo));
        return {
            id: this.#latestRaceId
        };
    }

    /**
     * @description Creates a new Car object
     * @param currentCar
     * @returns {Car} Newly created Car object
     */
    #cloneCar(currentCar){
        return new Car(currentCar.getId(), currentCar.getDriverName(), currentCar.getAcceleration(), currentCar.getBackoffOnBarrierHit(), currentCar.getTopSpeed(), currentCar.getClickCountToTopSpeed());
    }

    /**
     * @description Returns an array of all tracks
     * @returns {*[]} Tracks array
     */
    getAllTracks() {
        let allTracks = [];
        let index = 0;
        for(const key of this.#tracks.keys()) {
            allTracks[index++] = this.#tracks.get(key).getTrackInfo();
        }
        return allTracks;
    }

    /**
     * @description Returns an array of all cars
     * @returns {*[]} Cars array
     */
    getAllCars() {
        const allCars = [];
        let index = 0;
        for(const car of this.#cars.values()) {
            allCars[index++] = car.getCarInfo();
        }
        return allCars;
    }

    /**
     * @description Returns race information
     * @param raceId
     * @returns {{cars: *, id: *}} Race information
     */
    getRaceForResponse(raceId) {
        return this.#races.get(raceId).getRaceInfoForResponse();
    }

    /**
     * @description Returns race
     * @param raceId
     * @returns {*} Race
     */
    getRaceForId(raceId) {
        return this.#races.get(raceId);
    }

    /**
     * @description Returns acceleration of input carId
     * @param carId
     * @returns {*} Acceleration
     */
    getAcceleration(carId) {
        return this.#cars.get(carId).getAcceleration();
    }
}

module.exports = LocalDB;