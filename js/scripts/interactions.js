function Interactions()
{
    this.checkGotSomething = checkGotSomething;

    return this;

    function checkGotSomething()
    {
        gotMoney();
        if (isClockVisible)
            gotClock();
        if (isMolotovVisible)
            gotMolotov();
        if (isBombVisible)
            gotBomb();
    }

    function gotMoney()
    {
        if (calculator.reached(thiefPosArr, CHARSIZE, moneyPos, ITEMSIZE)) {
            game.scorePoints();
            time = time + BONUSTIME;
            display.flash(Time);
            display.displayMoney();
        }
    }

    function gotClock()
    {
        if (calculator.reached(thiefPosArr, CHARSIZE, clockPos, ITEMSIZE)) {
            game.scorePoints();
            time = time + 10;
            Clock.hide();
            isClockVisible = false;
            display.feedBackClock();
        }
    }

    function gotMolotov()
    {
        if (calculator.reached(thiefPosArr, CHARSIZE, molotovPos, ITEMSIZE)) {
            //$.ionSound.play("heehee");
            molotovTime = MOLOTOVPAUSE;
            game.scorePoints();
            display.hideMolotov();
            display.burnDaPolice();
        }
    }

    function gotBomb()
    {
        if (calculator.reached(thiefPosArr, CHARSIZE, bombPos, ITEMSIZE)) {
            display.hideBomb();
            game.scorePoints();
            display.flashPolicia();
            display.flash(CurrLevel);
            if (currLevel > 1) {
                currLevel = currLevel - 1;
                officer1MoveRate = SPEEDTABLE[currLevel][0];
                officer2MoveRate = SPEEDTABLE[currLevel][1];
                if (currLevel < TWOPOLICEMENLEVEL) {
                    officer2PosArr[0] = (MAPSIZE - CHARSIZE);
                    officer2PosArr[1] = 0;
                    calculator.setObjectPosition(Officer2, officer2PosArr);
                    Counter2.hide();
                    Officer2.hide();
                }
            }
            CurrLevel.html(currLevel);
            display.feedBackBomb();
        }
    }

}