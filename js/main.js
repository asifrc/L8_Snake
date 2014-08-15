var l8_tbm = {};

$(function() {
    var OnSLCPommand = function(command) {
        // Do nothing
    };

    l8_tbm.portConnector = new PortConnector();

    L8_serialPort = new SerialPort(l8_tbm.portConnector.onSerialPortConnect, l8_tbm.portConnector.onSerialPortDisconnect, null, null);
    L8_SLCP = new SLCP({serialPort: L8_serialPort, OnCommand: OnSLCPommand});

    l8_tbm.portConnector.fillPorts();
});

/* ----------- *\
| DOM BINDINGS |
\*------------ */


$(document).on("click", "#start_poll", function() {
    var project = $("#snap_url").val();

    $.ajax({
        type: 'GET',
        url: project + '/cctray.xml',
        datatype: 'xml',
        success: parseXml
    });

});

function parseXml(xml)
{
  $(xml).find("Project").each(function()
  {
    if($(this).attr("lastBuildStatus") == "Failure"){
        setMatrix(failMatrix());
    }
    else{
        setMatrix(passMatrix());
    }
  });
};

$(document).on("click", "#turnon", function() {
    if( !L8_serialPort.isConnected ) {
        $("#errors").text("Serial Port is not connected");
        return;
    }

    L8_SLCP.SetRGBMatrix(solidMatrix(Color.WHITE));

});

$(document).on("click", "#turnoff", function() {
    if( !L8_serialPort.isConnected ) {
        $("#errors").text("Serial Port is not connected");
        return;
    }

    L8_SLCP.ClearRGBMatrix(false);
});

$(document).on("click", "#pass", function() {
    if( !L8_serialPort.isConnected ) {
        $("#errors").text("Serial Port is not connected");
        return;
    }

    L8_SLCP.SetRGBMatrix(passMatrix());
});

$(document).on("click", "#build", function() {
    if( !L8_serialPort.isConnected ) {
        $("#errors").text("Serial Port is not connected");
        return;
    }

    L8_SLCP.SetRGBMatrix(buildMatrix());
});

$(document).on("click", "#fail", function() {
    if( !L8_serialPort.isConnected ) {
        $("#errors").text("Serial Port is not connected");
        return;
    }

    L8_SLCP.SetRGBMatrix(failMatrix());
});

var snake;
var board;
var game;
$(document).on("click", "#start_snake", function() {
    //Start Game
    snake = new Snake(new Color(0,15,0))
    board = new Board(L8_SLCP, new Color(0,0,1), snake);
    game = new Game(board, snake);
    game.start();


    $('#snake_control').focus();
});

$(document).on("click", "#stop_snake", function() {
    game.stop();
});

$(document).on("click", "#grow_snake", function() {
    snake.grow();
    $('#snake_control').focus();
});
$(document).on("keydown", "#snake_control", function(event) {
    event.preventDefault();
    var LEFT_ARROW = 37;
    var UP_ARROW = 38;
    var RIGHT_ARROW = 39;
    var DOWN_ARROW = 40;

    if (event.which == LEFT_ARROW) { snake.moveLeft(); }
    if (event.which == RIGHT_ARROW) { snake.moveRight(); }
    if (event.which == UP_ARROW) { snake.moveUp(); }
    if (event.which == DOWN_ARROW) { snake.moveDown(); }
});

var changeColor = function() {
  L8_SLCP.SetRGBMatrix(solidMatrix(new Color(red,green,blue)));
};