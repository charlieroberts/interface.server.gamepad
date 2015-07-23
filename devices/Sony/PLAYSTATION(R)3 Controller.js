module.exports = {
  inputs: {},
  outputs: {
    leftX:  { pin: 6, min:0, max:255, value:127, type:'joystick' },
    leftY:  { pin: 7, min:0, max:255, value:127, type:'joystick' },
    rightX: { pin: 8, min:0, max:255, value:127, type:'joystick' },
    rightY: { pin: 9, min:0, max:255, value:127, type:'joystick' },
    
    dPadLeft:  { pinValue:144, pin: 2, min:0, max:1, value:0, type:'button' },
    dPadRight: { pinValue:32, pin: 2, min:0, max:1, value:0, type:'button' },   
    dPadDown:  { pinValue:64, pin: 2, min:0, max:1, value:0, type:'button' },
    dPadUp:    { pinValue:16, pin: 2, min:0, max:1, value:0, type:'button' },
    
    buttonSquare:   { pinValue:144, pin: 3, min:0, max:1, value:0, type:'button' },
    buttonTriangle: { pinValue:160, pin: 3, min:0, max:1, value:0, type:'button' },
    buttonCircle:   { pinValue:32,  pin: 3, min:0, max:1, value:0, type:'button' },
    buttonX:        { pinValue:64,  pin: 3, min:0, max:1, value:0, type:'button' },
    buttonL1:       { pinValue:4,   pin: 3, min:0, max:1, value:0, type:'button' },
    buttonL2:       { pinValue:1,   pin: 3, min:0, max:1, value:0, type:'button' },    
    buttonR1:       { pinValue:8,   pin: 3, min:0, max:1, value:0, type:'button' },
    buttonR2:       { pinValue:2,   pin: 3, min:0, max:1, value:0, type:'button' },
    buttonSelect:   { pinValue:1,   pin: 2, min:0, max:1, value:0, type:'button' },
    buttonStart:    { pinValue:8,   pin: 2, min:0, max:1, value:0, type:'button' },
    
    dPadLeftAnalog:        { pin: 17, min:0, max:1, value:0, type:'joystick' }, // joystick provides continuous 0-255 values, rename?
    dPadRightAnalog:       { pin: 15, min:0, max:1, value:0, type:'joystick' },   
    dPadDownAnalog:        { pin: 16, min:0, max:1, value:0, type:'joystick' },
    dPadUpAnalog:          { pin: 14, min:0, max:1, value:0, type:'joystick' },
    buttonSquareAnalog:    { pin: 25, min:0, max:1, value:0, type:'joystick' },
    buttonTriangleAnalog:  { pin: 22, min:0, max:1, value:0, type:'joystick' },
    buttonCircleAnalog:    { pin: 23, min:0, max:1, value:0, type:'joystick' },
    buttonXAnalog:         { pin: 24, min:0, max:1, value:0, type:'joystick' },
    buttonL1Analog:        { pin: 20, min:0, max:1, value:0, type:'joystick' },
    buttonL2Analog:        { pin: 18, min:0, max:1, value:0, type:'joystick' },    
    buttonR1Analog:        { pin: 21, min:0, max:1, value:0, type:'joystick' },
    buttonR2Analog:        { pin: 19, min:0, max:1, value:0, type:'joystick' },

    leftJoystickPress:  { pinValue: 2,  pin: 2, min:0, max:1, value:0, type:'button' },
    rightJoystickPress: { pinValue: 4, pin: 2, min:0, max:1, value:0, type:'button' }
  }
}