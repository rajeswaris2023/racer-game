addEventListener('message', async message => {
    const uri = `http://localhost:8080/results/${message.data.raceId}`;
    const response = await fetch(uri);
    const responseObject = await response.json();

    postMessage(responseObject);
});