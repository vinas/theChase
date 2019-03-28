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
            if (calc.isTwoPolicemenLevel()) newMoveOfficer(Officer2);
        }
    }

    function moveOfficer(officer) {
        calcNextOfficerPos(officer);
        display.objectAt(officer, officerPosArr[officer.id]);

        function calcNextOfficerPos(officer) {
            var relativePositions = getRelativePositions(officer);
            if (movingAxis(officer) == 'horizontal') {
                switch (relativePositions[0]) {
                    case 'right':
                        display.mirrorObj(officer, '-1');
                        officerPosArr[officer.id][0] = officerPosArr[officer.id][0] + officerMoveRate[officer.id];
                        break;
                    case 'left':
                        display.mirrorObj(officer, '1');
                        officerPosArr[officer.id][0] = officerPosArr[officer.id][0] - officerMoveRate[officer.id];
                }
                return;
            }
            switch (relativePositions[1]) {
                case 'up':
                    officerPosArr[officer.id][1] = officerPosArr[officer.id][1] - officerMoveRate[officer.id];
                    break;
                case 'down':
                    officerPosArr[officer.id][1] = officerPosArr[officer.id][1] + officerMoveRate[officer.id];
            }
        }

        function getRelativePositions(officer) {
            return [
                getTargetHorRelPos(officer.id),
                getTargetVerRelPos(officer.id)
            ];
        }
    
        function getTargetHorRelPos(officerId) {
            if (officerPosArr[officerId][0] > thiefPosArr[0])
                return 'left';
            if (officerPosArr[officerId][0] < thiefPosArr[0])
                return 'right';
            return 'same';
        }
    
        function getTargetVerRelPos(officerId) {
            if (officerPosArr[officerId][1] > thiefPosArr[1])
               return 'up';
            if (officerPosArr[officerId][1] < thiefPosArr[1])
                return 'down';
            return 'same';
        }
    
        function movingAxis(officer) {
            var diffX = getAbsoluteDiff(officerPosArr[officer.id][0], thiefPosArr[0]),
                diffY = getAbsoluteDiff(officerPosArr[officer.id][1], thiefPosArr[1]);
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
