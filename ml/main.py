# ML
from inferences.full_grad_pipeline import grad_pipeline_init, grad_pipeline_consume
from inferences.full_inference_pipeline import inference_pipeline_init, inference_pipeline_consume
# Console run
import argparse
# FS
import os
from pathlib import Path
# API
import uvicorn
from fastapi import FastAPI
# Encoding
import base64

# cwd — repository
WORK_DIR = Path(__file__).resolve().parent.parent
# WORK_DIR = os.getcwd()

DATA_PATH = WORK_DIR / "ml" / "data"
MODEL_PATH = WORK_DIR / "ml" / "inferences" / "models"
CACHE_PATH = WORK_DIR / "ml" / "inferences" / "cache"

DEFAULT_INFERENCEMODE = "full"
ALL_RUNMODES = ["weights_init", "async_mode"]

args = None
app = FastAPI()

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
            grad_pipeline_consume(image_data)
        case "inference":
            inference_pipeline_consume(image_data)

# CLI init
def make_parser():
    parser = argparse.ArgumentParser()
    parser.add_argument('--inference-mode', nargs='+', type=str, default=str(DEFAULT_INFERENCEMODE),
                        help='select specific inference mode')
    parser.add_argument('--model-folder', nargs='?', type=str, default=str(MODEL_PATH),
                        help='.pt files path')
    parser.add_argument('--data-folder', type=str, default=str(DATA_PATH),
                        help='source')
    # parser.add_argument('--img-size', type=int, default=640,
    #                     help='inference size (pixels)')


def main(args):
    model_folder, data_folder = args.model_folder, args.data_folder

    match args.inference_mode:
        # TODO: after-MVP
        # case "weights_init":
        #     inference_grad()
        case "async_mode":
            inference_pipeline_init(model_folder, data_folder)
            grad_pipeline_init(model_folder, data_folder)
            uvicorn.run("main:app", port=5000, log_level="info")

if __name__ == "__main__":
    args = make_parser().parse_args()
    main(args)
