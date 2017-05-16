function Game()
{
    var gameOn = false;
    var lastChangedLevel = 0;

    this.endGame = endGame;
    this.loading = loading;
    this.init = init;
    this.resetGame = resetGame;
    this.scorePoints = scorePoints;

    return this;

    function init()
    {
        setup.setAll();
        eventHandlers.load();
        display.loading();
        resizer.resizeMapAndItems();
        gameLoop();
        gameClock();
    }

    function endGame(motivo) {
        gameOn = false;
        if (motivo == "busted") {
            display.busted();
        } else if (motivo == "timeUp") {
            display.timeUp();
        }
        display.hideGameValues();
        setup.clearGameValues();
    }

    function resetGame()
    {
        setup.resetAllValues();
        display.hideInGameElements();
        display.relocateCharacters();
        display.showInGameElements();
        display.displayMoney();
        display.displayGameInfo();
        lastChangedLevel = 0; 
        gameOn = true;
    }

    function scorePoints() {
        points = points + POINTUNITY;
        display.updatePointsDisplay();
        if ((points != 0) && (points >= (lastChangedLevel + PTSTOCHANGELEVEL))) {
            lastChangedLevel = points;
            changeLevel();
        }
    }

    /**** PRIVATE METHODS ****/

    function gameLoop()
    {
        if (gameOn) {
            movement.moveItAll();
            interactions.checkGotItem();
            interactions.checkGotBusted();
        }
        setTimeout(gameLoop, STANDGAMEREFRESHRATE);
    }

    function gameClock()
    {
        if (gameOn) {
            if (time >= 0) {
                if (time <= 3) {
                    display.flash(Time);
                }
                display.displayClock();
                handleMolotov();
                calc.sortBomb();
                Time.html(time);
                time = time - 1;
            } else {
                endGame("timeUp");
            }
        }
        setTimeout(gameClock, 1000);
    }

    function handleMolotov()
    {
        if (calc.sortMolotov())
            if (!isMolotovVisible) {
                display.displayMolotov();
            } else {
                display.hideMolotov();
            }
        if (molotovTime > 0)
            display.handleMolotovCounter();
        if (molotovTime == 0)
            display.restorePolicemen();
    }

    function changeLevel()
    {
        currLevel = currLevel + 1;
        if (currLevel < 1)
            currLevel = 1;
        if (currLevel == TWOPOLICEMENLEVEL)
            display.show2ndPoliceman();
        display.updateDificultyDisplay();
        display.changeBackground();
        interactions.changePoliceMoveRate();
    }

}