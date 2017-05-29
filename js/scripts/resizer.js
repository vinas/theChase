function Resizer()
{
    this.resizeMapAndItems = resizeMapAndItems;

    return this;

    function resizeMapAndItems()
    {
        calculateMeasurements();
        resizeVisualElements();
    }


    function calculateMeasurements()
    {
        MAPSIZE = document.getElementById('fundo').clientWidth;
        CROSSBORDERTOLERANCE = calc.crossMultiply(CROSSBORDERTOLERANCE);
        MINMOVINGRATE = calc.crossMultiply(MINMOVINGRATE);
        CATCHTOLERANCE = calc.crossMultiply(CATCHTOLERANCE);
        CHARSIZE = calc.crossMultiply(CHARSIZE);
        ITEMSIZE = calc.crossMultiply(ITEMSIZE);
        THROWSPEED = calc.crossMultiply(THROWSPEED);
        setSpeedTable();
    }

    function setSpeedTable()
    {
        SPEEDTABLE = new Array(
            new Array(0, 0),
            new Array(MINMOVINGRATE, 0),
            new Array(MINMOVINGRATE + calc.crossMultiply(1), 0),
            new Array(MINMOVINGRATE + calc.crossMultiply(2), MINMOVINGRATE),
            new Array(MINMOVINGRATE + calc.crossMultiply(3), MINMOVINGRATE),
            new Array(MINMOVINGRATE + calc.crossMultiply(3), MINMOVINGRATE + calc.crossMultiply(1)),
            new Array(MINMOVINGRATE + calc.crossMultiply(3), MINMOVINGRATE + calc.crossMultiply(2)),
            new Array(MINMOVINGRATE + calc.crossMultiply(3), MINMOVINGRATE + calc.crossMultiply(3)),
            new Array(MINMOVINGRATE + calc.crossMultiply(4), MINMOVINGRATE + calc.crossMultiply(3)),
            new Array(MINMOVINGRATE + calc.crossMultiply(4), MINMOVINGRATE + calc.crossMultiply(4)),
            new Array(MINMOVINGRATE + calc.crossMultiply(5), MINMOVINGRATE + calc.crossMultiply(4)),
            new Array(MINMOVINGRATE + calc.crossMultiply(5), MINMOVINGRATE + calc.crossMultiply(5)),
            new Array(MINMOVINGRATE + calc.crossMultiply(6), MINMOVINGRATE + calc.crossMultiply(5)),
            new Array(MINMOVINGRATE + calc.crossMultiply(6), MINMOVINGRATE + calc.crossMultiply(6)),
            new Array(MINMOVINGRATE + calc.crossMultiply(6), MINMOVINGRATE + calc.crossMultiply(6)),
            new Array(MINMOVINGRATE + calc.crossMultiply(6), MINMOVINGRATE + calc.crossMultiply(6)),
            new Array(MINMOVINGRATE + calc.crossMultiply(6), MINMOVINGRATE + calc.crossMultiply(6)),
            new Array(MINMOVINGRATE + calc.crossMultiply(6), MINMOVINGRATE + calc.crossMultiply(6)),
            new Array(MINMOVINGRATE + calc.crossMultiply(6), MINMOVINGRATE + calc.crossMultiply(6))
        );
    }

    function resizeVisualElements()
    {
        resizeGamePlayElements();

        document.getElementById('presentation').style.height = MAPSIZE+'px';
        document.getElementById('presentationImage').style.width = MAPSIZE+'px';
        document.getElementById('presentationImage').style.height = MAPSIZE+'px';

        document.getElementById('bustedEndGameImage').style.width = MAPSIZE+'px';
        document.getElementById('bustedEndGameImage').style.height = MAPSIZE+'px';
        document.getElementById('timeUpEndGameImage').style.width = MAPSIZE+'px';
        document.getElementById('timeUpEndGameImage').style.height = MAPSIZE+'px';

        document.getElementById('setas').style.width = calc.crossMultiply(48)+'px';
        document.getElementById('setas').style.height = calc.crossMultiply(70)+'px';
        document.getElementById('setas').style.paddingLeft = calc.crossMultiply(8)+'px';

        document.getElementById('thiefInstruction').style.width = calc.crossMultiply(99)+'px';
        document.getElementById('thiefInstruction').style.height = calc.crossMultiply(86)+'px';
        document.getElementById('thiefInstruction').style.paddingLeft = calc.crossMultiply(130)+'px';

        document.getElementById('timeBox').style.paddingLeft = calc.crossMultiply(10)+'px';
        document.getElementById('scoreBox').style.paddingLeft = calc.crossMultiply(120)+'px';
        document.getElementById('dificultyBox').style.paddingLeft = calc.crossMultiply(240)+'px';
        document.getElementById('dificultyBox').style.width = calc.crossMultiply(95)+'px';

        document.getElementById('barraInfo').style.width = MAPSIZE+'px';
        document.getElementById('barraInfo').style.height = calc.crossMultiply(100)+'px';
        document.getElementById('barraInfo').style.top = MAPSIZE+'px';
        document.getElementById('barraInfo').style.borderBottomWidth = calc.crossMultiply(5)+'px';
        document.getElementById('barraInfo').style.paddingTop = calc.crossMultiply(5)+'px';
        document.getElementById('barraInfo').style.paddingBottom = calc.crossMultiply(5)+'px';

        document.getElementById('busted').style.width = MAPSIZE+'px';
        document.getElementById('busted').style.height = MAPSIZE+'px';
        document.getElementById('timeUp').style.width = MAPSIZE+'px';
        document.getElementById('timeUp').style.height = MAPSIZE+'px';

        document.getElementById('slideLabel').style.fontSize = calc.crossMultiply(18)+'px';
        document.getElementById('slideLabel').style.paddingLeft = calc.crossMultiply(70)+'px';

        document.getElementById('collectLabel').style.paddingLeft = calc.crossMultiply(250)+'px';
        document.getElementById('collectLabel').style.fontSize = calc.crossMultiply(18)+'px';
        document.getElementById('collectLabel').style.width = calc.crossMultiply(115)+'px';

        document.getElementById('items').style.paddingTop = calc.crossMultiply(5)+'px';

        /*document.getElementById('loginButton').style.top = calc.crossMultiply(407)+'px';
        document.getElementById('loginButton').style.left = calc.crossMultiply(63)+'px';
        document.getElementById('loginButton').style.width = calc.crossMultiply(180)+'px';
        document.getElementById('loginButton').style.height = calc.crossMultiply(55)+'px';
        document.getElementById('loginButton').style.fontSize = calc.crossMultiply(18)+'px';

        document.getElementById('loginStatus').style.left = calc.crossMultiply(73)+'px';
        document.getElementById('loginStatus').style.top = calc.crossMultiply(359)+'px';
        document.getElementById('loginStatus').style.fontSize = calc.crossMultiply(20)+'px';*/

        document.getElementById('barLeft').style.fontSize = calc.crossMultiply(10)+'px';

        setClassProp('barItem', 'width', calc.crossMultiply(25)+'px');
        setClassProp('barItem', 'height', calc.crossMultiply(25)+'px');
        setClassProp('barItem', 'padding-right', calc.crossMultiply(14)+'px');
        setClassProp('barItem', 'padding-top', calc.crossMultiply(10)+'px');

        setClassProp('actionButton', 'width', calc.crossMultiply(100)+'px');
        setClassProp('actionButton', 'height', calc.crossMultiply(100)+'px');

        setClassProp('mostrador', 'font-size', calc.crossMultiply(32)+'px');
        setClassProp('mostrador', 'padding-top', calc.crossMultiply(8)+'px');
        setClassProp('tituloMostrador', 'font-size', calc.crossMultiply(17)+'px');

        setClassProp('action', 'font-size', calc.crossMultiply(14)+'px');
        setClassProp('action', 'padding-top', calc.crossMultiply(5)+'px');
        setClassProp('action', 'min-width', calc.crossMultiply(20)+'px');
        setClassProp('action', 'max-width', calc.crossMultiply(90)+'px');

        setClassProp('contador', 'font-size', calc.crossMultiply(14)+'px');

        setClassProp('buttonWeeklyRanking', 'left', calc.crossMultiply(252)+'px');
        setClassProp('buttonWeeklyRanking', 'top', calc.crossMultiply(404)+'px');
        setClassProp('buttonWeeklyRanking', 'width', calc.crossMultiply(181)+'px');
        setClassProp('buttonWeeklyRanking', 'height', calc.crossMultiply(49)+'px');
        setClassProp('buttonWeeklyRanking', 'font-size', calc.crossMultiply(16)+'px');
        setClassProp('buttonWeeklyRanking', 'padding-top', calc.crossMultiply(7)+'px');
    }

    function resizeGamePlayElements()
    {
        document.getElementById('fundo').style.height = MAPSIZE+'px';
        BackgroundImg.style.width = MAPSIZE+"px";
        BackgroundImg.style.height = MAPSIZE+"px";

        setClassProp('personagem', 'width', CHARSIZE+'px');
        setClassProp('personagem', 'height', CHARSIZE+'px');

        setClassProp('item', 'width', ITEMSIZE+'px');
        setClassProp('item', 'height', ITEMSIZE+'px');
    }

    function setClassProp(className, prop, value)
    {
        var els = document.getElementsByClassName(className),
            i;
        for (i = 0; i < els.length; i++) {
            els[i].style[prop] = value;
        }
    }
}
