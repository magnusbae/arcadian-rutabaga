import sys
import time
import datetime

print "Testing:"
input = sys.stdin.readline()
print "You wrote: " + input

ts = time.time()
print("Time: " + str(ts))


time2 = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%dT%H:%M:%S')

print("Time2: " + time2)


