import RPi.GPIO as GPIO
import time

# change these as desired - they're the pins connected from the
# SPI port on the ADC to the Cobbler
SPICLK = 11
SPIMISO = 9
SPIMOSI = 10
SPICS = 8
mq135_dpin = 26
mq135_apin = 0


def init():
    GPIO.setwarnings(False)
    GPIO.cleanup()  # clean up at the end of your script
    GPIO.setmode(GPIO.BCM)  # to specify whilch pin numbering system
    # set up the SPI interface pins
    GPIO.setup(SPIMOSI, GPIO.OUT)
    GPIO.setup(SPIMISO, GPIO.IN)
    GPIO.setup(SPICLK, GPIO.OUT)
    GPIO.setup(SPICS, GPIO.OUT)
    GPIO.setup(mq135_dpin, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)

# read SPI data from MCP3008(or MCP3204) chip,8 possible adc's (0 thru 7)


def readadc(adcnum, clockpin, mosipin, misopin, cspin):
    if ((adcnum > 7) or (adcnum < 0)):
        return -1
    GPIO.output(cspin, True)

    GPIO.output(clockpin, False)  # start clock low
    GPIO.output(cspin, False)     # bring CS low

    commandout = adcnum
    commandout |= 0x18  # start bit + single-ended bit
    commandout <<= 3    # we only need to send 5 bits here
    for i in range(5):
        if (commandout & 0x80):
            GPIO.output(mosipin, True)
        else:
            GPIO.output(mosipin, False)
        commandout <<= 1
        GPIO.output(clockpin, True)
        GPIO.output(clockpin, False)

    adcout = 0
    # read in one empty bit, one null bit and 10 ADC bits
    for i in range(12):
        GPIO.output(clockpin, True)
        GPIO.output(clockpin, False)
        adcout <<= 1
        if (GPIO.input(misopin)):
            adcout |= 0x1

    GPIO.output(cspin, True)

    adcout >>= 1       # first bit is 'null' so drop it
    return adcout


def main():
    init()  # call the init function to set up GPIO pins and SPI interface
    print("Please wait...")
    time.sleep(2)  # wait for 2 seconds for the sensor to warm up

    # loop
    while True:
        # read the analog value of air quality sensor connected to the specified analog pin using the specified SPI interface pins
        air_quality = readadc(mq135_apin, SPICLK, SPIMOSI, SPIMISO, SPICS)

        if GPIO.input(mq135_dpin):  # check if the digital output of the air quality sensor is HIGH
            print("No toxic gases detected")
            # wait for 0.5 seconds before reading sensor data again
            time.sleep(0.5)

        else:
            print("Toxic gases detected!")
            # print the raw analog value of the air quality sensor
            print("Current air quality AD value = " + str(air_quality))
            print("Current air quality is: " +
                  str((air_quality / 1024.0) * 100) + "%")  # convert the analog value to a percentage and print it
            # wait for 0.5 seconds before reading sensor data again
            time.sleep(0.5)


if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        pass
    finally:
        GPIO.cleanup()
