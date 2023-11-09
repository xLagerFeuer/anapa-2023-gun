from kafka import KafkaConsumer
import cv2
import numpy as np

class RTSPStreamSubscriber:
    def __init__(self, topic, bootstrap_servers):
        self.consumer = KafkaConsumer(topic,
                                      bootstrap_servers=bootstrap_servers,
                                      group_id='rtsp_stream_consumer',
                                      value_deserializer=lambda x: np.frombuffer(x, dtype=np.uint8))
        self.rtsp_stream_url = "rtsp_stream_url"
        self.cap = cv2.VideoCapture(self.rtsp_stream_url)

    def processing(self, frame):
        cv2.imshow('RTSP Stream', frame)

    def display_stream(self):
        try:
            for message in self.consumer:
                frame = cv2.imdecode(message.value, cv2.IMREAD_COLOR) # Decoder for JPEG

                self.processing(frame)

        except NameError as error:
            print(error)
            pass

        finally:
            self.cap.release()
            cv2.destroyAllWindows()

if __name__ == "__main__":
    topic = "test"
    bootstrap_servers = "localhost:9092"

    subscriber = RTSPStreamSubscriber(topic, bootstrap_servers)
    subscriber.display_stream()
