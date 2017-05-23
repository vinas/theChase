function Calculator()
{
    this.crossMultiply = crossMultiply;
    this.getObjectPosition = getObjectPosition;
    this.isTwoPolicemenLevel = isTwoPolicemenLevel;
    this.messagePos = messagePos;
    this.nextOfficerPos = nextOfficerPos;
    this.nextThiefPosition = nextThiefPosition;
    this.officer2StartPos = officer2StartPos;
    this.randomCoords = randomCoords;
    this.reached = reached;
    this.sortBomb = sortBomb;
    this.sortMolotov = sortMolotov;
    
    return this;

    function crossMultiply(actual)
    {
        return Math.floor((actual / 500) * MAPSIZE);
    }

    function getObjectPosition(obj)
    {
        return new Array(
                obj.style.left.replace(new RegExp("px", 'g'), ""),
                obj.style.top.replace(new RegExp("px", 'g'), "")
            );
    }

    function isTwoPolicemenLevel()
    {
        return (currLevel >= TWOPOLICEMENLEVEL);
    }

    function messagePos(objPosArr)
    {
        var leftPos = parseInt(objPosArr[0]),
            topPos = parseInt(objPosArr[1]) + CHARSIZE,
            ninety = crossMultiply(90, MAPSIZE),
            thirty = crossMultiply(30, MAPSIZE);
        if ((leftPos + ninety) >= MAPSIZE)
            leftPos = parseInt(objPosArr[0]) - ((leftPos + ninety) - MAPSIZE);
        if ((topPos + thirty) >= MAPSIZE)
            topPos = parseInt(objPosArr[1]) - thirty;
        return new Array(leftPos, topPos);
    }

    function nextOfficerPos(whichOfficer, officer)
    {
        var relativePositions = getRelativePositions(officerPosArr[whichOfficer]);
        var directionAxis = setDirectionAxis(whichOfficer, officerPosArr[whichOfficer], relativePositions);
        if (directionAxis == 'horizontal') {
            if (relativePositions[0] == 'right') {
                display.mirrorObj(officer, '-1');
                officerPosArr[whichOfficer][0] = officerPosArr[whichOfficer][0] + officerMoveRate[whichOfficer];
            } else if (relativePositions[0] == 'left') {
                display.mirrorObj(officer, '1');
                officerPosArr[whichOfficer][0] = officerPosArr[whichOfficer][0] - officerMoveRate[whichOfficer];
            }
            officerPosArr[whichOfficer][0] = adjustCrossBorder(officerPosArr[whichOfficer][0]);
        } else if (directionAxis == 'vertical') {
            if (relativePositions[1] == 'up') {
                officerPosArr[whichOfficer][1] = officerPosArr[whichOfficer][1] - officerMoveRate[whichOfficer];
            } else if (relativePositions[1] == 'down') {
                officerPosArr[whichOfficer][1] = officerPosArr[whichOfficer][1] + officerMoveRate[whichOfficer];
            }
            officerPosArr[whichOfficer][1] = adjustCrossBorder(officerPosArr[whichOfficer][1]);
        }
    }

    function nextThiefPosition(posArr, movRate, direction)
    {
        var level;
        switch (direction) {
            case 'left':
                posArr[0] = posArr[0] - movRate;
                level = 0;
                break;
            case 'right':
                posArr[0] = posArr[0] + movRate;
                level = 0;
                break;
            case 'up':
                posArr[1] = posArr[1] - movRate;
                level = 1;
                break;
            case 'down':
                posArr[1] = posArr[1] + movRate;
                level = 1;
        }
        posArr[level] = adjustCrossBorder(posArr[level])
        return posArr;
    }

    function officer2StartPos()
    {
        var midMap = MAPSIZE / 2,
            tolerance = MAPSIZE - CHARSIZE;
        officerPosArr[1][0] = (thiefPosArr[0] >= midMap) ? 0 : tolerance;
        officerPosArr[1][0] = (thiefPosArr[1] >= midMap) ? 0 : tolerance;
    }

    function randomCoords()
    {
        return new Array(
                Math.floor((Math.random() * (MAPSIZE - ITEMSIZE))),
                Math.floor((Math.random() * (MAPSIZE - ITEMSIZE)))
            );
    }

    function reached(hunter, hunterSize, prey, preySize)
    {
        return (
                (
                    (hunter[0] >= (prey[0] - hunterSize))
                    && (hunter[0] < (prey[0] + preySize))
                )
                && (
                    (hunter[1] >= (prey[1] - hunterSize))
                    && (hunter[1] < (prey[1] + preySize))
                )
            );
    }

    function sortBomb()
    {
        if ((currLevel > 1) && (!isBombVisible) && (areChancesAmoung(5))) {
            display.bomb();
        } else if ((isBombVisible) && (areChancesAmoung(10))) {
            display.hideBomb();
        }
    }

    function sortMolotov()
    {
        if (areChancesAmoung(10))
            return true;
        return false;
    }


    function getRelativePositions(officerPos)
    {
        var position = [];
        position[0] = getTargetHorRelPos(officerPos);
        position[1] = getTargetVerRelPos(officerPos);
        return position;
    }

    function getTargetHorRelPos(officerPos)
    {
        if (officerPos[0] > thiefPosArr[0])
            return 'left';
        if (officerPos[0] < thiefPosArr[0])
            return 'right';
        return 'same';
    }

    function getTargetVerRelPos(officerPos)
    {
        if (officerPos[1] > thiefPosArr[1])
           return 'up';
        if (officerPos[1] < thiefPosArr[1])
            return 'down';
        return 'same';
    }

    function setDirectionAxis(officer, officerPos, relativePositions)
    {
        var diffX = getDiffModuleOnX(officerPos, relativePositions[0]),
            diffY = getDiffModuleOnY(officerPos, relativePositions[1]);
        if (diffX != diffY) {
            if (officer == 0) {
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

    function getDiffModuleOnX(officerPosArr, relativeX)
    {
        if (relativeX == 'right')
           return thiefPosArr[0] - officerPosArr[0];
        if (relativeX == 'left')
            return officerPosArr[0] - thiefPosArr[0];
        return 0;
    }

    function getDiffModuleOnY(officerPosArr, relativeY)
    {
        if (relativeY == 'up')
            return officerPosArr[1] - thiefPosArr[1];
        if (relativeY == 'down')
            return thiefPosArr[1] - officerPosArr[1];
        return 0;
    }

    function adjustCrossBorder(pos)
    {
        if (pos > (MAPSIZE - CHARSIZE))
            return -CROSSBORDERTOLERANCE;
        if (pos <= (-CHARSIZE + CROSSBORDERTOLERANCE))
            return pos + (MAPSIZE - CROSSBORDERTOLERANCE);
        return pos;
    }

    function areChancesAmoung(percetage)
    {
        return (Math.floor((Math.random() * 100) + 1) <= percetage);
    }

}
