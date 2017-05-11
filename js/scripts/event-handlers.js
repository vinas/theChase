
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

    }

}
