validateTrackSelection = () => {
    let errorMessageElement = document.getElementById('error-message');
    if(localStorage.selectedTrack === undefined) {
        errorMessageElement.innerHTML = Constants.TRACK_SELECTION_MESSAGE;
        return true;
    }
    return false;
}