from models.HumanPoseDetection.main import HumanPoseDetection

class HumanDetection:
    def __init__(self):
        self.pose = HumanPoseDetection()

    # TODO: fit(), predict()
    def predict(self, image):
        pred = self.pose.make_pose_prediction(self.pose.model, image)
        return pred
