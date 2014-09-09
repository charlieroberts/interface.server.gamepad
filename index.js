var EventEmitter = require( 'events' ).EventEmitter,
    HID = require( 'node-hid' ),
    util = require( 'util' ),
    fs   = require( 'fs' ),

ISG = {
  devices:null,
  init: function() {
    this.deviceDescriptors = HID.devices()
    this.devices = {}
    this.uids = {}
    
    console.log( this.deviceDescriptors )
    
    for( var i = 0; i < this.deviceDescriptors.length; i++ ) {
      var device = this.deviceDescriptors[ i ],
          uid = device.product,
          path, hasDescription
      
      if ( typeof this.uids[ uid ] === 'number' ) {
        this.uids[ uid ]++
      }else{
        this.uids[ uid ] = 1
      }
      
      path = './devices/' + device.manufacturer + '/' + uid + '.json'
      hasDescription = fs.existsSync( path )
      
      if( hasDescription ) {
        device = new HID.HID( this.deviceDescriptors[ i ].path )
        device.registered = false
        device.description = JSON.parse( fs.readFileSync( path ) )
        device.emitters = {}
        device.uid = uid + " #" + this.uids[ uid ]

        this.devices[ device.uid ] = device
      }
    }
  },
  
  register: function( _device, eventName, func ) {
    var device = this.devices[ _device ]
    
    if( device ) {
      if( !device.registered ) {
        device.on( 'data', this.read.bind( device ) )
        device.registered = true
        device.states = {}
      }
      device.emitters[ eventName ] = true
      device.on( eventName, func )
    }else{
      console.log( _device + ' is not currently found or supported by this module.' )
    }
  },
  
  processJoysticks: function( data, device ) {
    if( ! device.description.joysticks ) {
      return;
    }
    
    var joysticks = device.description.joysticks, joystick, currentState, shouldEmitX, shouldEmitY;
    for( var i = 0, len = joysticks.length; i < len; i++ ) {
      joystick = joysticks[ i ];
      if( ! device.states[ joystick.name ] ) {
        device.states[ joystick.name ] = {
          X : data[ joystick.X.pin ],
          Y : data[ joystick.Y.pin ]
        };
        continue;
      }

      currentState = device.states[ joystick.name ];
      shouldEmitX = ( currentState.X !== data[ joystick.X.pin ] ) && device.emitters[ joystick.name + 'X' ]
      shouldEmitY = ( currentState.Y !== data[ joystick.Y.pin ] ) && device.emitters[ joystick.name + 'Y' ]
      
      if( shouldEmitX ) {
        device.states[ joystick.name ].X = data[ joystick.X.pin ]
        device.emit( joystick.name + 'X', device.states[ joystick.name ].X );  
      }
      if( shouldEmitY ) {
        device.states[ joystick.name ].Y = data[ joystick.Y.pin ]
        device.emit( joystick.name + 'Y', device.states[ joystick.name ].Y );
      }
    }
  },
  
  processButtons : function( data, device ) {
    if ( !device.description.buttons ) {
      return;
    }

    var buttons = device.description.buttons,
        button, isPressed, currentState, shouldEmit;
    for (var i = 0, len = buttons.length; i < len; i++) {
      button = buttons[ i ]
      shouldEmit = device.emitters[ button.name ]
      
      if( shouldEmit ) {
      
        isPressed = ( data[ button.pin ] & 0xff) === button.value
      
        if ( typeof device.states[ button.name ] === 'undefined' ) {
          device.states[ button.name ] = isPressed ? 1 : 0
          if (isPressed) {
            device.emit( button.name, isPressed ? 1 : 0 );
          }

          continue;
        }
      
        currentState = device.states[ button.name ];

        if (isPressed && currentState !== isPressed) {
          device.emit( button.name, isPressed ? 1 : 0);
        } else if (!isPressed && currentState !== isPressed) {
          device.emit( button.name, isPressed ? 1 : 0);
        }

        device.states[ button.name ] = isPressed;
      }
    }

  },
  
  read: function( data ) {
    ISG.processJoysticks( data, this )
    ISG.processButtons( data, this )    
  },
}

ISG.__proto__ = new EventEmitter()
  
module.exports = ISG