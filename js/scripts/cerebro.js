$("document").ready(function() {

    // Define a posição relativa X do alvo
    $.definirPosRelXAlvo = function(arrPosPolicia) {
    	if (arrPosPolicia[0] > thiefPosArr[0]) {
    		posRelX = 'left';
    	} else if (arrPosPolicia[0] == thiefPosArr[0]) {
    		posRelX = 'igual';
    	} else {
    		posRelX = 'right';
    	}
    };

    // Define a posição relativa Y do alvo
    $.definirPosRelYAlvo = function(arrPosPolicia) {
    	if (arrPosPolicia[1] > thiefPosArr[1]) {
    		posRelY = 'acima';
    	} else if (arrPosPolicia[1] == thiefPosArr[1]) {
    		posRelY = 'igual';
    	} else {
    		posRelY = 'abaixo';
    	}
    };

    // Checa dif (em coords) entre o Policia e a posição x do alvo
    $.checaPosGeoX = function(arrPosPolicia) {
    	if (posRelX == 'right') {
    		diferencaX = thiefPosArr[0] - arrPosPolicia[0];
    	} else if (posRelX == 'left') {
    		diferencaX = arrPosPolicia[0] - thiefPosArr[0];
    	} else {
    		diferencaX = 0;
    	}
    };

    // Checa dif (em coords) entre o Policia e a posição y do alvo
    $.checaPosGeoY = function(arrPosPolicia) {
    	if (posRelY == 'acima') {
    		diferencaY = arrPosPolicia[1] - thiefPosArr[1];
    	} else if (posRelY == 'abaixo') {
    		diferencaY = thiefPosArr[1] - arrPosPolicia[1];
    	} else {
    		diferencaY = 0;
    	}
    };

    $.setDirecao = function(policial) {
        if (policial == 1) {
            if (diferencaX > diferencaY) {
                direcao = 'horizontal';
            } else if (diferencaX < diferencaY) {
                direcao = 'vertical';
            } else {
                if (Math.floor((Math.random() * 2) + 1) == 1) {
                        direcao = 'horizontal';
                } else {
                        direcao = 'vertical';
                }
            }
        } else {
            if (diferencaX > diferencaY) {
                direcao = 'vertical';
            } else if (diferencaX < diferencaY) {
                direcao = 'horizontal';
            } else {
                if (thiefPosArr[0] == arrPosPolicia2[0]) {
                    direcao = 'horizontal';
                } else if (thiefPosArr[1] == arrPosPolicia2[1]) {
                    direcao = 'vertical';
                } else {
                    if (Math.floor((Math.random() * 2) + 1) == 1) {
                        direcao = 'horizontal';
                    } else {
                        direcao = 'vertical';
                    }
                }
            }
        }
    };

    $.adjustCrossBorder = function(pos) {
        if (pos > (mapSize - TAMANHOOBJETO))
			return -CROSSBORDERTOLERANCE;
		if (pos <= (-TAMANHOOBJETO + CROSSBORDERTOLERANCE))
			return pos + (mapSize - CROSSBORDERTOLERANCE);
        return pos;
    };

    $.sorteiaFundo = function() {
        var rand = Math.floor(Math.random() * backgrounds.length);
        while ($("#backgroundImage").attr("src") == "url(img/"+backgrounds[rand]+")") {
            rand = Math.floor(Math.random() * backgrounds.length);
        }
        return backgrounds[rand];
    }

    $.sortMolotov = function() {
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
                    (arrPosPolicia1[0] - 5),
                    (arrPosPolicia1[1] - 5)
                )
            );
            if (currLevel >= TWOPOLICEMENLEVEL) {
                $("#contador2").show();
                $("#contador2").html(molotovTime);
                $.setObjectPosition(
                    $("#contador2"),
                    new Array(
                        (arrPosPolicia2[0] - 5),
                        (arrPosPolicia2[1] - 5)
                    )
                );
            }
        }
        if (molotovTime == 0) {
            $("#policia").attr("src", "img/guarda.gif");
            $("#contador").hide();
            if (currLevel >= TWOPOLICEMENLEVEL) {
                $("#policia2").attr("src", "img/guarda.gif");
                $("#contador2").hide();
            }
        }
    }

    $.sortBomb = function() {
        if ((bombVisible == false) && (Math.floor((Math.random() * 100) + 1) <= 5)) {
            $.apareceBomba();
        } else if ((bombVisible == true) && (Math.floor((Math.random() * 100) + 1) <= 10)) {
            $("#bomba").hide();
            bombVisible = false;
        }
    }

    $.getRandomCoords = function() {
        return new Array(
                Math.floor((Math.random() * (mapSize - TAMANHOITEM))),
                Math.floor((Math.random() * (mapSize - TAMANHOITEM)))
            );
    }

    $.calculateMessagePosition = function(arrPosObjeto) {
        posLeft = parseInt(arrPosObjeto[0]);
        ninety = $.regraDeTres(90, mapSize);
        thirty = $.regraDeTres(30, mapSize);
        if ((posLeft + ninety) >= mapSize) {
            dif = (posLeft + ninety) - mapSize;
            posLeft = parseInt(arrPosObjeto[0]) - ((posLeft + ninety) - mapSize);
        }
        posTop = (parseInt(arrPosObjeto[1]) + TAMANHOOBJETO);
        if ((posTop + thirty) >= mapSize) {
            posTop = parseInt(arrPosObjeto[1]) - thirty;
        }
        return new Array(posLeft, posTop);
    }

    $.displayItem = function(obj, arrPosition) {
        $.setObjectPosition(obj, arrPosition);
        obj.show();
    }

    $.mirrorObj = function(objeto, escala) {
        objeto.css("-moz-transform", "scaleX("+escala+")");
        objeto.css("-webkit-transform", "scaleX("+escala+")");
        objeto.css("-o-transform", "scaleX("+escala+")");
        objeto.css("transform", "scaleX("+escala+")");
        objeto.css("-ms-filter", "fliph");
        objeto.css("filter", "fliph");
    }

    $.setObjectPosition = function(obj, posArr) {
        obj.css("left", posArr[0]);
        obj.css("top", posArr[1]);
    }

    $.getObjectPosition = function(object) {
        return new Array(
                object.css("left").replace(new RegExp("px", 'g'), ""),
                object.css("top").replace(new RegExp("px", 'g'), "")
            );
    }

    $.set2ndPolicemanPosition = function() {
        if (thiefPosArr[0] > (mapSize / 2)) {
            arrPosPolicia2[0] = 0;
        } else if (thiefPosArr[0] < (mapSize / 2)) {
            arrPosPolicia2[0] = (mapSize - TAMANHOOBJETO);
        }
        if (thiefPosArr[1] > (mapSize / 2)) {
            arrPosPolicia2[1] = 0;
        } else if (thiefPosArr[1] < (mapSize / 2)) {
            arrPosPolicia2[1] = (mapSize - TAMANHOOBJETO);
        }
        $.setObjectPosition($("#policia2"), arrPosPolicia2);
    }

    $.regraDeTres = function(atual, mapSize)  {
        return Math.floor((atual / 500) * mapSize);
    }

    $.setNextPosition = function(posArr, movRate, direction) {
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
});