function Motion()
{

    this.moveItAll = moveItAll;
    this.throwItem = throwItem;
    this.changePoliceMoveRate = changePoliceMoveRate;

    return this;

    function moveItAll() {
        moveThief();
        movePolice();
    }

    function throwItem(item, itemPos, targetPos, callback) {
        var shooterPosX = itemPos[0],
            shooterPosY = itemPos[1],
            inclination = calc.inclination(itemPos, targetPos),
            variationRate = calc.variationRate(THROWSPEED, inclination);

        moveItem();

        function moveItem() {
            if ((!reached(itemPos, ITEMSIZE, targetPos, CHARSIZE)) && (!isNaN(variationRate))) {
                itemPos = calc.setNewThrowItemPos(
                        shooterPosX,
                        shooterPosY,
                        itemPos,
                        targetPos,
                        inclination,
                        variationRate
                    );
                display.objectAt(item, itemPos);
                setTimeout(function() {
                    moveItem();
                }, 10);
                return;
            }
            callback();
        }
    }

    function changePoliceMoveRate() {
        officerMoveRate[0] = SPEEDTABLE[currLevel][0];
        officerMoveRate[1] = SPEEDTABLE[currLevel][1];
    }

    function moveThief() {
        var direction = getDirection();
        setThiefHorDirection(direction);
        thiefPosArr = calc.nextThiefPosition(
                thiefPosArr,
                thiefMoveRate,
                direction
            );
        display.objectAt(Thief, thiefPosArr);
    }

    function movePolice() {
        if (molotovTime <= 0) {
            moveOfficer(Officer1);
            if (calc.isTwoPolicemenLevel()) moveOfficer(Officer2);
        }
    }

    function moveOfficer(officer) {
        display.objectAt(officer, calcNextOfficerPos(officer));

        function calcNextOfficerPos(officer) {
            var officerPos = calc.getObjectPosition(officer);
            var relativeTargetPos = getRelativePositions(officerPos);
            var coords = [];
            display.mirrorObj(officer, ((relativeTargetPos[0] == 'right') ? '-1' : '1'));
            if (movingAxis(officer) == 'horizontal') {
                coords[0] = calcOfficerHorPos(officerPos[0], relativeTargetPos[0]);
                coords[1] = officerPos[1];
                return coords;
            }
            coords[0] = officerPos[0];
            coords[1] = calcOfficerVerPos(officerPos[1], relativeTargetPos[1]);
            return coords;
        }

        function calcOfficerHorPos(officerPos, relativeTargetPos) {
            if (relativeTargetPos == 'right')
                return officerPos + officerMoveRate[officer.id];
            return officerPos - officerMoveRate[officer.id];
        }

        function calcOfficerVerPos(officerPos, relativeTargetPos) {
            if (relativeTargetPos == 'up')
                return officerPos - officerMoveRate[officer.id];
            return officerPos + officerMoveRate[officer.id];
        }

        function getRelativePositions(coords) {
            return [
                getTargetHorRelPos(coords[0]),
                getTargetVerRelPos(coords[1])
            ];
        }
    
        function getTargetHorRelPos(coord) {
            if (coord > thiefPosArr[0])
                return 'left';
            if (coord < thiefPosArr[0])
                return 'right';
            return 'same';
        }
    
        function getTargetVerRelPos(coord) {
            if (coord > thiefPosArr[1])
               return 'up';
            if (coord < thiefPosArr[1])
                return 'down';
            return 'same';
        }
    
        function movingAxis(officer) {
            var officerPos = calc.getObjectPosition(officer);
            var diffX = getAbsoluteDiff(officerPos[0], thiefPosArr[0]),
                diffY = getAbsoluteDiff(officerPos[1], thiefPosArr[1]);
            if (diffX != diffY) {
                if (officer.id == 0) {
                    if (diffX > diffY)
                        return 'horizontal';
                    if (diffX < diffY)
                        return 'vertical';
                }
                if (diffX > diffY)
                    return 'vertical';
                if (diffX < diffY)
                    return 'horizontal';
            }
            if (Math.floor((Math.random() * 2) + 1) == 1)
                return 'horizontal';
            return 'vertical';
        }

        function getAbsoluteDiff(firstObjCoord, secondObjCoord) {
            return Math.abs(firstObjCoord - secondObjCoord);
        }

    }

    function setThiefHorDirection(direction) {
        switch (direction) {
            case 'left':
                display.mirrorObj(Thief, '1');
                break;
            case 'right':
                display.mirrorObj(Thief, '-1');
                break;
        }
    }

    function getDirection() {
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

}
