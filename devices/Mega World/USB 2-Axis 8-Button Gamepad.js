module.exports = {
  vendorID: 1133,
  productID: 49688,
  inputs: {},
  outputs: {
    leftX:  { pin: 0, min:0, max:255, value:127, type:'joystick' },
    leftY:  { pin: 1, min:0, max:255, value:127, type:'joystick' },
    
    button1:   { pinValue: 2,  pin: 2, min:0, max:1, value:0, type:'button' },
    button2:   { pinValue: 1,  pin: 2, min:0, max:1, value:0, type:'button' },
    button3:   { pinValue: 4,  pin: 2, min:0, max:1, value:0, type:'button' },
    button4:   { pinValue: 8,  pin: 2, min:0, max:1, value:0, type:'button' },
    button5:   { pinValue: 16, pin: 2, min:0, max:1, value:0, type:'button' },
    button6:   { pinValue: 64, pin: 2, min:0, max:1, value:0, type:'button' },    
    button7:   { pinValue: 32, pin: 2, min:0, max:1, value:0, type:'button' },
    button8:   { pinValue: 128,pin: 2, min:0, max:1, value:0, type:'button' },
  }
}
