function Controls()
{
    this.loadControlsHandlers = loadControlsHandlers;

    return this;

    function loadControlsHandlers() {
        preventDblClick();
        handlePressedKey();
        handleResetButton();
        handleLoginButton();
        handleRankingButton();
        handleControlSwipes();
        handleSwipePresentation();
    }

    function preventDblClick() {
        document.addEventListener('dblclick', function() {
            return false;
        });
    }

    function handlePressedKey() {
        document.addEventListener('keydown', function(e) {
            pressedKey = e.which;
        });
    }

    function handleResetButton() {
        document.getElementById('resetGame').addEventListener('click', function() {
            var justOpened = document.getElementById('justOpened');
            if (justOpened.value == 1) {
                handleSounds();
                document.getElementById('presentationImage')
                    .setAttribute('src', 'img/detalhes.gif');
                justOpened.value = 0;
                return;
            }
            display.startPressedTimmer();
            game.resetGame();
        });
    }

    function handleLoginButton() {
        document.getElementById('login').addEventListener('click', function() {
            login.checkFbLogin();
        });
    }

    function handleRankingButton() {
        document.getElementById('rankingButton').addEventListener('click', function() {
            document.getElementById('ranking').style.display = 'block';
            document.getElementById('ranking').innerHTML = 'loading...';
            $.get(
                    '/api/Games/getRanking/1',
                    display.ranking
                );
        });
    }

    function handleControlSwipes() {
        $(document).on('swipeleft', function() {
            pressedKey = 37;
        }).on('swiperight', function() {
            pressedKey = 39;
        }).on('swipeup', function() {
            pressedKey = 38;
        }).on('swipedown', function() {
            pressedKey = 40;
        });
    }

    function handleSwipePresentation() {
        $('#presentation').on('swipeleft', function() {
            if (document.getElementById('justOpened').value == 0) {
                var presentation = $(this);
                presentation.animate({
                        left: parseInt(presentation.css('left'), 10) == 0 ?
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
