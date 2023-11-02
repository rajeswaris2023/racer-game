addEventListener('message', async message => {
    const uri = 'http://localhost:8080/tracks';
    const response = await fetch(uri);
    const jsonResponse = await response.json();

    postMessage(jsonResponse);
});