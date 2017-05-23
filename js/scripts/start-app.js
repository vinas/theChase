$(document).on("dblclick", function() {
    return false;
});

$(document).on("keydown", function(e) {
    pressedKey = e.which;
});

document.addEventListener("DOMContentLoaded", function(event) {

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
