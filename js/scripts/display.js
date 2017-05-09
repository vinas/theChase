function Display()
{
    this.flashPolicia = flashPolicia;
    this.flash = flash;
    this.feedBackMolotov = feedBackMolotov;
    this.feedBackBomb = feedBackBomb;
    this.feedBackClock = feedBackClock;
    this.displayMoney = displayMoney;
    this.displayGameInfo = displayGameInfo;
    this.displayClock = displayClock;
    this.timeUp = timeUp;
    this.busted = busted;
    this.hideAllHideble = hideAllHideble;
    this.showAllShowable = showAllShowable;
    this.hideGameValues = hideGameValues;
    this.loading = loading;
    this.startPressedTimmer = startPressedTimmer;
    this.show2ndPoliceman = show2ndPoliceman;
    this.changeBackground = changeBackground;
    
    return this;

    function flashPolicia()
    {
        flash($('#officer1'), "#FFD61F");
    };

    function flash(obj, color) {
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
    };

    function feedBackMolotov()
    {
        showFeedBack($('#officer1'), "can't move", false);
        if (currLevel >= TWOPOLICEMENLEVEL) {
            showFeedBack2($('#officer2'), "can't move", false);
        }
    }

    function feedBackBomb()
    {
        showFeedBack($('#officer1'), "slow", true);
        if (currLevel >= TWOPOLICEMENLEVEL) {
            showFeedBack2($('#officer2'), "slow", true);
        }
    }

    function feedBackClock()
    {
        showFeedBack($('#thief'), "time +10", true);
    }

    function displayMoney() {
        if (!dinheiroVis) {
            arrPosDinheiro = $.getRandomCoords();
            $.displayItem($("#dinheiro"), arrPosDinheiro);
            dinheiroVis = true;
        }
    };

    function displayGameInfo()
    {
        $("#pontos").html("0");
        $("#backgroundImage").attr("src", "img/background_v2.jpg");
        $('#officer1').attr("src", "img/guarda.gif");
        $("#actionLegenda").html('');
        $("#fase").html(currLevel);
        $("#tempo").html(tempo);
    }

    function displayClock()
    {
        if ((tempo == TEMPORELOGIO) && (clockVisible == false) && (clockVisible == false)) {
            arrPosRelogio = $.getRandomCoords();
            $.displayItem($("#relogio"), arrPosRelogio);
            clockVisible = true;
        }
    }

    function busted()
    {
        $("#busted").show();
    }

    function timeUp()
    {
        $("#timeUp").show();
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

    function hideGameValues()
    {
        $(".backgroundTap").hide();
        $('#thief').hide();
        $('#officer1').hide();
        $('#officer2').hide();
        $("#dinheiro").hide();
        $("#relogio").hide();
        $("#molotov").hide();
        $("#bomba").hide();
    }

    function loading() {
        preloadImages(ImgsToPreload);
        $("#loading").hide();
        $("#resetGame").show();
    }

    function startPressedTimmer(button)
    {
        button.attr("src", "img/start_over.png");
        setTimeout(function() {
           button.attr("src", "img/start.png");
        }, 300);
    }

    function show2ndPoliceman()
    {
        police = $('#officer2');
        if (molotovTime > 0) {
            police.attr("src", "img/guarda_fogo_02.gif")
        }
        $.set2ndPolicemanPosition();
        police.show();
    }

    function changeBackground()
    {
        $("#backgroundImage").attr(
            "src",
            "img/"+$.sorteiaFundo()
        );
    }


    function showFeedBack(object, message, follow)
    {
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

    function showFeedBack2(object, message, follow) {
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

    function preloadImages(images) {
        for (i = 0; i < images.length; i++) {
            $('<img/>')[0].src = images[i];
        }
    }

}