validatePlayerName = () => {
    const player1Name = document.getElementById(Constants.PLAYER_ONE_NAME).value;
    const player2Name = document.getElementById(Constants.PLAYER_TWO_NAME).value;
    const errorMessageElement = document.getElementById('error-message');
    const validationResult = !validate(player1Name)(true)(errorMessageElement) || !validate(player2Name)(false)(errorMessageElement);
    if(!validationResult) {
        localStorage.player_1_name = player1Name;
        localStorage.player_2_name = player2Name;
    }
    return validationResult;
}

validate = playerName => isPlayer1 => errorMessageElement => {
    if(playerName.length === 0) {
        if(isPlayer1) {
            errorMessageElement.innerHTML = Constants.PLAYER_ONE_NAME_MESSAGE;
        }
        else {
            errorMessageElement.innerHTML = Constants.PLAYER_TWO_NAME_MESSAGE;
        }
        return false;
    }
    return true;
}