createRace = data => {
    return new Promise((resolve, reject) => {
        const uri = 'http://localhost:8080/create_race';
        const xhr = new XMLHttpRequest();

        xhr.addEventListener('readystatechange', () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    localStorage.raceId = JSON.parse(xhr.response).id;
                }
                resolve();
            }
        });

        xhr.open('POST', uri);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
    });
};