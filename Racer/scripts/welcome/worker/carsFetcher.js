addEventListener('message', async message => {
   const uri = 'http://localhost:8080/cars';
   const response = await fetch(uri);
   postMessage(await response.json());
});