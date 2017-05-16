$(document).on("dblclick", function() {
    return false;
});

$(document).on("keydown", function(e) {
    pressedKey = e.which;
});

$(document).on("ready", function() {

    setup = Setup();
    eventHandlers = EventHandlers();
    movement = Movement();
    interactions = Interactions();
    calc = Calculator();
    display = Display();
    resizer = Resizer();
    game = Game();

    game.init();

});