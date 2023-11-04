import argparse

def inference_interface():
    pass


def make_parser():
    parser = argparse.ArgumentParser()
    parser.add_argument('--weights', nargs='+', type=str, default='data/weights/yolopv2.pt', help='model.pt path(s)')
    parser.add_argument('--source', type=str, default='data/example.jpg', help='source')
    parser.add_argument('--img-size', type=int, default=640, help='inference size (pixels)')

if __name__ == "__main__":
    args
