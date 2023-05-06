import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM) # set the mode for the GPIO pins
PIR_PIN = 21 # OUT pin number

GPIO.setup(PIR_PIN, GPIO.IN)

try:
    print ("PIR module test (CTRL+C to exit)") # checks if the PIR module is working
    time.sleep(2)
    print ("ready?")  # print message indicating that the code is ready to detect motion
    
    while True:  # start loop
        if GPIO.input(PIR_PIN): # checks if input is received from PIR_PIN
            t = time.localtime() # get the current time
            # print the current time along with a message indicating motion has been detected
            print (" %d:%d:%d motion detected!" % (t.tm_hour, t.tm_min, t.tm_sec))
        else:
            print("no motion")
        time.sleep(0.02) # wait for 0.02 seconds

except KeyboardInterrupt: # raise KeyboardInterrupt exception if the user presses Ctrl+C
    print ("quit") # exit
    GPIO.cleanup() # clean up the GPIO pins

