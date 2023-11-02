addEventListener('message', message => {
    const uri = `http://localhost:8080/accelerate/${message.data.raceId}/${message.data.carId}`;
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', () => {
        if(xhr.readyState === 4) {
            const response = JSON.parse(xhr.response);
            postMessage({
                position: Number.parseFloat(response.position.toFixed(1)),
                topSpeed: response.topSpeed,
                isGameOver: response.isGameOver
            });
        }
    });

    xhr.open('POST', uri);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(message.data.data));
});