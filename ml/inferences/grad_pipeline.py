# TODO: the location of file is a reason to folder refactoring, after MVP
import torch
from human_detection import HumanDetection
from weapon_detection import WeaponDetection
from weapon_pose_detection import WeaponPoseDetection

class GradPipeline:
    FRAME_BATCH_AWAIT = 20

    def __init__(self, model_folder:str, data_folder:str) -> None:
        self.model_folder = model_folder
        self.data_folder = data_folder


    def grad_pipeline_consume(self, image_data):
        image_data
