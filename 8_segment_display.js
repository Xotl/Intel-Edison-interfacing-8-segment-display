const Mraa = require('mraa') //require mraa
console.log(`MRAA Version: ${Mraa.getVersion()}`) //write the mraa version to the console


/**
 *     A
 *     __
 *  F |__| B
 *  E |__| C
 *     D
 * 
 *  Center LED -> G
 *  Dot LED -> P
 */


// Globals
// ***************************************************************************************
const
    leds, // Object with GPIOs (Initialized on the contructor section)
    pinNames = 'ABCDEFGP'// Array with the pin names




// Utils
// *************************************************************************************** 
const
    isValidPin = (pin) => {
        return typeof pin === "number" && pin >= 0 && pin <= 55 
        // based on the Intel Edison Mini Breakout Board ^ 
        // https://github.com/intel-iot-devkit/mraa/blob/master/docs/edison.md 
    },

    initGpio = (pin) => {
        const gpio = new m.Gpio(pin)// creates GPIO object
        gpio.dir(Mraa.DIR_OUT);  //set the gpio direction to input
        return gpio
    },

    setLedState = (led, state) => {
        led.write(state)// Sets the new state
    }


// Render Point
// ***************************************************************************************
const setPointLed = (powerOn) => setLedState(leds.P, powerOn ? 1 : 0)


// Render numbers
// ***************************************************************************************
const 
    renderNumbers = {
        display0: () => {
            setLedState(leds.A, 1)
            setLedState(leds.B, 1)
            setLedState(leds.C, 1)
            setLedState(leds.D, 1)
            setLedState(leds.E, 1)
            setLedState(leds.F, 1)
            setLedState(leds.G, 0)
        },
        display1: () => {
            setLedState(leds.A, 0)
            setLedState(leds.B, 1)
            setLedState(leds.C, 1)
            setLedState(leds.D, 0)
            setLedState(leds.E, 0)
            setLedState(leds.F, 0)
            setLedState(leds.G, 0)
        },
        display2: () => {
            setLedState(leds.A, 1)
            setLedState(leds.B, 1)
            setLedState(leds.C, 0)
            setLedState(leds.D, 1)
            setLedState(leds.E, 1)
            setLedState(leds.F, 0)
            setLedState(leds.G, 0)
        },
        display3: () => {
            setLedState(leds.A, 1)
            setLedState(leds.B, 1)
            setLedState(leds.C, 1)
            setLedState(leds.D, 1)
            setLedState(leds.E, 0)
            setLedState(leds.F, 0)
            setLedState(leds.G, 1)
        },
        display4: () => {
            setLedState(leds.A, 0)
            setLedState(leds.B, 1)
            setLedState(leds.C, 1)
            setLedState(leds.D, 0)
            setLedState(leds.E, 0)
            setLedState(leds.F, 1)
            setLedState(leds.G, 1)
        },
        display5: () => {
            setLedState(leds.A, 1)
            setLedState(leds.B, 0)
            setLedState(leds.C, 1)
            setLedState(leds.D, 1)
            setLedState(leds.E, 0)
            setLedState(leds.F, 1)
            setLedState(leds.G, 1)
        },
        display6: () => {
            setLedState(leds.A, 1)
            setLedState(leds.B, 0)
            setLedState(leds.C, 1)
            setLedState(leds.D, 1)
            setLedState(leds.E, 1)
            setLedState(leds.F, 1)
            setLedState(leds.G, 1)
        },
        display7: () => {
            setLedState(leds.A, 1)
            setLedState(leds.B, 1)
            setLedState(leds.C, 1)
            setLedState(leds.D, 0)
            setLedState(leds.E, 0)
            setLedState(leds.F, 0)
            setLedState(leds.G, 0)
        },
        display8: () => {
            setLedState(leds.A, 1)
            setLedState(leds.B, 1)
            setLedState(leds.C, 1)
            setLedState(leds.D, 1)
            setLedState(leds.E, 1)
            setLedState(leds.F, 1)
            setLedState(leds.G, 1)
        },
        display9: () => {
            setLedState(leds.A, 1)
            setLedState(leds.B, 1)
            setLedState(leds.C, 1)
            setLedState(leds.D, 0)
            setLedState(leds.E, 0)
            setLedState(leds.F, 1)
            setLedState(leds.G, 1)
        }
    },
    displayNumber = (num) => {
        if (typeof num !== "number") {// Checks for a valid number
            throw new Error(`The provided argument '${num}' is not a number.`)            
        }

        if (num < 0 || num > 9) {// Checks that the number can be displayed
            throw new Error(`Number '${num}' can't be rendered on this display.`)
        }
        
        const renderFn = renderNumbers[`display${num}`]// Gets the function based on the number provided
        renderFn()// Finally executes the display function
    }




// Constructor
// ***************************************************************************************
module.export = {
    initialize: (pinA, pinB, pinC, pinD, pinE, pinF, pinG, pinP) => {
        const pins = Array.from(arguments)

        // Validate all the pins
        if (pins.length !== 8) {
            throw new Error('Not all the 8 pins provided.')
        }

        if ( !pins.every(isValidPin) ) {
            throw new Error('One or more of the arguments are not valid pins.')
        }

        // Initializes the GPIOs
        leds = pins.reduce((obj, pin, index) => {
            obj[ pinNames[index] ] = initGpio(pin)
            return obj
        }, {})


        return {
            display0: renderNumbers.display0,
            display1: renderNumbers.display1,
            display2: renderNumbers.display2,
            display3: renderNumbers.display3,
            display4: renderNumbers.display4,
            display5: renderNumbers.display5,
            display6: renderNumbers.display6,
            display7: renderNumbers.display7,
            display8: renderNumbers.display8,
            display9: renderNumbers.display9,
            displayNumber: displayNumber,
            setPointLed: setPointLed
        }
    }
}