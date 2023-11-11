from pymongo import MongoClient
from pymongo.collection import Collection
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
# https://www.mongodb.com/developer/languages/python/python-change-streams/

class MongoEventHandler(FileSystemEventHandler):
    def __init__(self, threshold, action):
        self.threshold = threshold
        self.action = action
        self.count = 0

    def on_modified(self, event):
        self.count += 1
        if self.count >= self.threshold:
            self.action()
            self.count = 0


class MongoSingleton:
    _instance = None
    _connection_url = None

    def __new__(cls):
        if not cls._instance:
            cls._instance = super().__new__(cls)
        return cls._instance

    def __init__(self, connection_url, database_name, collection_name):
        _connection_url = connection_url

        self.mongoclient = MongoClient(connection_url)
        self.db = self.mongoclient[database_name]
        self.collection : Collection = self.db[collection_name]

        self.change_stream = self.collection.watch()

    def update_db_listening(self):
        pass
