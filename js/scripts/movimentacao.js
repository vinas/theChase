$('document').ready(function()
{

    $.move = function(direction)
    {
        moveThief(direction);
        movePolicemen();
    }

    var movePolicemen = function()
    {
        if (molotovTime <= 0) {
            movePolice(1);
            if (currLevel >= TWOPOLICEMENLEVEL) {
                movePolice(2);
            }
        }
    }

	var moveThief = function(direction) {
        thiefPosArr = $.setNextPosition(
                thiefPosArr,
                thiefMoveRate,
                direction
            );
        $.setObjectPosition(Thief, thiefPosArr);
        $.checkGotSomething();
    }




        $.definirPolicial = function(policial) {
            if (policial == 1) {
                return new Array(
                        arrPosPolicia1,
                        movimentacaoPolicia1,
                        $("#policia")
                    );
            } else if (policial == 2) {
                return new Array(
                        arrPosPolicia2,
                        movimentacaoPolicia2,
                        $("#policia2")
                    );
            }
        }

    	// Função que move Policia na direção do alvo
        var movePolice = function(policial) {

            policeman = $.definirPolicial(policial);
            
            arrPosPolicia = policeman[0];
            movimentacaoPolicia = policeman[1];
            objPolicial = policeman[2];

            $.relatePositions(arrPosPolicia);
            $.setDirecao(policial);

        	// Mexer Policia
        	if (direcao == 'horizontal') {
        		if (posRelX == 'right') {
                    $.mirrorObj(objPolicial,"-1");
        			arrPosPolicia[0] = arrPosPolicia[0] + movimentacaoPolicia;
        		} else if (posRelX == 'left') {
                    $.mirrorObj(objPolicial,"1");
        			arrPosPolicia[0] = arrPosPolicia[0] - movimentacaoPolicia;
        		}
                arrPosPolicia[0] = $.adjustCrossBorder(arrPosPolicia[0]);
        	} else if (direcao == 'vertical') {
        		if (posRelY == 'acima') {
        			arrPosPolicia[1] = arrPosPolicia[1] - movimentacaoPolicia;
        		} else if (posRelY == 'abaixo') {
        			arrPosPolicia[1] = arrPosPolicia[1] + movimentacaoPolicia;
        		}
                arrPosPolicia[1] = $.adjustCrossBorder(arrPosPolicia[1]);
        	}
            $.setObjectPosition(objPolicial, arrPosPolicia);

            // Se polícia alcançou o ladrão
            if ($.alcancou(arrPosPolicia, (TAMANHOOBJETO - CATCHTOLERANCE), thiefPosArr, (TAMANHOOBJETO - CATCHTOLERANCE))) {
               $.fimDeJogo("busted");
            }
        }

        $.relatePositions = function(arrPosPolicia) {
            // Definir se alvo está à direita ou à esquerda
            $.definirPosRelXAlvo(arrPosPolicia);
            // Definir se alvo está acima ou abaixo
            $.definirPosRelYAlvo(arrPosPolicia);
            // Checa diferenças (x e y) entre Policia e alvo
            $.checaPosGeoX(arrPosPolicia);
            $.checaPosGeoY(arrPosPolicia);
        }

});