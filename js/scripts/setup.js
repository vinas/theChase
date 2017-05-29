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
        setCharacters();
        setGameItems();
        setDisplayItems();

        function applySettings()
        {
            /*$.mobile.ajaxEnabled = false;
            $.mobile.loadingMessage = false;*/
            $.event.special.swipe.horizontalDistanceThreshold = SWIPEDISTANCE;
            $.event.special.swipe.verticalDistanceThreshold = SWIPEDISTANCE;
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
            Bomb = document.getElementById('bomba');
            Counter1 = document.getElementById('contador');
            Counter2 = document.getElementById('contador2');
        }

        function setDisplayItems()
        {
            BackgroundImg = document.getElementById('backgroundImage');
            CurrLevel = document.getElementById('fase');
            Time = document.getElementById('time');
        }

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