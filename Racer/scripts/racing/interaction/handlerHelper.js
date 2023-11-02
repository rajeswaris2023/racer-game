class HandlerHelper {

    /**
     * @description Utilizes animator to perform move forward animation
     * @param animator
     * @param otherAnimator
     * @param screenName
     * @returns {Promise<Boolean>}
     */
    static animateMoveForward(animator, otherAnimator, screenName) {
        return new Promise((resolve, reject) => {
            animator.moveCar(otherAnimator, screenName);
            resolve(true);
        });
    }

    /**
     * @description Checks for collision and utilizes animator for move left animation
     * @param currentCarName
     * @param otherCarName
     * @param roadName
     * @param screenName
     * @returns {Promise<any>}
     */
    static animateMoveLeft(animator, currentCarName, otherCarName, roadName, screenName) {
        return new Promise((resolve, reject) => {
           resolve(RoadBoundaryDetector.carWithinRoadIfMovedLeft(currentCarName, roadName));
        }).then(goAhead => {
            if(goAhead) {
                return !PreCollisionDetector.sideImpactCollision(currentCarName, otherCarName, true);
            }
            return false;
        }).then(goAhead => {
            if(goAhead) {
                return BarrierEvaluator.checkBarrierHit(screenName, currentCarName, -145);
            }
            return true;
        }).then(isBarrierHit => {
            if (!isBarrierHit) {
                animator.moveLeft();
            }
        });
    }

    /**
     * @description Checks for collision and utilizes animator for move right animation
     * @param animator
     * @param currentCarName
     * @param otherCarName
     * @param roadName
     * @param screenName
     * @returns {Promise<any>}
     */
    static animateMoveRight(animator, currentCarName, otherCarName, roadName, screenName) {
        return new Promise((resolve, reject) => {
            resolve(RoadBoundaryDetector.carWithinRoadIfMovedRight(currentCarName, roadName));
        }).then(goAhead => {
            if(goAhead) {
                return !PreCollisionDetector.sideImpactCollision(currentCarName, otherCarName, false);
            }
            return false;
        }).then(goAhead => {
            if(goAhead) {
                return BarrierEvaluator.checkBarrierHit(screenName, currentCarName, 145);
            }
            return true;
        }).then(isBarrierHit => {
            if (!isBarrierHit) {
                animator.moveRight();
            }
        });
    }

    /**
     * @description Utilizes animator to perform animate reposition
     * @param animator
     * @param backoffPixels
     * @returns {Promise<any>}
     */
    static animateReposition(animator, backoffPixels) {
        return new Promise((resolve, reject) => {
            animator.repositionCar(backoffPixels);
        });
    }
}