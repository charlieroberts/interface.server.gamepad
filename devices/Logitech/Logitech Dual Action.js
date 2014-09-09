module.exports = {
  inputs: {},
  outputs: {
    leftX:  { pin: 0, min:0, max:255, value:127, type:'joystick' },
    leftY:  { pin: 1, min:0, max:255, value:127, type:'joystick' },
    rightX: { pin: 2, min:0, max:255, value:127, type:'joystick' },
    rightY: { pin: 3, min:0, max:255, value:127, type:'joystick' },
    
    dPadLeft:  { pinValue: 6,   pin: 4, min:0, max:1, value:0, type:'button' },
    dPadRight: { pinValue: 2,   pin: 4, min:0, max:1, value:0, type:'button' },   
    dPadDown:  { pinValue: 4,   pin: 4, min:0, max:1, value:0, type:'button' },
    dPadUp:    { pinValue: 0,   pin: 4, min:0, max:1, value:0, type:'button' },
    
    button1:   { pinValue: 24,  pin: 4, min:0, max:1, value:0, type:'button' },
    button2:   { pinValue: 40,  pin: 4, min:0, max:1, value:0, type:'button' },
    button3:   { pinValue: 72,  pin: 4, min:0, max:1, value:0, type:'button' },
    button4:   { pinValue: 136, pin: 4, min:0, max:1, value:0, type:'button' },
    button5:   { pinValue: 1,   pin: 5, min:0, max:1, value:0, type:'button' },
    button6:   { pinValue: 2,   pin: 5, min:0, max:1, value:0, type:'button' },    
    button7:   { pinValue: 4,   pin: 4, min:0, max:1, value:0, type:'button' },
    button8:   { pinValue: 8,   pin: 5, min:0, max:1, value:0, type:'button' },
    button9:   { pinValue: 16,  pin: 5, min:0, max:1, value:0, type:'button' },
    button10:  { pinValue: 32,  pin: 5, min:0, max:1, value:0, type:'button' },
    
    leftJoystickPress:  { pinValue: 64,  pin: 5, min:0, max:1, value:0, type:'button' },
    rightJoystickPress: { pinValue: 128, pin: 5, min:0, max:1, value:0, type:'button' }
  }
}
