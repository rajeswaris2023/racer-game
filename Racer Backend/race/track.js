class Track {
    #id;
    #name;
    #length;
    #description;
    #barriers;

    /**
     * @description Represents Track
     * @param id
     * @param name
     * @param length
     * @param description
     * @param barriers
     */
    constructor(id, name, length, description, barriers) {
        this.#id = id;
        this.#name = name;
        this.#length = length;
        this.#description = description;
        this.#barriers = barriers;
    }

    /**
     * @description Returns track length
     * @param none
     * @returns {*} Track length
     */
    getLength() {
        return this.#length;
    }

    /**
     * @description Returns track information
     * @param none
     * @returns {*} Object containing track information
     */
    getTrackInfo() {
        return {
            id: this.#id,
            name: this.#name,
            length: this.#length,
            description: this.#description,
            barriers: this.#barriers
        };
    }
}

module.exports = Track;