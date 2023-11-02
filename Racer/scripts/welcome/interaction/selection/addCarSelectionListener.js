addCarButtonEventListener = () => {
    let carButtons = document.getElementsByClassName('car-button');

    for(let index=0; index < carButtons.length; index++) {
        let carButton = carButtons.item(index);

        carButton.addEventListener('click', event => {
            const carId = event.currentTarget.getAttribute('id').split('-');
            const carElementName = `${carId[0]}-${carId[1]}-${carId[2]}`;
            const className = event.currentTarget.getAttribute('class');
            const player = className.split(' ')[1];
            const isPlayer1 = player === Constants.PLAYER_ONE;
            const selectedKey = isPlayer1 ? localStorage.player_1_car_key : localStorage.player_2_car_key;
            const selectedKeyName = isPlayer1 ? Constants.PLAYER_ONE_CAR_KEY : Constants.PLAYER_TWO_CAR_KEY;
            const selectedObjectName = isPlayer1 ? Constants.PLAYER_ONE_CAR : Constants.PLAYER_TWO_CAR;

            if(!Selection.validateSelection(carElementName, selectedKey)) {
                Selection.setErrorMessage(Constants.ONE_CAR_SELECTION_MESSAGE);
                return;
            }
            Selection.clearErrorMessage(Constants.ONE_TRACK_SELECTION_MESSAGE);

            Selection.toggleSelection(event.currentTarget, carElementName, selectedKey, false, isPlayer1, selectedKeyName, selectedObjectName);
        }, {
            capture: false
        });
    }
};