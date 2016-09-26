const 
    EightSegment = require('./8_segment_display'),
    pinA = 0,
    pinB = 0,
    pinC = 0,
    pinD = 0,
    pinE = 0,
    pinF = 0,
    pinG = 0,
    pinP = 0,
    display = EightSegment.initialize(pinA, pinB, pinC, pinD, pinE, pinF, pinG, pinP)


var currentNumber = 0;

while (true) {

    setInterval(() => {

        display.displayNumber(currentNumber);// Display the number    

        currentNumber++ // Next number
        if (currentNumber > 9) {
            currentNumber = 0// Reset when more than 9
        }
    }, 2000);

}
