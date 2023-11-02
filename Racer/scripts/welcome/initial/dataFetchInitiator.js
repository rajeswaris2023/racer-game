var carsOptionsFetcher = new Worker('./scripts/welcome/worker/carsFetcher.js');
var tracksOptionsFetcher = new Worker('./scripts/welcome/worker/tracksFetcher.js');

carsOptionsFetcher.postMessage('');
tracksOptionsFetcher.postMessage('');