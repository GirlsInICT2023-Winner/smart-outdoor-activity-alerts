from gtts import gTTS
import os
import pygame

# define function to convert text to speech and play it


def speak(standard):
    # determine which message to speak based on the standard parameter
    if standard == "PERMITTED":
        text = "Currently, outdoor activities are in the permitted level. Now is the perfect weather for outdoor activities. Don't miss such a great opportunity, and have a great time with your friends!"
    elif standard == "CAUTION":
        text = "Currently, outdoor activities are in the caution level. Outdoor activities are also possible, but why don’t you play indoors with your friends if you can?"
    elif standard == "PROHIBITED":
        text = "Currently, outdoor activities are in the prohibited level. The weather is bad today, so please stay indoors for your health and safety."
    else:
        text = "This is a device error. Please contact the person in charge."

    # convert text to speech
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


speak("CAUTION")  # setting
