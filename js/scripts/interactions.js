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
        if ($.reached(thiefPosArr, OBJSIZE, arrPosDinheiro, TAMANHOITEM)) {
            $.ganhaPontos()
            tempo = tempo + TEMPOBONUS;
            dinheiroVis = false;
            $.displayMoney();
        }
    };
    
    $.gotClock = function() {
        // Se ladrão pegou relógio
        if ($.reached(thiefPosArr, OBJSIZE, arrPosRelogio, TAMANHOITEM)) {
            $.ganhaPontos();
            tempo = tempo + 10;
            $("#relogio").hide();
            clockVisible = false;
            $.feedBackClock();
        }
    };
    
    $.gotMolotov = function() {
        // Se ladrão pegou o molotov
        if ($.reached(thiefPosArr, OBJSIZE, arrPosMolotov, TAMANHOITEM)) {
            //$.ionSound.play("heehee");
            molotovTime = PAUSAMOLOTOV;
            $.ganhaPontos();
            $("#molotov").hide();
            $('#officer1').attr("src", "img/guarda_fogo_02.gif");
            if (currLevel >= TWOPOLICEMENLEVEL) {
                $('#officer2').attr("src", "img/guarda_fogo_02.gif");
            }
            molotovVisible = false;
            $.feedBackMolotov();
        }
    };

    // Função que checa se ladrão pegou a bomba
    $.pegouBomba = function() {
        // Se ladrão pegou o molotov
        if ($.reached(thiefPosArr, OBJSIZE, arrPosBomba, TAMANHOITEM)) {
            $.ganhaPontos();
            $("#bomba").hide();
            $.flashPolicia();
            $.flash($("#fase"), "#FFD61F");
            if (currLevel > 1) {
                currLevel = currLevel - 1;
                officer1MoveRate = speedTable[currLevel][0];
                officer2MoveRate = speedTable[currLevel][1];
                if (currLevel < TWOPOLICEMENLEVEL) {
                    officer2PosArr[0] = (mapSize - OBJSIZE);
                    officer2PosArr[1] = 0;
                    $.setObjectPosition($('#officer2'), officer2PosArr);
                    $("#contador2").hide();
                    $('#officer2').hide();
                }
            }
            $("#fase").html(currLevel);
            bombVisible = false;
            $.feedBackBomb();
        }
    };

    // Função que checa se dois objetos se tocaram
    $.reached = function(cacador, tamanhoCacador, presa, tamanhoPresa) {
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
        $.flash($('#officer1'), "#FFD61F");
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
        $.showFeedBack($('#officer1'), "can't move", false);
        if (currLevel >= TWOPOLICEMENLEVEL) {
            $.showFeedBack2($('#officer2'), "can't move", false);
        }
    }

    $.feedBackBomb = function() {
        $.showFeedBack($('#officer1'), "slow", true);
        if (currLevel >= TWOPOLICEMENLEVEL) {
            $.showFeedBack2($('#officer2'), "slow", true);
        }
    }

    $.feedBackClock = function() {
        $.showFeedBack($('#thief'), "time +10", true);
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
        police = $('#officer2');
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
        officer1MoveRate = speedTable[currLevel][0];
        officer2MoveRate = speedTable[currLevel][1];
    }

    $.aparecePolicia2 = function() {
        $('#officer2').show();
    }

});