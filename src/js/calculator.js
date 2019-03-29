function Calculator()
{
    this.crossMultiply = crossMultiply;
    this.isTwoPolicemenLevel = isTwoPolicemenLevel;
    this.nextThiefPosition = nextThiefPosition;
    this.officer2StartPos = officer2StartPos;
    this.randomCoords = randomCoords;
    this.reached = reached;
    this.setNewThrowItemPos = setNewThrowItemPos;
    this.sortBomb = sortBomb;
    this.sortMolotov = sortMolotov;
    this.variationRate = variationRate;
    this.inclination = inclination;
    this.getObjectPosition = getObjectPosition;

    return this;

    function getObjectPosition(obj) {
        return new Array(
                parseInt(obj.style.left.replace(new RegExp("px", 'g'), "")),
                parseInt(obj.style.top.replace(new RegExp("px", 'g'), ""))
            );
    }

    function crossMultiply(actual) {
        return Math.floor((actual / 500) * MAPSIZE);
    }

    function isTwoPolicemenLevel() {
        return (currLevel >= TWOPOLICEMENLEVEL);
    }

    function nextThiefPosition(posArr, movRate, direction) {
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

    function officer2StartPos() {
        var midMap = MAPSIZE / 2,
            tolerance = MAPSIZE - CHARSIZE;
        officerPosArr[1][0] = (thiefPosArr[0] >= midMap) ? 0 : tolerance;
        officerPosArr[1][0] = (thiefPosArr[1] >= midMap) ? 0 : tolerance;
    }

    function randomCoords() {
        return new Array(
                Math.floor((Math.random() * (MAPSIZE - ITEMSIZE))),
                Math.floor((Math.random() * (MAPSIZE - ITEMSIZE)))
            );
    }

    function reached(hunter, hunterSize, prey, preySize) {
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

    function setNewThrowItemPos(shooterX, shooterY, item, target, incline, variation) {
        if (item[0] != target[0]) {
            item[0] = setItemNewCoord(item[0], target[0]);
            item[1] = Math.round(incline * (item[0] - shooterX) + shooterY);
        } else {
            item[1] = setItemNewCoord(item[1], target[1]);    
        }
        return item;

        function setItemNewCoord(sourceCoord, destCoord) {
            return (sourceCoord < destCoord) ? sourceCoord + variation : sourceCoord - variation;
        }

    }

    function sortBomb() {
        if ((!isBombVisible) && (areChancesAmoung(5)))
            return 'bomb';
        if ((isBombVisible) && (areChancesAmoung(10)))
            return 'hideBomb';
        return false;
    }

    function sortMolotov() {
        return (areChancesAmoung(10));
    }

    function variationRate(speed, incline) {
        return Math.sqrt(speed / (parseFloat(Math.pow(incline,2)+1)));
    }

    function inclination(itemPos, targetPos) {
        var deltaX = targetPos[0] - itemPos[0],
            deltaY = targetPos[1] - itemPos[1];
        return (deltaX != 0) ? (deltaY/deltaX).toFixed(4) : 0;
    }

    function adjustCrossBorder(pos) {
        if (pos > MAPSIZE)
            return -CROSSBORDERTOLERANCE;
        if (pos <= (-CHARSIZE + CROSSBORDERTOLERANCE))
            return MAPSIZE - CROSSBORDERTOLERANCE;
        return pos;
    }

    function areChancesAmoung(percetage) {
        return (Math.floor((Math.random() * 100) + 1) <= percetage);
    }

}
