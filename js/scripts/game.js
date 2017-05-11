function Game()
{
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
        if (motivo == "busted") {
            display.busted();
        } else if (motivo == "timeUp") {
            display.timeUp();
        }
        display.hideGameValues();
        clearGameValues();
    }

    function resetGame()
    {
        resetAllValues();
        display.hideAllHideble();
        display.showAllShowable();
        relocateCharacters();
        display.displayMoney();
        display.displayGameInfo();
        jogoOn = true;
    }

    function scorePoints() {
        pontos = pontos + VALORDINHEIRO;
        display.updatePointsDisplay();
        if ((pontos != 0) && (pontos >= (ultimaPontuacao + PONTOSPORFASE))) {
            ultimaPontuacao = pontos;
            changeLevel();
        }
    }


    function gameLoop()
    {
        if (jogoOn) {
            if (tecla == 37) {
                display.mirrorObj(Thief, '1');
                movement.move('left');
            } else if (tecla == 38) {
                movement.move('up');
            } else if (tecla == 39) {
                display.mirrorObj(Thief, '-1');
                movement.move('right');
            } else if (tecla == 40) {
                movement.move('down');
            // Enter - RESET
            } else if ((tecla == 13) && (tecla != teclaBump)) {
                resetGame();
                teclaBump = tecla;
            } else if (tecla != 13) {
                teclaBump = false;
            }
        }
        setTimeout(gameLoop, 40);
    }

    function gameClock()
    {
        if (jogoOn == true) {
            if (tempo >= 0) {
                if (tempo <= 3) {
                    display.flash(Time, "#FFD61F");
                }
                display.displayClock();
                calculator.sortMolotov();
                calculator.sortBomb();
                display.displayMoney();
                Time.html(tempo);
                tempo = tempo - 1;
            } else {
                endGame("timeUp");
            }
        }
        setTimeout(gameClock, 1000);
    }


    function resetAllValues()
    {
        tempo = TEMPOPADRAO;
        dinheiroVis = false;
        clockVisible = false;
        molotovVisible = false;
        bombVisible = false;
        tecla = false;
        jogoOn = false;
        thiefMoveRate = calculator.regraDeTres(6, mapSize);
        officer1MoveRate = MOVIMENTACAOMINIMA;
        currLevel = 1;
        ultimaFase = 0;
        ultimaPontuacao = 0;
        pontos = 0;
        molotovTime = 0;
        thiefPosArr[0] = 0;
        thiefPosArr[1] = 0;
        officer1PosArr[0] = mapSize - OBJSIZE;
        officer1PosArr[1] = mapSize - OBJSIZE;
        officer2PosArr[0] = mapSize - OBJSIZE;
        officer2PosArr[1] = 0;
    }

    function relocateCharacters()
    {
        calculator.setObjectPosition(Thief, thiefPosArr);
        calculator.setObjectPosition(Officer1, officer1PosArr);
        calculator.setObjectPosition(Officer2, officer2PosArr);
    }

    function clearGameValues()
    {
        tempo = 0;
        dinheiroVis = false;
        clockVisible = false;
        molotovVisible = false;
        bombVisible = false;
        jogoOn = false;
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
        officer1MoveRate = speedTable[currLevel][0];
        officer2MoveRate = speedTable[currLevel][1];
    }

}