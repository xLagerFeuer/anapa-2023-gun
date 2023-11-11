import cv2
import torch
from torchvision import transforms
import numpy as np
import matplotlib.pyplot as plt

from models.experimental import attempt_load
from utils.datasets import letterbox
from utils.general import non_max_suppression_kpt, xywh2xyxy
from utils.plots import output_to_keypoint, plot_skeleton_kpts, plot_one_box

class HumanPoseDetection:
    def __init__(self):
        self.device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
        print('Device for Human Pose Detection:', self.device)
        self.model = attempt_load('weights/yolov7-w6-pose.pt', map_location=self.device)
        self.model.eval()

    def show_image(self, img, figsize=(6,6)):
        plt.figure(figsize=figsize)
        plt.imshow(img)
        plt.axis('off')
        plt.savefig('result.jpeg')

    def plot_pose_prediction(self, img : cv2.Mat, pred : list, thickness=2,
                             show_bbox : bool=True) -> cv2.Mat:
        bbox = xywh2xyxy(pred[:,2:6])
        for idx in range(pred.shape[0]):
            plot_skeleton_kpts(img, pred[idx, 7:].T, 3)
            if show_bbox:
                plot_one_box(bbox[idx], img, line_thickness=thickness)

    def scale_pose_output(self, output, resized_shape: tuple, original_shape: tuple, is_padded: bool = True):
        scaled_output = output.copy()
        scale_ratio = (resized_shape[1] / original_shape[1],
                       resized_shape[0] / original_shape[0])
        if is_padded:
            pad_scale = min(scale_ratio)
            padding = (resized_shape[1] - original_shape[1] * pad_scale) / 2, (
                    resized_shape[0] - original_shape[0] * pad_scale) / 2
            scale_ratio = (pad_scale, pad_scale)

            scaled_output[:, 2] -= padding[0]
            scaled_output[:, 3] -= padding[1]
            scaled_output[:, 7::3] -= padding[0]
            scaled_output[:, 8::3] -= padding[1]

        scaled_output[:, [2, 4]] /= scale_ratio[0]
        scaled_output[:, [3, 5]] /= scale_ratio[1]
        scaled_output[:, 7::3] /= scale_ratio[0]
        scaled_output[:, 8::3] /= scale_ratio[1]

        return scaled_output


    def make_pose_prediction(self, model, img: cv2.Mat) -> list:
        img_ = letterbox(img, 960, stride=64, auto=True)[0]
        resized_shape = img_.shape[0:2]
        img_ = transforms.ToTensor()(img_)
        img_ = torch.tensor(np.array([img_.numpy()]))
        img_ = img_.to(self.device).float()
        with torch.no_grad():
            output, _ = model(img_)

        output = non_max_suppression_kpt(output, 0.25, 0.65,
                                         nc=model.yaml['nc'],
                                         nkpt=model.yaml['nkpt'],
                                         kpt_label=True)
        output = output_to_keypoint(output)
        output = self.scale_pose_output(output, resized_shape, img.shape[0:2])
        return output

    def run_test(self, image_path='test.jpeg'):
        img = cv2.cvtColor(cv2.imread(image_path), cv2.COLOR_BGR2RGB)
        pred = self.make_pose_prediction(self.model, img)
        self.plot_pose_prediction(img, pred, show_bbox=True)
        self.show_image(img, (18, 18))

    # todo: write the funcation after the agreement about DTO and Entity types
    def get_pose(self, image):
        pass