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
