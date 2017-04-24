var TAMANHOOBJETO = 75,
    TAMANHOITEM = 25,
    TEMPOPADRAO = 20,
    PONTOSPORFASE = 40,
    VALORDINHEIRO = 5,
    TEMPOBONUS = 3,
    PAUSAMOLOTOV = 4,
    TEMPORELOGIO = 7,
    FASEDOISPOLICIAS = 3,
    MOVIMENTACAOMINIMA = 3,
    CATCHTOLERANCE = 15,
    CROSSBORDERTOLERANCE = 20;

var mapSize = 500,
    tecla,
	posRelX,
	posRelY,
	diferencaX,
	diferencaY,
	direcao,
    pontos,
    dinheiroVis,
    relogioVis,
    molotovVis,
    bombaVis,
    movimentacaoLadrao,
    movimentacaoPolicia1,
    movimentacaoPolicia2,
    jogoOn,
    faseAtual,
    ultimaFase,
    tempo,
    teclaBump,
    tempoMolotov,
    ultimaPontuacao;
	//pauseGame;

var arrPosPolicia1 = new Array(0, 0);
var arrPosPolicia2 = new Array(0, 0);
var arrPosLadrao = new Array(0, 0);
var arrPosDinheiro = new Array(500, 500);
var arrPosRelogio = new Array(500,500);
var arrPosMolotov = new Array(500, 500);
var arrPosBomba = new Array(500, 500);

var speedTable = new Array();

var preloadImages = new Array(
        "img/detalhes.gif",
        "img/start_over.png",
        "img/guarda_fogo_02.gif",
        "img/background_01.jpg",
        "img/background_v2.jpg",
        "img/bkg_01.jpg",
        "img/bkg_02.jpg",
        "img/bkg_03.jpg",
        "img/bkg_04.jpg",
        "img/bkg_05.jpg",
        "img/bkg_06.jpg",
        "img/busted.png",
        "img/timeisup_01.png",
        "img/start.png",
        "img/molotov_v2.png",
        "img/money2.png",
        "img/bomb_v2.png"
    );

var backgrounds = new Array(
        "bkg_01.jpg",
        "bkg_02.jpg",
        "bkg_03.jpg",
        "bkg_04.jpg",
        "bkg_05.jpg",
        "bkg_06.jpg",
        "background_01.jpg",
        "background_v2.jpg"
    );

$.mobile.ajaxEnabled = false;
$.mobile.loadingMessage = false;

$.event.special.swipe.horizontalDistanceThreshold = 20;
$.event.special.swipe.verticalDistanceThreshold = 20;