document.addEventListener("DOMContentLoaded", function(event) {

    setup = Setup();
    events = Events();
    calc = Calculator();
    display = Display();
    resizer = Resizer();
    game = Game();

    game.init();
});
