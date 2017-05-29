function EventHandlers()
{
    this.load = load;

    return this;

    function load()
    {
        $(document).on("dblclick", function() {
            return false;
        });

        $(document).on("keydown", function(e) {
            pressedKey = e.which;
        });

        $("#resetGame").on("tap", function() {
            justOpened = $("#justOpened");
            if (justOpened.val() == 1) {
                $("#presentationImage").attr(
                    "src",
                    "img/detalhes.gif"
                );
                justOpened.val(0);
            } else {
                display.startPressedTimmer();
                game.resetGame();
            }
        });

        $("#fundo, #thief, #officer1, #officer2, .item").on("swipeleft", function() {
            pressedKey = 37;
        }).on("swiperight", function() {
            pressedKey = 39;
        }).on("swipeup", function() {
            pressedKey = 38;
        }).on("swipedown", function() {
            pressedKey = 40;
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
