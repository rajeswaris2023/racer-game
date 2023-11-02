class PreCollisionDetector {

    /**
     * @description Checks for side impact collision
     * @param  currentCarName
     * @param otherCarName
     * @param isMovingLeft
     * @returns {Boolean} True if there is side impact collision else false
     */
    static sideImpactCollision(currentCarName, otherCarName, isMovingLeft) {
        if(HtmlElementHelper.getVisibilityByName(otherCarName) !== Constants.VISIBLE){
            return false;
        }
        const offset = isMovingLeft ? -145 : 145;
        if(!PreCollisionDetector.sameLaneIfMovedByOffset(currentCarName, otherCarName, offset)) {
            return false;
        }
        return PreCollisionDetector.checkCollision(currentCarName, otherCarName, 0);
    }

    /**
     * @description Checks if there is rear end collision
     * @param currentCarName
     * @param otherCarName
     * @param forwardOffset
     * @returns {Promise<Boolean>} True if there is a collision else false
     */
    static rearEndCollision(currentCarName, otherCarName, forwardOffset) {
        return new Promise((resolve, reject) => {
            if (HtmlElementHelper.getVisibilityByName(otherCarName) !== Constants.VISIBLE) {
                resolve(false);
            }
            if (!PreCollisionDetector.sameLaneIfMovedByOffset(currentCarName, otherCarName, 0)) {
                resolve(false);
            }
            resolve(PreCollisionDetector.checkCollision(currentCarName, otherCarName, forwardOffset));
        });
    };

    /**
     * @description Checks if current car and other car would be in same lane if current car moves left
     * @param currentCarName
     * @param otherCarName
     * @param offset
     * @returns {Boolean} True if current car and other car in same lane if current car moves left else false
     */
    static sameLaneIfMovedByOffset(currentCarName, otherCarName, offset) {
        const currentCarLeftOffset = HtmlElementHelper.getOffsetFromLeftByName(currentCarName);
        const otherCarLeftOffset = HtmlElementHelper.getOffsetFromLeftByName(otherCarName);
        return otherCarLeftOffset === currentCarLeftOffset + offset;
    }

    /**
     * @description Checks if there is collision
     * @param currentCarName
     * @param otherCarName
     * @param moveForwardOffset
     * @returns {Boolean} True if there is collision else false
     */
    static checkCollision(currentCarName, otherCarName, moveForwardOffset) {
        const currentCarTopOffset = HtmlElementHelper.getOffsetFromTopByName(currentCarName);
        const currentCarNewTopOffset = currentCarTopOffset - moveForwardOffset;
        const currentCarNewRearOffset = currentCarNewTopOffset + HtmlElementHelper.getHeightByName(otherCarName);

        const otherCarTopOffset = HtmlElementHelper.getOffsetFromTopByName(otherCarName);
        const otherCarRearOffset = otherCarTopOffset + HtmlElementHelper.getHeightByName(otherCarName);

        return (currentCarNewTopOffset >= otherCarTopOffset && currentCarNewTopOffset <= otherCarRearOffset) ||
               (currentCarNewRearOffset >= otherCarTopOffset && currentCarNewRearOffset <= otherCarRearOffset);
    }
}