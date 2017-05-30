function Calculator()
{
    this.crossMultiply = crossMultiply;
    this.getObjectPosition = getObjectPosition;
    this.inclination = inclination;
    this.isTwoPolicemenLevel = isTwoPolicemenLevel;
    this.isLevelChange = isLevelChange;
    this.messagePos = messagePos;
    this.nextOfficerPos = nextOfficerPos;
    this.nextThiefPosition = nextThiefPosition;
    this.newThrowItemPos = newThrowItemPos;
    this.officer2StartPos = officer2StartPos;
    this.randomCoords = randomCoords;
    this.reached = reached;
    this.sortBomb = sortBomb;
    this.sortMolotov = sortMolotov;
    this.thowVariationRate = thowVariationRate;

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

    function isLevelChange()
    {
        return ((points != 0) && (points >= (lastChangedLevel + PTSTOCHANGELEVEL)));
    }

    function messagePos(objPosArr)
    {
        var leftPos = parseInt(objPosArr[0]),
            topPos = parseInt(objPosArr[1]) + CHARSIZE,
            ninety = crossMultiply(90),
            thirty = crossMultiply(30);
        if ((leftPos + ninety) >= MAPSIZE)
            leftPos = parseInt(objPosArr[0]) - ((leftPos + ninety) - MAPSIZE);
        if ((topPos + thirty) >= MAPSIZE)
            topPos = parseInt(objPosArr[1]) - thirty;
        return new Array(leftPos, topPos);
    }

    function nextOfficerPos(whichOfficer)
    {
        var officer = (whichOfficer == 0) ? Officer1 : Officer2;
        var relativePositions = getRelativePositions(whichOfficer);
        if (movingAxis(whichOfficer) == 'horizontal') {
            switch (relativePositions[0]) {
                case 'right':
                    display.mirrorObj(officer, '-1');
                    officerPosArr[whichOfficer][0] = officerPosArr[whichOfficer][0] + officerMoveRate[whichOfficer];
                    break;
                case 'left':
                    display.mirrorObj(officer, '1');
                    officerPosArr[whichOfficer][0] = officerPosArr[whichOfficer][0] - officerMoveRate[whichOfficer];
            }
            return;
        }
        switch (relativePositions[1]) {
            case 'up':
                officerPosArr[whichOfficer][1] = officerPosArr[whichOfficer][1] - officerMoveRate[whichOfficer];
                break;
            case 'down':
                officerPosArr[whichOfficer][1] = officerPosArr[whichOfficer][1] + officerMoveRate[whichOfficer];
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
        if ((!isBombVisible) && (areChancesAmoung(5))) {
            return 'bomb';
        } else if ((isBombVisible) && (areChancesAmoung(10))) {
            return 'hideBomb';
        }
        return false;
    }

    function sortMolotov()
    {
        if (areChancesAmoung(10))
            return true;
        return false;
    }


    function getRelativePositions(officer)
    {
        return [
            getTargetHorRelPos(officer),
            getTargetVerRelPos(officer)
        ];
    }

    function getTargetHorRelPos(officer)
    {
        if (officerPosArr[officer][0] > thiefPosArr[0])
            return 'left';
        if (officerPosArr[officer][0] < thiefPosArr[0])
            return 'right';
        return 'same';
    }

    function getTargetVerRelPos(officer)
    {
        if (officerPosArr[officer][1] > thiefPosArr[1])
           return 'up';
        if (officerPosArr[officer][1] < thiefPosArr[1])
            return 'down';
        return 'same';
    }

    function movingAxis(officer)
    {
        var diffX = getAbsoluteDiffX(officerPosArr[officer][0]),
            diffY = getAbsoluteDiffY(officerPosArr[officer][1]);
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

    function getAbsoluteDiffX(officerPosX)
    {
        return Math.abs(officerPosX - thiefPosArr[0]);
    }

    function getAbsoluteDiffY(officerPosY)
    {
        return Math.abs(officerPosY - thiefPosArr[1]);
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

    function thowVariationRate(itemPos, targetPos)
    {
        return Math.sqrt(THROWSPEED / (parseFloat(Math.pow(inclination(itemPos, targetPos),2)+1)));
    }

    function inclination(itemPos, targetPos)
    {
        var deltaX = targetPos[0] - itemPos[0],
            deltaY = targetPos[1] - itemPos[1];
        return (deltaX != 0) ? (deltaY/deltaX).toFixed(4) : 0;
    }

    function newThrowItemPos(shooterPosX, shooterPosY, itemPos, targetPos)
    {
        var variationRate = thowVariationRate(itemPos, targetPos);
        if (itemPos[0] != targetPos[0]) {
            itemPos[0] = setItemNewCoord(itemPos[0], targetPos[0], variationRate);
            itemPos[1] = Math.round(inclination(itemPos, targetPos) * (itemPos[0] - shooterPosX) + shooterPosY);
            return;
        }
        itemPos[1] = setItemNewCoord(itemPos[1], targetPos[1], variationRate);

        function setItemNewCoord(sourceCoord, destCoord)
        {
            return (sourceCoord < destCoord) ? sourceCoord + variationRate : sourceCoord - variationRate;
        }
    }

}
