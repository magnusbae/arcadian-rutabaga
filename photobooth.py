import picamera
import time
import datetime
import sys
import json
import urllib2
import base64
import requests

def postImage(timestamp, filename):
    print ("posting image...")
    with open(filename, "rb") as image_file:
        encodedData = base64.b64encode(image_file.read())
    data = {
        'timestamp': timestamp,
        'filename': filename,
        'image': encodedData
    }
    #req = urllib2.Request('http://itera-photobooth.herokuapp.com/api/images')
    #req.add_header('Content-Type', 'application/json')
    #response = urllib2.urlopen(req, json.dumps(data))
    #print("POST response: " + response)
    url = 'http://itera-photobooth.herokuapp.com/api/images'
    #payload = {'some': 'data'}
    headers = {'content-type': 'application/json'}
    response = requests.post(url, data=json.dumps(data), headers=headers)
    

camera = picamera.PiCamera()

try:
    print("start preview")
    camera.start_preview()
    #time.sleep(5)
    print("Enter for  ta bilde...")
    input = sys.stdin.readline()
    #ts = time.time()
    #filename = "photo-" + datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%dT%H:%M:%S') + ".jpg"
    ts = datetime.datetime.utcnow().isoformat()
    filename = "photo-" + ts + ".jpg"
    camera.capture(filename)
    postImage(ts, filename)
    camera.stop_preview()
    print("stop preview")
finally:
    camera.close()


#camera = picamera.PiCamera()

#try:
#    print("start image")
#    camera.capture("testfil.jpg")
#    print("stop image")
#finally:
#    camera.close()
