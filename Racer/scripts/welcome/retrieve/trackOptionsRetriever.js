tracksOptionsFetcher.addEventListener('message', message => {
    const data = message.data;

    for(let index = 0; index < data.length; index++) {
        const track = {
            id: data[index].id,
            name: data[index].name,
            length: data[index].length,
            description: data[index].description,
            barriers: data[index].barriers
        };
        tracks.set(track.id, track);
    }
    TrackOptionsCreator.createTrack(tracks);
    addTrackButtonEventListener();
});