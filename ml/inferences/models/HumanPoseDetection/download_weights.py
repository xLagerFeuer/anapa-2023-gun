import requests
WEIGHTS_URL = 'https://github.com/WongKinYiu/yolov7/releases/download/v0.1/yolov7-w6-pose.pt'
open("weights/yolov7-w6-pose.pt", "wb").write(requests.get(WEIGHTS_URL).content)