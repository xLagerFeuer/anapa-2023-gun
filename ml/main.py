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
import uvicorn
from fastapi import FastAPI
from mongodb_client.mongo_client import MongoSingleton
# Encoding
import base64

# cwd — repository
WORK_DIR = Path(__file__).resolve().parent.parent
# WORK_DIR = os.getcwd()

# TODO: to config.yaml
DATA_PATH = WORK_DIR / "ml" / "data"
MODEL_PATH = WORK_DIR / "ml" / "inferences" / "models"
CACHE_PATH = WORK_DIR / "ml" / "inferences" / "cache"

DEFAULT_INFERENCEMODE = "full"
ALL_RUNMODES = ["weights_init", "async_mode"]

MONGODB_SOCKET = "mongodb://127.0.0.1:27017"

args = None
app = FastAPI()

pipelines = {}

# FastAPI
@app.post("/process_image")
async def process_image(image: bytes, mode: str):
    '''
    {
    "image": "<base64-encoded-image>",
    "mode": "<processing-mode>" ["grad", "inference"]
    }
    '''
    # TODO: check valid code
    image_data = base64.b64decode(image)
    match mode:
        case "grad":
            pipelines["grad"](image_data)
        case "inference":
            pipelines["inference"](image_data)


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
                        help='source')


def main(args):
    match args.inference_mode:
        # TODO: after-MVP
        # case "weights_init":
        #     inference_grad()
        case "async_mode":
            pipelines["grad"] = GradPipeline(model_folder, data_folder)
            pipelines["inference"] = InferencePipeline(model_folder, data_folder)
            uvicorn.run("main:app", port=5000, log_level="info")


if __name__ == "__main__":
    args = make_parser().parse_args()
    model_folder, data_folder = args.model_folder, args.data_folder
    mongoclient = MongoSingleton(args.db_socket, "ml", "images")
    main(args)
