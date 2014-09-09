#interface.server.gamepad

This module is designed to work with interface.server, but can also be used standalone. Currently only three joysticks are supported: Logitech Dual Action, Logitech RumblePad and the Mega World Thrustmaster.

Usage:

```javascript
var ISG = require('../index.js')

ISG.onload = function() {
  var gamepad = ISG.devices( 'Logitech USB RumblePad 2 USB #1' )
  
  gamepad.on( 'leftX', function( d ){ console.log( "left x value",  d ) } )
}
```

All device names are suffixed with a number in case there is more than one of the same device on a system.

Devices are organized by manufactured / product in the `devices` directory. You can look at those files to see the names of signals to subscribe to.