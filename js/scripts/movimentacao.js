$('document').ready(function() {

        // Funcão que aciona movimentos do jogo
        $.movimento = function(direcaoComando) {
            if (direcaoComando == "esquerda") {
                $.moverLadrao('horizontal','esquerda');
            } else if (direcaoComando == "cima") {
                $.moverLadrao('vertical','cima');
            } else if (direcaoComando == "direita") {
                $.moverLadrao('horizontal','direita');
            } else if (direcaoComando == "baixo") {
                $.moverLadrao('vertical','baixo');
            }
            if (tempoMolotov <= 0) {
                $.moverPolicia(1);
                if (faseAtual >= FASEDOISPOLICIAS) {
                    $.moverPolicia(2);
                }
            }
        }

    	// Função que move o ladrão segundo a tecla pressionada
    	$.moverLadrao = function(alinhamento, sentido) {
            arrPosLadrao = $.setNextPosition(arrPosLadrao, movimentacaoLadrao, alinhamento, sentido);

            // Move ladrão
            $.setObjectPosition($("#ladrao"), arrPosLadrao);

            // Checa se pegou dinheiro
            $.pegouDinheiro();

            // Checa se pegou o relógio
            if (relogioVis == true) {
                $.pegouRelogio();
            }
            
            // Checa se pegou o molotov
            if (molotovVis == true) {
                $.pegouMolotov();
            }

            // Checa se pegou a bomba
            if (bombaVis == true) {
                $.pegouBomba();
            }
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
        $.moverPolicia = function(policial) {

            policeman = $.definirPolicial(policial);
            
            arrPosPolicia = policeman[0];
            movimentacaoPolicia = policeman[1];
            objPolicial = policeman[2];

            $.relatePositions(arrPosPolicia);
            $.setDirecao(policial);

        	// Mexer Policia
        	if (direcao == 'horizontal') {
        		if (posRelX == 'direita') {
                    $.flipHorizontal(objPolicial,"-1");
        			arrPosPolicia[0] = arrPosPolicia[0] + movimentacaoPolicia;
        		} else if (posRelX == 'esquerda') {
                    $.flipHorizontal(objPolicial,"1");
        			arrPosPolicia[0] = arrPosPolicia[0] - movimentacaoPolicia;
        		}
                arrPosPolicia[0] = $.ajustaLimite(arrPosPolicia[0]);
        	} else if (direcao == 'vertical') {
        		if (posRelY == 'acima') {
        			arrPosPolicia[1] = arrPosPolicia[1] - movimentacaoPolicia;
        		} else if (posRelY == 'abaixo') {
        			arrPosPolicia[1] = arrPosPolicia[1] + movimentacaoPolicia;
        		}
                arrPosPolicia[1] = $.ajustaLimite(arrPosPolicia[1]);
        	}
            $.setObjectPosition(objPolicial, arrPosPolicia);

            // Se polícia alcançou o ladrão
            if ($.alcancou(arrPosPolicia, (TAMANHOOBJETO - CATCHTOLERANCE), arrPosLadrao, (TAMANHOOBJETO - CATCHTOLERANCE))) {
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