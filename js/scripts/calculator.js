function Calculator()
{
    this.reached = reached;
    this.setNewOfficerPos = setNewOfficerPos;
    this.setNextPosition = setNextPosition;
    this.sortMolotov = sortMolotov;
    this.getObjectPosition = getObjectPosition;
    this.sortBomb = sortBomb;
    this.getRandomCoords = getRandomCoords;
    this.calculateMessagePosition = calculateMessagePosition;
    this.regraDeTres = regraDeTres;
    this.set2ndPolicemanPosition = set2ndPolicemanPosition;
    
    return this;

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
    
    function setNewOfficerPos(whichOfficer, officer)
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

    function setNextPosition(posArr, movRate, direction)
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

    function sortMolotov()
    {
        if ((!isMolotovVisible) && (Math.floor((Math.random() * 100) + 1) <= 10)) {
            display.displayMolotov();
        } else if ((isMolotovVisible) && (Math.floor((Math.random() * 100) + 1) <= 10)) {
            display.hideMolotov();
        }
    }

    function getObjectPosition(object)
    {
        return new Array(
                object.css("left").replace(new RegExp("px", 'g'), ""),
                object.css("top").replace(new RegExp("px", 'g'), "")
            );
    }

    function sortBomb()
    {
        if ((currLevel > 1) && (!isBombVisible) && (Math.floor((Math.random() * 100) + 1) <= 5)) {
            display.displayBomb();
        } else if ((isBombVisible) && (Math.floor((Math.random() * 100) + 1) <= 10)) {
            display.hideBomb();
        }
    }

    function getRandomCoords()
    {
        return new Array(
                Math.floor((Math.random() * (MAPSIZE - ITEMSIZE))),
                Math.floor((Math.random() * (MAPSIZE - ITEMSIZE)))
            );
    }

    function calculateMessagePosition(arrPosObjeto)
    {
        var posLeft = parseInt(arrPosObjeto[0]),
            posTop = parseInt(arrPosObjeto[1]) + CHARSIZE,
            ninety = regraDeTres(90, MAPSIZE),
            thirty = regraDeTres(30, MAPSIZE);
        if ((posLeft + ninety) >= MAPSIZE)
            posLeft = parseInt(arrPosObjeto[0]) - ((posLeft + ninety) - MAPSIZE);
        if ((posTop + thirty) >= MAPSIZE)
            posTop = parseInt(arrPosObjeto[1]) - thirty;
        return new Array(posLeft, posTop);
    }

    function regraDeTres(atual, MAPSIZE)
    {
        return Math.floor((atual / 500) * MAPSIZE);
    }

    function set2ndPolicemanPosition()
    {
        if (thiefPosArr[0] > (MAPSIZE / 2)) {
            officerPosArr[1][0] = 0;
        } else if (thiefPosArr[0] < (MAPSIZE / 2)) {
            officerPosArr[1][0] = (MAPSIZE - CHARSIZE);
        }
        if (thiefPosArr[1] > (MAPSIZE / 2)) {
            officerPosArr[1][1] = 0;
        } else if (thiefPosArr[1] < (MAPSIZE / 2)) {
            officerPosArr[1][1] = (MAPSIZE - CHARSIZE);
        }
        setObjectPosition(Officer2, officerPosArr[1]);
    }

    /**** PRIVATE METHODS ****/

    function getRelativePositions(officerPos)
    {
        var position = [];
        position[0] = definirPosRelXAlvo(officerPos);
        position[1] = definirPosRelYAlvo(officerPos);
        return position;
    }

    // Define a posição relativa X do alvo
    function definirPosRelXAlvo(officerPos)
    {
        if (officerPos[0] > thiefPosArr[0])
            return 'left';
        if (officerPos[0] == thiefPosArr[0])
            return 'same';
        return 'right';
    }

    // Define a posição relativa Y do alvo
    function definirPosRelYAlvo(officerPos)
    {
        if (officerPos[1] > thiefPosArr[1])
           return 'up';
        if (officerPos[1] == thiefPosArr[1])
            return 'same';
        return 'down';
    }

    function setDirectionAxis(officer, officerPos, relativePositions)
    {
        var diffX = checaPosGeoX(officerPos, relativePositions[0]);
        var diffY = checaPosGeoY(officerPos, relativePositions[1]);
        if (officer == 0) {
            if (diffX > diffY)
                return 'horizontal';
            if (diffX < diffY)
                return 'vertical';
        } else {
            if (diffX > diffY)
                return 'vertical';
            if (diffX < diffY)
                return 'horizontal';
        }
        if (Math.floor((Math.random() * 2) + 1) == 1)
            return 'horizontal';
        return 'vertical';
    }

    // Checa dif (em coords) entre o Policia e a posição x do alvo
    function checaPosGeoX(officerPosArr, relativeX)
    {
        if (relativeX == 'right')
           return thiefPosArr[0] - officerPosArr[0];
        if (relativeX == 'left')
            return officerPosArr[0] - thiefPosArr[0];
        return 0;
    }

    // Checa dif (em coords) entre o Policia e a posição y do alvo
    function checaPosGeoY(officerPosArr, relativeY)
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

}
