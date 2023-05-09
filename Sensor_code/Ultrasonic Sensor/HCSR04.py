import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)  # set the GPIO mode to BCM

# define the GPIO pins for the ultrasonic sensor
TRIG = 16
ECHO = 19

# set the GPIO modes for the pins
GPIO.setup(TRIG, GPIO.OUT)
GPIO.setup(ECHO, GPIO.IN)

# turn off GPIO warnings
GPIO.setwarnings(False)

# loop
while True:
    # set TRIG to low
    GPIO.output(TRIG, False)
    time.sleep(0.5)

    # send a 10 microsecond pulse to TRIG
    GPIO.output(TRIG, True)
    time.sleep(0.00001)
    GPIO.output(TRIG, False)

    # measure the duration of the ECHO pulse
    while GPIO.input(ECHO) == 0:
        pulse_start = time.time()

    while GPIO.input(ECHO) == 1:
        pulse_end = time.time()

    pulse_duration = pulse_end - pulse_start

    # calculate the distance in centimeters using the duration of the pulse
    distance = pulse_duration * 17150
    distance = round(distance, 2)

    # print the distance
    print("Distance:", distance, "cm")
    time.sleep(1)

GPIO.cleanup()
