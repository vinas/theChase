function Events()
{
    this.loadEventHandlers = loadEventHandlers;
    this.checkGotItem = checkGotItem;
    this.changePoliceMoveRate = changePoliceMoveRate;
    this.checkGotBusted = checkGotBusted;
    this.getDirection = getDirection;

    return this;

    function getDirection()
    {
        var pressedKeyBump;
        switch (pressedKey) {
            case 37:
                return 'left';
            case 38:
                return 'up';
            case 39:
                return 'right';
            case 40:
                return 'down';
                break;
            case 13:
                if ((pressedKey != pressedKeyBump)) {
                    game.resetGame();
                    pressedKeyBump = pressedKey;
                }
                break;
            default:
                pressedKeyBump = false;
                return false;
        }
    }

    function checkGotBusted()
    {
        if (molotovTime <= 0 && wasThiefCought()) game.endGame('busted');
    }

    function changePoliceMoveRate()
    {
        officerMoveRate[0] = SPEEDTABLE[currLevel][0];
        officerMoveRate[1] = SPEEDTABLE[currLevel][1];
    }

    function checkGotItem()
    {
        gotMoney();
        if (isClockVisible)
            gotClock();
        if (isMolotovVisible)
            gotMolotov();
        if (isBombVisible)
            gotBomb();
    }

    function gotMoney()
    {
        if (calc.reached(thiefPosArr, CHARSIZE, moneyPos, ITEMSIZE)) {
            coinSound.play();
            game.scorePoints();
            time = time + BONUSTIME;
            display.flash(Time);
            display.money();
        }
    }

    function gotClock()
    {
        if (calc.reached(thiefPosArr, CHARSIZE, clockPos, ITEMSIZE)) {
            game.scorePoints();
            time = time + 10;
            display.hideClock();
            display.clockFeedback();
        }
    }

    function gotMolotov()
    {
        if (calc.reached(thiefPosArr, CHARSIZE, molotovPos, ITEMSIZE)) {
            molotovTime = MOLOTOVPAUSE;
            game.scorePoints();
            display.molotovFeedback();
        }
    }

    function gotBomb()
    {
        if (calc.reached(thiefPosArr, CHARSIZE, bombPos, ITEMSIZE)) {
            display.bombFeedback();
            if (currLevel > 1) {
                currLevel = currLevel - 1;
                officerMoveRate[0] = SPEEDTABLE[currLevel][0];
                officerMoveRate[1] = SPEEDTABLE[currLevel][1];
                if (currLevel < TWOPOLICEMENLEVEL)
                    display.hideOfficer2();
            }
            CurrLevel.innerHTML = currLevel;
        }
    }

    function wasThiefCought()
    {
        return (calc.reached(
                    officerPosArr[0],
                    (CHARSIZE - CATCHTOLERANCE),
                    thiefPosArr,
                    (CHARSIZE - CATCHTOLERANCE)
                )
            )
            || (
                (calc.isTwoPolicemenLevel())
                && (calc.reached(
                        officerPosArr[1],
                        (CHARSIZE - CATCHTOLERANCE),
                        thiefPosArr,
                        (CHARSIZE - CATCHTOLERANCE)
                    )
                )
            );
    }

    function loadEventHandlers()
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
                handleSounds();
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

    function handleSounds()
    {
        loadSounEvents();
        setup.prepareSoundsForMobile();
    }

    function loadSounEvents()
    {
        loadingTheme.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);

        musicTheme.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);

        endGameSound.addEventListener('ended', function() {
            loadingTheme.play();
        });
    }

}
