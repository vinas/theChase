$('document').ready(function() {

    // Função que checa se ladrão pegou o dinheiro
    $.pegouDinheiro = function() {
        // Se ladrão pegou dinheiro
        if ($.alcancou(arrPosLadrao, TAMANHOOBJETO, arrPosDinheiro, TAMANHOITEM)) {
            $.ganhaPontos()
            tempo = tempo + TEMPOBONUS;
            dinheiroVis = false;
            $.apareceDinheiro();
        }
    };
    
    // Função que checa se ladrão pegou o relógio
    $.pegouRelogio = function() {
        // Se ladrão pegou relógio
        if ($.alcancou(arrPosLadrao, TAMANHOOBJETO, arrPosRelogio, TAMANHOITEM)) {
            $.ganhaPontos();
            tempo = tempo + 10;
            $("#relogio").hide();
            relogioVis = false;
            $.feedBackClock();
        }
    };
    
    // Função que checa se ladrão pegou o molotov
    $.pegouMolotov = function() {
        // Se ladrão pegou o molotov
        if ($.alcancou(arrPosLadrao, TAMANHOOBJETO, arrPosMolotov, TAMANHOITEM)) {
            //$.ionSound.play("heehee");
            tempoMolotov = PAUSAMOLOTOV;
            $.ganhaPontos();
            $("#molotov").hide();
            $("#policia").attr("src", "img/guarda_fogo_02.gif");
            if (faseAtual >= FASEDOISPOLICIAS) {
                $("#policia2").attr("src", "img/guarda_fogo_02.gif");
            }
            molotovVis = false;
            $.feedBackMolotov();
        }
    };

    // Função que checa se ladrão pegou a bomba
    $.pegouBomba = function() {
        // Se ladrão pegou o molotov
        if ($.alcancou(arrPosLadrao, TAMANHOOBJETO, arrPosBomba, TAMANHOITEM)) {
            $.ganhaPontos();
            $("#bomba").hide();
            $.flashPolicia();
            $.flash($("#fase"), "#FFD61F");
            if (faseAtual > 1) {
                faseAtual = faseAtual - 1;
                movimentacaoPolicia1 = speedTable[faseAtual][0];
                movimentacaoPolicia2 = speedTable[faseAtual][1];
                if (faseAtual < FASEDOISPOLICIAS) {
                    arrPosPolicia2[0] = (mapSize - TAMANHOOBJETO);
                    arrPosPolicia2[1] = 0;
                    $.setObjectPosition($("#policia2"), arrPosPolicia2);
                    $("#contador2").hide();
                    $("#policia2").hide();
                }
            }
            $("#fase").html(faseAtual);
            bombaVis = false;
            $.feedBackBomb();
        }
    };

    // Função que checa se dois objetos se tocaram
    $.alcancou = function(cacador, tamanhoCacador, presa, tamanhoPresa) {
        if (
            ((cacador[0] >= (presa[0] - tamanhoCacador))
            && (cacador[0] < (presa[0] + tamanhoPresa)))
            && ((cacador[1] >= (presa[1] - tamanhoCacador))
            && (cacador[1] < (presa[1] + tamanhoPresa)))
        ){
            return true;
        }
        return false;
    };

    $.flashPolicia = function() {
        $.flash($("#policia"), "#FFD61F");
    }
    
    $.flash = function(obj, color) {
        obj.css("background-color", color);
        setTimeout(function() {
            obj.css("background-color", "");
            setTimeout(function() {
                obj.css("background-color", color);
                setTimeout(function() {
                    obj.css("background-color", "");
                    setTimeout(function() {
                        obj.css("background-color", color);
                        setTimeout(function() {
                            obj.css("background-color", "");
                        }, 100);
                    }, 100);
                }, 100);
            }, 100);
        }, 100);
    }

    $.feedBackMolotov = function() {
        $.showFeedBack($("#policia"), "can't move", false);
        if (faseAtual >= FASEDOISPOLICIAS) {
            $.showFeedBack2($("#policia2"), "can't move", false);
        }
    }

    $.feedBackBomb = function() {
        $.showFeedBack($("#policia"), "slow", true);
        if (faseAtual >= FASEDOISPOLICIAS) {
            $.showFeedBack2($("#policia2"), "slow", true);
        }
    }

    $.feedBackClock = function() {
        $.showFeedBack($("#ladrao"), "time +10", true);
    }

    $.showFeedBack = function(object, message, follow) {
        legenda =  $("#actionLegenda");
        objectPosition = $.getObjectPosition(object);
        messagePosition = $.calculateMessagePosition(objectPosition);
        
        legenda.offset({ top: messagePosition[1], left: messagePosition[0]});
        legenda.html(message);
        
        setTimeout(function() {
            legenda.html("");
            setTimeout(function() {
                if (follow == true) {
                    objectPosition = $.getObjectPosition(object);
                    messagePosition = $.calculateMessagePosition(objectPosition);
                    legenda.offset({ top: messagePosition[1], left: messagePosition[0]});
                }
                legenda.html(message);
                setTimeout(function() {
                    legenda.html("");
                    setTimeout(function() {
                        if (follow == true) {
                            objectPosition = $.getObjectPosition(object);
                            messagePosition = $.calculateMessagePosition(objectPosition);
                            legenda.offset({ top: messagePosition[1], left: messagePosition[0]});
                        }
                        legenda.html(message);
                        setTimeout(function() {
                            legenda.html("");
                        }, 500);
                    }, 300);
                }, 800);
            }, 300);
        }, 800);
    }

    $.showFeedBack2 = function(object, message, follow) {
        legenda2 =  $("#actionLegenda2");
        objectPosition = $.getObjectPosition(object);
        messagePosition = $.calculateMessagePosition(objectPosition);
        
        legenda2.offset({ top: messagePosition[1], left: messagePosition[0]});
        legenda2.html(message);
        
        setTimeout(function() {
            legenda2.html("");
            setTimeout(function() {
                if (follow == true) {
                    objectPosition = $.getObjectPosition(object);
                    messagePosition = $.calculateMessagePosition(objectPosition);
                    legenda2.offset({ top: messagePosition[1], left: messagePosition[0]});
                }
                legenda2.html(message);
                setTimeout(function() {
                    legenda2.html("");
                    setTimeout(function() {
                        if (follow == true) {
                            objectPosition = $.getObjectPosition(object);
                            messagePosition = $.calculateMessagePosition(objectPosition);
                            legenda2.offset({ top: messagePosition[1], left: messagePosition[0]});
                        }
                        legenda2.html(message);
                        setTimeout(function() {
                            legenda2.html("");
                        }, 500);
                    }, 300);
                }, 800);
            }, 300);
        }, 800);
    }

    $.ganhaPontos = function() {
        pontos = pontos + VALORDINHEIRO;
        $("#pontos").html(pontos);
        $.flash($("#pontos"), "#FFD61F");
        if ((pontos != 0) && (pontos >= (ultimaPontuacao + PONTOSPORFASE))) {
            ultimaPontuacao = pontos;
            $.mudaNivel();
        }
    }

    $.mudaNivel = function() {
        faseAtual = faseAtual + 1;
        if (faseAtual < 1) {
            faseAtual = 1;
        } else if (faseAtual ==  FASEDOISPOLICIAS) {
            $.show2ndPoliceman();
        }
        $("#fase").html(faseAtual);
        $.flash($("#fase"), "#FFD61F");
        $.mudaBackground();
        $.mudamovimentacaoPolicia();
    }

    $.show2ndPoliceman = function() {
        police = $("#policia2");
        if (tempoMolotov > 0) {
            police.attr("src", "img/guarda_fogo_02.gif")
        }
        $.set2ndPolicemanPosition();
        police.show();
    };

    $.mudaBackground = function() {
        $("#backgroundImage").attr(
            "src",
            "img/"+$.sorteiaFundo()
        );
    }

    $.mudamovimentacaoPolicia = function() {
        movimentacaoPolicia1 = speedTable[faseAtual][0];
        movimentacaoPolicia2 = speedTable[faseAtual][1];
    }

    $.aparecePolicia2 = function() {
        $("#policia2").show();
    }

});