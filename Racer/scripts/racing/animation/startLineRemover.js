class StartLineRemover {

    /**
     * @description Removes Start line element
     * @param carName
     * @returns none
     */
    remove(carName) {
        let startLineElement = document.getElementById(this.#getStartLineElementName(carName));
        if(startLineElement !== null)
            startLineElement.remove();
    };

    /**
     * @description Returns Start line element name
     * @param carName
     * @returns {*} Start line element name
     */
    #getStartLineElementName(carName) {
        return carName === Constants.CAR_1 ? Constants.START_1 : Constants.START_2;
    }
}