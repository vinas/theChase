function Display()
{
    var Money = document.getElementById('dinheiro'),
        PointsCounter = document.getElementById('points'),
        Subtitle1 = document.getElementById('actionSubtitle1'),
        Subtitle2 = document.getElementById('actionSubtitle2'),
        Subtitle3 = document.getElementById('actionSubtitle3'),
        Busted = document.getElementById('busted'),
        TimeUp = document.getElementById('timeUp');

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

    this.bomb = bomb;
    this.bombFeedback = bombFeedback;
    this.burnDaPolice = burnDaPolice;
    this.busted = busted;
    this.clock = clock;
    this.clockFeedback = clockFeedback;
    this.gameInfo = gameInfo;
    this.flash = flash;
    this.flashOfficers = flashOfficers;

    this.molotovCounter = molotovCounter;
    this.hideInGameElements = hideInGameElements;
    this.hideMolotov = hideMolotov;
    this.hideBomb = hideBomb;
    this.hideOfficer2 = hideOfficer2;

    this.money = money;
    this.molotov = molotov;
    this.timeUp = timeUp;
    this.showInGameElements = showInGameElements;
    this.hideGameValues = hideGameValues;
    this.loading = loading;
    this.startPressedTimmer = startPressedTimmer;
    this.show2ndPoliceman = show2ndPoliceman;
    this.setNewBackground = setNewBackground;
    this.mirrorObj = mirrorObj;
    this.updatePointsDisplay = updatePointsDisplay;
    this.updateDificultyDisplay = updateDificultyDisplay;
    this.setThiefHorDirection = setThiefHorDirection;
    this.restorePolicemen = restorePolicemen;
    this.relocateCharacters = relocateCharacters;
    this.objectAt = objectAt;

    return this;

    function bomb()
    {
        bombPos = calc.randomCoords();
        displayItem(Bomb, bombPos);
        isBombVisible = true;
    }

    function bombFeedback()
    {
        showFeedBack(Officer1, Subtitle1, 'slow');
        if (calc.isTwoPolicemenLevel()) {
            showFeedBack(Officer2, Subtitle1, 'slow');
        }
    }

    function burnDaPolice()
    {
        Officer1.setAttribute('src', 'img/guarda_fogo_02.gif');
        showFeedBack(Officer1, Subtitle1, "can't move");
        if (calc.isTwoPolicemenLevel()) {
            Officer2.setAttribute('src', 'img/guarda_fogo_02.gif');
            showFeedBack(Officer2, Subtitle2, "can't move");
        }
    }

    function busted()
    {
        Busted.style.display = 'block';
    }

    function clock()
    {
        if ((time == DISPLAYCLOCKAT) && (!isClockVisible)) {
            clockPos = calc.randomCoords();
            displayItem(Clock, clockPos);
            isClockVisible = true;
        }
    }

    function clockFeedback()
    {
        showFeedBack(Thief, Subtitle3, 'time +10');
    }

    function gameInfo()
    {
        PointsCounter.innerHTML = '0';
        BackgroundImg.setAttribute('src', 'img/background_v2.jpg');
        Officer1.setAttribute('src', 'img/guarda.gif');
        Subtitle1.innerHTML = '';
        CurrLevel.innerHTML = currLevel;
        Time.innerHTML = time;
    }

    function flash(obj, color) {
        var flashCount = 0;
        color = (!color) ? '#FFD61F' : color;

        flashThis();

        function flashThis()
        {
            obj.style.backgroundColor = (flashCount % 2 == 0) ? color : '';
            flashCount++;
            if (flashCount < 6) 
                setTimeout(function() {
                    flashThis();
                }, 100);
        }
    }

    function flashOfficers()
    {
        flash(Officer1);
        if (currLevel > TWOPOLICEMENLEVEL)
            flash(Officer2);
    }



    function money() {
        moneyPos = calc.randomCoords();
        displayItem(Money, moneyPos);
    }

    function hideOfficer2()
    {
        Counter2.style.display = 'none';
        Officer2.style.display = 'none';
        Officer2.setAttribute("src", "img/guarda.gif");
    }

    function objectAt(obj, posArr)
    {
        obj.style.left = posArr[0];
        obj.style.top = posArr[1];
    }

    function relocateCharacters()
    {
        objectAt(Thief, thiefPosArr);
        objectAt(Officer1, officerPosArr[0]);
        objectAt(Officer2, officerPosArr[1]);
    }

    function restorePolicemen()
    {
        Officer1.setAttribute("src", "img/guarda.gif");
        Counter1.style.display = 'none';
        if (calc.isTwoPolicemenLevel()) {
            Officer2.setAttribute("src", "img/guarda.gif");
            Counter2.style.display = 'none';
        }
    }

    function molotovCounter()
    {
        objectAt(
            Counter1,
            new Array(
                (officerPosArr[0][0] - 5),
                (officerPosArr[0][1] - 5)
            )
        );
        Counter1.innerHTML = molotovTime;
        Counter1.style.display = 'block';
        if (calc.isTwoPolicemenLevel()) {
            objectAt(
                Counter2,
                new Array(
                    (officerPosArr[1][0] - 5),
                    (officerPosArr[1][1] - 5)
                )
            );
            Counter2.innerHTML = molotovTime;
            Counter2.style.display = 'block';
        }
    }

    function hideMolotov()
    {
        Molotov.style.display = 'none';
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
        CurrLevel.innerHTML = currLevel;
        flash(CurrLevel);
    }

    function updatePointsDisplay()
    {
        PointsCounter.innerHTML = points;
        flash(PointsCounter);
    }

    function timeUp()
    {
        TimeUp.style.display = 'block';
    }

    function hideInGameElements()
    {
        document.getElementById('instructionsBar').style.display = 'none';
        document.getElementById('presentation').style.display = 'none';
        Clock.style.display = 'none';
        Molotov.style.display = 'none';
        Bomb.style.display = 'none';
        Counter1.style.display = 'none';
        Counter2.style.display = 'none';
        Busted.style.display = 'none';
        TimeUp.style.display = 'none';
        Officer2.style.display = 'none';
    }

    function showInGameElements()
    {
        document.getElementById('scoreBar').style.display = 'block';
        Thief.style.display = 'block';
        Officer1.style.display = 'block';
        Money.style.display = 'block';
    }

    function hideGameValues()
    {
        Thief.style.display = 'none';
        Officer1.style.display = 'none';
        Officer2.style.display = 'none';
        Money.style.display = 'none';
        Clock.style.display = 'none';
        Molotov.style.display = 'none';
        Bomb.style.display = 'none';
    }

    function loading() {
        preloadImages(ImgsToPreload);
        document.getElementById('loading').style.display = 'none';
        document.getElementById('resetGame').style.display = 'block';
    }

    function startPressedTimmer()
    {
        var button = document.getElementById('resetGame');
        button.setAttribute('src', 'img/start_over.png');
        setTimeout(function() {
           button.setAttribute('src', 'img/start.png');
        }, 300);
    }

    function show2ndPoliceman()
    {
        police = Officer2;
        if (molotovTime > 0) {
            police.setAttribute('src', 'img/guarda_fogo_02.gif')
        }
        calc.officer2StartPos();
        objectAt(Officer2, officerPosArr[1]);
        police.style.display = 'block';
    }

    function setNewBackground()
    {
        BackgroundImg.setAttribute(
            "src",
            "img/"+sortBackground()
        );
    }

    function mirrorObj(objeto, escala)
    {
        objeto.style.MozTransform = "scaleX("+escala+")";
        objeto.style.webkitTransform = "scaleX("+escala+")";
        objeto.style.OTransform = "scaleX("+escala+")";
        objeto.style.transform = "scaleX("+escala+")";
        objeto.style.msFilter = "fliph";
        objeto.style.filter = "fliph";
    }

    function hideBomb()
    {
        Bomb.style.display = 'none';
        isBombVisible = false;
    }

    function molotov()
    {
        molotovPos = calc.randomCoords();
        displayItem(Molotov, molotovPos);
        isMolotovVisible = true;
    }



    function sortBackground()
    {
        var rand = Math.floor(Math.random() * backgrounds.length);
        while (BackgroundImg.getAttribute("src") == "url(img/"+backgrounds[rand]+")") {
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
            subtitleObj.innerHTML = (counter % 2 == 0) ? message : '';
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
            objectAt(subtitleObj, messagePosition);
        }
    }

    function preloadImages(images) {
        for (i = 0; i < images.length; i++) {
            $('<img/>')[0].src = images[i];
        }
    }

    function displayItem(obj, arrPosition)
    {
        objectAt(obj, arrPosition);
        obj.style.display = 'block';
    }

}