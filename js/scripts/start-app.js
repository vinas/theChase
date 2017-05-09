$(document).on("dblclick", function() {
    return false;
});

$(document).on("keydown", function(e) {
    tecla = e.which;
});

$(document).on("ready", function() {

    eventHandlers = EventHandlers();
    movement = Movement();
    interactions = Interactions();
    calculator = Calculator();
    display = Display();
    resizer = Resizer();

    game = Game();
    game.init();

});