function Interactions()
{
    this.checkGotSomething = checkGotSomething;

    return this;

    function checkGotSomething()
    {
        gotMoney();
        if (clockVisible)
            gotClock();
        if (molotovVisible)
            gotMolotov();
        if (bombVisible)
            gotBomb();
    }

    function gotMoney()
    {
        if (calculator.reached(thiefPosArr, OBJSIZE, arrPosDinheiro, TAMANHOITEM)) {
            game.scorePoints();
            tempo = tempo + TEMPOBONUS;
            dinheiroVis = false;
            display.displayMoney();
        }
    }

    function gotClock()
    {
        if (calculator.reached(thiefPosArr, OBJSIZE, arrPosRelogio, TAMANHOITEM)) {
            game.scorePoints();
            tempo = tempo + 10;
            Clock.hide();
            clockVisible = false;
            display.feedBackClock();
        }
    }

    function gotMolotov()
    {
        if (calculator.reached(thiefPosArr, OBJSIZE, arrPosMolotov, TAMANHOITEM)) {
            //$.ionSound.play("heehee");
            molotovTime = PAUSAMOLOTOV;
            game.scorePoints();
            Molotov.hide();
            Officer1.attr("src", "img/guarda_fogo_02.gif");
            if (currLevel >= TWOPOLICEMENLEVEL) {
                Officer2.attr("src", "img/guarda_fogo_02.gif");
            }
            molotovVisible = false;
            display.feedBackMolotov();
        }
    }

    function gotBomb()
    {
        if (calculator.reached(thiefPosArr, OBJSIZE, arrPosBomba, TAMANHOITEM)) {
            game.scorePoints();
            Bomb.hide();
            display.flashPolicia();
            display.flash(CurrLevel, "#FFD61F");
            if (currLevel > 1) {
                currLevel = currLevel - 1;
                officer1MoveRate = speedTable[currLevel][0];
                officer2MoveRate = speedTable[currLevel][1];
                if (currLevel < TWOPOLICEMENLEVEL) {
                    officer2PosArr[0] = (mapSize - OBJSIZE);
                    officer2PosArr[1] = 0;
                    calculator.setObjectPosition(Officer2, officer2PosArr);
                    Counter2.hide();
                    Officer2.hide();
                }
            }
            CurrLevel.html(currLevel);
            bombVisible = false;
            display.feedBackBomb();
        }
    }

}