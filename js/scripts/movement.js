function Movement()
{
    this.moveItAll = moveItAll;

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
        var officer;
        officer = (whichOfficer == 0) ? Officer1 : Officer2;
        calc.nextOfficerPos(
                whichOfficer,
                officer
            );
        display.objectAt(officer, officerPosArr[whichOfficer]);
    }

}
