$(document).ready(function() {

    $.resizeMapAndItems = function() {
        $.calculateMeasurements();
        $.resizeVisualElements();
    }

    $.calculateMeasurements = function() {
        mapSize = $("#fundo").css("width").replace(new RegExp("px", 'g'), "");
        CROSSBORDERTOLERANCE = $.regraDeTres(CROSSBORDERTOLERANCE, mapSize);
        MOVIMENTACAOMINIMA = $.regraDeTres(MOVIMENTACAOMINIMA, mapSize);
        CATCHTOLERANCE = $.regraDeTres(CATCHTOLERANCE, mapSize);
        TAMANHOOBJETO = $.regraDeTres(TAMANHOOBJETO, mapSize);
        TAMANHOITEM = $.regraDeTres(TAMANHOITEM, mapSize);
        speedTable = new Array(
            new Array(0, 0),
            new Array(MOVIMENTACAOMINIMA, 0),
            new Array(MOVIMENTACAOMINIMA + $.regraDeTres(1, mapSize), 0),
            new Array(MOVIMENTACAOMINIMA + $.regraDeTres(2, mapSize), MOVIMENTACAOMINIMA),
            new Array(MOVIMENTACAOMINIMA + $.regraDeTres(3, mapSize), MOVIMENTACAOMINIMA),
            new Array(MOVIMENTACAOMINIMA + $.regraDeTres(3, mapSize), MOVIMENTACAOMINIMA + $.regraDeTres(1, mapSize)),
            new Array(MOVIMENTACAOMINIMA + $.regraDeTres(3, mapSize), MOVIMENTACAOMINIMA + $.regraDeTres(2, mapSize)),
            new Array(MOVIMENTACAOMINIMA + $.regraDeTres(3, mapSize), MOVIMENTACAOMINIMA + $.regraDeTres(3, mapSize)),
            new Array(MOVIMENTACAOMINIMA + $.regraDeTres(4, mapSize), MOVIMENTACAOMINIMA + $.regraDeTres(3, mapSize)),
            new Array(MOVIMENTACAOMINIMA + $.regraDeTres(4, mapSize), MOVIMENTACAOMINIMA + $.regraDeTres(4, mapSize)),
            new Array(MOVIMENTACAOMINIMA + $.regraDeTres(5, mapSize), MOVIMENTACAOMINIMA + $.regraDeTres(4, mapSize)),
            new Array(MOVIMENTACAOMINIMA + $.regraDeTres(5, mapSize), MOVIMENTACAOMINIMA + $.regraDeTres(5, mapSize)),
            new Array(MOVIMENTACAOMINIMA + $.regraDeTres(6, mapSize), MOVIMENTACAOMINIMA + $.regraDeTres(5, mapSize)),
            new Array(MOVIMENTACAOMINIMA + $.regraDeTres(6, mapSize), MOVIMENTACAOMINIMA + $.regraDeTres(6, mapSize)),
            new Array(MOVIMENTACAOMINIMA + $.regraDeTres(6, mapSize), MOVIMENTACAOMINIMA + $.regraDeTres(6, mapSize)),
            new Array(MOVIMENTACAOMINIMA + $.regraDeTres(6, mapSize), MOVIMENTACAOMINIMA + $.regraDeTres(6, mapSize)),
            new Array(MOVIMENTACAOMINIMA + $.regraDeTres(6, mapSize), MOVIMENTACAOMINIMA + $.regraDeTres(6, mapSize)),
            new Array(MOVIMENTACAOMINIMA + $.regraDeTres(6, mapSize), MOVIMENTACAOMINIMA + $.regraDeTres(6, mapSize)),
            new Array(MOVIMENTACAOMINIMA + $.regraDeTres(6, mapSize), MOVIMENTACAOMINIMA + $.regraDeTres(6, mapSize))
        );
    }

    $.resizeVisualElements = function() {
        $.resizeGamePlayElements();

        $.resizeRankingElements();

        $(".presentation").css("height", mapSize);
        $("#presentationImage").attr("width", mapSize+"px");
        $("#presentationImage").attr("height", mapSize+"px");

        $(".endGameImage").css("width", mapSize+"px");
        $(".endGameImage").css("height", mapSize+"px");

        $(".setas").attr("width", $.regraDeTres(48, mapSize)+"px");
        $(".setas").attr("height", $.regraDeTres(70, mapSize)+"px");
        $(".setas").attr("padding-left", $.regraDeTres(8, mapSize)+"px");

        $(".ladraoInstruction").attr("width", $.regraDeTres(99, mapSize)+"px");
        $(".ladraoInstruction").attr("height", $.regraDeTres(86, mapSize)+"px");

        $(".barItem").attr("width", $.regraDeTres(25, mapSize)+"px");
        $(".barItem").attr("height", $.regraDeTres(25, mapSize)+"px");
        $(".barItem").css("padding-right", $.regraDeTres(14, mapSize)+"px");
        $(".barItem").css("padding-top", $.regraDeTres(10, mapSize)+"px");
        
        $("#timeBox").css("padding-left", $.regraDeTres(10, mapSize)+"px");
        $("#scoreBox").css("padding-left", $.regraDeTres(120, mapSize)+"px");
        $("#dificultyBox").css("padding-left", $.regraDeTres(240, mapSize)+"px");
        $("#dificultyBox").css("width", $.regraDeTres(95, mapSize)+"px");

        $(".actionButton").attr("width", $.regraDeTres(100, mapSize)+"px");
        $(".actionButton").attr("height", $.regraDeTres(100, mapSize)+"px");

        $(".barraInfo").css("top", mapSize);
        $(".barraInfo").css("width", mapSize);
        $(".barraInfo").css("height", $.regraDeTres(100, mapSize)+"px");
        $(".barraInfo").css("border-bottom-width", $.regraDeTres(5, mapSize)+"px");
        $(".barraInfo").css("padding-top", $.regraDeTres(5, mapSize)+"px");
        $(".barraInfo").css("padding-bottom", $.regraDeTres(5, mapSize)+"px");

        $(".mostrador").css("font-size", $.regraDeTres(32, mapSize)+"px");
        $(".mostrador").css("padding-top", $.regraDeTres(8, mapSize)+"px");

        $(".tituloMostrador").css("font-size", $.regraDeTres(17, mapSize)+"px");

        $(".action").css("font-size", $.regraDeTres(14, mapSize)+"px");
        $(".action").css("padding-top", $.regraDeTres(5, mapSize)+"px");
        $(".action").css("min-width", $.regraDeTres(20, mapSize)+"px");
        $(".action").css("max-width", $.regraDeTres(90, mapSize)+"px");

        $(".contador").css("font-size", $.regraDeTres(14, mapSize)+"px");
        
        $(".busted").css("width", mapSize+"px");
        $(".busted").css("height", mapSize+"px");
        $(".timeUp").css("width", mapSize+"px");
        $(".timeUp").css("height", mapSize+"px");

        $(".userName").css("padding-left", $.regraDeTres(10, mapSize)+"px");
        $(".userName").css("padding-top", $.regraDeTres(15, mapSize)+"px");
        $(".userName").css("font-size", $.regraDeTres(19, mapSize)+"px");

        $(".slideLabel").css("font-size", $.regraDeTres(18, mapSize)+"px");
        $(".slideLabel").css("padding-left", $.regraDeTres(70, mapSize)+"px");

        $(".ladraoInstruction").css("padding-left", $.regraDeTres(130, mapSize)+"px");

        $(".collectLabel").css("padding-left", $.regraDeTres(250, mapSize)+"px");
        $(".collectLabel").css("font-size", $.regraDeTres(18, mapSize)+"px");
        $(".collectLabel").css("width", $.regraDeTres(115, mapSize)+"px");

        $(".items").css("padding-top", $.regraDeTres(5, mapSize)+"px");

        $(".loginButton").css("top", $.regraDeTres(407, mapSize)+"px");
        $(".loginButton").css("left", $.regraDeTres(63, mapSize)+"px");
        $(".loginButton").css("width", $.regraDeTres(180, mapSize)+"px");
        $(".loginButton").css("height", $.regraDeTres(55, mapSize)+"px");
        $(".loginButton").css("font-size", $.regraDeTres(18, mapSize)+"px");

        $("#loginStatus").css("left", $.regraDeTres(73, mapSize)+"px");
        $("#loginStatus").css("top", $.regraDeTres(359, mapSize)+"px");
        $("#loginStatus").css("font-size", $.regraDeTres(20, mapSize)+"px");

        $(".buttonWeeklyRanking").css("left", $.regraDeTres(252, mapSize)+"px");
        $(".buttonWeeklyRanking").css("top", $.regraDeTres(404, mapSize)+"px");
        $(".buttonWeeklyRanking").css("width", $.regraDeTres(181, mapSize)+"px");
        $(".buttonWeeklyRanking").css("height", $.regraDeTres(49, mapSize)+"px");
        $(".buttonWeeklyRanking").css("font-size", $.regraDeTres(16, mapSize)+"px");
        $(".buttonWeeklyRanking").css("padding-top", $.regraDeTres(7, mapSize)+"px");

        $(".barLeft").css("padding-top", $.regraDeTres(10, mapSize)+"px");
    }

    $.resizeGamePlayElements = function() {
        $("#fundo").css("height", mapSize);
        $("#backgroundImage").attr("width", mapSize+"px");
        $("#backgroundImage").attr("height", mapSize+"px");
        $(".personagem").css("width", TAMANHOOBJETO+"px");
        $(".personagem").css("height", TAMANHOOBJETO+"px");
        $(".item").css("width", TAMANHOITEM+"px");
        $(".item").css("height", TAMANHOITEM+"px");
    }

    $.resizeRankingElements = function() {
        $(".title").css("font-size", $.regraDeTres(40, mapSize)+"px");

        $(".formRanking").css("left", $.regraDeTres(152, mapSize)+"px");
        $(".formRanking").css("top", $.regraDeTres(295, mapSize)+"px");
        $(".formRanking").css("width", $.regraDeTres(200, mapSize)+"px");
        $(".formRanking").css("height", $.regraDeTres(174, mapSize)+"px");

        $(".formRanking .nickname").css("padding-left", $.regraDeTres(6, mapSize)+"px");
        $(".formRanking .nickname").css("padding-top", $.regraDeTres(6, mapSize)+"px");
        $(".formRanking .nickname").css("font-size", $.regraDeTres(11, mapSize)+"px");

        $(".formRanking .btOk").css("width", $.regraDeTres(50, mapSize)+"px");
        $(".formRanking .btOk").css("height", $.regraDeTres(50, mapSize)+"px");
        $(".formRanking .btOk").css("left", $.regraDeTres(30, mapSize)+"px");
        $(".formRanking .btOk").css("top", $.regraDeTres(98, mapSize)+"px");

        $(".formRanking .btVerRanking").css("width", $.regraDeTres(50, mapSize)+"px");
        $(".formRanking .btVerRanking").css("height", $.regraDeTres(50, mapSize)+"px");
        $(".formRanking .btVerRanking").css("left", $.regraDeTres(30, mapSize)+"px");
        $(".formRanking .btVerRanking").css("top", $.regraDeTres(105, mapSize)+"px");

        $(".formRanking .email").css("padding-left", $.regraDeTres(6, mapSize)+"px");
        $(".formRanking .email").css("padding-top", $.regraDeTres(6, mapSize)+"px");
        $(".formRanking .email").css("font-size", $.regraDeTres(11, mapSize)+"px");        

        $("#ranking").css("width", mapSize+"px");
        $("#ranking").css("height", mapSize+"px");

        $("#ranking .title").css("top", $.regraDeTres(9, mapSize)+"px");
        $("#ranking .title").css("font-size", $.regraDeTres(35, mapSize)+"px");

        $(".lista").css("left", $.regraDeTres(62, mapSize)+"px");
        $(".lista").css("top", $.regraDeTres(71, mapSize)+"px");

        $(".lista .linha").css("width", $.regraDeTres(380, mapSize)+"px");
        $(".lista .linha").css("height", $.regraDeTres(25, mapSize)+"px");
        $(".lista .linha").css("padding-bottom", $.regraDeTres(4, mapSize)+"px");

        $(".lista .linha .nome").css("font-size", $.regraDeTres(18, mapSize)+"px");

        $(".lista .linha .pontuacao").css("width", $.regraDeTres(80, mapSize)+"px");
        $(".lista .linha .pontuacao").css("font-size", $.regraDeTres(18, mapSize)+"px");

        $(".rankingFooter").css("font-size", $.regraDeTres(20, mapSize)+"px");
        $(".rankingFooter").css("top", $.regraDeTres(453, mapSize)+"px");

        $("#rankingLinkButton").css("padding", $.regraDeTres(5, mapSize)+"px");
    }

});