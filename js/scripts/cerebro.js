$("document").ready(function() {

    // Define a posição relativa X do alvo
    $.definirPosRelXAlvo = function(arrPosPolicia) {
    	if (arrPosPolicia[0] > arrPosLadrao[0]) {
    		posRelX = 'esquerda';
    	} else if (arrPosPolicia[0] == arrPosLadrao[0]) {
    		posRelX = 'igual';
    	} else {
    		posRelX = 'direita';
    	}
    };

    // Define a posição relativa Y do alvo
    $.definirPosRelYAlvo = function(arrPosPolicia) {
    	if (arrPosPolicia[1] > arrPosLadrao[1]) {
    		posRelY = 'acima';
    	} else if (arrPosPolicia[1] == arrPosLadrao[1]) {
    		posRelY = 'igual';
    	} else {
    		posRelY = 'abaixo';
    	}
    };

    // Checa dif (em coords) entre o Policia e a posição x do alvo
    $.checaPosGeoX = function(arrPosPolicia) {
    	if (posRelX == 'direita') {
    		diferencaX = arrPosLadrao[0] - arrPosPolicia[0];
    	} else if (posRelX == 'esquerda') {
    		diferencaX = arrPosPolicia[0] - arrPosLadrao[0];
    	} else {
    		diferencaX = 0;
    	}
    };

    // Checa dif (em coords) entre o Policia e a posição y do alvo
    $.checaPosGeoY = function(arrPosPolicia) {
    	if (posRelY == 'acima') {
    		diferencaY = arrPosPolicia[1] - arrPosLadrao[1];
    	} else if (posRelY == 'abaixo') {
    		diferencaY = arrPosLadrao[1] - arrPosPolicia[1];
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
                if (arrPosLadrao[0] == arrPosPolicia2[0]) {
                    direcao = 'horizontal';
                } else if (arrPosLadrao[1] == arrPosPolicia2[1]) {
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

	// Função que faz o cross-border
    $.ajustaLimite = function(posicao) {
        if (posicao > (mapSize - TAMANHOOBJETO)) {
			posicao = -CROSSBORDERTOLERANCE;
		} else if (posicao <= (-TAMANHOOBJETO + CROSSBORDERTOLERANCE)) {
			posicao = posicao + (mapSize - CROSSBORDERTOLERANCE);
		}
		return posicao;
    };

    $.sorteiaFundo = function() {
        var rand = Math.floor(Math.random() * backgrounds.length);
        while ($("#backgroundImage").attr("src") == "url(img/"+backgrounds[rand]+")") {
            rand = Math.floor(Math.random() * backgrounds.length);
        }
        return backgrounds[rand];
    }

    $.sortMolotov = function() {
        if ((molotovVis == false) && (Math.floor((Math.random() * 100) + 1) <= 10)) {
            $.apareceMolotov();
        } else if ((molotovVis == true) && (Math.floor((Math.random() * 100) + 1) <= 10)) {
            $("#molotov").hide();
            molotovVis = false;
        }
        if (tempoMolotov > 0) {
            tempoMolotov = tempoMolotov - 1;
            $("#contador").show();
            $("#contador").html(tempoMolotov);
            $.setObjectPosition(
                $("#contador"),
                new Array(
                    (arrPosPolicia1[0] - 5),
                    (arrPosPolicia1[1] - 5)
                )
            );
            if (faseAtual >= FASEDOISPOLICIAS) {
                $("#contador2").show();
                $("#contador2").html(tempoMolotov);
                $.setObjectPosition(
                    $("#contador2"),
                    new Array(
                        (arrPosPolicia2[0] - 5),
                        (arrPosPolicia2[1] - 5)
                    )
                );
            }
        }
        if (tempoMolotov == 0) {
            $("#policia").attr("src", "img/guarda.gif");
            $("#contador").hide();
            if (faseAtual >= FASEDOISPOLICIAS) {
                $("#policia2").attr("src", "img/guarda.gif");
                $("#contador2").hide();
            }
        }
    }

    $.sortBomb = function() {
        if ((bombaVis == false) && (Math.floor((Math.random() * 100) + 1) <= 5)) {
            $.apareceBomba();
        } else if ((bombaVis == true) && (Math.floor((Math.random() * 100) + 1) <= 10)) {
            $("#bomba").hide();
            bombaVis = false;
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

    $.flipHorizontal = function(objeto, escala) {
        objeto.css("-moz-transform", "scaleX("+escala+")");
        objeto.css("-webkit-transform", "scaleX("+escala+")");
        objeto.css("-o-transform", "scaleX("+escala+")");
        objeto.css("transform", "scaleX("+escala+")");
        objeto.css("-ms-filter", "fliph");
        objeto.css("filter", "fliph");
    }

    $.setObjectPosition = function(obj, arrPosition) {
        obj.css("left", arrPosition[0]);
        obj.css("top", arrPosition[1]);
    }

    $.getObjectPosition = function(object) {
        return new Array(
                object.css("left").replace(new RegExp("px", 'g'), ""),
                object.css("top").replace(new RegExp("px", 'g'), "")
            );
    }

    $.set2ndPolicemanPosition = function() {
        if (arrPosLadrao[0] > (mapSize / 2)) {
            arrPosPolicia2[0] = 0;
        } else if (arrPosLadrao[0] < (mapSize / 2)) {
            arrPosPolicia2[0] = (mapSize - TAMANHOOBJETO);
        }
        if (arrPosLadrao[1] > (mapSize / 2)) {
            arrPosPolicia2[1] = 0;
        } else if (arrPosLadrao[1] < (mapSize / 2)) {
            arrPosPolicia2[1] = (mapSize - TAMANHOOBJETO);
        }
        $.setObjectPosition($("#policia2"), arrPosPolicia2);
    }

    $.regraDeTres = function(atual, mapSize)  {
        return Math.floor((atual / 500) * mapSize);
    }

    $.setNextPosition = function(arrPos, movRate, alignment, direction) {
        if (alignment == 'horizontal') {
            if (direction == 'esquerda') {
                arrPos[0] = arrPos[0] - movRate;
            } else if (direction == 'direita') {
                arrPos[0] = arrPos[0] + movRate;
            }
            arrPos[0] = $.ajustaLimite(arrPos[0]);
        } else if (alignment == 'vertical') {
            if (direction == 'cima') {
                arrPos[1] = arrPos[1] - movRate;
            } else if (direction == 'baixo') {
                arrPos[1] = arrPos[1] + movRate;
            }
            arrPos[1] = $.ajustaLimite(arrPos[1])
        }
        return arrPos;
    }
});