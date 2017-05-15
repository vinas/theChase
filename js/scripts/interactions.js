function Interactions()
{
    this.checkGotItem = checkGotItem;
    this.changePoliceMoveRate = changePoliceMoveRate;
    this.checkGotBusted = checkGotBusted;
    this.getDirection = getDirection;

    return this;

    function getDirection()
    {
        var pressedKeyBump;
        switch (pressedKey) {
            case 37:
                return 'left';
            case 38:
                return 'up';
            case 39:
                return 'right';
            case 40:
                return 'down';
                break;
            case 13:
                if ((pressedKey != pressedKeyBump)) {
                    game.resetGame();
                    pressedKeyBump = pressedKey;
                }
                break;
            default:
                pressedKeyBump = false;
                return false;
        }
    }

    function checkGotBusted()
    {
        if (
            (calculator.reached(
                    officerPosArr[0],
                    (CHARSIZE - CATCHTOLERANCE),
                    thiefPosArr,
                    (CHARSIZE - CATCHTOLERANCE)
                )
            )
            || (
                (currLevel >= TWOPOLICEMENLEVEL)
                && (calculator.reached(
                        officerPosArr[1],
                        (CHARSIZE - CATCHTOLERANCE),
                        thiefPosArr,
                        (CHARSIZE - CATCHTOLERANCE)
                    )
                )
            )
        )
            game.endGame('busted');
    }

    function changePoliceMoveRate()
    {
        officerMoveRate[0] = SPEEDTABLE[currLevel][0];
        officerMoveRate[1] = SPEEDTABLE[currLevel][1];
    }

    function checkGotItem()
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
                officerMoveRate[0] = SPEEDTABLE[currLevel][0];
                officerMoveRate[1] = SPEEDTABLE[currLevel][1];
                if (currLevel < TWOPOLICEMENLEVEL) {
                    officerPosArr[1][0] = (MAPSIZE - CHARSIZE);
                    officerPosArr[1][1] = 0;
                    display.setObjectPosition(Officer2, officerPosArr[1]);
                    Counter2.hide();
                    Officer2.hide();
                }
            }
            CurrLevel.html(currLevel);
            display.feedBackBomb();
        }
    }

}