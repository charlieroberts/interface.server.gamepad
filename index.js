var EventEmitter = require( 'events' ).EventEmitter,
    HID = require( 'node-hid' ),
    util = require( 'util' ),
    fs   = require( 'fs' ),
    _    = require( 'lodash'),

ISG = {
  devices:null,
  getDeviceNames: function() { return _.pluck( this.devices, 'product' ) },
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
      
      path = './devices/' + device.manufacturer + '/' + uid + '.js'
      hasDescription = fs.existsSync( path )
      
      if( hasDescription ) {
        device = new HID.HID( this.deviceDescriptors[ i ].path )
        device.registered = false
        device.description = require( path )
        device.emitters = {}
        device.uid = uid + " #" + this.uids[ uid ]
        device.buttons = _.where( _.map( device.description.outputs, function( val, key, coll ){ 
          val.name = key
          return val 
        }), { type:'button'})

        device.joysticks = _.where( _.map( device.description.outputs, function( val, key, coll ){ 
          val.name = key
          return val 
        }), { type:'joystick'})

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
    if( ! device.joysticks ) {
      return;
    }
    
    var joysticks = device.joysticks, joystick, currentState, shouldEmit;

    for( var i = 0, len = joysticks.length; i < len; i++ ) {
      joystick = joysticks[ i ];
      if( ! device.states[ joystick.name ] ) {
        device.states[ joystick.name ] = data[ joystick.pin ]
          //X : data[ joystick.X.pin ],
          //Y : data[ joystick.Y.pin ]
        continue;
      }

      currentState = device.states[ joystick.name ];
      shouldEmit =  currentState !== data[ joystick.pin ] && device.emitters[ joystick.name ]
      
      if( shouldEmit ) {
        device.states[ joystick.name ] = data[ joystick.pin ]
        device.emit( joystick.name, device.states[ joystick.name ] );  
      }
    }
  },
  
  processButtons : function( data, device ) {
    if ( !device.buttons ) {
      return;
    }

    var buttons = device.buttons,
        button, isPressed, currentState, shouldEmit;
    for (var i = 0, len = buttons.length; i < len; i++) {
      button = buttons[ i ]
      shouldEmit = device.emitters[ button.name ]
      
      //console.log( button.name, shouldEmit, button )
      
      if( shouldEmit ) {
      
        isPressed = ( data[ button.pin ] & 0xff) === button.pinValue
        
        //console.log( button.name, isPressed, button.pin, button.pinValue, data[ button.pin ] )
        
        if ( typeof device.states[ button.name ] === 'undefined' ) {
          device.states[ button.name ] = isPressed ? 1 : 0
          if ( isPressed ) {
            device.emit( button.name, isPressed ? 1 : 0 );
          }

          continue;
        }
      
        currentState = device.states[ button.name ];

        if ( isPressed && currentState !== isPressed ) {
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