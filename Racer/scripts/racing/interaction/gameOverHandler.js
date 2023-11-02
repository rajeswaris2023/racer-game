gameOverWorker.addEventListener('message', message => {
    gameResult = new Promise((resolve, reject) => {
        resolve(message.data.result);
    });
});