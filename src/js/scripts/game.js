function Game()
{
    this.endGame = endGame;
    this.init = init;
    this.resetGame = resetGame;
    this.scorePoints = scorePoints;

    return this;

    function init() {
        setup.setVisualElements();
        resizer.resizeMapAndItems();
        setup.setAll();
        controls.loadControlsHandlers();
        setup.loadContent();
        gameLoop();
        gameClock();
    }

    function endGame(reason) {
        gameOn = false;
        musicTheme.pause();
        saveGameScores();
        endGameSound.currentTime = 0;
        endGameSound.play();
        display[reason]();
        display.hideGameValues();
        setup.clearGameValues();
    }

    function resetGame() {
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

    function gameLoop() {
        if (gameOn) {
            motion.moveItAll();
            events.checkGotItem();
            events.checkGotBusted();
        }
        setTimeout(gameLoop, STANDGAMEREFRESHRATE);
    }

    function gameClock() {
        if (gameOn) {
            if (time >= 0) {
                if (time <= 3) {
                    display.flash(Time);
                }
                handleDisplayableItems();
                time = time - 1;
            } else {
                endGame("timeUp");
            }
        }
        setTimeout(gameClock, 1000);
    }

    function handleDisplayableItems() {
        handleClockDisplay();
        handleMolotovDisplay();
        handleBombDisplay();
    }

    function handleClockDisplay() {
        if ((time == DISPLAYCLOCKAT) && (!isClockVisible)) {
            display.clock();
        }
    }

    function handleMolotovDisplay() {
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

    function handleBombDisplay() {
        if (currLevel > 1) {
            var action = calc.sortBomb();
            console.log('action - ', action);
            if (action)
                display[action]();
        }
    }

    function handleLevelChange() {
        if (calc.isLevelChange()) {
            lastChangedLevel = points;
            currLevel = currLevel + 1;
            if (currLevel == TWOPOLICEMENLEVEL)
                display.show2ndPoliceman();
            display.updateDificultyDisplay();
            display.setNewBackground();
            motion.changePoliceMoveRate();
        }
    }

    function saveGameScores() {
        user.lastScore = points;
        user.lastScoreDateTime = calc.formattedDateTime();
        user.gameId = 1;
        $.post('/api/Games/saveLastScore', user);
    }

}
