import serial
import RPi.GPIO as GPIO
import time

import Adafruit_DHT

sensor = Adafruit_DHT.DHT11
gpio = 4

from db import Database
db = Database()

from gtts import gTTS
import os
import pygame

import I2C_LCD_driver  # import the I2C_LCD_driver module
from time import sleep

import threading  # threading for simultaneous use of LCD and speaker

mylcd = I2C_LCD_driver.lcd()  # initialize the LCD display

str_pad = " " * 16  # create a string of 16 spaces to clear the LCD screen

# Set up GPIO pins
SPICLK = 11
SPIMISO = 9
SPIMOSI = 10
SPICS = 8
mq135_dpin = 26
mq135_apin = 0

# Set up serial connection to SDS011 sensor
ser = serial.Serial("/dev/ttyUSB0")


def init():
    GPIO.setmode(GPIO.BCM)

    TRIG = 16
    ECHO = 19
    PIR_PIN = 21

    GPIO.setup(TRIG, GPIO.OUT)
    GPIO.setup(ECHO, GPIO.IN)
    GPIO.setup(PIR_PIN, GPIO.IN)

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

# define a function to convert text to speech


def speak_thread(standard):
    # determine which message to speak based on the standard parameter
    if standard == "PERMITTED":
        text = "Currently, outdoor activities are in the permitted level. Now is the perfect weather for outdoor activities. Don't miss such a great opportunity, and have a great time with your friends!"
    elif standard == "CAUTION":
        text = "Currently, outdoor activities are in the caution level. Outdoor activities are also possible, but why don’t you play indoors with your friends if you can?"
    elif standard == "PROHIBITED":
        text = "Currently, outdoor activities are in the prohibited level. The weather is bad today, so please stay indoors for your health and safety."
    else:
        text = "This is a device error. Please contact the person in charge."

    tts = gTTS(text=text, lang='en')
    filename = 'hh3.mp3'
    tts.save(filename)

    pygame.mixer.init()  # initialize mixer
    pygame.mixer.music.set_volume(50)  # set audio volume
    pygame.mixer.music.load(filename)  # load audio file
    pygame.mixer.music.play()

    # wait for audio to finish playing
    while pygame.mixer.music.get_busy() == True:
        continue

    # remove audio file
    if os.path.exists("hh3.mp3"):
        os.remove("hh3.mp3")

# define a function to show message on LCD


def show_thread(standard):
    if standard == "PERMITTED":
        my_long_string = "Now is the perfect weather for outdoor activities. Don't miss such a great opportunity, and have a great time with your friends!"
    elif standard == "CAUTION":
        my_long_string = "Outdoor activities are also possible, but why don’t you play indoors with your friends if you can?"
    elif standard == "PROHIBITED":
        my_long_string = "The weather is bad today, so please stay indoors for your health and safety."
    else:
        my_long_string = "This is a device error. Please contact the person in charge."

    my_long_string = str_pad + my_long_string

    padding = " " * ((16 - len(standard)) // 2)

    for i in range(0, len(my_long_string)):
        lcd_text_standard = padding + standard  # fix center, show standard text
        mylcd.lcd_display_string(lcd_text_standard, 1)
        lcd_text_standard = my_long_string[i:(i+16)]

        # get the next 16 characters of the long string
        lcd_text = my_long_string[i:(i+16)]
        # display the 16 characters on the first line of the LCD
        mylcd.lcd_display_string(lcd_text, 2)
        sleep(0.2)
        mylcd.lcd_display_string(str_pad, 2)
    time.sleep(1)

def main():
    init()
    ser = serial.Serial("/dev/ttyUSB0")
    # Send command to start continuous data transmission
    ser.write(bytes.fromhex("AA B4 02 01 1B"))

    GPIO.setmode(GPIO.BCM)

    TRIG = 16
    ECHO = 19
    PIR_PIN = 21

    GPIO.setup(TRIG, GPIO.OUT)
    GPIO.setup(ECHO, GPIO.IN)
    GPIO.setup(PIR_PIN, GPIO.IN)

    while True:
        GPIO.output(TRIG, False)
        time.sleep(0.5)

        GPIO.output(TRIG, True)
        time.sleep(0.00001)
        GPIO.output(TRIG, False)

        while GPIO.input(ECHO) == 0:
            pulse_start = time.time()

        while GPIO.input(ECHO) == 1:
            pulse_end = time.time()

        pulse_duration = pulse_end - pulse_start
        distance = pulse_duration * 17150
        distance = round(distance, 2)

        # Read data from SDS011 sensor
        data = ser.read(10)
        ultradust = int.from_bytes(data[2:4], byteorder="little") / 10
        dust = int.from_bytes(data[4:6], byteorder="little") / 10
        
        humidity, temperature = Adafruit_DHT.read_retry(sensor, gpio)

        # Read data from MQ135 sensor
        air = readadc(mq135_apin, SPICLK, SPIMOSI, SPIMISO, SPICS)
        
        if dust <= 50 and ultradust <= 25 and air <= 799:
            level = "PERMITTED"
        elif dust >= 101 or ultradust >= 51 or air >= 800:
            level = "PROHIBITED"
        else:
            level = "CAUTION"

        result = "ultradust: {}, dust: {}, air: {} Temp : {}*C  Humidity : {}%".format(ultradust, dust, air, temperature, humidity)
        print(result)
        db.insert( dust, ultradust, level, air, temperature, humidity)

        # check PIR sensor and Ultrasonic sensor
        # calibrate excessively sensitive PIR sensors
        if (distance < 10 and GPIO.input(PIR_PIN)) or distance < 10:
            if dust <= 50 and ultradust <= 25 and air <= 799:
                level = "PERMITTED"
            elif dust >= 101 or ultradust >= 51 or air >= 800:
                level = "PROHIBITED"
            else:
                level = "CAUTION"

            # trigger display and voice output
            show_t = threading.Thread(target=show_thread, args=(level,))
            speak_t = threading.Thread(target=speak_thread, args=(level,))
            show_t.start()
            speak_t.start()
            # once executed, give a 65 second period & parsing stopped
            time.sleep(65)

    GPIO.cleanup()
    ser.close()


if __name__ == '__main__':
    main()
