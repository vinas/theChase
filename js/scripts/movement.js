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
        thiefPosArr = $.setNextPosition(
                thiefPosArr,
                thiefMoveRate,
                direction
            );
        $.setObjectPosition($('#thief'), thiefPosArr);
        interactions.checkGotSomething();
    }

    function moveOfficer(whichOfficer)
    {
        if (whichOfficer) {
            var officerPosArr, movementRate, officer;
            if (whichOfficer == 1) {
                officerPosArr = officer1PosArr;
                movementRate = officer1MoveRate;
                officer = $('#officer1');
            } else {
                officerPosArr = officer2PosArr;
                movementRate = officer2MoveRate;
                officer = $('#officer2');
            }
            officerPosArr = $.setNewOfficerPos(whichOfficer, officer, officerPosArr, movementRate);
            $.setObjectPosition(officer, officerPosArr);

            if (calculator.reached(officerPosArr, (OBJSIZE - CATCHTOLERANCE), thiefPosArr, (OBJSIZE - CATCHTOLERANCE)))
               game.endGame('busted');
        }
    }

}