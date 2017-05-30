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
        var itemPos = setItemPosObj(),
            shooterPosX = itemPos[0],
            shooterPosY = itemPos[1],
            variationRate = calc.variationRate(itemPos, targetPos);

        moveItem();

        function setItemPosObj()
        {
            switch (item.id) {
                case 'molotov':
                    return molotovPos;
                case 'bomb':
                    return bombPos;
            }
        }

        function moveItem()
        {
            if ((!reached(itemPos, ITEMSIZE, targetPos, CHARSIZE)) && (!isNaN(variationRate))) {
                calc.setNewItemPos(shooterPosX, shooterPosY, itemPos, targetPos, variationRate);
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
