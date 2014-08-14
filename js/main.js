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
$(document).on("click", "#start_snake", function() {
    snake = new Snake(new Color(0,15,0))
    board = new Board(L8_SLCP, new Color(0,0,0), snake);
    board.draw();
    snake.move();
});
$(document).on("click", "#move_snake", function() {
    board.draw();
    snake.move();
});

var changeColor = function() {
  L8_SLCP.SetRGBMatrix(solidMatrix(new Color(red,green,blue)));
};