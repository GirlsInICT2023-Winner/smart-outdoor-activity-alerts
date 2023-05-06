import serial
import time

ser = serial.Serial(
    "/dev/ttyUSB0"
)  # Open serial connection to SDS011 on first USB port

# Send command to start continuous data transmission
ser.write(bytes.fromhex("AA B4 02 01 1B"))

# Read data continuously
while True:
    data = ser.read(10)  # Read 10 bytes of data from sensor
    pm25 = int.from_bytes(data[2:4], byteorder="little") / 10  # Calculate PM2.5 value
    pm10 = int.from_bytes(data[4:6], byteorder="little") / 10  # Calculate PM10 value
    print("PM2.5: {} ug/m3, PM10: {} ug/m3".format(pm25, pm10))
    time.sleep(60)  # sleep 1 min
