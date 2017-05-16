function Display()
{
    var Money = $('#dinheiro'),
        PointsCounter = $('#points'),
        Subtitle1 = $('#actionSubtitle1'),
        Subtitle2 =  $('#actionSubtitle2'),
        Subtitle3 =  $('#actionSubtitle3'),
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
    this.displayObjectOn = displayObjectOn;
    this.hideOfficer2 = hideOfficer2;

    return this;

    function hideOfficer2()
    {
        Counter2.hide();
        Officer2.hide();
        Officer2.attr("src", "img/guarda.gif");
    }

    function displayObjectOn(obj, posArr)
    {
        obj.css("left", posArr[0]);
        obj.css("top", posArr[1]);
    }

    function relocateCharacters()
    {
        displayObjectOn(Thief, thiefPosArr);
        displayObjectOn(Officer1, officerPosArr[0]);
        displayObjectOn(Officer2, officerPosArr[1]);
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
        displayObjectOn(
            Counter1,
            new Array(
                (officerPosArr[0][0] - 5),
                (officerPosArr[0][1] - 5)
            )
        );
        Counter1.html(molotovTime);
        Counter1.show();
        if (currLevel >= TWOPOLICEMENLEVEL) {
            displayObjectOn(
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
        var flashCount = 0;
        color = (!color) ? '#FFD61F' : color;

        flashThis();

        function flashThis()
        {
            obj.css('background-color', (flashCount % 2 == 0) ? color : '');
            flashCount++;
            if (flashCount < 6) 
                setTimeout(function() {
                    flashThis();
                }, 100);
        }
    }

    function burnDaPolice()
    {
        Officer1.attr('src', 'img/guarda_fogo_02.gif');
        showFeedBack(Officer1, Subtitle1, "can't move");
        if (currLevel >= TWOPOLICEMENLEVEL) {
            Officer2.attr('src', 'img/guarda_fogo_02.gif');
            showFeedBack(Officer2, Subtitle2, "can't move");
        }
    }

    function feedBackBomb()
    {
        showFeedBack(Officer1, Subtitle1, 'slow');
        if (currLevel >= TWOPOLICEMENLEVEL) {
            showFeedBack(Officer2, Subtitle1, 'slow');
        }
    }

    function feedBackClock()
    {
        showFeedBack(Thief, Subtitle3, 'time +10');
    }

    function displayMoney() {
        moneyPos = calc.randomCoords();
        displayItem(Money, moneyPos);
    }

    function displayGameInfo()
    {
        PointsCounter.html("0");
        BackgroundImg.attr("src", "img/background_v2.jpg");
        Officer1.attr("src", "img/guarda.gif");
        Subtitle1.html('');
        CurrLevel.html(currLevel);
        Time.html(time);
    }

    function displayClock()
    {
        if ((time == DISPLAYCLOCKAT) && (!isClockVisible)) {
            clockPos = calc.randomCoords();
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
        calc.officer2StartPos();
        displayObjectOn(Officer2, officerPosArr[1]);
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
        bombPos = calc.randomCoords();
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
        molotovPos = calc.randomCoords();
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

    function showFeedBack(refObj, subtitleObj, message)
    {
        var objectPosition,
            messagePosition,
            counter = 0,
            interval;

        blinkMsg();

        function blinkMsg()
        {
            positionSubtitle();
            interval = (counter % 2 == 0) ? 800 : 300; 
            subtitleObj.html((counter % 2 == 0) ? message : '');
            counter++;
            if (counter < 6)
                setTimeout(function() {
                    blinkMsg();
                }, interval);
        }

        function positionSubtitle()
        {
            objectPosition = calc.getObjectPosition(refObj);
            messagePosition = calc.messagePos(objectPosition);
            subtitleObj.offset({ top: messagePosition[1], left: messagePosition[0]});
        }
    }

    function preloadImages(images) {
        for (i = 0; i < images.length; i++) {
            $('<img/>')[0].src = images[i];
        }
    }

    function displayItem(obj, arrPosition)
    {
        displayObjectOn(obj, arrPosition);
        obj.show();
    }

}