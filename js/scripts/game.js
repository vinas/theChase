function Game()
{
    
    this.endGame = endGame;
    this.loading = loading;
    this.init = init;
    this.resetGame = resetGame;
    this.getPoints = getPoints;

    return this;

    function init()
    {
        eventHandlers.load();
        display.loading();
        $.resizeMapAndItems();
        gameLoop();
        gameClock();
    }

    function endGame(motivo) {
        $("#gamePoints").val($("#pontos").html());
        //$.postRankingForm();
        $(".buttonWeeklyRanking").show();
        if (motivo == "busted") {
            display.busted();
        } else if (motivo == "timeUp") {
            display.timeUp();
        }
        display.hideGameValues();
        clearGameValues();

        // mexer aqui: exibir form se nao tiver nada no #userId
        // se tiver user Id, postar um ajax pro endGame sem parametros (ou com userID só)
        /*$("#formRanking").show();
        $("#btOk").show();
        $("#btVerRanking").show();*/
    }

    function resetGame()
    {
        resetAllValues();
        display.hideAllHideble();
        display.showAllShowable();
        relocateCharacters();
        display.displayMoney();
        display.displayGameInfo();
        jogoOn = true;
    }

    function getPoints() {
        pontos = pontos + VALORDINHEIRO;
        $("#pontos").html(pontos);
        display.flash($("#pontos"), "#FFD61F");
        if ((pontos != 0) && (pontos >= (ultimaPontuacao + PONTOSPORFASE))) {
            ultimaPontuacao = pontos;
            changeLevel();
        }
    }


    function gameLoop()
    {
        if (jogoOn) {
            if (tecla == 37) {
                display.mirrorObj($('#thief'), '1');
                movement.move('left');
            } else if (tecla == 38) {
                movement.move('up');
            } else if (tecla == 39) {
                display.mirrorObj($('#thief'), '-1');
                movement.move('right');
            } else if (tecla == 40) {
                movement.move('down');
            // Enter - RESET
            } else if ((tecla == 13) && (tecla != teclaBump)) {
                resetGame();
                teclaBump = tecla;
            } else if (tecla != 13) {
                teclaBump = false;
            }
        }
        setTimeout(gameLoop, 40);
    }

    function gameClock()
    {
        if (jogoOn == true) {
            if (tempo >= 0) {
                if (tempo <= 3) {
                    display.flash($("#tempo"), "#FFD61F");
                }
                display.displayClock();
                calculator.sortMolotov();
                calculator.sortBomb();
                display.displayMoney();
                $("#tempo").html(tempo);
                tempo = tempo - 1;
            } else {
                endGame("timeUp");
            }
        }
        setTimeout(gameClock, 1000);
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
        thiefMoveRate = calculator.regraDeTres(6, mapSize);
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

    function relocateCharacters()
    {
        calculator.setObjectPosition($('#thief'), thiefPosArr);
        calculator.setObjectPosition($('#officer1'), officer1PosArr);
        calculator.setObjectPosition($('#officer2'), officer2PosArr);
    }

    function clearGameValues()
    {
        tempo = 0;
        dinheiroVis = false;
        clockVisible = false;
        molotovVisible = false;
        bombVisible = false;
        jogoOn = false;
    }

    function changeLevel()
    {
        currLevel = currLevel + 1;
        if (currLevel < 1) {
            currLevel = 1;
        } else if (currLevel ==  TWOPOLICEMENLEVEL) {
            display.show2ndPoliceman();
        }
        $("#fase").html(currLevel);
        display.flash($("#fase"), "#FFD61F");
        display.changeBackground();
        changePoliceMoveRate();
    }

    function changePoliceMoveRate()
    {
        officer1MoveRate = speedTable[currLevel][0];
        officer2MoveRate = speedTable[currLevel][1];
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

}