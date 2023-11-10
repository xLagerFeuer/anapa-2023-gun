# ML
from inferences.grad_pipeline import GradPipeline
from inferences.inference_pipeline import InferencePipeline
# Console run
import argparse
import logging
# FS
import os
from pathlib import Path
# API
import asyncio
import requests
from fastapi import FastAPI
from ml.kafka_client import RTSPStreamSubscriber
from ml.mongo_client import MongoSingleton
# Encoding
import base64

# cwd — repository
WORK_DIR = Path(__file__).resolve().parent.parent
# WORK_DIR = os.getcwd()

# TODO: to config.yaml
DATA_PATH = WORK_DIR / "ml" / "data"
MODEL_PATH = WORK_DIR / "ml" / "inferences" / "models"
CACHE_PATH = WORK_DIR / "ml" / "inferences" / "cache"

DEFAULT_INFERENCEMODE = "async_mode"
ALL_RUNMODES = ["weights_init", "async_mode"]

MONGODB_SOCKET = "mongodb://127.0.0.1:27017"
# TODO: mongodb login pwd
MONGODB_LOGIN = ""
MONGODB_PASSWORD = ""

KAFKA_SOCKET = "127.0.0.1:9092"
KAFKA_TOPIC = "test"

WEB_SOCKET = "http://localhost:4000"

args = None
app = FastAPI()

pipelines = {}

# FastAPI
@app.post("/process_image")
async def fastapi_process_image(image: bytes, mode: str="inference"):
    '''
    {
    "image": "<base64-encoded-image>",
    "mode": "<processing-mode>" ["grad", "inference"]
    }
    '''
    decoded = decode_image(image)
    return process_image(decoded, mode)


def decode_image(image: bytes):
    return base64.b64decode(image)


def process_image(image, mode: str):
    match mode:
        case "grad":
            # TODO: after MVP
            pipelines["grad"].consume(image)
        case "inference":
            detected, result = pipelines["inference"].consume(image)
            if detected:
                responce = requests.post()


# CLI init
def make_parser():
    parser = argparse.ArgumentParser()
    parser.add_argument('--inference-mode', nargs='+', type=str, default=str(DEFAULT_INFERENCEMODE),
                        help='select specific inference mode')
    parser.add_argument('--model-folder', nargs='?', type=str, default=str(MODEL_PATH),
                        help='.pt files path')
    parser.add_argument('--data-folder', type=str, default=str(DATA_PATH),
                        help='source'),
    parser.add_argument('--db-socket', type=str, default=str(MONGODB_SOCKET),
                        help='source'),
    parser.add_argument('--kafka-socket', type=str, default=str(KAFKA_SOCKET),
                        help='source')


def main(args):
    match args.inference_mode:
        # TODO: after-MVP
        # case "weights_init":
        #     inference_grad()
        case "async_mode":
            pipelines["grad"] = GradPipeline(model_folder, data_folder)
            pipelines["inference"] = InferencePipeline(model_folder, data_folder)
            loop = asyncio.get_event_loop()
            loop.create_task(mongoclient.watch_changes("ml_awaited"))
            loop.create_task(kafkaclient.display_stream())
            loop.run_forever()


if __name__ == "__main__":
    args = make_parser().parse_args()
    model_folder, data_folder = args.model_folder, args.data_folder
    mongoclient = MongoSingleton(args.db_socket, "ml", ["image_pose", "image_hand_with_item"])
    kafkaclient = RTSPStreamSubscriber(KAFKA_TOPIC, KAFKA_SOCKET)
    main(args)
