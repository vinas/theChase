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

    function throwItem(item, targetPos, callback)
    {
        var itemPos = setItemPos();

        function setItemPos()
        {
            switch (item.id) {
                case 'molotov':
                    return molotovPos;
                case 'bomb':
                    return bombPos;
            }
        }

        var shooterPosX = itemPos[0],
            shooterPosY = itemPos[1];

        var inclination = calc.inclination(itemPos, targetPos),
            variationRate = calc.variationRate(inclination);

        moveItem();

        function moveItem()
        {
            if ((!reached(itemPos, ITEMSIZE, targetPos, CHARSIZE)) && (!isNaN(variationRate))) {
                setNewItemPos();
                display.objectAt(item, itemPos);
                setTimeout(function() {
                    moveItem();
                }, 10);
                return;
            }
            callback();
        }

        function setNewItemPos()
        {
            if (itemPos[0] != targetPos[0]) {
                itemPos[0] = setItemNewCoord(itemPos[0], targetPos[0], variationRate);
                itemPos[1] = Math.round(inclination * (itemPos[0] - shooterPosX) + shooterPosY);
                return;
            }
            itemPos[1] = setItemNewCoord(itemPos[1], targetPos[1], variationRate);
        }

        function setItemNewCoord(sourceCoord, destCoord, variation)
        {
            return (sourceCoord < destCoord) ? sourceCoord + variation : sourceCoord - variation;
        }
    }
}
