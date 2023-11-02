displayComment = comment => {
    const commentDiv = document.getElementById('comment');
    let commentSpan = commentDiv.getElementsByTagName('span');
    commentSpan[0].innerHTML = comment;
}

commentGenerator.addEventListener('message', message => {
    const comment = message.data;
    displayComment(comment);
    setTimeout(() => {
        commentGenerator.postMessage({ raceId: raceId });
    }, 200);
});