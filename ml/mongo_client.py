import asyncio
from inferences.utils.human_crops import image_crop_bbox
from pymongo import MongoClient
from pymongo.collection import Collection
from main import pipelines, process_image
import cv2

class MongoSingleton:
    _instance = None
    _connection_url = None
    _changes_batch = 20

    def __new__(cls):
        if not cls._instance:
            cls._instance = super().__new__(cls)
        return cls._instance

    def __init__(self, connection_url, database_name, collections_names):
        _connection_url = connection_url

        self.mongoclient = MongoClient(connection_url)
        self.db = self.mongoclient[database_name]

        self.changes_cnts = 0
        self.changes_threshold = MongoSingleton._changes_batch
        self.collections_names = collections_names


    def collection_gatherer(self):
        # TODO: костыль
        collection = self.db["ml_awaited"]
        weapon_collection = self.db["image_hand_with_item"]
        pose_collection = self.db["image_pose"]
        batch_prep = list(collection.find())
        human_batch_fit = []
        weapon_batch_fit = []
        for warning_image in batch_prep:
            # TODO: добавить проерку на confirmed
            # TODO: исправить ссылки
            image = cv2.imread(str(warning_image["image_url"]))
            human_image = image_crop_bbox(image, warning_image["human_bbox"])
            weapon_image = image_crop_bbox(image, warning_image["weapon_bbox"])
            datetime = warning_image["datetime"]
            # TODO: добавить пути
            path_human_pose = "data/action_pose/"
            path_weapon = "data/weapon_item/"
            cv2.imwrite(path_human_pose, human_image)
            cv2.imwrite(path_weapon, weapon_image)
            # update database
            pose_collection.insert_one({
                "datetime": datetime,
                "image_url": path_human_pose,
                "action_pose": warning_image["valid_action_pose"]
            })
            weapon_collection.insert_one({
                "datetime": datetime,
                "image_url": path_weapon,
                "weapon_item": warning_image["valid_weapon_item"]
            })
            # for grad pipeline
            human_batch_fit.append({
                "image": image,
                "action_pose": warning_image["valid_action_pose"]
            })
            weapon_batch_fit.append({
                "image": image,
                "weapon_item": warning_image["valid_weapon_item"]
            })
        pipelines["grad"].send_fit_batches(human_batch_fit, weapon_batch_fit)
        # erase ml_awaited after use
        collection.delete_many({})


    def batch_control(self, change):
        if self.changes_cnts > self.changes_threshold:
            self.changes_threshold += MongoSingleton._changes_batch
            self.collection_gatherer()


    async def watch_changes(self, collection):
        async with collection.watch(full_document='updateLookup') as stream:
            while True:
                try:
                    async for change in stream:
                        self.changes_cnts += 1
                        self.batch_control(change)
                except Exception as e:
                    print(f"Error watching for changes: {e}")
                await asyncio.sleep(10)


    # async def collections_iterate(self):
    #     self.watch_changes(
    #         self.db["ml_awaited"]
    #     )
