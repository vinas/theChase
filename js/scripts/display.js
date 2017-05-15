function Display()
{
    var Money = $('#dinheiro'),
        PointsCounter = $('#points'),
        Legenda = $('#actionLegenda'),
        Legenda2 =  $('#actionLegenda2'),
        Busted = $('#busted'),
        TimeUp = $('#timeUp');
 
     var ImgsToPreload = new Array(
             'img/detalhes.gif',
             'img/start_over.png',
             'img/guarda_fogo_02.gif',
             'img/background_01.jpg',
             'img/background_v2.jpg',
             'img/bkg_01.jpg',
             'img/bkg_02.jpg',
             'img/bkg_03.jpg',
             'img/bkg_04.jpg',
             'img/bkg_05.jpg',
             'img/bkg_06.jpg',
             'img/busted.png',
             'img/timeisup_01.png',
             'img/start.png',
             'img/molotov_v2.png',
             'img/money2.png',
             'img/bomb_v2.png'
         );

    var backgrounds = new Array(
            'bkg_01.jpg',
            'bkg_02.jpg',
            'bkg_03.jpg',
            'bkg_04.jpg',
            'bkg_05.jpg',
            'bkg_06.jpg',
            'background_01.jpg',
            'background_v2.jpg'
        );

    this.flashOfficers = flashOfficers;
    this.flash = flash;
    this.feedBackBomb = feedBackBomb;
    this.feedBackClock = feedBackClock;
    this.displayMoney = displayMoney;
    this.displayGameInfo = displayGameInfo;
    this.displayClock = displayClock;
    this.timeUp = timeUp;
    this.busted = busted;
    this.hideInGameElements = hideInGameElements;
    this.showInGameElements = showInGameElements;
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
    this.setThiefHorDirection = setThiefHorDirection;
    this.burnDaPolice = burnDaPolice;
    this.hideMolotov = hideMolotov;
    this.handleMolotovCounter = handleMolotovCounter;
    this.restorePolicemen = restorePolicemen;
    this.relocateCharacters = relocateCharacters;
    this.setObjectPosition = setObjectPosition;
    this.hideOfficer2 = hideOfficer2;

    return this;

    function hideOfficer2()
    {
        Counter2.hide();
        Officer2.hide();
    }

    function setObjectPosition(obj, posArr)
    {
        obj.css("left", posArr[0]);
        obj.css("top", posArr[1]);
    }

    function relocateCharacters()
    {
        setObjectPosition(Thief, thiefPosArr);
        setObjectPosition(Officer1, officerPosArr[0]);
        setObjectPosition(Officer2, officerPosArr[1]);
    }

    function restorePolicemen()
    {
        Officer1.attr("src", "img/guarda.gif");
        Counter1.hide();
        if (currLevel >= TWOPOLICEMENLEVEL) {
            Officer2.attr("src", "img/guarda.gif");
            Counter2.hide();
        }
    }

    function handleMolotovCounter()
    {
        molotovTime = molotovTime - 1;
        setObjectPosition(
            Counter1,
            new Array(
                (officerPosArr[0][0] - 5),
                (officerPosArr[0][1] - 5)
            )
        );
        Counter1.html(molotovTime);
        Counter1.show();
        if (currLevel >= TWOPOLICEMENLEVEL) {
            setObjectPosition(
                Counter2,
                new Array(
                    (officerPosArr[1][0] - 5),
                    (officerPosArr[1][1] - 5)
                )
            );
            Counter2.html(molotovTime);
            Counter2.show();
        }
    }

    function hideMolotov()
    {
        Molotov.hide();
        isMolotovVisible = false;
    }

    function setThiefHorDirection(direction)
    {
        switch (direction) {
            case 'left':
                mirrorObj(Thief, '1');
                break;
            case 'right':
                mirrorObj(Thief, '-1');
                break;
        }
    }

    function updateDificultyDisplay()
    {
        CurrLevel.html(currLevel);
        flash(CurrLevel);
    }

    function updatePointsDisplay()
    {
        PointsCounter.html(points);
        flash(PointsCounter);
    }

    function flashOfficers()
    {
        flash(Officer1);
        if (currLevel > TWOPOLICEMENLEVEL)
            flash(Officer2);
    }

    function flash(obj, color) {
        var counter = 0;
        color = (!color) ? '#FFD61F' : color;

        blink();

        function blink()
        {
            counter++;
            obj.css('background-color', (counter % 2 == 0) ? color : '');
            if (counter < 7) 
                setTimeout(function() {
                    blink();
                }, 100);
        }
    }

    function burnDaPolice()
    {
        Officer1.attr('src', 'img/guarda_fogo_02.gif');
        showFeedBack(Officer1, "can't move", false);
        if (currLevel >= TWOPOLICEMENLEVEL) {
            Officer2.attr('src', 'img/guarda_fogo_02.gif');
            showFeedBack2(Officer2, "can't move", false);
        }
    }

    function feedBackBomb()
    {
        showFeedBack(Officer1, 'slow', true);
        if (currLevel >= TWOPOLICEMENLEVEL) {
            showFeedBack2(Officer2, 'slow', true);
        }
    }

    function feedBackClock()
    {
        showFeedBack(Thief, 'time +10', true);
    }

    function displayMoney() {
        moneyPos = calculator.getRandomCoords();
        displayItem(Money, moneyPos);
    }

    function displayGameInfo()
    {
        PointsCounter.html("0");
        BackgroundImg.attr("src", "img/background_v2.jpg");
        Officer1.attr("src", "img/guarda.gif");
        Legenda.html('');
        CurrLevel.html(currLevel);
        Time.html(time);
    }

    function displayClock()
    {
        if ((time == DISPLAYCLOCKAT) && (!isClockVisible)) {
            clockPos = calculator.getRandomCoords();
            displayItem(Clock, clockPos);
            isClockVisible = true;
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

    function hideInGameElements()
    {
        $("#instructionsBar").hide();
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

    function showInGameElements()
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
        button.attr('src', 'img/start_over.png');
        setTimeout(function() {
           button.attr('src', 'img/start.png');
        }, 300);
    }

    function show2ndPoliceman()
    {
        police = Officer2;
        if (molotovTime > 0) {
            police.attr('src', 'img/guarda_fogo_02.gif')
        }
        calculator.setOfficer2StartPos();
        setObjectPosition(Officer2, officerPosArr[1]);
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
        bombPos = calculator.getRandomCoords();
        displayItem(Bomb, bombPos);
        isBombVisible = true;
    }

    function hideBomb()
    {
        Bomb.hide();
        isBombVisible = false;
    }

    function displayMolotov()
    {
        molotovPos = calculator.getRandomCoords();
        displayItem(Molotov, molotovPos);
        isMolotovVisible = true;
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
            Legenda.html('');
            setTimeout(function() {
                if (follow) {
                    objectPosition = calculator.getObjectPosition(object);
                    messagePosition = calculator.calculateMessagePosition(objectPosition);
                    Legenda.offset({ top: messagePosition[1], left: messagePosition[0]});
                }
                Legenda.html(message);
                setTimeout(function() {
                    Legenda.html('');
                    setTimeout(function() {
                        if (follow) {
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
                if (follow) {
                    objectPosition = calculator.getObjectPosition(object);
                    messagePosition = calculator.calculateMessagePosition(objectPosition);
                    Legenda2.offset({ top: messagePosition[1], left: messagePosition[0]});
                }
                Legenda2.html(message);
                setTimeout(function() {
                    Legenda2.html("");
                    setTimeout(function() {
                        if (follow) {
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
        setObjectPosition(obj, arrPosition);
        obj.show();
    }

}