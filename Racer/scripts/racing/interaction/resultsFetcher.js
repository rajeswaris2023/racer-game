getResults = () => {
    return new Promise(async (resolve, reject) => {
        const uri = `http://localhost:8080/results/${raceId}`;
        const response = await fetch(uri);
        const responseObject = await response.json();

        resolve(responseObject);
    });
}