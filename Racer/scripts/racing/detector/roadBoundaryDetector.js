class RoadBoundaryDetector {

    /**
     * @description Checks if car stays within road if moved left and returns true or false accordingly
     * @param carName
     * @param roadName
     * @returns {Boolean} True if car stays within road else false
     */
    static carWithinRoadIfMovedLeft(carName) {
            const carLeftOffset = HtmlElementHelper.getOffsetFromLeftByName(carName);
            const carNewLeftOffset = carLeftOffset - 145;
            const carMaxLeftOffset = 30;
            return carNewLeftOffset >= carMaxLeftOffset;
    }

    /**
     * @description Checks if car stays within road if moved right and returns true or false accordingly
     * @param carName
     * @param roadName
     * @returns {Boolean} True if car stays within road else false
     */
    static carWithinRoadIfMovedRight(carName) {
            const carLeftOffset = HtmlElementHelper.getOffsetFromLeftByName(carName);
            const carNewLeftOffset = carLeftOffset + 145;
            const carMaxLeftOffset = 465;
            return carNewLeftOffset <= carMaxLeftOffset;
    }
}