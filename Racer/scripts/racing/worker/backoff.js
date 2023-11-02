addEventListener('message', message => {
    const uri = `http://localhost:8080/backoff/${message.data.raceId}/${message.data.carId}`;
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', () => {
        if(xhr.readyState === 4) {
            const position = JSON.parse(xhr.response).position;
            postMessage(Number.parseFloat(position.toFixed(1)));
        }
    });

    xhr.open('POST', uri);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(message.data.data));
});