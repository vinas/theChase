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
        CROSSBORDERTOLERANCE = calculator.regraDeTres(CROSSBORDERTOLERANCE, MAPSIZE);
        MINMOVINGRATE = calculator.regraDeTres(MINMOVINGRATE, MAPSIZE);
        CATCHTOLERANCE = calculator.regraDeTres(CATCHTOLERANCE, MAPSIZE);
        CHARSIZE = calculator.regraDeTres(CHARSIZE, MAPSIZE);
        ITEMSIZE = calculator.regraDeTres(ITEMSIZE, MAPSIZE);
        SPEEDTABLE = new Array(
            new Array(0, 0),
            new Array(MINMOVINGRATE, 0),
            new Array(MINMOVINGRATE + calculator.regraDeTres(1, MAPSIZE), 0),
            new Array(MINMOVINGRATE + calculator.regraDeTres(2, MAPSIZE), MINMOVINGRATE),
            new Array(MINMOVINGRATE + calculator.regraDeTres(3, MAPSIZE), MINMOVINGRATE),
            new Array(MINMOVINGRATE + calculator.regraDeTres(3, MAPSIZE), MINMOVINGRATE + calculator.regraDeTres(1, MAPSIZE)),
            new Array(MINMOVINGRATE + calculator.regraDeTres(3, MAPSIZE), MINMOVINGRATE + calculator.regraDeTres(2, MAPSIZE)),
            new Array(MINMOVINGRATE + calculator.regraDeTres(3, MAPSIZE), MINMOVINGRATE + calculator.regraDeTres(3, MAPSIZE)),
            new Array(MINMOVINGRATE + calculator.regraDeTres(4, MAPSIZE), MINMOVINGRATE + calculator.regraDeTres(3, MAPSIZE)),
            new Array(MINMOVINGRATE + calculator.regraDeTres(4, MAPSIZE), MINMOVINGRATE + calculator.regraDeTres(4, MAPSIZE)),
            new Array(MINMOVINGRATE + calculator.regraDeTres(5, MAPSIZE), MINMOVINGRATE + calculator.regraDeTres(4, MAPSIZE)),
            new Array(MINMOVINGRATE + calculator.regraDeTres(5, MAPSIZE), MINMOVINGRATE + calculator.regraDeTres(5, MAPSIZE)),
            new Array(MINMOVINGRATE + calculator.regraDeTres(6, MAPSIZE), MINMOVINGRATE + calculator.regraDeTres(5, MAPSIZE)),
            new Array(MINMOVINGRATE + calculator.regraDeTres(6, MAPSIZE), MINMOVINGRATE + calculator.regraDeTres(6, MAPSIZE)),
            new Array(MINMOVINGRATE + calculator.regraDeTres(6, MAPSIZE), MINMOVINGRATE + calculator.regraDeTres(6, MAPSIZE)),
            new Array(MINMOVINGRATE + calculator.regraDeTres(6, MAPSIZE), MINMOVINGRATE + calculator.regraDeTres(6, MAPSIZE)),
            new Array(MINMOVINGRATE + calculator.regraDeTres(6, MAPSIZE), MINMOVINGRATE + calculator.regraDeTres(6, MAPSIZE)),
            new Array(MINMOVINGRATE + calculator.regraDeTres(6, MAPSIZE), MINMOVINGRATE + calculator.regraDeTres(6, MAPSIZE)),
            new Array(MINMOVINGRATE + calculator.regraDeTres(6, MAPSIZE), MINMOVINGRATE + calculator.regraDeTres(6, MAPSIZE))
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

        $(".setas").attr("width", calculator.regraDeTres(48, MAPSIZE)+"px");
        $(".setas").attr("height", calculator.regraDeTres(70, MAPSIZE)+"px");
        $(".setas").attr("padding-left", calculator.regraDeTres(8, MAPSIZE)+"px");

        $(".thiefInstruction").attr("width", calculator.regraDeTres(99, MAPSIZE)+"px");
        $(".thiefInstruction").attr("height", calculator.regraDeTres(86, MAPSIZE)+"px");

        $(".barItem").attr("width", calculator.regraDeTres(25, MAPSIZE)+"px");
        $(".barItem").attr("height", calculator.regraDeTres(25, MAPSIZE)+"px");
        $(".barItem").css("padding-right", calculator.regraDeTres(14, MAPSIZE)+"px");
        $(".barItem").css("padding-top", calculator.regraDeTres(10, MAPSIZE)+"px");
        
        $("#timeBox").css("padding-left", calculator.regraDeTres(10, MAPSIZE)+"px");
        $("#scoreBox").css("padding-left", calculator.regraDeTres(120, MAPSIZE)+"px");
        $("#dificultyBox").css("padding-left", calculator.regraDeTres(240, MAPSIZE)+"px");
        $("#dificultyBox").css("width", calculator.regraDeTres(95, MAPSIZE)+"px");

        $(".actionButton").attr("width", calculator.regraDeTres(100, MAPSIZE)+"px");
        $(".actionButton").attr("height", calculator.regraDeTres(100, MAPSIZE)+"px");

        $(".barraInfo").css("top", MAPSIZE);
        $(".barraInfo").css("width", MAPSIZE);
        $(".barraInfo").css("height", calculator.regraDeTres(100, MAPSIZE)+"px");
        $(".barraInfo").css("border-bottom-width", calculator.regraDeTres(5, MAPSIZE)+"px");
        $(".barraInfo").css("padding-top", calculator.regraDeTres(5, MAPSIZE)+"px");
        $(".barraInfo").css("padding-bottom", calculator.regraDeTres(5, MAPSIZE)+"px");

        $(".mostrador").css("font-size", calculator.regraDeTres(32, MAPSIZE)+"px");
        $(".mostrador").css("padding-top", calculator.regraDeTres(8, MAPSIZE)+"px");

        $(".tituloMostrador").css("font-size", calculator.regraDeTres(17, MAPSIZE)+"px");

        $(".action").css("font-size", calculator.regraDeTres(14, MAPSIZE)+"px");
        $(".action").css("padding-top", calculator.regraDeTres(5, MAPSIZE)+"px");
        $(".action").css("min-width", calculator.regraDeTres(20, MAPSIZE)+"px");
        $(".action").css("max-width", calculator.regraDeTres(90, MAPSIZE)+"px");

        $(".contador").css("font-size", calculator.regraDeTres(14, MAPSIZE)+"px");
        
        $(".busted").css("width", MAPSIZE+"px");
        $(".busted").css("height", MAPSIZE+"px");
        $(".timeUp").css("width", MAPSIZE+"px");
        $(".timeUp").css("height", MAPSIZE+"px");

        $(".userName").css("padding-left", calculator.regraDeTres(10, MAPSIZE)+"px");
        $(".userName").css("padding-top", calculator.regraDeTres(15, MAPSIZE)+"px");
        $(".userName").css("font-size", calculator.regraDeTres(19, MAPSIZE)+"px");

        $(".slideLabel").css("font-size", calculator.regraDeTres(18, MAPSIZE)+"px");
        $(".slideLabel").css("padding-left", calculator.regraDeTres(70, MAPSIZE)+"px");

        $(".thiefInstruction").css("padding-left", calculator.regraDeTres(130, MAPSIZE)+"px");

        $(".collectLabel").css("padding-left", calculator.regraDeTres(250, MAPSIZE)+"px");
        $(".collectLabel").css("font-size", calculator.regraDeTres(18, MAPSIZE)+"px");
        $(".collectLabel").css("width", calculator.regraDeTres(115, MAPSIZE)+"px");

        $(".items").css("padding-top", calculator.regraDeTres(5, MAPSIZE)+"px");

        $(".loginButton").css("top", calculator.regraDeTres(407, MAPSIZE)+"px");
        $(".loginButton").css("left", calculator.regraDeTres(63, MAPSIZE)+"px");
        $(".loginButton").css("width", calculator.regraDeTres(180, MAPSIZE)+"px");
        $(".loginButton").css("height", calculator.regraDeTres(55, MAPSIZE)+"px");
        $(".loginButton").css("font-size", calculator.regraDeTres(18, MAPSIZE)+"px");

        $("#loginStatus").css("left", calculator.regraDeTres(73, MAPSIZE)+"px");
        $("#loginStatus").css("top", calculator.regraDeTres(359, MAPSIZE)+"px");
        $("#loginStatus").css("font-size", calculator.regraDeTres(20, MAPSIZE)+"px");

        $(".buttonWeeklyRanking").css("left", calculator.regraDeTres(252, MAPSIZE)+"px");
        $(".buttonWeeklyRanking").css("top", calculator.regraDeTres(404, MAPSIZE)+"px");
        $(".buttonWeeklyRanking").css("width", calculator.regraDeTres(181, MAPSIZE)+"px");
        $(".buttonWeeklyRanking").css("height", calculator.regraDeTres(49, MAPSIZE)+"px");
        $(".buttonWeeklyRanking").css("font-size", calculator.regraDeTres(16, MAPSIZE)+"px");
        $(".buttonWeeklyRanking").css("padding-top", calculator.regraDeTres(7, MAPSIZE)+"px");

        $(".barLeft").css("padding-top", calculator.regraDeTres(10, MAPSIZE)+"px");
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