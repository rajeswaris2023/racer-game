class BarrierComputer {
    /**
     * @description Computes barriers and returns them
     * @param trackLength
     * @param initialSeed
     * @param index
     * @returns {function(*): function(*): *[]} Barriers
     */
    static compute(trackLength, initialSeed, index) {
        let barrierRelativePosition = (initialSeed * index);
        let barriers = [];
        while(barrierRelativePosition <= trackLength - 0.2) {
            barriers[index - 1] = Number.parseFloat(barrierRelativePosition.toFixed(3));
            ++index;
            barrierRelativePosition = (initialSeed * index);
        }
        return barriers;
    }
}

module.exports = BarrierComputer;