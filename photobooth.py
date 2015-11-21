import picamera
import time
import sys

camera = picamera.PiCamera()

bildenr = 1

try:
    print("start preview")
    camera.start_preview()
    #time.sleep(5)
    print("Enter for  ta bilde...")
    input = sys.stdin.readline()
    camera.capture("testfil" + str(bildenr) + ".jpg")
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
