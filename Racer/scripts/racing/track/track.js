class Track {
    #start;
    #end;
    #scale;
    #barriers;
    #barrierIndex;
    #toggleLane;
    #screenLaneMap;
    #screenName;
    #trackLength

    /**
     * @description Represents Track
     */
    constructor(trackLength, barriers, screenName, leftStart, scale) {
        this.#start = 0;
        this.#end = 0;
        this.#trackLength = trackLength;
        this.#scale = scale;
        this.#barriers = barriers;
        this.#barrierIndex = 0;
        this.#toggleLane = 0;
        this.#screenLaneMap = new Map();
        this.#screenName = screenName;
        this.#fillMap(this.#screenLaneMap, leftStart, 145);
    }

    /**
     * @description Fills screen map
     * @param screenMap
     * @param startLeft
     * @param laneSize
     * @returns none
     */
    #fillMap(screenMap, startLeft, laneSize) {
        screenMap.set(Constants.LANE_1, startLeft);
        screenMap.set(Constants.LANE_2, startLeft + laneSize);
        screenMap.set(Constants.LANE_3, startLeft + (2 * laneSize));
        screenMap.set(Constants.LANE_4, startLeft + (3 * laneSize));
    }

    /**
     * @description Computes start and end of current track portion
     * @param trackHeightPixels
     * @returns none
     */
    #compute(trackHeightPixels) {
        this.#start = this.#end;
        this.#end = this.#start + trackHeightPixels / this.#scale;
    }

    /**
     * @description Computes barrier pixels position
     * @param bIndex
     * @returns {*} Barrier position
     */
    #computeBarrierPixelPosition(bIndex) {
        return (this.#barriers[bIndex] - this.#start) * 200;
    }

    /**
     * @description Computes track position
     * @param carName
     * @param trackHeightPixels
     * @returns none
     */
    computeTrackPortion(carName, trackHeightPixels) {
        this.#compute(trackHeightPixels);
        while(this.#start < this.#barriers[this.#barrierIndex] && this.#barriers[this.#barrierIndex] <= this.#end) {
            const barrierPixelPosition = this.#computeBarrierPixelPosition(this.#barrierIndex);
            this.#createBarriers(trackHeightPixels - barrierPixelPosition);
            this.#barrierIndex++;
        }
        this.#showFinishLine(carName, trackHeightPixels);
    }

    /**
     * @description Shows finish line
     * @param carName
     * @param trackHeightPixels
     * @returns none
     */
    #showFinishLine(carName, trackHeightPixels) {
        if(this.#start <= this.#trackLength && this.#trackLength <= this.#end) {
            const finishLinePositionFromBottom = (this.#trackLength - this.#start) * 200;
            FinishLineCreator.createFinishLine(carName, trackHeightPixels - finishLinePositionFromBottom);
        }
    }

    /**
     * @description Gets left offset
     * @param laneName
     * @returns {*} Left offset
     */
    #getLeftOffset(laneName) {
        return this.#screenLaneMap.get(laneName);
    }

    /**
     * @description Creates barriers
     * @param barrierOffsetFromTop
     * @returns none
     */
    #createBarriers(barrierOffsetFromTop) {
        if(this.#toggleLane === 0) {
            this.#createBarrier(barrierOffsetFromTop, this.#getLeftOffset(Constants.LANE_1));
            this.#createBarrier(barrierOffsetFromTop, this.#getLeftOffset(Constants.LANE_3));
            this.#toggleLane = 1;
        }
        else {
            this.#createBarrier(barrierOffsetFromTop, this.#getLeftOffset(Constants.LANE_2));
            this.#createBarrier(barrierOffsetFromTop, this.#getLeftOffset(Constants.LANE_4));
            this.#toggleLane = 0;
        }
    }

    /**
     * @description Creates barrier
     * @param barrierOffsetFromTop
     * @param barrierLeftOffset
     * @returns none
     */
    #createBarrier(barrierOffsetFromTop, barrierLeftOffset) {
        let barrierParent = this.#createBarrierParent(barrierOffsetFromTop, barrierLeftOffset);
        let barrierElement = this.#createBarrierImage();
        barrierParent.appendChild(barrierElement);
        this.#addBarrierToScreen(barrierParent);
    }

    /**
     * @description Adds barrier to screen
     * @param barrierParent
     * @returns none
     */
    #addBarrierToScreen(barrierParent) {
        let screenElement = document.getElementById(this.#screenName);
        screenElement.appendChild(barrierParent);
    }

    /**
     * @description Creates barrier parent
     * @param top
     * @param left
     * @returns none
     */
    #createBarrierParent(top, left) {
        let barrierParent = document.createElement('div');
        barrierParent.className = 'barrier';
        barrierParent.style.position = 'absolute';
        barrierParent.style.display = 'block';
        barrierParent.style.left = `${left}px`;
        barrierParent.style.top = `${top + 20}px`;
        barrierParent.style.height = '20px';
        barrierParent.style.width = '145px';
        return barrierParent;
    };

    /**
     * @description Creates barrier image
     * @returns {*} Barrier element
     */
    #createBarrierImage() {
        let barrierElement = document.createElement('img');
        barrierElement.src = '../images/barrier.jpg';
        barrierElement.alt = Constants.BARRIER_CANNOT_BE_DISPLAYED;
        barrierElement.style.height = '20px';
        barrierElement.style.width = '145px';
        return barrierElement;
    }

    /**
     * @description Removes barrier
     * @returns none
     */
    removeBarrier() {
        let barrierElements = document.getElementById(this.#screenName).getElementsByClassName('barrier');
        let index = 0;
        while(barrierElements.length > 0) {
            barrierElements.item(index).remove();
        }
    }
}