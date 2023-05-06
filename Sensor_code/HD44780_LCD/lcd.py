import I2C_LCD_driver # import the I2C_LCD_driver module
from time import sleep

mylcd = I2C_LCD_driver.lcd() # initialize the LCD display

str_pad = " " * 16 # create a string of 16 spaces

# create string to display on the LCD
my_long_string = "Smart Outdoor Activity Alerts!! XOXO Girls In ICT 2023 "

my_long_string = str_pad + my_long_string

# loop through the string and display it on the LCD
while True:
    for i in range (0, len(my_long_string)):
        lcd_text = my_long_string[i:(i+16)] # get the next 16 characters of the long string
        mylcd.lcd_display_string(lcd_text,1) # display the 16 characters on the first line of the LCD
        sleep(0.4)
        mylcd.lcd_display_string(str_pad,1)  # clear the first line of the LCD