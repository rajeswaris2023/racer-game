validateCarSelection = () => {
    let errorMessageElement = document.getElementById('error-message');
    if(localStorage.player_1_selected_car === undefined) {
        errorMessageElement.innerHTML = Constants.PLAYER_ONE_CAR_NON_SELECTION_MESSAGE;
        return true;
    }
    if(localStorage.player_2_selected_car === undefined) {
        errorMessageElement.innerHTML = Constants.PLAYER_TWO_CAR_NON_SELECTION_MESSAGE;
        return true;
    }
    return false;
}