const submitButton = document.getElementById('submit-link');
handleSubmit = async event => {
    if(validateTrackSelection() || validatePlayerName() || validateCarSelection()) {
        event.preventDefault();
        return;
    }
    const selectedTrack = JSON.parse(localStorage.selectedTrack);
    const player_1_name = localStorage.player_1_name;
    const player_2_name = localStorage.player_2_name;
    const player_1_selected_car = JSON.parse(localStorage.player_1_selected_car);
    const player_2_selected_car = JSON.parse(localStorage.player_2_selected_car);
    const data = {
        track: selectedTrack.id,
        playerCar: [
            {
                player: player_1_name,
                car: player_1_selected_car.id
            },
            {
                player: player_2_name,
                car: player_2_selected_car.id
            }
        ]
    };

    await createRace(data);
};

submitButton.addEventListener('click', handleSubmit, {
    capture: false
});