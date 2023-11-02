class FinishLineCreator {

    /**
     * @description Shows finish line
     * @param carName
     * @param offsetFromTop
     * @returns none
     */
    static createFinishLine(carName, offsetFromTop) {
        let finishLine = document.getElementById(carName === Constants.CAR_1 ? Constants.FINISH_1 : Constants.FINISH_2);
        finishLine.style.left = '10px';
        finishLine.style.top = `${offsetFromTop}px`;
        finishLine.style.zIndex = '400';
        finishLine.style.display = 'block';
        finishLine.style.position = 'absolute';
        finishLine.hidden = false;
    }
}