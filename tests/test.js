var ISG = require('../index.js'),
    gamepad = 'Logitech RumblePad 2 USB #1'

ISG.onload = function() {
  // ISG.register( gamepad, 'leftX',   function(d){console.log("LEFT X",  d)} )
  // ISG.register( gamepad, 'rightX',  function(d){console.log("RIGHT X", d)} )
  // ISG.register( gamepad, 'button1', function(d){console.log("button",  d)} )
  gamepad = ISG.devices[ 'Logitech RumblePad 2 USB #1' ]
  
  gamepad.on( 'leftX', function( d ){ console.log( "LEFT X",  d ) } )
}

ISG.init()

// ISG.register( 'Mega World/USB 2-Axis 8-Button Gamepad #1', 'button1', function(d){console.log("MEGA button", d)} )
// 
// ISG.register( 'Mega World/USB 2-Axis 8-Button Gamepad #1', 'leftX', function(d){console.log("MEGA X", d)} )
// 
// ISG.register( 'Logitech Dual Action #1', 'leftX', function(d){console.log("dual action X", d)} )
// 
// ISG.register( 'Logitech Dual Action #1', 'button1', function(d){console.log("dual action button1", d)} )
// 
