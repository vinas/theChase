function Display()
{
    var Money = $('#dinheiro'),
        PointsCounter = $('#pontos'),
        Legenda = $('#actionLegenda'),
        Legenda2 =  $('#actionLegenda2'),
        Busted = $('#busted'),
        TimeUp = $('#timeUp');
 
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
    this.mirrorObj = mirrorObj;
    this.displayBomb = displayBomb;
    this.hideBomb = hideBomb;
    this.displayMolotov = displayMolotov;
    this.updatePointsDisplay = updatePointsDisplay;
    this.updateDificultyDisplay = updateDificultyDisplay;
    
    return this;

    function updateDificultyDisplay()
    {
        CurrLevel.html(currLevel);
        flash(CurrLevel, "#FFD61F");
    }

    function updatePointsDisplay()
    {
        PointsCounter.html(pontos);
        flash(PointsCounter, "#FFD61F");
    }

    function flashPolicia()
    {
        flash(Officer1, "#FFD61F");
    }

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
    }

    function feedBackMolotov()
    {
        showFeedBack(Officer1, "can't move", false);
        if (currLevel >= TWOPOLICEMENLEVEL) {
            showFeedBack2(Officer2, "can't move", false);
        }
    }

    function feedBackBomb()
    {
        showFeedBack(Officer1, "slow", true);
        if (currLevel >= TWOPOLICEMENLEVEL) {
            showFeedBack2(Officer2, "slow", true);
        }
    }

    function feedBackClock()
    {
        showFeedBack(Thief, "time +10", true);
    }

    function displayMoney() {
        if (!dinheiroVis) {
            arrPosDinheiro = calculator.getRandomCoords();
            displayItem(Money, arrPosDinheiro);
            dinheiroVis = true;
        }
    }

    function displayGameInfo()
    {
        PointsCounter.html("0");
        BackgroundImg.attr("src", "img/background_v2.jpg");
        Officer1.attr("src", "img/guarda.gif");
        Legenda.html('');
        CurrLevel.html(currLevel);
        Time.html(tempo);
    }

    function displayClock()
    {
        if ((tempo == TEMPORELOGIO) && (clockVisible == false) && (clockVisible == false)) {
            arrPosRelogio = calculator.getRandomCoords();
            displayItem(Clock, arrPosRelogio);
            clockVisible = true;
        }
    }

    function busted()
    {
        Busted.show();
    }

    function timeUp()
    {
        TimeUp.show();
    }

    function hideAllHideble()
    {
        $("#instructionsBar").hide();
        //$("#ranking").hide();
        //$("#rankingFooter").hide();
        //$("#formRanking").hide();
        $("#presentation").hide();
        Clock.hide();
        Molotov.hide();
        Bomb.hide();
        Counter1.hide();
        Counter2.hide();
        Busted.hide();
        TimeUp.hide();
        Officer2.hide();
    }

    function showAllShowable()
    {
        $(".backgroundTap").show();
        Thief.show();
        Officer1.show();
        Money.show();
        $("#scoreBar").show();
    }

    function hideGameValues()
    {
        $(".backgroundTap").hide();
        Thief.hide();
        Officer1.hide();
        Officer2.hide();
        Money.hide();
        Clock.hide();
        Molotov.hide();
        Bomb.hide();
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
        police = Officer2;
        if (molotovTime > 0) {
            police.attr("src", "img/guarda_fogo_02.gif")
        }
        calculator.set2ndPolicemanPosition();
        police.show();
    }

    function changeBackground()
    {
        BackgroundImg.attr(
            "src",
            "img/"+sortBackground()
        );
    }

    function mirrorObj(objeto, escala)
    {
        objeto.css("-moz-transform", "scaleX("+escala+")");
        objeto.css("-webkit-transform", "scaleX("+escala+")");
        objeto.css("-o-transform", "scaleX("+escala+")");
        objeto.css("transform", "scaleX("+escala+")");
        objeto.css("-ms-filter", "fliph");
        objeto.css("filter", "fliph");
    }

    function displayBomb()
    {
        arrPosBomba = calculator.getRandomCoords();
        displayItem(Bomb, arrPosBomba);
        bombVisible = true;
    }

    function hideBomb()
    {
        Bomb.hide();
        bombVisible = false;
    }

    function displayMolotov()
    {
        if (molotovVisible == false) {
            arrPosMolotov = calculator.getRandomCoords();
            displayItem(Molotov, arrPosMolotov);
            molotovVisible = true;
        }
    }



    function sortBackground()
    {
        var rand = Math.floor(Math.random() * backgrounds.length);
        while (BackgroundImg.attr("src") == "url(img/"+backgrounds[rand]+")") {
            rand = Math.floor(Math.random() * backgrounds.length);
        }
        return backgrounds[rand];
    }

    function showFeedBack(object, message, follow)
    {
        objectPosition = calculator.getObjectPosition(object);
        messagePosition = calculator.calculateMessagePosition(objectPosition);
        
        Legenda.offset({ top: messagePosition[1], left: messagePosition[0]});
        Legenda.html(message);
        
        setTimeout(function() {
            Legenda.html("");
            setTimeout(function() {
                if (follow == true) {
                    objectPosition = calculator.getObjectPosition(object);
                    messagePosition = calculator.calculateMessagePosition(objectPosition);
                    Legenda.offset({ top: messagePosition[1], left: messagePosition[0]});
                }
                Legenda.html(message);
                setTimeout(function() {
                    Legenda.html("");
                    setTimeout(function() {
                        if (follow == true) {
                            objectPosition = calculator.getObjectPosition(object);
                            messagePosition = calculator.calculateMessagePosition(objectPosition);
                            Legenda.offset({ top: messagePosition[1], left: messagePosition[0]});
                        }
                        Legenda.html(message);
                        setTimeout(function() {
                            Legenda.html("");
                        }, 500);
                    }, 300);
                }, 800);
            }, 300);
        }, 800);
    }

    function showFeedBack2(object, message, follow) {
        objectPosition = calculator.getObjectPosition(object);
        messagePosition = calculator.calculateMessagePosition(objectPosition);
        
        Legenda2.offset({ top: messagePosition[1], left: messagePosition[0]});
        Legenda2.html(message);
        
        setTimeout(function() {
            Legenda2.html("");
            setTimeout(function() {
                if (follow == true) {
                    objectPosition = calculator.getObjectPosition(object);
                    messagePosition = calculator.calculateMessagePosition(objectPosition);
                    Legenda2.offset({ top: messagePosition[1], left: messagePosition[0]});
                }
                Legenda2.html(message);
                setTimeout(function() {
                    Legenda2.html("");
                    setTimeout(function() {
                        if (follow == true) {
                            objectPosition = calculator.getObjectPosition(object);
                            messagePosition = calculator.calculateMessagePosition(objectPosition);
                            Legenda2.offset({ top: messagePosition[1], left: messagePosition[0]});
                        }
                        Legenda2.html(message);
                        setTimeout(function() {
                            Legenda2.html("");
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

    function displayItem(obj, arrPosition)
    {
        calculator.setObjectPosition(obj, arrPosition);
        obj.show();
    }

}