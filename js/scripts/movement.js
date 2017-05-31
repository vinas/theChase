function Movement()
{
    this.moveItAll = moveItAll;
    this.throwItem = throwItem;

    return this;

    function moveItAll()
    {
        moveThief();
        movePolice();
    }

    function movePolice()
    {
        if (molotovTime <= 0) {
            moveOfficer(0);
            if (calc.isTwoPolicemenLevel())
                moveOfficer(1);
        }
    }

    function moveThief()
    {
        var direction = interactions.getDirection();
        display.setThiefHorDirection(direction);
        thiefPosArr = calc.nextThiefPosition(
                thiefPosArr,
                thiefMoveRate,
                direction
            );
        display.objectAt(Thief, thiefPosArr);
    }

    function moveOfficer(whichOfficer)
    {
        calc.nextOfficerPos(whichOfficer);
        display.objectAt((whichOfficer == 0) ? Officer1 : Officer2, officerPosArr[whichOfficer]);
    }

    function throwItem(item, itemPos, targetPos, callback)
    {
        var shooterPosX = itemPos[0],
            shooterPosY = itemPos[1],
            inclination = calc.inclination(itemPos, targetPos),
            variationRate = calc.variationRate(THROWSPEED, inclination);

        moveItem();

        function moveItem()
        {
            if ((!reached(itemPos, ITEMSIZE, targetPos, CHARSIZE)) && (!isNaN(variationRate))) {
                itemPos = calc.setNewThrowItemPos(shooterPosX, shooterPosY, itemPos, targetPos, inclination, variationRate);
                display.objectAt(item, itemPos);
                setTimeout(function() {
                    moveItem();
                }, 10);
                return;
            }
            callback();
        }
    }
}
