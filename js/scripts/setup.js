function Setup()
{
    this.clearGameValues = clearGameValues;
    this.setAll = setAll;
    this.resetAllValues = resetAllValues;

    return this;

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
        time = STANDARDTIME;
        pressedKey = false;
        thiefMoveRate = calculator.regraDeTres(STANDTHIEFMOVRATE, MAPSIZE);
        officer1MoveRate = MINMOVINGRATE;
        thiefPosArr[0] = 0;
        thiefPosArr[1] = 0;
        calculator.setOfficersStartCoords();
    }

    function setAll()
    {
        applySettings();
        setCharacters();
        setGameItems();
        setDisplayItems();

        function applySettings()
        {
            $.mobile.ajaxEnabled = false;
            $.mobile.loadingMessage = false;
            $.event.special.swipe.horizontalDistanceThreshold = SWIPEDISTANCE;
            $.event.special.swipe.verticalDistanceThreshold = SWIPEDISTANCE;
        }
        
        function setCharacters()
        {
            Thief = $('#thief');
            Officer1 = $('#officer1');
            Officer2 = $('#officer2');
        }

        function setGameItems()
        {
            Molotov = $('#molotov');
            Clock = $('#relogio');
            Bomb = $('#bomba');
            Counter1 = $('#contador');
            Counter2 = $('#contador2');
        }

        function setDisplayItems()
        {
            BackgroundImg = $('#backgroundImage');
            CurrLevel = $('#fase');
            Time = $('#time');
        }

    }
}