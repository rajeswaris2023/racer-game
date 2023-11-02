class Selection {

    /**
     * @description Sets error message to error element
     * @param errorMessage
     * @returns none
     */
    static setErrorMessage(errorMessage) {
        const errorElement = document.getElementById('error-message');
        errorElement.innerHTML = errorMessage;
    }

    /**
     * @description Clears error message
     * @returns none
     * @param trackErrorMessage
     */
    static clearErrorMessage(trackErrorMessage) {
        const errorElement = document.getElementById('error-message');
        if(errorElement.innerHTML === trackErrorMessage) {
            errorElement.innerHTML = '';
        }
    }

    /**
     * @description Validates selected object using key
     * @param elementName
     * @param selectedKey
     * @returns {Boolean}
     */
    static validateSelection(elementName, selectedKey) {
        const currentElementKey = Number.parseInt(document.getElementById(`${elementName}-id`).value);
        const selectedObjectKey = selectedKey === undefined ? selectedKey : Number.parseInt(selectedKey);

        return selectedObjectKey === undefined || selectedObjectKey === currentElementKey;
    }

    /**
     * @description Unsets selected object
     * @param currentElement
     * @param selectedKeyName
     * @param selectedObjectName
     * @returns {*}
     */
    static unsetSelection(currentElement, selectedKeyName, selectedObjectName) {
        currentElement.parentElement.style.removeProperty('border');
        localStorage.removeItem(selectedKeyName);
        localStorage.removeItem(selectedObjectName);
    }


    /**
     * @description Sets selected object and key
     * @param currentElement
     * @param selectedKey
     * @param isTrack
     * @param isPlayer1
     * @returns none
     */
    static setSelection(currentElement, selectedKey, isTrack, isPlayer1) {
        currentElement.parentElement.style.setProperty('border', 'solid 1px red');
        if(isTrack) {
            localStorage.selectedTrackKey = selectedKey;
            localStorage.selectedTrack = JSON.stringify(tracks.get(selectedKey));
        }
        else {
            if(isPlayer1) {
                localStorage.player_1_car_key = selectedKey;
                localStorage.player_1_selected_car = JSON.stringify(cars.get(selectedKey));
            }
            else {
                localStorage.player_2_car_key = selectedKey;
                localStorage.player_2_selected_car = JSON.stringify(cars.get(selectedKey));
            }
        }
    }

    /**
     * @description Toggles setting and unsetting selected object and key
     * @param currentElement
     * @param elementName
     * @param selectedKey
     * @param isTrack
     * @param isPlayer1
     * @param selectedKeyName
     * @param selectedObjectName
     * @returns none
     */
    static toggleSelection(currentElement, elementName, selectedKey, isTrack, isPlayer1, selectedKeyName, selectedObjectName) {
        const currentElementKey = Number.parseInt(document.getElementById(`${elementName}-id`).value);
        const selectedObjectKey = selectedKey === undefined ? selectedKey : Number.parseInt(selectedKey);

        if(selectedObjectKey !== undefined && selectedObjectKey === currentElementKey) {
            Selection.unsetSelection(currentElement, selectedKeyName, selectedObjectName);
        }
        else {
            Selection.setSelection(currentElement, currentElementKey, isTrack, isPlayer1);
        }
    }
}