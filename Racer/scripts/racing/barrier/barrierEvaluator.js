class BarrierEvaluator {

    /**
     * @description Check if barrier is hit by car and returns true or false accordingly
     * @param screenName
     * @param carName
     * @param leftOffset
     * @returns {Promise<any>} True if barrier is hit else false
     */
    static checkBarrierHit(screenName, carName, leftOffset) {
        return new Promise((resolve, reject) => {
            const carElement = HtmlElementHelper.getElement(carName);
            const carLeft = HtmlElementHelper.getOffsetFromLeftByElement(carElement) + leftOffset;
            const carUpperBoundary = HtmlElementHelper.getOffsetFromTopByElement(carElement);
            const carHeight = HtmlElementHelper.getHeightByElement(carElement);
            const carLowerBoundary = BarrierEvaluator.getCarLowerBoundary(carUpperBoundary, carHeight);

            const barrierElements = document.getElementById(screenName).getElementsByClassName('barrier');
            for (let index = 0; index < barrierElements.length; index++) {
                const barrierElement = barrierElements[index];
                const barrierLeft = HtmlElementHelper.getOffsetFromLeftByElement(barrierElement);
                const barrierUpperBoundary = HtmlElementHelper.getOffsetFromTopByElement(barrierElement);
                const barrierHeight = HtmlElementHelper.getHeightByElement(barrierElement);
                const barrierLowerBoundary = BarrierEvaluator.getBarrierLowerBoundary(barrierUpperBoundary, barrierHeight);

                if (carLeft === (barrierLeft + 20) && BarrierEvaluator.isBarrierHit(barrierUpperBoundary, barrierLowerBoundary, carUpperBoundary, carLowerBoundary))
                    resolve(true);
            }
            resolve(false);
        });
    }

    /**
     * @description Checks if barrier is hit and returns true or false
     * @param barrierUpperBoundary
     * @param barrierLowerBoundary
     * @param carUpperBoundary
     * @param carLowerBoundary
     * @returns {Boolean} True if barrier is hit else false
     */
    static isBarrierHit(barrierUpperBoundary, barrierLowerBoundary, carUpperBoundary, carLowerBoundary) {
        return carUpperBoundary <= barrierLowerBoundary && carLowerBoundary >= barrierUpperBoundary;
    }

    /**
     * @description Returns lower boundary of car
     * @param top
     * @param height
     * @returns {any} Lower boundary of car
     */
    static getCarLowerBoundary(top, height) {
        return top + height;
    }

    /**
     * @description Returns lower boundary of barrier
     * @param top
     * @param height
     * @returns {any} Lower boundary of barrier
     */
    static getBarrierLowerBoundary(top, height) {
        return top + height;
    }
}