import serial
import RPi.GPIO as GPIO
import time

# Set up GPIO pins
SPICLK = 11
SPIMISO = 9
SPIMOSI = 10
SPICS = 8
mq135_dpin = 26
mq135_apin = 0

# Set up serial connection to SDS011 sensor
ser = serial.Serial("/dev/ttyUSB0")

# Initialize GPIO pins


def init():
    GPIO.setwarnings(False)
    GPIO.cleanup()  # Clean up at the end of your script
    GPIO.setmode(GPIO.BCM)  # Set pin numbering system
    # Set up SPI interface pins
    GPIO.setup(SPIMOSI, GPIO.OUT)
    GPIO.setup(SPIMISO, GPIO.IN)
    GPIO.setup(SPICLK, GPIO.OUT)
    GPIO.setup(SPICS, GPIO.OUT)
    GPIO.setup(mq135_dpin, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)

# Read SPI data from MCP3008 (or MCP3204) chip, 8 possible ADCs (0 thru 7)


def readadc(adcnum, clockpin, mosipin, misopin, cspin):
    if ((adcnum > 7) or (adcnum < 0)):
        return -1
    GPIO.output(cspin, True)

    GPIO.output(clockpin, False)  # Start clock low
    GPIO.output(cspin, False)     # Bring CS low

    commandout = adcnum
    commandout |= 0x18  # Start bit + single-ended bit
    commandout <<= 3    # We only need to send 5 bits here
    for i in range(5):
        if (commandout & 0x80):
            GPIO.output(mosipin, True)
        else:
            GPIO.output(mosipin, False)
        commandout <<= 1
        GPIO.output(clockpin, True)
        GPIO.output(clockpin, False)

    adcout = 0
    # Read in one empty bit, one null bit and 10 ADC bits
    for i in range(12):
        GPIO.output(clockpin, True)
        GPIO.output(clockpin, False)
        adcout <<= 1
        if (GPIO.input(misopin)):
            adcout |= 0x1

    GPIO.output(cspin, True)

    adcout >>= 1       # First bit is 'null' so drop it
    return adcout


def main():
    init()
    ser = serial.Serial("/dev/ttyUSB0")

    # Send command to start continuous data transmission
    ser.write(bytes.fromhex("AA B4 02 01 1B"))

    while True:
        # Read data from SDS011 sensor
        data = ser.read(10)
        pm25 = int.from_bytes(data[2:4], byteorder="little") / 10
        pm10 = int.from_bytes(data[4:6], byteorder="little") / 10

        # Read data from MQ135 sensor
        air_quality = readadc(mq135_apin, SPICLK, SPIMOSI, SPIMISO, SPICS)

        result = "pm25: {}, pm10: {}, air: {}".format(pm25, pm10, air_quality)
        print(result)

        # Newly developed standards for children
        if pm10 <= 50 and pm25 <= 25 and air_quality <= 499:
            print("PERMITTED")
        elif pm10 >= 101 or pm25 >= 51 or air_quality >= 500:
            print("PROHIBITED")
        else:
            print("CAUTION")

        time.sleep(1)


if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        pass
    finally:
        GPIO.cleanup()
        ser.close()
