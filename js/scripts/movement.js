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

    function throwItem(item, targetPos)
    {
        var itemPos = getItemsPos(item),
            shooterPosX = itemPos[0],
            shooterPosY = itemPos[1];

        moveItem();

        function getItemsPos(item) {
            switch (item.id) {
                case 'molotov':
                    return molotovPos;
                case 'bomb':
                    return bombPos;
            }
        }

        function moveItem()
        {
            if (!reached(itemPos, ITEMSIZE, targetPos, CHARSIZE)) {
                calc.newThrowItemPos(shooterPosX, shooterPosY, itemPos, targetPos);
                display.objectAt(item, itemPos);
                setTimeout(function() {
                    moveItem();
                }, 10);
                return;
            }

            if (item.id == 'molotov') {
                display.molotovReached();
                return;
            }
            display.bombReached();
        }

    }
}
