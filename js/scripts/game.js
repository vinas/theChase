function Game()
{
    this.endGame = endGame;
    this.init = init;
    this.resetGame = resetGame;
    this.scorePoints = scorePoints;

    return this;

    function init()
    {
        setup.setVisualElements();
        resizer.resizeMapAndItems();
        setup.setAll();
        events.loadEventHandlers();
        setup.loadContent();
        display.resetButton();
        gameLoop();
        gameClock();
    }

    function endGame(reason) {
        gameOn = false;
        musicTheme.pause();
        endGameSound.currentTime = 0;
        endGameSound.play();
        display[reason]();
        display.hideGameValues();
        setup.clearGameValues();
    }

    function resetGame()
    {
        setup.resetAllValues();
        display.hideInGameElements();
        display.relocateCharacters();
        display.showInGameElements();
        display.money();
        display.gameInfo();
        loadingTheme.pause();
        endGameSound.pause();
        musicTheme.currentTime = 0;
        musicTheme.play();
        gameOn = true;
    }

    function scorePoints() {
        points = points + POINTUNITY;
        display.updatePointsDisplay();
        handleLevelChange();
    }

    /**** PRIVATE METHODS ****/

    function gameLoop()
    {
        if (gameOn) {
            display.moveItAll();
            events.checkGotItem();
            events.checkGotBusted();
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
                handleClockDisplay();
                handleMolotov();
                handleBomb();
                Time.innerHTML = time;
                time = time - 1;
            } else {
                endGame("timeUp");
            }
        }
        setTimeout(gameClock, 1000);
    }

    function handleClockDisplay()
    {
        if ((time == DISPLAYCLOCKAT) && (!isClockVisible)) {
            display.clock();
        }
    }

    function handleMolotov()
    {
        if (calc.sortMolotov()) {
            if (!isMolotovVisible) {
                display.molotov();
                return ;
            }
            display.hideMolotov();
            return;
        }
        if (molotovTime > 1) {
            molotovTime = molotovTime - 1;
            display.molotovCounter();
            return;
        }
        molotovTime = 0;
        display.restorePolicemen();
    }

    function handleBomb()
    {
        if (currLevel > 1) {
            var action = calc.sortBomb();
            console.log('action - ', action);
            if (action)
                display[action]();
        }
    }

    function handleLevelChange()
    {
        if (calc.isLevelChange()) {
            lastChangedLevel = points;
            currLevel = currLevel + 1;
            if (currLevel == TWOPOLICEMENLEVEL)
                display.show2ndPoliceman();
            display.updateDificultyDisplay();
            display.setNewBackground();
            events.changePoliceMoveRate();
        }
    }

}