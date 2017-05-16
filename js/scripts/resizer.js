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

        $(".presentation").css("height", MAPSIZE);
        $("#presentationImage").attr("width", MAPSIZE+"px");
        $("#presentationImage").attr("height", MAPSIZE+"px");

        $(".endGameImage").css("width", MAPSIZE+"px");
        $(".endGameImage").css("height", MAPSIZE+"px");

        $(".setas").attr("width", calc.crossMultiply(48, MAPSIZE)+"px");
        $(".setas").attr("height", calc.crossMultiply(70, MAPSIZE)+"px");
        $(".setas").attr("padding-left", calc.crossMultiply(8, MAPSIZE)+"px");

        $(".thiefInstruction").attr("width", calc.crossMultiply(99, MAPSIZE)+"px");
        $(".thiefInstruction").attr("height", calc.crossMultiply(86, MAPSIZE)+"px");

        $(".barItem").attr("width", calc.crossMultiply(25, MAPSIZE)+"px");
        $(".barItem").attr("height", calc.crossMultiply(25, MAPSIZE)+"px");
        $(".barItem").css("padding-right", calc.crossMultiply(14, MAPSIZE)+"px");
        $(".barItem").css("padding-top", calc.crossMultiply(10, MAPSIZE)+"px");
        
        $("#timeBox").css("padding-left", calc.crossMultiply(10, MAPSIZE)+"px");
        $("#scoreBox").css("padding-left", calc.crossMultiply(120, MAPSIZE)+"px");
        $("#dificultyBox").css("padding-left", calc.crossMultiply(240, MAPSIZE)+"px");
        $("#dificultyBox").css("width", calc.crossMultiply(95, MAPSIZE)+"px");

        $(".actionButton").attr("width", calc.crossMultiply(100, MAPSIZE)+"px");
        $(".actionButton").attr("height", calc.crossMultiply(100, MAPSIZE)+"px");

        $(".barraInfo").css("top", MAPSIZE);
        $(".barraInfo").css("width", MAPSIZE);
        $(".barraInfo").css("height", calc.crossMultiply(100, MAPSIZE)+"px");
        $(".barraInfo").css("border-bottom-width", calc.crossMultiply(5, MAPSIZE)+"px");
        $(".barraInfo").css("padding-top", calc.crossMultiply(5, MAPSIZE)+"px");
        $(".barraInfo").css("padding-bottom", calc.crossMultiply(5, MAPSIZE)+"px");

        $(".mostrador").css("font-size", calc.crossMultiply(32, MAPSIZE)+"px");
        $(".mostrador").css("padding-top", calc.crossMultiply(8, MAPSIZE)+"px");

        $(".tituloMostrador").css("font-size", calc.crossMultiply(17, MAPSIZE)+"px");

        $(".action").css("font-size", calc.crossMultiply(14, MAPSIZE)+"px");
        $(".action").css("padding-top", calc.crossMultiply(5, MAPSIZE)+"px");
        $(".action").css("min-width", calc.crossMultiply(20, MAPSIZE)+"px");
        $(".action").css("max-width", calc.crossMultiply(90, MAPSIZE)+"px");

        $(".contador").css("font-size", calc.crossMultiply(14, MAPSIZE)+"px");
        
        $(".busted").css("width", MAPSIZE+"px");
        $(".busted").css("height", MAPSIZE+"px");
        $(".timeUp").css("width", MAPSIZE+"px");
        $(".timeUp").css("height", MAPSIZE+"px");

        $(".userName").css("padding-left", calc.crossMultiply(10, MAPSIZE)+"px");
        $(".userName").css("padding-top", calc.crossMultiply(15, MAPSIZE)+"px");
        $(".userName").css("font-size", calc.crossMultiply(19, MAPSIZE)+"px");

        $(".slideLabel").css("font-size", calc.crossMultiply(18, MAPSIZE)+"px");
        $(".slideLabel").css("padding-left", calc.crossMultiply(70, MAPSIZE)+"px");

        $(".thiefInstruction").css("padding-left", calc.crossMultiply(130, MAPSIZE)+"px");

        $(".collectLabel").css("padding-left", calc.crossMultiply(250, MAPSIZE)+"px");
        $(".collectLabel").css("font-size", calc.crossMultiply(18, MAPSIZE)+"px");
        $(".collectLabel").css("width", calc.crossMultiply(115, MAPSIZE)+"px");

        $(".items").css("padding-top", calc.crossMultiply(5, MAPSIZE)+"px");

        $(".loginButton").css("top", calc.crossMultiply(407, MAPSIZE)+"px");
        $(".loginButton").css("left", calc.crossMultiply(63, MAPSIZE)+"px");
        $(".loginButton").css("width", calc.crossMultiply(180, MAPSIZE)+"px");
        $(".loginButton").css("height", calc.crossMultiply(55, MAPSIZE)+"px");
        $(".loginButton").css("font-size", calc.crossMultiply(18, MAPSIZE)+"px");

        $("#loginStatus").css("left", calc.crossMultiply(73, MAPSIZE)+"px");
        $("#loginStatus").css("top", calc.crossMultiply(359, MAPSIZE)+"px");
        $("#loginStatus").css("font-size", calc.crossMultiply(20, MAPSIZE)+"px");

        $(".buttonWeeklyRanking").css("left", calc.crossMultiply(252, MAPSIZE)+"px");
        $(".buttonWeeklyRanking").css("top", calc.crossMultiply(404, MAPSIZE)+"px");
        $(".buttonWeeklyRanking").css("width", calc.crossMultiply(181, MAPSIZE)+"px");
        $(".buttonWeeklyRanking").css("height", calc.crossMultiply(49, MAPSIZE)+"px");
        $(".buttonWeeklyRanking").css("font-size", calc.crossMultiply(16, MAPSIZE)+"px");
        $(".buttonWeeklyRanking").css("padding-top", calc.crossMultiply(7, MAPSIZE)+"px");

        $(".barLeft").css("padding-top", calc.crossMultiply(10, MAPSIZE)+"px");
    }

    function resizeGamePlayElements()
    {
        $("#fundo").css("height", MAPSIZE);
        BackgroundImg.attr("width", MAPSIZE+"px");
        BackgroundImg.attr("height", MAPSIZE+"px");
        $(".personagem").css("width", CHARSIZE+"px");
        $(".personagem").css("height", CHARSIZE+"px");
        $(".item").css("width", ITEMSIZE+"px");
        $(".item").css("height", ITEMSIZE+"px");
    }
}