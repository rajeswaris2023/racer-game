addTrackButtonEventListener = () => {
    let trackButtons = document.getElementsByClassName('track-button');

    for(let index= 0; index < trackButtons.length; index++) {
        let trackButton = trackButtons.item(index);

        trackButton.addEventListener('click', event => {
            const trackName = event.currentTarget.id.split('-')[0];
            const selectedKey = localStorage.selectedTrackKey;

            if(!Selection.validateSelection(trackName, selectedKey)) {
                Selection.setErrorMessage(Constants.ONE_TRACK_SELECTION_MESSAGE);
                return;
            }
            Selection.clearErrorMessage(Constants.ONE_TRACK_SELECTION_MESSAGE);

            Selection.toggleSelection(event.currentTarget, trackName, selectedKey, true, false,
                                      Constants.SELECTED_TRACK_KEY, Constants.SELECTED_TRACK);
        }, {
            capture: false
        });
    }
}