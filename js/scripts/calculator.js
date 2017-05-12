function Calculator()
{
    this.reached = reached;
    this.setNewOfficerPos = setNewOfficerPos;
    this.setNextPosition = setNextPosition;
    this.sortMolotov = sortMolotov;
    this.setObjectPosition = setObjectPosition;
    this.getObjectPosition = getObjectPosition;
    this.sortBomb = sortBomb;
    this.getRandomCoords = getRandomCoords;
    this.calculateMessagePosition = calculateMessagePosition;
    this.regraDeTres = regraDeTres;
    this.set2ndPolicemanPosition = set2ndPolicemanPosition;
    this.setOfficersStartCoords = setOfficersStartCoords;
    this.relocateCharacters = relocateCharacters;
    
    return this;

    function relocateCharacters()
    {
        setObjectPosition(Thief, thiefPosArr);
        setObjectPosition(Officer1, officer1PosArr);
        setObjectPosition(Officer2, officer2PosArr);
    }

    function setOfficersStartCoords()
    {
        var coord = MAPSIZE - CHARSIZE;
        officer1PosArr[0] = coord;
        officer1PosArr[1] = coord;
        officer2PosArr[0] = coord;
        officer2PosArr[1] = coord;
    }

    function reached(cacador, tamanhoCacador, presa, tamanhoPresa)
    {
        if (
            ((cacador[0] >= (presa[0] - tamanhoCacador))
            && (cacador[0] < (presa[0] + tamanhoPresa)))
            && ((cacador[1] >= (presa[1] - tamanhoCacador))
            && (cacador[1] < (presa[1] + tamanhoPresa)))
        ){
            return true;
        }
        return false;
    }
    
    function setNewOfficerPos(whichOfficer, officer, officerPosArr, movementRate)
    {
        var relativePositions = getRelativePositions(officerPosArr);
        var directionAxis = setDirectionAxis(whichOfficer, officerPosArr, relativePositions);
        if (directionAxis == 'horizontal') {
            if (relativePositions[0] == 'right') {
                display.mirrorObj(officer, '-1');
                officerPosArr[0] = officerPosArr[0] + movementRate;
            } else if (relativePositions[0] == 'left') {
                display.mirrorObj(officer, '1');
                officerPosArr[0] = officerPosArr[0] - movementRate;
            }
            officerPosArr[0] = adjustCrossBorder(officerPosArr[0]);
        } else if (directionAxis == 'vertical') {
            if (relativePositions[1] == 'up') {
                officerPosArr[1] = officerPosArr[1] - movementRate;
            } else if (relativePositions[1] == 'down') {
                officerPosArr[1] = officerPosArr[1] + movementRate;
            }
            officerPosArr[1] = adjustCrossBorder(officerPosArr[1]);
        }
        return officerPosArr;
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

    function setObjectPosition(obj, posArr)
    {
        obj.css("left", posArr[0]);
        obj.css("top", posArr[1]);
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
        posLeft = parseInt(arrPosObjeto[0]);
        ninety = regraDeTres(90, MAPSIZE);
        thirty = regraDeTres(30, MAPSIZE);
        if ((posLeft + ninety) >= MAPSIZE) {
            dif = (posLeft + ninety) - MAPSIZE;
            posLeft = parseInt(arrPosObjeto[0]) - ((posLeft + ninety) - MAPSIZE);
        }
        posTop = (parseInt(arrPosObjeto[1]) + CHARSIZE);
        if ((posTop + thirty) >= MAPSIZE) {
            posTop = parseInt(arrPosObjeto[1]) - thirty;
        }
        return new Array(posLeft, posTop);
    }

    function regraDeTres(atual, MAPSIZE)
    {
        return Math.floor((atual / 500) * MAPSIZE);
    }

    function set2ndPolicemanPosition()
    {
        if (thiefPosArr[0] > (MAPSIZE / 2)) {
            officer2PosArr[0] = 0;
        } else if (thiefPosArr[0] < (MAPSIZE / 2)) {
            officer2PosArr[0] = (MAPSIZE - CHARSIZE);
        }
        if (thiefPosArr[1] > (MAPSIZE / 2)) {
            officer2PosArr[1] = 0;
        } else if (thiefPosArr[1] < (MAPSIZE / 2)) {
            officer2PosArr[1] = (MAPSIZE - CHARSIZE);
        }
        setObjectPosition(Officer2, officer2PosArr);
    }

    /**** PRIVATE METHODS ****/

    function getRelativePositions(officerPosArr)
    {
        var position = [];
        position[0] = definirPosRelXAlvo(officerPosArr);
        position[1] = definirPosRelYAlvo(officerPosArr);
        return position;
    }

    // Define a posição relativa X do alvo
    function definirPosRelXAlvo(officerPosArr)
    {
        if (officerPosArr[0] > thiefPosArr[0])
            return 'left';
        if (officerPosArr[0] == thiefPosArr[0])
            return 'same';
        return 'right';
    }

    // Define a posição relativa Y do alvo
    function definirPosRelYAlvo(officerPosArr)
    {
        if (officerPosArr[1] > thiefPosArr[1])
           return 'up';
        if (officerPosArr[1] == thiefPosArr[1])
            return 'same';
        return 'down';
    }

    function setDirectionAxis(officer, officerPosArr, relativePositions)
    {
        var diffX = checaPosGeoX(officerPosArr, relativePositions[0]);
        var diffY = checaPosGeoY(officerPosArr, relativePositions[1]);
        if (officer == 1) {
            if (diffX > diffY)
                return 'horizontal';
            if (diffX < diffY)
                return 'vertical';
            if (Math.floor((Math.random() * 2) + 1) == 1)
                return 'horizontal';
        } else {
            if (diffX > diffY)
                return 'vertical';
            if (diffX < diffY)
                return 'horizontal';
            if (thiefPosArr[0] == officer2PosArr[0])
                return 'horizontal';
            if (thiefPosArr[1] == officer2PosArr[1])
                return 'vertical';
            if (Math.floor((Math.random() * 2) + 1) == 1)
                return 'horizontal';
        }
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
