class GameOver {

    /**
     * @description Populates game over text and shows game over screen
     * @param gameOverText
     * @returns none
     */
    static showResult(gameOverText) {
        GameOver.populateResultText(gameOverText);
        GameOver.showGameOverScreen();
    }

    /**
     * @description Shows game over screen
     * @returns none
     */
    static showGameOverScreen(){
        let gameOverScreen = document.getElementById('game-over-screen');
        gameOverScreen.display = 'block';
        gameOverScreen.hidden = false;
    }

    /**
     * @description Populates result text
     * @param resultText
     * @returns none
     */
    static populateResultText(resultText) {
        let resultTextElement = document.getElementById('result-text');
        resultTextElement.innerHTML = resultText;
    }
}