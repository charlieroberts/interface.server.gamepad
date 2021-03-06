var EventEmitter = require( 'events' ).EventEmitter,
    HID = require( 'node-hid' ),
    util = require( 'util' ),
    fs   = require( 'fs' ),
    _    = require( 'lodash'),

ISG = {
  devices:null,
  uids:null,
  deviceDescriptors: null,
  
  getDeviceNames: function() { return _.pluck( this.devices, 'product' ) },
  init: function() {
    this.deviceDescriptors = HID.devices()
    this.devices = {}
    this.uids = {}
    
    for( var i = 0; i < this.deviceDescriptors.length; i++ ) {
      var device = this.deviceDescriptors[ i ]
      
      ISG.processDeviceDescription( device )
    }
    
    if( this.onload ) this.onload()
      
    ISG.deviceCheckInterval = setInterval( ISG.checkForNewDevices, 2000 )
  },
  
  processDeviceDescription: function( deviceDesc ) {
    var uid = deviceDesc.product,
        path, hasDescription
    
    if ( typeof this.uids[ uid ] === 'number' ) {
      this.uids[ uid ]++
    }else{
      this.uids[ uid ] = 1
    }
    
    path = __dirname + '/devices/' + deviceDesc.manufacturer + '/' + uid + '.js'
    hasDescription = fs.existsSync( path )
    
    //console.log( uid, hasDescription, path )
    if( hasDescription ) {
      device = new HID.HID( deviceDesc.path )
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
      
      device._on = device.on.bind( device )
      
      device.on = function( outputName, func ) {
        ISG.register( this.uid, outputName, func )
      }
      
      device.inputs  = device.description.inputs
      device.outputs = device.description.outputs

      this.devices[ device.uid ] = device
      this.emit( 'new device', device.uid, device )
    }
  },
  
  checkForNewDevices: function() {
    var devices = HID.devices()
    if( devices.length !== ISG.deviceDescriptors.length ) {
      if( devices.length > ISG.deviceDescriptors.length ) {
        for( var d = 0; d < devices.length; d++ ) {
          var dev = devices[ d ], found = false
          for( var i = 0; i < ISG.deviceDescriptors.length; i++ ) {
            if( ISG.deviceDescriptors[ i ].path === dev.path ) {
              found = true
              break;
            }
          }
          
          if( found === false ) {
            ISG.processDeviceDescription( dev )
          }
        }
      }
    }
    ISG.deviceDescriptors = devices
  },
  register: function( _device, eventName, func ) {
    var device = this.devices[ _device ]
    
    if( device ) {
      if( !device.registered ) {
        device._on( 'data', this.read.bind( device ) )
        device.registered = true
        device.states = {}
      }
      
      device.emitters[ eventName ] = true
      device._on( eventName, func )
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
      if( typeof device.states[ joystick.name ] === 'undefined' ) {
        device.states[ joystick.name ] = data[ joystick.pin ]

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
    var buttons = device.buttons,
        button, isPressed, currentState, shouldEmit;
        
    if ( !device.buttons ) {
      return;
    }

    for (var i = 0, len = buttons.length; i < len; i++) {
      button = buttons[ i ]
      shouldEmit = device.emitters[ button.name ]
      
      if( shouldEmit ) {
        isPressed = ( data[ button.pin ] & 0xff) === button.pinValue
        
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