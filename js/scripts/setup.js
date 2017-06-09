function Setup()
{
    this.clearGameValues = clearGameValues;
    this.setAll = setAll;
    this.resetAllValues = resetAllValues;
    this.prepareSoundsForMobile = prepareSoundsForMobile;
    this.setVisualElements = setVisualElements;
    this.loadContent = loadContent;

    return this;

    function loadContent()
    {
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
        preloadImages(ImgsToPreload);
        setSounds();
    }


    function setSounds()
    {
        musicTheme = new Audio('audio/8bit_sparks.mp3');
        endGameSound = new Audio('audio/endGame.mp3');
        loadingTheme = new Audio('audio/looperman.mp3');
        bombSound = new Audio('audio/bomb.mp3');
        clockSound = new Audio('audio/crank-1.mp3');
        coinSound = new Audio('audio/coin1.wav');
    }

    function preloadImages(images)
    {
        var img;
        for (i = 0; i < images.length; i++) {
            img = new Image();
            img.src = images[i];
        }
    }

    function setVisualElements()
    {
        setCharacters();
        setGameItems();
        setDisplayItems();
    }

    function prepareSoundsForMobile()
    {
        musicTheme.volume = 0;
        endGameSound.volume = 0;
        loadingTheme.volume = 0;
        bombSound.volume = 0;
        clockSound.volume = 0;
        coinSound.volume = 0;

        loadingTheme.play();
        musicTheme.play();
        musicTheme.pause();
        endGameSound.play();
        endGameSound.pause();
        bombSound.play();
        bombSound.pause();
        clockSound.play();
        clockSound.pause();
        coinSound.play();
        coinSound.pause();

        musicTheme.currentTime = 0;
        endGameSound.currentTime = 0;
        loadingTheme.currentTime = 0;
        bombSound.currentTime = 0;
        clockSound.currentTime = 0;
        coinSound.currentTime = 0;

        musicTheme.volume = 1;
        endGameSound.volume = 1;
        loadingTheme.volume = 1;
        bombSound.volume = 1;
        clockSound.volume = 1;
        coinSound.volume = 1;
    }

    function clearGameValues()
    {
        time = 0;
        isClockVisible = false;
        isMolotovVisible = false;
        isBombVisible = false;
        currLevel = 1;
        points = 0;
        molotovTime = 0;
    }

    function resetAllValues()
    {
        clearGameValues();
        setOfficersStartCoords();
        time = STANDARDTIME;
        pressedKey = false;
        thiefMoveRate = calc.crossMultiply(STANDTHIEFMOVRATE);
        officerMoveRate[0] = SPEEDTABLE[1][0];
        officerMoveRate[1] = SPEEDTABLE[1][1];
        thiefPosArr[0] = 0;
        thiefPosArr[1] = 0;
        lastChangedLevel = 0;
    }

    function setAll()
    {
        applySettings();
        focusSettings();

        function applySettings()
        {
            $.mobile.ajaxEnabled = false;
            $.mobile.loader.prototype.options.disabled = true;
            $.mobile.loading('hide');
            $.mobile.loading().hide();
            $.mobile.loadingMessage = false;
            $.event.special.swipe.horizontalDistanceThreshold = SWIPEDISTANCE;
            $.event.special.swipe.verticalDistanceThreshold = SWIPEDISTANCE;
        }

        function focusSettings()
        {
            window.onblur = function() {
                musicTheme.pause();
                loadingTheme.pause();
                endGameSound.pause();
            };

            window.onfocus = function() {
                if (gameOn) {
                    musicTheme.play();
                    return;
                }
                loadingTheme.play();
            };
        }

    }

    function setCharacters()
    {
        Thief = document.getElementById('thief');
        Officer1 = document.getElementById('officer1');
        Officer2 = document.getElementById('officer2');
    }

    function setGameItems()
    {
        Molotov = document.getElementById('molotov');
        Clock = document.getElementById('clock');
        Bomb = document.getElementById('bomb');
        Counter1 = document.getElementById('counter1');
        Counter2 = document.getElementById('counter2');
    }

    function setDisplayItems()
    {
        BackgroundImg = document.getElementById('backgroundImage');
        CurrLevel = document.getElementById('fase');
        Time = document.getElementById('time');
    }

    function setOfficersStartCoords()
    {
        var coord = MAPSIZE - CHARSIZE;
        officerPosArr[0][0] = coord;
        officerPosArr[0][1] = coord;
        officerPosArr[1][0] = coord;
        officerPosArr[1][1] = coord;
    }

}