$('document').ready(function() {

    $.checkGotSomething = function()
    {
        gotMoney();
        if (clockVisible)
            $.gotClock();
        if (molotovVisible)
            $.gotMolotov();
        if (bombVisible)
            $.pegouBomba();
    }

    var gotMoney = function() {
        // Se ladrão pegou dinheiro
        if ($.alcancou(thiefPosArr, TAMANHOOBJETO, arrPosDinheiro, TAMANHOITEM)) {
            $.ganhaPontos()
            tempo = tempo + TEMPOBONUS;
            dinheiroVis = false;
            $.apareceDinheiro();
        }
    };
    
    $.gotClock = function() {
        // Se ladrão pegou relógio
        if ($.alcancou(thiefPosArr, TAMANHOOBJETO, arrPosRelogio, TAMANHOITEM)) {
            $.ganhaPontos();
            tempo = tempo + 10;
            $("#relogio").hide();
            clockVisible = false;
            $.feedBackClock();
        }
    };
    
    $.gotMolotov = function() {
        // Se ladrão pegou o molotov
        if ($.alcancou(thiefPosArr, TAMANHOOBJETO, arrPosMolotov, TAMANHOITEM)) {
            //$.ionSound.play("heehee");
            molotovTime = PAUSAMOLOTOV;
            $.ganhaPontos();
            $("#molotov").hide();
            $("#policia").attr("src", "img/guarda_fogo_02.gif");
            if (currLevel >= TWOPOLICEMENLEVEL) {
                $("#policia2").attr("src", "img/guarda_fogo_02.gif");
            }
            molotovVisible = false;
            $.feedBackMolotov();
        }
    };

    // Função que checa se ladrão pegou a bomba
    $.pegouBomba = function() {
        // Se ladrão pegou o molotov
        if ($.alcancou(thiefPosArr, TAMANHOOBJETO, arrPosBomba, TAMANHOITEM)) {
            $.ganhaPontos();
            $("#bomba").hide();
            $.flashPolicia();
            $.flash($("#fase"), "#FFD61F");
            if (currLevel > 1) {
                currLevel = currLevel - 1;
                movimentacaoPolicia1 = speedTable[currLevel][0];
                movimentacaoPolicia2 = speedTable[currLevel][1];
                if (currLevel < TWOPOLICEMENLEVEL) {
                    arrPosPolicia2[0] = (mapSize - TAMANHOOBJETO);
                    arrPosPolicia2[1] = 0;
                    $.setObjectPosition($("#policia2"), arrPosPolicia2);
                    $("#contador2").hide();
                    $("#policia2").hide();
                }
            }
            $("#fase").html(currLevel);
            bombVisible = false;
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
        if (currLevel >= TWOPOLICEMENLEVEL) {
            $.showFeedBack2($("#policia2"), "can't move", false);
        }
    }

    $.feedBackBomb = function() {
        $.showFeedBack($("#policia"), "slow", true);
        if (currLevel >= TWOPOLICEMENLEVEL) {
            $.showFeedBack2($("#policia2"), "slow", true);
        }
    }

    $.feedBackClock = function() {
        $.showFeedBack(Thief, "time +10", true);
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
        currLevel = currLevel + 1;
        if (currLevel < 1) {
            currLevel = 1;
        } else if (currLevel ==  TWOPOLICEMENLEVEL) {
            $.show2ndPoliceman();
        }
        $("#fase").html(currLevel);
        $.flash($("#fase"), "#FFD61F");
        $.mudaBackground();
        $.mudamovimentacaoPolicia();
    }

    $.show2ndPoliceman = function() {
        police = $("#policia2");
        if (molotovTime > 0) {
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
        movimentacaoPolicia1 = speedTable[currLevel][0];
        movimentacaoPolicia2 = speedTable[currLevel][1];
    }

    $.aparecePolicia2 = function() {
        $("#policia2").show();
    }

});