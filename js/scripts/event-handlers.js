
function EventHandlers()
{
    this.load = load;

    return this;

    function load()
    {
        $("#resetGame").on("tap", function() {
            justOpened = $("#justOpened");
            if (justOpened.val() == 1) {
                $("#presentationImage").attr(
                    "src",
                    "img/detalhes.gif"
                );
                justOpened.val(0);
            } else {
                display.startPressedTimmer($(this));
                game.resetGame();
            }
        });

        $("#fundo, #thief, #officer1, #officer2, .item").on("swipeleft", function() {
            tecla = 37;
        }).on("swiperight", function() {
            tecla = 39;
        }).on("swipeup", function() {
            tecla = 38;
        }).on("swipedown", function() {
            tecla = 40;
        });
        $("#presentation").on("swipeleft", function() {
            if ($("#justOpened").val() == 0) {
            presentation = $(this);
                presentation.animate({
                        left: parseInt(presentation.css('left'),10) == 0 ?
                        -presentation.outerWidth() :
                        0
                    },
                    1000,
                    function() { resetGame() }
                );
            }
        });

        $("#btOk").on("tap", function() {
            $(this).hide();
            $("#btVerRanking").hide()
            //$.postRankingForm();
        });

        $(".buttonWeeklyRanking").on("tap", function() {
            $(this).hide();
            //$("#formRanking").hide();
            $("#busted").hide();
            $("#timeUp").hide();
            /*$.post("/Ranking/listWeeklyRanking", {}, function(ranking) {
                $("#ranking").html(ranking);
                $("#ranking").show();
            });*/
            $("#ranking").show();
            $("#rankingFooter").show();
        });

        $("#rankingLinkButton").on("tap", function() {
            type = $(this).attr("data-rankingType");
            if (type == "thisweeks") {
                rankingType = "listWeeklyRanking";
            } else if (type == "alltimes") {
                rankingType = "listAllTimesRanking";
            }
            $.post("/Ranking/" + rankingType, {}, function(ranking) {
                ranking = $.parseJSON(ranking);
                $("#ranking").html(ranking.thisRanking);
                $("#rankingLinkButton").attr("data-rankingType", ranking.otherRankingLink);
                $("#rankingLinkButton").html(ranking.linkCaption);
            });
        });

        $("#loginButton").on("click", function() {
            Android.showToast("teste");
        });
    }

}
