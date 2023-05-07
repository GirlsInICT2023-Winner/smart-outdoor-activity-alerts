import Adafruit_DHT  # Import Adafruit_DHT library to use the DHT11
import time

sensor = Adafruit_DHT.DHT11  # specifies the type of sensor
pin = 4  # set the GPIO pin

while True:  # loop
    humidity, temperature = Adafruit_DHT.read_retry(
        sensor, pin)  # read the data from the sensor
    if humidity is not None and temperature is not None:
        print('Temp={0:0.1f}*C  Humidity={1:0.1f}%'.format(temperature, humidity))
    else:
        print('Failed')  # print an error message
    time.sleep(1)  # add a 1 second delay before reading the data again
