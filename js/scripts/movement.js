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
            if (currLevel >= TWOPOLICEMENLEVEL)
                moveOfficer(1);
        }
    }

    function moveThief()
    {
        var direction = interactions.getDirection();
        setThiefHorDirection(direction);
        thiefPosArr = calculator.setNextPosition(
                thiefPosArr,
                thiefMoveRate,
                direction
            );
        display.setObjectPosition(Thief, thiefPosArr);
    }

    function moveOfficer(whichOfficer)
    {
        var officer;
        officer = (whichOfficer == 0) ? Officer1 : Officer2;
        calculator.setNewOfficerPos(
                whichOfficer,
                officer
            );
        display.setObjectPosition(officer, officerPosArr[whichOfficer]);
    }

}
