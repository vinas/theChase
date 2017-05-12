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
        calculator.relocateCharacters();
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


    function gameLoop()
    {
        var pressedKeyBump;
        if (gameOn) {
            switch (pressedKey) {
                case 37:
                    movement.move('left');
                    break;
                case 38:
                    movement.move('up');
                    break;
                case 39:
                    movement.move('right');
                    break;
                case 40:
                    movement.move('down');
                    break;
                case 13:
                    if ((pressedKey != pressedKeyBump)) {
                        resetGame();
                        pressedKeyBump = pressedKey;
                    }
                    break;
                default:
                    pressedKeyBump = false;
            }
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
                calculator.sortBomb();
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
        calculator.sortMolotov();
        console.log('molotovTime - ', molotovTime);
        if (molotovTime > 0)
            display.handleMolotovCounter();
        if (molotovTime == 0)
            display.restorePolicemen();
    }

    function changeLevel()
    {
        currLevel = currLevel + 1;
        if (currLevel < 1) {
            currLevel = 1;
        } else if (currLevel ==  TWOPOLICEMENLEVEL) {
            display.show2ndPoliceman();
        }
        display.updateDificultyDisplay();
        display.changeBackground();
        changePoliceMoveRate();
    }

    function changePoliceMoveRate()
    {
        officer1MoveRate = SPEEDTABLE[currLevel][0];
        officer2MoveRate = SPEEDTABLE[currLevel][1];
    }

}