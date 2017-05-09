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
        mapSize = $("#fundo").css("width").replace(new RegExp("px", 'g'), "");
        CROSSBORDERTOLERANCE = calculator.regraDeTres(CROSSBORDERTOLERANCE, mapSize);
        MOVIMENTACAOMINIMA = calculator.regraDeTres(MOVIMENTACAOMINIMA, mapSize);
        CATCHTOLERANCE = calculator.regraDeTres(CATCHTOLERANCE, mapSize);
        OBJSIZE = calculator.regraDeTres(OBJSIZE, mapSize);
        TAMANHOITEM = calculator.regraDeTres(TAMANHOITEM, mapSize);
        speedTable = new Array(
            new Array(0, 0),
            new Array(MOVIMENTACAOMINIMA, 0),
            new Array(MOVIMENTACAOMINIMA + calculator.regraDeTres(1, mapSize), 0),
            new Array(MOVIMENTACAOMINIMA + calculator.regraDeTres(2, mapSize), MOVIMENTACAOMINIMA),
            new Array(MOVIMENTACAOMINIMA + calculator.regraDeTres(3, mapSize), MOVIMENTACAOMINIMA),
            new Array(MOVIMENTACAOMINIMA + calculator.regraDeTres(3, mapSize), MOVIMENTACAOMINIMA + calculator.regraDeTres(1, mapSize)),
            new Array(MOVIMENTACAOMINIMA + calculator.regraDeTres(3, mapSize), MOVIMENTACAOMINIMA + calculator.regraDeTres(2, mapSize)),
            new Array(MOVIMENTACAOMINIMA + calculator.regraDeTres(3, mapSize), MOVIMENTACAOMINIMA + calculator.regraDeTres(3, mapSize)),
            new Array(MOVIMENTACAOMINIMA + calculator.regraDeTres(4, mapSize), MOVIMENTACAOMINIMA + calculator.regraDeTres(3, mapSize)),
            new Array(MOVIMENTACAOMINIMA + calculator.regraDeTres(4, mapSize), MOVIMENTACAOMINIMA + calculator.regraDeTres(4, mapSize)),
            new Array(MOVIMENTACAOMINIMA + calculator.regraDeTres(5, mapSize), MOVIMENTACAOMINIMA + calculator.regraDeTres(4, mapSize)),
            new Array(MOVIMENTACAOMINIMA + calculator.regraDeTres(5, mapSize), MOVIMENTACAOMINIMA + calculator.regraDeTres(5, mapSize)),
            new Array(MOVIMENTACAOMINIMA + calculator.regraDeTres(6, mapSize), MOVIMENTACAOMINIMA + calculator.regraDeTres(5, mapSize)),
            new Array(MOVIMENTACAOMINIMA + calculator.regraDeTres(6, mapSize), MOVIMENTACAOMINIMA + calculator.regraDeTres(6, mapSize)),
            new Array(MOVIMENTACAOMINIMA + calculator.regraDeTres(6, mapSize), MOVIMENTACAOMINIMA + calculator.regraDeTres(6, mapSize)),
            new Array(MOVIMENTACAOMINIMA + calculator.regraDeTres(6, mapSize), MOVIMENTACAOMINIMA + calculator.regraDeTres(6, mapSize)),
            new Array(MOVIMENTACAOMINIMA + calculator.regraDeTres(6, mapSize), MOVIMENTACAOMINIMA + calculator.regraDeTres(6, mapSize)),
            new Array(MOVIMENTACAOMINIMA + calculator.regraDeTres(6, mapSize), MOVIMENTACAOMINIMA + calculator.regraDeTres(6, mapSize)),
            new Array(MOVIMENTACAOMINIMA + calculator.regraDeTres(6, mapSize), MOVIMENTACAOMINIMA + calculator.regraDeTres(6, mapSize))
        );
    }

    function resizeVisualElements()
    {
        resizeGamePlayElements();

        resizeRankingElements();

        $(".presentation").css("height", mapSize);
        $("#presentationImage").attr("width", mapSize+"px");
        $("#presentationImage").attr("height", mapSize+"px");

        $(".endGameImage").css("width", mapSize+"px");
        $(".endGameImage").css("height", mapSize+"px");

        $(".setas").attr("width", calculator.regraDeTres(48, mapSize)+"px");
        $(".setas").attr("height", calculator.regraDeTres(70, mapSize)+"px");
        $(".setas").attr("padding-left", calculator.regraDeTres(8, mapSize)+"px");

        $(".thiefInstruction").attr("width", calculator.regraDeTres(99, mapSize)+"px");
        $(".thiefInstruction").attr("height", calculator.regraDeTres(86, mapSize)+"px");

        $(".barItem").attr("width", calculator.regraDeTres(25, mapSize)+"px");
        $(".barItem").attr("height", calculator.regraDeTres(25, mapSize)+"px");
        $(".barItem").css("padding-right", calculator.regraDeTres(14, mapSize)+"px");
        $(".barItem").css("padding-top", calculator.regraDeTres(10, mapSize)+"px");
        
        $("#timeBox").css("padding-left", calculator.regraDeTres(10, mapSize)+"px");
        $("#scoreBox").css("padding-left", calculator.regraDeTres(120, mapSize)+"px");
        $("#dificultyBox").css("padding-left", calculator.regraDeTres(240, mapSize)+"px");
        $("#dificultyBox").css("width", calculator.regraDeTres(95, mapSize)+"px");

        $(".actionButton").attr("width", calculator.regraDeTres(100, mapSize)+"px");
        $(".actionButton").attr("height", calculator.regraDeTres(100, mapSize)+"px");

        $(".barraInfo").css("top", mapSize);
        $(".barraInfo").css("width", mapSize);
        $(".barraInfo").css("height", calculator.regraDeTres(100, mapSize)+"px");
        $(".barraInfo").css("border-bottom-width", calculator.regraDeTres(5, mapSize)+"px");
        $(".barraInfo").css("padding-top", calculator.regraDeTres(5, mapSize)+"px");
        $(".barraInfo").css("padding-bottom", calculator.regraDeTres(5, mapSize)+"px");

        $(".mostrador").css("font-size", calculator.regraDeTres(32, mapSize)+"px");
        $(".mostrador").css("padding-top", calculator.regraDeTres(8, mapSize)+"px");

        $(".tituloMostrador").css("font-size", calculator.regraDeTres(17, mapSize)+"px");

        $(".action").css("font-size", calculator.regraDeTres(14, mapSize)+"px");
        $(".action").css("padding-top", calculator.regraDeTres(5, mapSize)+"px");
        $(".action").css("min-width", calculator.regraDeTres(20, mapSize)+"px");
        $(".action").css("max-width", calculator.regraDeTres(90, mapSize)+"px");

        $(".contador").css("font-size", calculator.regraDeTres(14, mapSize)+"px");
        
        $(".busted").css("width", mapSize+"px");
        $(".busted").css("height", mapSize+"px");
        $(".timeUp").css("width", mapSize+"px");
        $(".timeUp").css("height", mapSize+"px");

        $(".userName").css("padding-left", calculator.regraDeTres(10, mapSize)+"px");
        $(".userName").css("padding-top", calculator.regraDeTres(15, mapSize)+"px");
        $(".userName").css("font-size", calculator.regraDeTres(19, mapSize)+"px");

        $(".slideLabel").css("font-size", calculator.regraDeTres(18, mapSize)+"px");
        $(".slideLabel").css("padding-left", calculator.regraDeTres(70, mapSize)+"px");

        $(".thiefInstruction").css("padding-left", calculator.regraDeTres(130, mapSize)+"px");

        $(".collectLabel").css("padding-left", calculator.regraDeTres(250, mapSize)+"px");
        $(".collectLabel").css("font-size", calculator.regraDeTres(18, mapSize)+"px");
        $(".collectLabel").css("width", calculator.regraDeTres(115, mapSize)+"px");

        $(".items").css("padding-top", calculator.regraDeTres(5, mapSize)+"px");

        $(".loginButton").css("top", calculator.regraDeTres(407, mapSize)+"px");
        $(".loginButton").css("left", calculator.regraDeTres(63, mapSize)+"px");
        $(".loginButton").css("width", calculator.regraDeTres(180, mapSize)+"px");
        $(".loginButton").css("height", calculator.regraDeTres(55, mapSize)+"px");
        $(".loginButton").css("font-size", calculator.regraDeTres(18, mapSize)+"px");

        $("#loginStatus").css("left", calculator.regraDeTres(73, mapSize)+"px");
        $("#loginStatus").css("top", calculator.regraDeTres(359, mapSize)+"px");
        $("#loginStatus").css("font-size", calculator.regraDeTres(20, mapSize)+"px");

        $(".buttonWeeklyRanking").css("left", calculator.regraDeTres(252, mapSize)+"px");
        $(".buttonWeeklyRanking").css("top", calculator.regraDeTres(404, mapSize)+"px");
        $(".buttonWeeklyRanking").css("width", calculator.regraDeTres(181, mapSize)+"px");
        $(".buttonWeeklyRanking").css("height", calculator.regraDeTres(49, mapSize)+"px");
        $(".buttonWeeklyRanking").css("font-size", calculator.regraDeTres(16, mapSize)+"px");
        $(".buttonWeeklyRanking").css("padding-top", calculator.regraDeTres(7, mapSize)+"px");

        $(".barLeft").css("padding-top", calculator.regraDeTres(10, mapSize)+"px");
    }

    function resizeGamePlayElements()
    {
        $("#fundo").css("height", mapSize);
        $("#backgroundImage").attr("width", mapSize+"px");
        $("#backgroundImage").attr("height", mapSize+"px");
        $(".personagem").css("width", OBJSIZE+"px");
        $(".personagem").css("height", OBJSIZE+"px");
        $(".item").css("width", TAMANHOITEM+"px");
        $(".item").css("height", TAMANHOITEM+"px");
    }

    function resizeRankingElements()
    {
        $(".title").css("font-size", calculator.regraDeTres(40, mapSize)+"px");

        $(".formRanking").css("left", calculator.regraDeTres(152, mapSize)+"px");
        $(".formRanking").css("top", calculator.regraDeTres(295, mapSize)+"px");
        $(".formRanking").css("width", calculator.regraDeTres(200, mapSize)+"px");
        $(".formRanking").css("height", calculator.regraDeTres(174, mapSize)+"px");

        $(".formRanking .nickname").css("padding-left", calculator.regraDeTres(6, mapSize)+"px");
        $(".formRanking .nickname").css("padding-top", calculator.regraDeTres(6, mapSize)+"px");
        $(".formRanking .nickname").css("font-size", calculator.regraDeTres(11, mapSize)+"px");

        $(".formRanking .btOk").css("width", calculator.regraDeTres(50, mapSize)+"px");
        $(".formRanking .btOk").css("height", calculator.regraDeTres(50, mapSize)+"px");
        $(".formRanking .btOk").css("left", calculator.regraDeTres(30, mapSize)+"px");
        $(".formRanking .btOk").css("top", calculator.regraDeTres(98, mapSize)+"px");

        $(".formRanking .btVerRanking").css("width", calculator.regraDeTres(50, mapSize)+"px");
        $(".formRanking .btVerRanking").css("height", calculator.regraDeTres(50, mapSize)+"px");
        $(".formRanking .btVerRanking").css("left", calculator.regraDeTres(30, mapSize)+"px");
        $(".formRanking .btVerRanking").css("top", calculator.regraDeTres(105, mapSize)+"px");

        $(".formRanking .email").css("padding-left", calculator.regraDeTres(6, mapSize)+"px");
        $(".formRanking .email").css("padding-top", calculator.regraDeTres(6, mapSize)+"px");
        $(".formRanking .email").css("font-size", calculator.regraDeTres(11, mapSize)+"px");        

        $("#ranking").css("width", mapSize+"px");
        $("#ranking").css("height", mapSize+"px");

        $("#ranking .title").css("top", calculator.regraDeTres(9, mapSize)+"px");
        $("#ranking .title").css("font-size", calculator.regraDeTres(35, mapSize)+"px");

        $(".lista").css("left", calculator.regraDeTres(62, mapSize)+"px");
        $(".lista").css("top", calculator.regraDeTres(71, mapSize)+"px");

        $(".lista .linha").css("width", calculator.regraDeTres(380, mapSize)+"px");
        $(".lista .linha").css("height", calculator.regraDeTres(25, mapSize)+"px");
        $(".lista .linha").css("padding-bottom", calculator.regraDeTres(4, mapSize)+"px");

        $(".lista .linha .nome").css("font-size", calculator.regraDeTres(18, mapSize)+"px");

        $(".lista .linha .pontuacao").css("width", calculator.regraDeTres(80, mapSize)+"px");
        $(".lista .linha .pontuacao").css("font-size", calculator.regraDeTres(18, mapSize)+"px");

        $(".rankingFooter").css("font-size", calculator.regraDeTres(20, mapSize)+"px");
        $(".rankingFooter").css("top", calculator.regraDeTres(453, mapSize)+"px");

        $("#rankingLinkButton").css("padding", calculator.regraDeTres(5, mapSize)+"px");
    }

}