backoff = currentCarId => otherCarId => {
    return new Promise((resolve, reject) => {
        const uri = `http://localhost:8080/backoff/${raceId}/${currentCarId}`;
        let xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange', () => {
            if (xhr.readyState === 4) {
                if(xhr.status === 200) {
                    const position = JSON.parse(xhr.response).position;
                    resolve(position.toFixed(1));
                }
            }
        });

        xhr.open('POST', uri);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({ otherCarId: otherCarId }));
    });
};