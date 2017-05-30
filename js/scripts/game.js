function Game()
{
    var gameOn = false;

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

    function endGame(reason) {
        gameOn = false;
        if (reason == "busted") {
            display.busted();
        } else if (reason == "timeUp") {
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
        display.money();
        display.gameInfo();
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
                return;
            }
            display.hideMolotov();
            return;
        }
        if (molotovTime > 1) {
            molotovTime = molotovTime - 1;
            display.molotovCounter();
            return;
        }
        if (molotovTime == 1) {
            molotovTime = 0;
            display.restorePolicemen();
        }
    }

    function handleBomb()
    {
        if (currLevel > 1) {
            var action = calc.sortBomb();
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
                display.officer2();
            display.updateDificultyDisplay();
            display.setNewBackground();
            interactions.changePoliceMoveRate();
        }
    }

}