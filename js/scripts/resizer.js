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
        CROSSBORDERTOLERANCE = calculator.crossMultiply(CROSSBORDERTOLERANCE, MAPSIZE);
        MINMOVINGRATE = calculator.crossMultiply(MINMOVINGRATE, MAPSIZE);
        CATCHTOLERANCE = calculator.crossMultiply(CATCHTOLERANCE, MAPSIZE);
        CHARSIZE = calculator.crossMultiply(CHARSIZE, MAPSIZE);
        ITEMSIZE = calculator.crossMultiply(ITEMSIZE, MAPSIZE);
        SPEEDTABLE = new Array(
            new Array(0, 0),
            new Array(MINMOVINGRATE, 0),
            new Array(MINMOVINGRATE + calculator.crossMultiply(1, MAPSIZE), 0),
            new Array(MINMOVINGRATE + calculator.crossMultiply(2, MAPSIZE), MINMOVINGRATE),
            new Array(MINMOVINGRATE + calculator.crossMultiply(3, MAPSIZE), MINMOVINGRATE),
            new Array(MINMOVINGRATE + calculator.crossMultiply(3, MAPSIZE), MINMOVINGRATE + calculator.crossMultiply(1, MAPSIZE)),
            new Array(MINMOVINGRATE + calculator.crossMultiply(3, MAPSIZE), MINMOVINGRATE + calculator.crossMultiply(2, MAPSIZE)),
            new Array(MINMOVINGRATE + calculator.crossMultiply(3, MAPSIZE), MINMOVINGRATE + calculator.crossMultiply(3, MAPSIZE)),
            new Array(MINMOVINGRATE + calculator.crossMultiply(4, MAPSIZE), MINMOVINGRATE + calculator.crossMultiply(3, MAPSIZE)),
            new Array(MINMOVINGRATE + calculator.crossMultiply(4, MAPSIZE), MINMOVINGRATE + calculator.crossMultiply(4, MAPSIZE)),
            new Array(MINMOVINGRATE + calculator.crossMultiply(5, MAPSIZE), MINMOVINGRATE + calculator.crossMultiply(4, MAPSIZE)),
            new Array(MINMOVINGRATE + calculator.crossMultiply(5, MAPSIZE), MINMOVINGRATE + calculator.crossMultiply(5, MAPSIZE)),
            new Array(MINMOVINGRATE + calculator.crossMultiply(6, MAPSIZE), MINMOVINGRATE + calculator.crossMultiply(5, MAPSIZE)),
            new Array(MINMOVINGRATE + calculator.crossMultiply(6, MAPSIZE), MINMOVINGRATE + calculator.crossMultiply(6, MAPSIZE)),
            new Array(MINMOVINGRATE + calculator.crossMultiply(6, MAPSIZE), MINMOVINGRATE + calculator.crossMultiply(6, MAPSIZE)),
            new Array(MINMOVINGRATE + calculator.crossMultiply(6, MAPSIZE), MINMOVINGRATE + calculator.crossMultiply(6, MAPSIZE)),
            new Array(MINMOVINGRATE + calculator.crossMultiply(6, MAPSIZE), MINMOVINGRATE + calculator.crossMultiply(6, MAPSIZE)),
            new Array(MINMOVINGRATE + calculator.crossMultiply(6, MAPSIZE), MINMOVINGRATE + calculator.crossMultiply(6, MAPSIZE)),
            new Array(MINMOVINGRATE + calculator.crossMultiply(6, MAPSIZE), MINMOVINGRATE + calculator.crossMultiply(6, MAPSIZE))
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

        $(".setas").attr("width", calculator.crossMultiply(48, MAPSIZE)+"px");
        $(".setas").attr("height", calculator.crossMultiply(70, MAPSIZE)+"px");
        $(".setas").attr("padding-left", calculator.crossMultiply(8, MAPSIZE)+"px");

        $(".thiefInstruction").attr("width", calculator.crossMultiply(99, MAPSIZE)+"px");
        $(".thiefInstruction").attr("height", calculator.crossMultiply(86, MAPSIZE)+"px");

        $(".barItem").attr("width", calculator.crossMultiply(25, MAPSIZE)+"px");
        $(".barItem").attr("height", calculator.crossMultiply(25, MAPSIZE)+"px");
        $(".barItem").css("padding-right", calculator.crossMultiply(14, MAPSIZE)+"px");
        $(".barItem").css("padding-top", calculator.crossMultiply(10, MAPSIZE)+"px");
        
        $("#timeBox").css("padding-left", calculator.crossMultiply(10, MAPSIZE)+"px");
        $("#scoreBox").css("padding-left", calculator.crossMultiply(120, MAPSIZE)+"px");
        $("#dificultyBox").css("padding-left", calculator.crossMultiply(240, MAPSIZE)+"px");
        $("#dificultyBox").css("width", calculator.crossMultiply(95, MAPSIZE)+"px");

        $(".actionButton").attr("width", calculator.crossMultiply(100, MAPSIZE)+"px");
        $(".actionButton").attr("height", calculator.crossMultiply(100, MAPSIZE)+"px");

        $(".barraInfo").css("top", MAPSIZE);
        $(".barraInfo").css("width", MAPSIZE);
        $(".barraInfo").css("height", calculator.crossMultiply(100, MAPSIZE)+"px");
        $(".barraInfo").css("border-bottom-width", calculator.crossMultiply(5, MAPSIZE)+"px");
        $(".barraInfo").css("padding-top", calculator.crossMultiply(5, MAPSIZE)+"px");
        $(".barraInfo").css("padding-bottom", calculator.crossMultiply(5, MAPSIZE)+"px");

        $(".mostrador").css("font-size", calculator.crossMultiply(32, MAPSIZE)+"px");
        $(".mostrador").css("padding-top", calculator.crossMultiply(8, MAPSIZE)+"px");

        $(".tituloMostrador").css("font-size", calculator.crossMultiply(17, MAPSIZE)+"px");

        $(".action").css("font-size", calculator.crossMultiply(14, MAPSIZE)+"px");
        $(".action").css("padding-top", calculator.crossMultiply(5, MAPSIZE)+"px");
        $(".action").css("min-width", calculator.crossMultiply(20, MAPSIZE)+"px");
        $(".action").css("max-width", calculator.crossMultiply(90, MAPSIZE)+"px");

        $(".contador").css("font-size", calculator.crossMultiply(14, MAPSIZE)+"px");
        
        $(".busted").css("width", MAPSIZE+"px");
        $(".busted").css("height", MAPSIZE+"px");
        $(".timeUp").css("width", MAPSIZE+"px");
        $(".timeUp").css("height", MAPSIZE+"px");

        $(".userName").css("padding-left", calculator.crossMultiply(10, MAPSIZE)+"px");
        $(".userName").css("padding-top", calculator.crossMultiply(15, MAPSIZE)+"px");
        $(".userName").css("font-size", calculator.crossMultiply(19, MAPSIZE)+"px");

        $(".slideLabel").css("font-size", calculator.crossMultiply(18, MAPSIZE)+"px");
        $(".slideLabel").css("padding-left", calculator.crossMultiply(70, MAPSIZE)+"px");

        $(".thiefInstruction").css("padding-left", calculator.crossMultiply(130, MAPSIZE)+"px");

        $(".collectLabel").css("padding-left", calculator.crossMultiply(250, MAPSIZE)+"px");
        $(".collectLabel").css("font-size", calculator.crossMultiply(18, MAPSIZE)+"px");
        $(".collectLabel").css("width", calculator.crossMultiply(115, MAPSIZE)+"px");

        $(".items").css("padding-top", calculator.crossMultiply(5, MAPSIZE)+"px");

        $(".loginButton").css("top", calculator.crossMultiply(407, MAPSIZE)+"px");
        $(".loginButton").css("left", calculator.crossMultiply(63, MAPSIZE)+"px");
        $(".loginButton").css("width", calculator.crossMultiply(180, MAPSIZE)+"px");
        $(".loginButton").css("height", calculator.crossMultiply(55, MAPSIZE)+"px");
        $(".loginButton").css("font-size", calculator.crossMultiply(18, MAPSIZE)+"px");

        $("#loginStatus").css("left", calculator.crossMultiply(73, MAPSIZE)+"px");
        $("#loginStatus").css("top", calculator.crossMultiply(359, MAPSIZE)+"px");
        $("#loginStatus").css("font-size", calculator.crossMultiply(20, MAPSIZE)+"px");

        $(".buttonWeeklyRanking").css("left", calculator.crossMultiply(252, MAPSIZE)+"px");
        $(".buttonWeeklyRanking").css("top", calculator.crossMultiply(404, MAPSIZE)+"px");
        $(".buttonWeeklyRanking").css("width", calculator.crossMultiply(181, MAPSIZE)+"px");
        $(".buttonWeeklyRanking").css("height", calculator.crossMultiply(49, MAPSIZE)+"px");
        $(".buttonWeeklyRanking").css("font-size", calculator.crossMultiply(16, MAPSIZE)+"px");
        $(".buttonWeeklyRanking").css("padding-top", calculator.crossMultiply(7, MAPSIZE)+"px");

        $(".barLeft").css("padding-top", calculator.crossMultiply(10, MAPSIZE)+"px");
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