class TrackOptionsCreator {
    /**
     * @description Creates Track elements
     * @param tracks
     * @returns none
     */
    static createTrack(tracks) {
        let tracksContainer = document.getElementById('track-selection');
        for(const [id, track] of tracks) {
            const trackName = track.name;

            let trackDiv = HTMLElementCreator.createDiv(`${trackName}-track-div`, 'track-div');

            let buttonDiv = TrackOptionsCreator.createTrackButton(trackName);
            trackDiv.appendChild(buttonDiv);

            let trackInfoDiv = TrackOptionsCreator.createTrackInfo(trackName, id, track.description);
            trackDiv.appendChild(trackInfoDiv);

            tracksContainer.appendChild(trackDiv);
        }
    };

    /**
     * @description Creates Track button element
     * @param trackName
     * @returns {*} Track button element
     */
    static createTrackButton(trackName) {
        const imageSource = trackName === 'short' ? '../../images/short_track_with_many_barriers.png' : '../../images/long_track_with_few_barriers.png';
        const imageAlt = Constants.TRACK_DID_NOT_LOAD;

        let buttonDiv = HTMLElementCreator.createDiv(`${trackName}-track-button-div`, 'track-button-div');
        const buttonImage = HTMLElementCreator.createButtonImage(`${trackName}-track`, imageSource, imageAlt, 'track-button');
        buttonDiv.appendChild(buttonImage);

        return buttonDiv;
    }

    /**
     * @description Creates Track Info element
     * @param trackName
     * @param trackId
     * @param trackDescription
     * @returns {*} Track Info element
     */
    static createTrackInfo(trackName, trackId, trackDescription) {
        let trackInfoDiv = HTMLElementCreator.createDiv(`${trackName}-track-info-div`, 'track-info-div');
        const trackInfo = HTMLElementCreator.createSpan(`${trackName}-track-info`, trackDescription, 'track-info');
        const trackIdElement = HTMLElementCreator.createHiddenElement(`${trackName}-id`, trackId, 'track-id');

        trackInfoDiv.appendChild(trackInfo);
        trackInfoDiv.appendChild(trackIdElement);
        return trackInfoDiv;
    }
}