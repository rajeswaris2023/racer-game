class Player {
    #name;
    #raceCount;

    /**
     * @description Represents Player
     * @param name
     */
    constructor(name) {
        this.#name = name;
        this.#raceCount = 0;
    }

    /**
     * @description Returns race count
     * @param none
     * @returns {*} Race count
     */
    getRaceCount() {
        return this.#raceCount;
    }

    /**
     * @description Returns name of player
     * @param none
     * @returns {*} Player name
     */
    getName() {
        return this.#name;
    }

    /**
     * @description Increments race count
     * @param none
     * @returns {*} Race count
     */
    incrementRaceCount() {
        return ++this.#raceCount;
    }
}

module.exports = Player;