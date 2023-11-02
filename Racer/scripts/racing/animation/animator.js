class Animator {
    #car;
    #startLine;

    #screen1Track;
    #screen2Track;

    #moveCar;
    #repositionCar;

    /**
     * @description Represent Animator
     */
    constructor(car, trackLength, screen1Track, screen2Track) {
        this.#car = car;
        this.#screen1Track = screen1Track;
        this.#screen2Track = screen2Track;

        this.#startLine = new StartLineRemover();

        this.#moveCar = oldPosition => newPosition => currentCarName =>
            document.getElementById(currentCarName).animate([
                {
                    top: oldPosition,
                },
                {
                    top: newPosition,
                }], {
                duration: 20,
                easing: 'linear',
                delay: 0
            });

        this.#repositionCar = newPosition => currentCarName => {
            HtmlElementHelper.setOffsetFromTopByName(currentCarName, newPosition);
        };
    }

    /**
     * @description Returns car object
     * @returns {*} Car object
     */
    getCar() {
        return this.#car;
    }

    #computeNewDisplayPosition(isTopSpeed) {
        const offsetPixels = isTopSpeed ? this.#car.getTopSpeedPixels() : this.#car.getAccelerationPixels();
        return new Promise((resolve, reject) => {
            const offsetFromTop = HtmlElementHelper.getOffsetFromTopByName(this.#car.getCarNameInPrimaryScreen());
            resolve({
                oldDisplayPosition: offsetFromTop,
                newDisplayPosition: offsetFromTop < offsetPixels ? 700 - (offsetPixels - offsetFromTop) :
                    offsetFromTop - offsetPixels,
                nextScreen: offsetFromTop < offsetPixels
            });
        });
    }

    /**
     * @description Returns apart pixels
     * @param primaryCarPosition
     * @param secondaryCarPosition
     * @returns {*} Apart pixels
     */
    #getApartPixels(primaryCarPosition, secondaryCarPosition) {
        const apartDistance = Math.abs(primaryCarPosition - secondaryCarPosition);
        const apartClicks = apartDistance / this.#car.getAcceleration();
        return apartClicks * this.#car.getAccelerationPixels();
    }

    /**
     * @description Shows or hides car in other screen
     * @param primaryCarNameInOtherScreen
     * @param primaryCarNewDisplayPosition
     * @param currentCarActualPosition
     * @param otherCarActualPosition
     * @returns {Promise<any>}
     */
    showOrHideCarInOtherScreen(primaryCarNameInOtherScreen, primaryCarNewDisplayPosition, currentCarActualPosition, otherCarActualPosition) {
        return new Promise((resolve, reject) => {
            const apartPixels = this.#getApartPixels(otherCarActualPosition, currentCarActualPosition);
            let primaryCarPositionInOtherScreen;
            if(primaryCarNewDisplayPosition === Number.MAX_VALUE) {
                primaryCarPositionInOtherScreen = HtmlElementHelper.getOffsetFromTopByName(primaryCarNameInOtherScreen);
            }
            else {
                primaryCarPositionInOtherScreen = primaryCarNewDisplayPosition;
            }
            let carInOtherScreenPosition;
            if(currentCarActualPosition > otherCarActualPosition) {
                carInOtherScreenPosition = primaryCarPositionInOtherScreen - apartPixels;
            }
            else if(currentCarActualPosition < otherCarActualPosition) {
                carInOtherScreenPosition = primaryCarPositionInOtherScreen + apartPixels;
            }
            else {
                carInOtherScreenPosition = primaryCarPositionInOtherScreen;
            }
            if(carInOtherScreenPosition > 700 || carInOtherScreenPosition < 0) {
                HtmlElementHelper.setVisibilityByName(this.#car.getCarNameInSecondaryScreen(), Constants.HIDDEN);
            }
            else {
                HtmlElementHelper.setVisibilityByName(this.#car.getCarNameInSecondaryScreen(), Constants.VISIBLE);
            }
        });
    };

    /**
     * @description Handles primary screen
     * @param screenName
     * @returns {Promise<any>}
     */
    #handlePrimaryScreen(screenName) {
        return new Promise((resolve, reject) => {
            this.#startLine.remove(this.#car.getCarNameInPrimaryScreen());
            if(screenName === Constants.SCREEN_1) {
                this.#screen1Track.removeBarrier();
                this.#screen1Track.computeTrackPortion(this.#car.getCarNameInPrimaryScreen(), 700);
            }
            else {
                this.#screen2Track.removeBarrier();
                this.#screen2Track.computeTrackPortion(this.#car.getCarNameInPrimaryScreen(), 700);
            }
            resolve();
        });
    }

    /**
     * @description Animates move car
     * @param oldDisplayPosition
     * @param newDisplayPosition
     * @param nextScreen
     * @returns {Promise<any>}
     */
    #animateMoveCar(oldDisplayPosition, newDisplayPosition, nextScreen) {
        return new Promise((resolve, reject) => {
            if(nextScreen) {
                this.#repositionCar(newDisplayPosition)(this.#car.getCarNameInPrimaryScreen());
                this.#repositionCar(newDisplayPosition)(this.#car.getCarNameInSecondaryScreen());
            }
            else {
                this.#moveCar(oldDisplayPosition)(newDisplayPosition)(this.#car.getCarNameInPrimaryScreen()).play();
                HtmlElementHelper.setOffsetFromTopByName(this.#car.getCarNameInPrimaryScreen(), newDisplayPosition);
                this.#moveCar(oldDisplayPosition)(newDisplayPosition)(this.#car.getCarNameInSecondaryScreen()).play();
                HtmlElementHelper.setOffsetFromTopByName(this.#car.getCarNameInSecondaryScreen(), newDisplayPosition);
            }
        });
    };

    /**
     * @description Handles both screens
     * @param oldDisplayPosition
     * @param newDisplayPosition
     * @param nextScreen
     * @returns none
     */
    #handleBothScreens(oldDisplayPosition, newDisplayPosition, nextScreen) {
        this.#animateMoveCar(`${oldDisplayPosition}px`, `${newDisplayPosition}px`, nextScreen);
    }

    /**
     * @description Animates move car
     * @param otherAnimator
     * @param screenName
     * @returns none
     */
    moveCar(otherAnimator, screenName) {
        this.showOrHideCarInOtherScreen(otherAnimator.getCar().getCarNameInPrimaryScreen(), Number.MAX_VALUE,
                                       this.#car.getPosition(), otherAnimator.getCar().getPosition());

        this.#computeNewDisplayPosition(this.#car.isTopSpeed()).then(positions => {
            if(positions.nextScreen) {
                this.#handlePrimaryScreen(screenName).then(() => {
                    otherAnimator.showOrHideCarInOtherScreen(this.#car.getCarNameInPrimaryScreen(), positions.newDisplayPosition,
                                                            otherAnimator.getCar().getPosition(), this.#car.getPosition());

                    this.#handleBothScreens(positions.oldDisplayPosition, positions.newDisplayPosition, positions.nextScreen);
                });
            }
            else {
                this.#handleBothScreens(positions.oldDisplayPosition, positions.newDisplayPosition, positions.nextScreen);
            }
        });
    }

    /**
     * @description Repositions car
     * @param backoffPixels
     * @returns none
     */
    repositionCar(backoffPixels) {
        const currentCarDisplayPosition = HtmlElementHelper.getOffsetFromTopByName(this.#car.getCarNameInPrimaryScreen());
        const newCarDisplayPosition = currentCarDisplayPosition + backoffPixels;

        this.#repositionCar(`${newCarDisplayPosition}px`)(this.#car.getCarNameInPrimaryScreen());
        this.#repositionCar(`${newCarDisplayPosition}px`)(this.#car.getCarNameInSecondaryScreen());
    };

    /**
     * @description Moves car horizontally
     * @param carName
     * @param compute
     * @returns {Promise<any>}
     */
    #moveCarHorizontal(carName, compute) {
        return new Promise((resolve, reject) => {
            let carElement = HtmlElementHelper.getElement(carName);
            const left = HtmlElementHelper.getOffsetFromLeftByElement(carElement);
            const computedLeft = compute(left);
            HtmlElementHelper.setOffsetFromLeftByElement(carElement, `${computedLeft}px`);
        });
    }

    /**
     * @description Moves car left
     * @returns none
     */
    moveLeft() {
        this.#moveCarHorizontal(this.#car.getCarNameInPrimaryScreen(), left => left - 145);
        this.#moveCarHorizontal(this.#car.getCarNameInSecondaryScreen(), left => left - 145);
    };

    /**
     * @description Moves car right
     * @param none
     * @returns none
     */
    moveRight() {
        this.#moveCarHorizontal(this.#car.getCarNameInPrimaryScreen(), left => left + 145);
        this.#moveCarHorizontal(this.#car.getCarNameInSecondaryScreen(), left => left + 145);
    };
}