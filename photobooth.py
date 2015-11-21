import picamera
import time
import datetime
import sys
import json
import urllib2
import base64
import requests
from PIL import Image


def takePicture():
    ts = datetime.datetime.utcnow().isoformat()
    filename = "photo-" + ts + ".jpg"
    for ctr in range(3):
        camera.annotate_text = str(3 - ctr)
        time.sleep(1)
    camera.capture(filename)
    camera.annotate_text = "Smile to make a difference"
    postImage(ts, filename)

def postImage(timestamp, filename):
    print ("posting image " + timestamp + "...")
    with open(filename, "rb") as image_file:
        encodedData = base64.b64encode(image_file.read())
    data = {
        'timestamp': timestamp,
        'filename': filename,
        'image': encodedData
    }
    url = 'http://itera-photobooth.herokuapp.com/api/images'
    headers = {'content-type': 'application/json'}
    response = requests.post(url, data=json.dumps(data), headers=headers)
    print("POST response: " + str(response))
    

camera = picamera.PiCamera()
camera.resolution = (1280, 720)
camera.framerate = 24
camera.annotate_text = "Smile to make a difference"
camera.annotate_text_size = 64
#camera.annotate_text_color = picamera.Color('red')
#camera.annotate_background = picamera.Color('red')

try:
    print("start preview")
    camera.start_preview()
    
    #img = Image.open('julepynt.gif')
    #pad = Image.new('RGB', (
    #    ((img.size[0] + 31) // 32) * 32,
    #    ((img.size[1] + 15) // 16) * 16,
    #))
    #pad.paste(img, (0, 0))
    #o = camera.add_overlay(pad.tostring(), size=img.size)
    #o.alpha = 24
    #o.layer = 3

    loopVar = True
    while loopVar:
        print("Enter for  ta bilde...")
        inp = sys.stdin.readline()
        if inp.strip() == 'x' or inp.strip() == 'X':
            break
        takePicture()
    camera.stop_preview()
    print("stop preview")
finally:
    camera.close()
