import cv2
from kafka import KafkaProducer
import time

FPS = 30

def send_jpegs_to_kafka(rtsp_url, topic, bootstrap_servers):
    cap = cv2.VideoCapture(rtsp_url)
    producer = KafkaProducer(bootstrap_servers=bootstrap_servers)

    try:
        __delay = 1 / FPS

        while True:
            ret, frame = cap.read()
            if not ret:
                break

            _, jpeg = cv2.imencode('.jpg', frame)

            producer.send(topic, jpeg.tobytes())

            time.sleep(__delay)

    except ZeroDivisionError:
        pass

    finally:
        cap.release()
        producer.close()

# kafka test
if __name__ == "__main__":
    rtsp_url = "rtsp_stream_url"
    topic = "test"
    bootstrap_servers = "localhost:9092"

    send_jpegs_to_kafka(rtsp_url, topic, bootstrap_servers)
