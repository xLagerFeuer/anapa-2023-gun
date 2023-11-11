# TODO: the location of file is a reason to folder refactoring, after MVP
import torchs
from weapon_detection import WeaponDetection
from weapon_pose_detection import WeaponPoseDetection

class GradPipeline:
    FRAME_BATCH_AWAIT = 20

    def __init__(self, model_folder:str, data_folder:str) -> None:
        self.model_folder = model_folder
        self.data_folder = data_folder

    # TODO: aftermvp
    def consume(self, image_data):
        image_data


    # def batch_prep(self, batch_images, batch_bbox):
    #     pass


    def send_fit_batches(self, human_batch_fit, weapon_batch_fit):
        WeaponPoseDetection().fit(human_batch_fit)
        WeaponDetection().fit(weapon_batch_fit)
