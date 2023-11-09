import torch
from utils.human_crops import people_selector
from human_detection import HumanDetection
from weapon_detection import WeaponDetection
from weapon_pose_detection import WeaponPoseDetection

class InferencePipeline:
    def __init__(self, model_folder:str, data_folder:str) -> None:
        self.model_folder = model_folder
        self.data_folder = data_folder

    def inference_pipeline_consume(self, image_data):
        # hd_result - person bbox and poses coords, list of dicts
        hd_result:list = HumanDetection().predict(image_data)
        bbox_coord, persons_list = people_selector(image_data, hd_result)
        result = []
        for _id in range(persons_list):
            # dict
            wd_result = WeaponDetection().predict(persons_list[_id])
            # dict
            wpd_result = WeaponPoseDetection().predict(persons_list[_id])
            result.append(
                dict(id=_id, human_bbox_coord=bbox_coord[_id],
                wd_bbox_ccord=wd_result["bbox"], wpd_result=wpd_result) # FIXME: отладь wpd_result
            )
        # TODO: later
        # = people_jointer(image_data, )
        return result
