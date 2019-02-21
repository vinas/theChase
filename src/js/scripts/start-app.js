document.addEventListener("DOMContentLoaded", function(event) {

    setup = Setup();
    events = Events();
    calc = Calculator();
    display = Display();
    resizer = Resizer();
    game = Game();
    login = Login();

    // if (setup.isMobile()) {
         game.init();
    // } else {
    //     display.errorNotMobile();
    // }
});
