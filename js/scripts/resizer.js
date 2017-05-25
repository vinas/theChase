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

        MAPSIZE = $("#fundo").css("width").replace(new RegExp("px", 'g'), "");
        CROSSBORDERTOLERANCE = calc.crossMultiply(CROSSBORDERTOLERANCE, MAPSIZE);
        MINMOVINGRATE = calc.crossMultiply(MINMOVINGRATE, MAPSIZE);
        CATCHTOLERANCE = calc.crossMultiply(CATCHTOLERANCE, MAPSIZE);
        CHARSIZE = calc.crossMultiply(CHARSIZE, MAPSIZE);
        ITEMSIZE = calc.crossMultiply(ITEMSIZE, MAPSIZE);
        setSpeedTable();
    }

    function setSpeedTable()
    {
        SPEEDTABLE = new Array(
            new Array(0, 0),
            new Array(MINMOVINGRATE, 0),
            new Array(MINMOVINGRATE + calc.crossMultiply(1, MAPSIZE), 0),
            new Array(MINMOVINGRATE + calc.crossMultiply(2, MAPSIZE), MINMOVINGRATE),
            new Array(MINMOVINGRATE + calc.crossMultiply(3, MAPSIZE), MINMOVINGRATE),
            new Array(MINMOVINGRATE + calc.crossMultiply(3, MAPSIZE), MINMOVINGRATE + calc.crossMultiply(1, MAPSIZE)),
            new Array(MINMOVINGRATE + calc.crossMultiply(3, MAPSIZE), MINMOVINGRATE + calc.crossMultiply(2, MAPSIZE)),
            new Array(MINMOVINGRATE + calc.crossMultiply(3, MAPSIZE), MINMOVINGRATE + calc.crossMultiply(3, MAPSIZE)),
            new Array(MINMOVINGRATE + calc.crossMultiply(4, MAPSIZE), MINMOVINGRATE + calc.crossMultiply(3, MAPSIZE)),
            new Array(MINMOVINGRATE + calc.crossMultiply(4, MAPSIZE), MINMOVINGRATE + calc.crossMultiply(4, MAPSIZE)),
            new Array(MINMOVINGRATE + calc.crossMultiply(5, MAPSIZE), MINMOVINGRATE + calc.crossMultiply(4, MAPSIZE)),
            new Array(MINMOVINGRATE + calc.crossMultiply(5, MAPSIZE), MINMOVINGRATE + calc.crossMultiply(5, MAPSIZE)),
            new Array(MINMOVINGRATE + calc.crossMultiply(6, MAPSIZE), MINMOVINGRATE + calc.crossMultiply(5, MAPSIZE)),
            new Array(MINMOVINGRATE + calc.crossMultiply(6, MAPSIZE), MINMOVINGRATE + calc.crossMultiply(6, MAPSIZE)),
            new Array(MINMOVINGRATE + calc.crossMultiply(6, MAPSIZE), MINMOVINGRATE + calc.crossMultiply(6, MAPSIZE)),
            new Array(MINMOVINGRATE + calc.crossMultiply(6, MAPSIZE), MINMOVINGRATE + calc.crossMultiply(6, MAPSIZE)),
            new Array(MINMOVINGRATE + calc.crossMultiply(6, MAPSIZE), MINMOVINGRATE + calc.crossMultiply(6, MAPSIZE)),
            new Array(MINMOVINGRATE + calc.crossMultiply(6, MAPSIZE), MINMOVINGRATE + calc.crossMultiply(6, MAPSIZE)),
            new Array(MINMOVINGRATE + calc.crossMultiply(6, MAPSIZE), MINMOVINGRATE + calc.crossMultiply(6, MAPSIZE))
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

        document.getElementById('setas').style.width = calc.crossMultiply(48, MAPSIZE)+'px';
        document.getElementById('setas').style.height = calc.crossMultiply(70, MAPSIZE)+'px';
        document.getElementById('setas').style.paddingLeft = calc.crossMultiply(8, MAPSIZE)+'px';

        document.getElementById('thiefInstruction').style.width = calc.crossMultiply(99, MAPSIZE)+'px';
        document.getElementById('thiefInstruction').style.height = calc.crossMultiply(86, MAPSIZE)+'px';
        document.getElementById('thiefInstruction').style.paddingLeft = calc.crossMultiply(130, MAPSIZE)+'px';

        document.getElementById('timeBox').style.paddingLeft = calc.crossMultiply(10, MAPSIZE)+'px';
        document.getElementById('scoreBox').style.paddingLeft = calc.crossMultiply(120, MAPSIZE)+'px';
        document.getElementById('dificultyBox').style.paddingLeft = calc.crossMultiply(240, MAPSIZE)+'px';
        document.getElementById('dificultyBox').style.width = calc.crossMultiply(95, MAPSIZE)+'px';

        document.getElementById('barraInfo').style.width = MAPSIZE+'px';
        document.getElementById('barraInfo').style.height = calc.crossMultiply(100, MAPSIZE)+'px';
        document.getElementById('barraInfo').style.top = MAPSIZE+'px';
        document.getElementById('barraInfo').style.borderBottomWidth = calc.crossMultiply(5, MAPSIZE)+'px';
        document.getElementById('barraInfo').style.paddingTop = calc.crossMultiply(5, MAPSIZE)+'px';
        document.getElementById('barraInfo').style.paddingBottom = calc.crossMultiply(5, MAPSIZE)+'px';

        document.getElementById('busted').style.width = MAPSIZE+'px';
        document.getElementById('busted').style.height = MAPSIZE+'px';
        document.getElementById('timeUp').style.width = MAPSIZE+'px';
        document.getElementById('timeUp').style.height = MAPSIZE+'px';

        document.getElementById('slideLabel').style.fontSize = calc.crossMultiply(18, MAPSIZE)+'px';
        document.getElementById('slideLabel').style.paddingLeft = calc.crossMultiply(70, MAPSIZE)+'px';

        document.getElementById('collectLabel').style.paddingLeft = calc.crossMultiply(250, MAPSIZE)+'px';
        document.getElementById('collectLabel').style.fontSize = calc.crossMultiply(18, MAPSIZE)+'px';
        document.getElementById('collectLabel').style.width = calc.crossMultiply(115, MAPSIZE)+'px';

        document.getElementById('items').style.paddingTop = calc.crossMultiply(5, MAPSIZE)+'px';

        document.getElementById('loginButton').style.top = calc.crossMultiply(407, MAPSIZE)+'px';
        document.getElementById('loginButton').style.left = calc.crossMultiply(63, MAPSIZE)+'px';
        document.getElementById('loginButton').style.width = calc.crossMultiply(180, MAPSIZE)+'px';
        document.getElementById('loginButton').style.height = calc.crossMultiply(55, MAPSIZE)+'px';
        document.getElementById('loginButton').style.fontSize = calc.crossMultiply(18, MAPSIZE)+'px';

        document.getElementById('loginStatus').style.left = calc.crossMultiply(73, MAPSIZE)+'px';
        document.getElementById('loginStatus').style.top = calc.crossMultiply(359, MAPSIZE)+'px';
        document.getElementById('loginStatus').style.fontSize = calc.crossMultiply(20, MAPSIZE)+'px';

        document.getElementById('barLeft').style.fontSize = calc.crossMultiply(10, MAPSIZE)+'px';

        $(".barItem").attr("width", calc.crossMultiply(25, MAPSIZE)+"px");
        $(".barItem").attr("height", calc.crossMultiply(25, MAPSIZE)+"px");
        $(".barItem").css("padding-right", calc.crossMultiply(14, MAPSIZE)+"px");
        $(".barItem").css("padding-top", calc.crossMultiply(10, MAPSIZE)+"px");

        $(".actionButton").attr("width", calc.crossMultiply(100, MAPSIZE)+"px");
        $(".actionButton").attr("height", calc.crossMultiply(100, MAPSIZE)+"px");

        $(".mostrador").css("font-size", calc.crossMultiply(32, MAPSIZE)+"px");
        $(".mostrador").css("padding-top", calc.crossMultiply(8, MAPSIZE)+"px");
        $(".tituloMostrador").css("font-size", calc.crossMultiply(17, MAPSIZE)+"px");

        $(".action").css("font-size", calc.crossMultiply(14, MAPSIZE)+"px");
        $(".action").css("padding-top", calc.crossMultiply(5, MAPSIZE)+"px");
        $(".action").css("min-width", calc.crossMultiply(20, MAPSIZE)+"px");
        $(".action").css("max-width", calc.crossMultiply(90, MAPSIZE)+"px");

        $(".contador").css("font-size", calc.crossMultiply(14, MAPSIZE)+"px");

        $(".buttonWeeklyRanking").css("left", calc.crossMultiply(252, MAPSIZE)+"px");
        $(".buttonWeeklyRanking").css("top", calc.crossMultiply(404, MAPSIZE)+"px");
        $(".buttonWeeklyRanking").css("width", calc.crossMultiply(181, MAPSIZE)+"px");
        $(".buttonWeeklyRanking").css("height", calc.crossMultiply(49, MAPSIZE)+"px");
        $(".buttonWeeklyRanking").css("font-size", calc.crossMultiply(16, MAPSIZE)+"px");
        $(".buttonWeeklyRanking").css("padding-top", calc.crossMultiply(7, MAPSIZE)+"px");
    }

    function resizeGamePlayElements()
    {
        document.getElementById('fundo').style.height = MAPSIZE+'px';
        BackgroundImg.style.width = MAPSIZE+"px";
        BackgroundImg.style.height = MAPSIZE+"px";

        $(".personagem").css("width", CHARSIZE+"px");
        $(".personagem").css("height", CHARSIZE+"px");
        $(".item").css("width", ITEMSIZE+"px");
        $(".item").css("height", ITEMSIZE+"px");
    }
}