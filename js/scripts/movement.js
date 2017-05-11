function Movement()
{
    this.move = move;

    return this;

    function move(direction)
    {
        moveThief(direction);
        movePolice();
    }

    function movePolice()
    {
        if (molotovTime <= 0) {
            moveOfficer(1);
            if (currLevel >= TWOPOLICEMENLEVEL)
                moveOfficer(2);
        }
    }

    function moveThief(direction)
    {
        setThiefHorDirection(direction);
        thiefPosArr = calculator.setNextPosition(
                thiefPosArr,
                thiefMoveRate,
                direction
            );
        calculator.setObjectPosition(Thief, thiefPosArr);
        interactions.checkGotSomething();
    }

    function moveOfficer(whichOfficer)
    {
        if (whichOfficer) {
            var officerPosArr, movementRate, officer;
            if (whichOfficer == 1) {
                officerPosArr = officer1PosArr;
                movementRate = officer1MoveRate;
                officer = Officer1;
            } else {
                officerPosArr = officer2PosArr;
                movementRate = officer2MoveRate;
                officer = Officer2;
            }
            officerPosArr = calculator.setNewOfficerPos(whichOfficer, officer, officerPosArr, movementRate);
            calculator.setObjectPosition(officer, officerPosArr);

            if (calculator.reached(officerPosArr, (OBJSIZE - CATCHTOLERANCE), thiefPosArr, (OBJSIZE - CATCHTOLERANCE)))
               game.endGame('busted');
        }
    }

}