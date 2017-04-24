$('document').ready(function()
{

    $.setNewOfficerPos = function(whichOfficer, officer, officerPosArr, movementRate)
    {
        var relativePositions = getRelativePositions(officerPosArr);
        var directionAxis = setDirectionAxis(whichOfficer, officerPosArr, relativePositions);
        if (directionAxis == 'horizontal') {
            if (relativePositions[0] == 'right') {
                $.mirrorObj(officer, '-1');
                officerPosArr[0] = officerPosArr[0] + movementRate;
            } else if (relativePositions[0] == 'left') {
                $.mirrorObj(officer, '1');
                officerPosArr[0] = officerPosArr[0] - movementRate;
            }
            officerPosArr[0] = $.adjustCrossBorder(officerPosArr[0]);
        } else if (directionAxis == 'vertical') {
            if (relativePositions[1] == 'up') {
                officerPosArr[1] = officerPosArr[1] - movementRate;
            } else if (relativePositions[1] == 'down') {
                officerPosArr[1] = officerPosArr[1] + movementRate;
            }
            officerPosArr[1] = $.adjustCrossBorder(officerPosArr[1]);
        }
        return officerPosArr;
    };

    $.adjustCrossBorder = function(pos)
    {
        if (pos > (mapSize - OBJSIZE))
            return -CROSSBORDERTOLERANCE;
        if (pos <= (-OBJSIZE + CROSSBORDERTOLERANCE))
            return pos + (mapSize - CROSSBORDERTOLERANCE);
        return pos;
    };

    $.sorteiaFundo = function()
    {
        var rand = Math.floor(Math.random() * backgrounds.length);
        while ($("#backgroundImage").attr("src") == "url(img/"+backgrounds[rand]+")") {
            rand = Math.floor(Math.random() * backgrounds.length);
        }
        return backgrounds[rand];
    }

    $.sortMolotov = function()
    {
        if ((molotovVisible == false) && (Math.floor((Math.random() * 100) + 1) <= 10)) {
            $.apareceMolotov();
        } else if ((molotovVisible == true) && (Math.floor((Math.random() * 100) + 1) <= 10)) {
            $("#molotov").hide();
            molotovVisible = false;
        }
        if (molotovTime > 0) {
            molotovTime = molotovTime - 1;
            $("#contador").show();
            $("#contador").html(molotovTime);
            $.setObjectPosition(
                $("#contador"),
                new Array(
                    (officer1PosArr[0] - 5),
                    (officer1PosArr[1] - 5)
                )
            );
            if (currLevel >= TWOPOLICEMENLEVEL) {
                $("#contador2").show();
                $("#contador2").html(molotovTime);
                $.setObjectPosition(
                    $("#contador2"),
                    new Array(
                        (officer2PosArr[0] - 5),
                        (officer2PosArr[1] - 5)
                    )
                );
            }
        }
        if (molotovTime == 0) {
            $('#officer1').attr("src", "img/guarda.gif");
            $("#contador").hide();
            if (currLevel >= TWOPOLICEMENLEVEL) {
                $('#officer2').attr("src", "img/guarda.gif");
                $("#contador2").hide();
            }
        }
    }

    $.sortBomb = function()
    {
        if ((bombVisible == false) && (Math.floor((Math.random() * 100) + 1) <= 5)) {
            $.apareceBomba();
        } else if ((bombVisible == true) && (Math.floor((Math.random() * 100) + 1) <= 10)) {
            $("#bomba").hide();
            bombVisible = false;
        }
    }

    $.getRandomCoords = function()
    {
        return new Array(
                Math.floor((Math.random() * (mapSize - TAMANHOITEM))),
                Math.floor((Math.random() * (mapSize - TAMANHOITEM)))
            );
    }

    $.calculateMessagePosition = function(arrPosObjeto)
    {
        posLeft = parseInt(arrPosObjeto[0]);
        ninety = $.regraDeTres(90, mapSize);
        thirty = $.regraDeTres(30, mapSize);
        if ((posLeft + ninety) >= mapSize) {
            dif = (posLeft + ninety) - mapSize;
            posLeft = parseInt(arrPosObjeto[0]) - ((posLeft + ninety) - mapSize);
        }
        posTop = (parseInt(arrPosObjeto[1]) + OBJSIZE);
        if ((posTop + thirty) >= mapSize) {
            posTop = parseInt(arrPosObjeto[1]) - thirty;
        }
        return new Array(posLeft, posTop);
    }

    $.displayItem = function(obj, arrPosition)
    {
        $.setObjectPosition(obj, arrPosition);
        obj.show();
    }

    $.mirrorObj = function(objeto, escala)
    {
        objeto.css("-moz-transform", "scaleX("+escala+")");
        objeto.css("-webkit-transform", "scaleX("+escala+")");
        objeto.css("-o-transform", "scaleX("+escala+")");
        objeto.css("transform", "scaleX("+escala+")");
        objeto.css("-ms-filter", "fliph");
        objeto.css("filter", "fliph");
    }

    $.setObjectPosition = function(obj, posArr)
    {
        console.log('obj');
        console.log(obj)
        obj.css("left", posArr[0]);
        obj.css("top", posArr[1]);
    }

    $.getObjectPosition = function(object)
    {
        return new Array(
                object.css("left").replace(new RegExp("px", 'g'), ""),
                object.css("top").replace(new RegExp("px", 'g'), "")
            );
    }

    $.set2ndPolicemanPosition = function()
    {
        if (thiefPosArr[0] > (mapSize / 2)) {
            officer2PosArr[0] = 0;
        } else if (thiefPosArr[0] < (mapSize / 2)) {
            officer2PosArr[0] = (mapSize - OBJSIZE);
        }
        if (thiefPosArr[1] > (mapSize / 2)) {
            officer2PosArr[1] = 0;
        } else if (thiefPosArr[1] < (mapSize / 2)) {
            officer2PosArr[1] = (mapSize - OBJSIZE);
        }
        $.setObjectPosition($('#officer2'), officer2PosArr);
    }

    $.regraDeTres = function(atual, mapSize)
    {
        return Math.floor((atual / 500) * mapSize);
    }

    $.setNextPosition = function(posArr, movRate, direction)
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
        posArr[level] = $.adjustCrossBorder(posArr[level])
        return posArr;
    }

    // Define a posição relativa X do alvo
    var definirPosRelXAlvo = function(officerPosArr)
    {
    	if (officerPosArr[0] > thiefPosArr[0])
    		return 'left';
    	if (officerPosArr[0] == thiefPosArr[0])
    		return 'same';
    	return 'right';
    };

    // Define a posição relativa Y do alvo
    var definirPosRelYAlvo = function(officerPosArr)
    {
        if (officerPosArr[1] > thiefPosArr[1])
           return 'up';
        if (officerPosArr[1] == thiefPosArr[1])
            return 'same';
        return 'down';
    };

    // Checa dif (em coords) entre o Policia e a posição x do alvo
    var checaPosGeoX = function(officerPosArr, relativeX)
    {
        if (relativeX == 'right')
           return thiefPosArr[0] - officerPosArr[0];
        if (relativeX == 'left')
            return officerPosArr[0] - thiefPosArr[0];
        return 0;
    };

    // Checa dif (em coords) entre o Policia e a posição y do alvo
    var checaPosGeoY = function(officerPosArr, relativeY)
    {
    	if (relativeY == 'up')
    		return officerPosArr[1] - thiefPosArr[1];
    	if (relativeY == 'down')
    		return thiefPosArr[1] - officerPosArr[1];
        return 0;
    };

    var setDirectionAxis = function(officer, officerPosArr, relativePositions)
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
        return 'vertical';    }


    var getRelativePositions = function(officerPosArr)
    {
        var position = [];
        position[0] = definirPosRelXAlvo(officerPosArr);
        position[1] = definirPosRelYAlvo(officerPosArr);
        return position;
    }

});