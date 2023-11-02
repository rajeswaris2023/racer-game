addEventListener('message', message => {
    const uri = `http://localhost:8080/start_race/${message.data}`;

    let xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', () => {
        if(xhr.readyState === 4) {
            if(xhr.status === 200) {
                postMessage('success');
            }
        }
    })

    xhr.open('POST', uri);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
});