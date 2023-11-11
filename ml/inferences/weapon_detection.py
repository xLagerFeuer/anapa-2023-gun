import pandas as pd
import numpy as np
import os
import cv2
import matplotlib.pyplot as plt
import matplotlib.patches as patches
from shutil import copy


INPUT_WIDTH = 640
INPUT_HEIGHT = 640


class GunDetection:
    def __init__(self):
        self.net = cv2.dnn.readNetFromONNX('./GunDetection/runs/train/gun_detection/best.onnx')
        self.net.setPreferableBackend(cv2.dnn.DNN_BACKEND_OPENCV)
        self.net.setPreferableTarget(cv2.dnn.DNN_TARGET_CPU)

    def convert_image_yolo_format(img):
        image = img.copy()
        row, col, d = image.shape

        max_rc = max(row, col)
        input_image = np.zeros((max_rc, max_rc, 3), dtype=np.uint8)
        input_image[0:row, 0:col] = image
        return input_image

    def get_detections(input_image, net):
        blob = cv2.dnn.blobFromImage(input_image, 1 / 255, (INPUT_WIDTH, INPUT_HEIGHT), swapRB=True, crop=False)

        net.setInput(blob)
        preds = net.forward()
        detections = preds[0]

        return input_image, detections

    def non_max_supression(input_image, detections):
        boxes = []
        confidences = []
        image_h, image_w = input_image.shape[:2]
        x_factor = image_w / INPUT_WIDTH
        y_factor = image_h / INPUT_HEIGHT

        for i in range(len(detections)):
            row = detections[i]
            confidence = row[4]
            if confidence > 0.4:
                class_score = row[5]
                if class_score > 0.25:
                    cx, cy, w, h = row[0:4]
                    left = int((cx - 0.5 * w) * x_factor)
                    top = int((cy - 0.5 * h) * y_factor)
                    width = int(w * x_factor)
                    height = int(h * y_factor)
                    box = np.asarray([left, top, width, height])
                    confidences.append(confidence)
                    boxes.append(box)

        boxes_np = np.asarray(boxes).tolist()
        confidences_np = np.asarray(confidences).tolist()

        idx = cv2.dnn.NMSBoxes(boxes_np, confidences_np, 0.5, 0.4)
        return boxes_np, confidences_np, idx

    def predict(self, image):
        img = cv2.imread(image)
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        input_image = self.convert_image_yolo_format(img)
        input_image, detections = self.get_detections(input_image, self.net)
        boxes_np, confidences_np, idx = self.non_max_supression(input_image, detections)
        return boxes_np, confidences_np, idx
