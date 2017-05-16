// App Objects
var setup,
    eventHandlers,
    movement,
    interactions,
    calc,
    display,
    resizer;

// Characters
var Thief,
    Officer1,
    Officer2;

// Game Items
var Molotov,
    Clock,
    Bomb;

// Display Items
var Counter1,
    Counter2,
    BackgroundImg,
    CurrLevel,
    Time;

// Dimentional Constants
var MAPSIZE = 500,
    CHARSIZE = 75,
    ITEMSIZE = 25,
    CATCHTOLERANCE = 15,
    CROSSBORDERTOLERANCE = 20;

// Other game constant settings
var STANDARDTIME = 20,
    PTSTOCHANGELEVEL = 40,
    POINTUNITY = 5,
    BONUSTIME = 3,
    MOLOTOVPAUSE = 4,
    DISPLAYCLOCKAT = 7,
    TWOPOLICEMENLEVEL = 3,
    MINMOVINGRATE = 3,
    STANDTHIEFMOVRATE = 6,
    STANDGAMEREFRESHRATE = 40,
    SWIPEDISTANCE = 20,
    SPEEDTABLE;

// Functional game variables
var pressedKey,
    points,
    isClockVisible,
    isMolotovVisible,
    isBombVisible,
    thiefMoveRate,
    officerMoveRate = new Array(0, 0),
    currLevel,
    time,
    molotovTime;

// Game elements' position arrays
var officerPosArr = new Array(new Array(0, 0), new Array(0, 0)),
    thiefPosArr = new Array(0, 0),
    moneyPos = new Array(0, 0),
    clockPos = new Array(0, 0),
    molotovPos = new Array(0, 0),
    bombPos = new Array(0, 0);