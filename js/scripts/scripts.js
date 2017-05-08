$(document).on("dblclick", function() {
    return false;
});

$(document).on("keydown", function(e) {
    tecla = e.which;
});

$(document).on("ready", function() {

    $.displayMoney = function() {
        if (dinheiroVis == false) {
            arrPosDinheiro = $.getRandomCoords();
            $.displayItem($("#dinheiro"), arrPosDinheiro);
            dinheiroVis = true;
        }
    };

    $.endGame = function(motivo) {
        $("#gamePoints").val($("#pontos").html());
        //$.postRankingForm();
        $(".buttonWeeklyRanking").show();
        if (motivo == "busted") {
            busted();
        } else if (motivo == "timeUp") {
            timeUp();
        }
        clearHideGameValues();

        // mexer aqui: exibir form se nao tiver nada no #userId
        // se tiver user Id, postar um ajax pro endGame sem parametros (ou com userID só)
        /*$("#formRanking").show();
        $("#btOk").show();
        $("#btVerRanking").show();*/
    };

    $.loading = function() {
        preloadImages(ImgsToPreload);
        $("#loading").hide();
        $("#resetGame").show();
    }


    function gameLoop()
    {
        if (jogoOn) {
            if (tecla == 37) {
                $.mirrorObj($('#thief'), '1');
                $.move('left');
            } else if (tecla == 38) {
                $.move('up');
            } else if (tecla == 39) {
                $.mirrorObj($('#thief'), '-1');
                $.move('right');
            } else if (tecla == 40) {
                $.move('down');
            // Enter - RESET
            } else if ((tecla == 13) && (tecla != teclaBump)) {
                resetGame();
                teclaBump = tecla;
            } else if (tecla != 13) {
                teclaBump = false;
            }
        }
        setTimeout(gameLoop, 40);
    };

    function gameClock()
    {
        if (jogoOn == true) {
            if (tempo >= 0) {
                if (tempo <= 3) {
                    $.flash($("#tempo"), "#FFD61F");
                }
                showClock();
                $.sortMolotov();
                $.sortBomb();
                $.displayMoney();
                $("#tempo").html(tempo);
                tempo = tempo - 1;
            } else {
                $.endGame("timeUp");
            }
        }
        setTimeout(gameClock, 1000);
    };

    function resetGame()
    {
        resetAllValues();
        hideAllHideble();
        showAllShowable();
        relocateCharacters();
        $.displayMoney();
        displayGameInfo();
        jogoOn = true;
    };

    function showClock()
    {
        if ((tempo == TEMPORELOGIO) && (clockVisible == false) && (clockVisible == false)) {
            arrPosRelogio = $.getRandomCoords();
            $.displayItem($("#relogio"), arrPosRelogio);
            clockVisible = true;
        }
    }

    function resetAllValues()
    {
        tempo = TEMPOPADRAO;
        dinheiroVis = false;
        clockVisible = false;
        molotovVisible = false;
        bombVisible = false;
        tecla = false;
        jogoOn = false;
        thiefMoveRate = $.regraDeTres(6, mapSize);
        officer1MoveRate = MOVIMENTACAOMINIMA;
        currLevel = 1;
        ultimaFase = 0;
        ultimaPontuacao = 0;
        pontos = 0;
        molotovTime = 0;
        thiefPosArr[0] = 0;
        thiefPosArr[1] = 0;
        officer1PosArr[0] = mapSize - OBJSIZE;
        officer1PosArr[1] = mapSize - OBJSIZE;
        officer2PosArr[0] = mapSize - OBJSIZE;
        officer2PosArr[1] = 0;
    }

    function hideAllHideble()
    {
        $("#instructionsBar").hide();
        $("#ranking").hide();
        $("#rankingFooter").hide();
        $("#formRanking").hide();
        $("#presentation").hide();
        $("#relogio").hide();
        $("#molotov").hide();
        $("#bomba").hide();
        $("#contador").hide();
        $("#contador2").hide();
        $("#busted").hide();
        $("#timeUp").hide();
        $('#officer2').hide();
    }

    function showAllShowable()
    {
        $(".backgroundTap").show();
        $('#thief').show();
        $('#officer1').show();
        $("#dinheiro").show();
        $("#scoreBar").show();
    }

    function relocateCharacters()
    {
        $.setObjectPosition($('#thief'), thiefPosArr);
        $.setObjectPosition($('#officer1'), officer1PosArr);
        $.setObjectPosition($('#officer2'), officer2PosArr);
    }

    function displayGameInfo()
    {
        $("#pontos").html("0");
        $("#backgroundImage").attr("src", "img/background_v2.jpg");
        $('#officer1').attr("src", "img/guarda.gif");
        $("#actionLegenda").html('');
        $("#fase").html(currLevel);
        $("#tempo").html(tempo);
    }

    function busted()
    {
        $("#busted").show();
    }

    function timeUp()
    {
        $("#timeUp").show();
    }

    function clearHideGameValues()
    {
        tempo = 0;
        dinheiroVis = false;
        clockVisible = false;
        molotovVisible = false;
        bombVisible = false;
        jogoOn = false;
        $(".backgroundTap").hide();
        $('#thief').hide();
        $('#officer1').hide();
        $('#officer2').hide();
        $("#dinheiro").hide();
        $("#relogio").hide();
        $("#molotov").hide();
        $("#bomba").hide();
    }

    function startPressedTimmer(button)
    {
        button.attr("src", "img/start_over.png");
        setTimeout(function() {
           button.attr("src", "img/start.png");
        }, 300);
    }

    function preloadImages(images) {
        for (i = 0; i < images.length; i++) {
            $('<img/>')[0].src = images[i];
        }
    }

    function loadEventHandlers()
    {
        $("#resetGame").on("tap", function() {
            justOpened = $("#justOpened");
            if (justOpened.val() == 1) {
                $("#presentationImage").attr(
                    "src",
                    "img/detalhes.gif"
                );
                justOpened.val(0);
            } else {
                startPressedTimmer($(this));
                resetGame();
            }
        });

        $("#fundo, #thief, #officer1, #officer2, .item").on("swipeleft", function() {
            tecla = 37;
        }).on("swiperight", function() {
            tecla = 39;
        }).on("swipeup", function() {
            tecla = 38;
        }).on("swipedown", function() {
            tecla = 40;
        });
        $("#presentation").on("swipeleft", function() {
            if ($("#justOpened").val() == 0) {
            presentation = $(this);
                presentation.animate({
                        left: parseInt(presentation.css('left'),10) == 0 ?
                        -presentation.outerWidth() :
                        0
                    },
                    1000,
                    function() { resetGame() }
                );
            }
        });

        $("#btOk").on("tap", function() {
            $(this).hide();
            $("#btVerRanking").hide()
            $.postRankingForm();
        });

        $(".buttonWeeklyRanking").on("tap", function() {
            $(this).hide();
            //$("#formRanking").hide();
            $("#busted").hide();
            $("#timeUp").hide();
            /*$.post("/Ranking/listWeeklyRanking", {}, function(ranking) {
                $("#ranking").html(ranking);
                $("#ranking").show();
            });*/
            $("#ranking").show();
            $("#rankingFooter").show();
        });

        $("#rankingLinkButton").on("tap", function() {
            type = $(this).attr("data-rankingType");
            if (type == "thisweeks") {
                rankingType = "listWeeklyRanking";
            } else if (type == "alltimes") {
                rankingType = "listAllTimesRanking";
            }
            $.post("/Ranking/" + rankingType, {}, function(ranking) {
                ranking = $.parseJSON(ranking);
                $("#ranking").html(ranking.thisRanking);
                $("#rankingLinkButton").attr("data-rankingType", ranking.otherRankingLink);
                $("#rankingLinkButton").html(ranking.linkCaption);
            });
        });

        $("#loginButton").on("click", function() {
            Android.showToast("teste");
        });
    }

    /*$.postRankingForm = function() {
        nickName = $("#nickname").val();
        lastName = $("#lastname").val();
        email = $("#email").val();
        points = $("#gamePoints").val();
        //if ((nickName) && (email) && (points)) {
            $.post('/Ranking/endGame/', {
                nickName: nickName,
                lastName: lastName,
                email: email,
                points: points
            }, function(res) {
    			res = $.parseJSON(res);
                if (res.response == 1) {
                    $("#maxScore").val(res.maxScore);
                    $("#gamePoints").val(res.lastScore);
                    $("#loginStatus").html(
                        'last score: ' + $("#gamePoints").val() + '&nbsp;&nbsp;-&nbsp;&nbsp;best score: ' + $("#maxScore").val()
                    );
                    $.post(res.redirect, {}, function(ranking) {
                        ranking = $.parseJSON(ranking);
                        $("#ranking").html(ranking.thisRanking);
                        $("#rankingFooter").attr("data-rankingType", ranking.otherRankingLink);
                        $("#rankingLinkButton").html(ranking.linkCaption);
                    });
                } else {
                    alert("Sorry,\n\nThere was an error.\n\nError: "+res.erro);
                }
                document.body.style.cursor = 'default';
                return false;
            });
        //}
    }*/

    /* ******************************* */
    init();

});