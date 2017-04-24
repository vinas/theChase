$('document').ready(function()
{

    $.move = function(direction)
    {
        moveThief(direction);
        movePolice();
    }

    var movePolice = function()
    {
        if (molotovTime <= 0) {
            moveOfficer(1);
            if (currLevel >= TWOPOLICEMENLEVEL) {
                moveOfficer(2);
            }
        }
    }

	var moveThief = function(direction)
    {
        thiefPosArr = $.setNextPosition(
                thiefPosArr,
                thiefMoveRate,
                direction
            );
        $.setObjectPosition(Thief, thiefPosArr);
        $.checkGotSomething();
    }

    var moveOfficer = function(whichOfficer)
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
            officerPosArr = $.setNewOfficerPos(whichOfficer, officer, officerPosArr, movementRate);
            $.setObjectPosition(officer, officerPosArr);

            if ($.reached(officerPosArr, (OBJSIZE - CATCHTOLERANCE), thiefPosArr, (OBJSIZE - CATCHTOLERANCE)))
               $.endGame('busted');
        }
    }

});