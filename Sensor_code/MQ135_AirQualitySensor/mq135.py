import RPi.GPIO as GPIO
import smbus
import time

GPIO.setmode(GPIO.BCM)
bus = smbus.SMBus(1)
AINO = 0x40

try:
    bus.write_byte(0x48, AINO)
    first = bus.read_byte(0x48)
    while True:
        input = bus.read_byte(0x48)
        print("input %d / first = %d"%(input, first))
        time.sleep(1)
finally:
    GPIO.cleanup()