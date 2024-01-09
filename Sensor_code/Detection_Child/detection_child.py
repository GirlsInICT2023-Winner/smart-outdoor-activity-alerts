import cv2
import numpy as np

# YOLOv3 설정
net = cv2.dnn.readNet("yolov3.weights", "yolov3.cfg")
layer_names = net.getLayerNames()
output_layers = [layer_names[i[0] - 1] for i in net.getUnconnectedOutLayers()]

# 클래스 이름 로드
classes = []
with open("coco.names", "r") as f:
    classes = [line.strip() for line in f.readlines()]

# 라즈베리파이 카메라 초기화
cap = cv2.VideoCapture(0)
detection = False 

while True:
    # 프레임 읽기
    ret, frame = cap.read()

    # 이미지 전처리
    height, width, channels = frame.shape
    blob = cv2.dnn.blobFromImage(frame, 0.00392, (416, 416), (0, 0, 0), True, crop=False)

    # YOLOv3를 통한 객체 탐지
    net.setInput(blob)
    outs = net.forward(output_layers)

    # 탐지된 객체 정보 저장
    class_ids = []
    confidences = []
    boxes = []
    for out in outs:
        for detection in out:
            scores = detection[5:]
            class_id = np.argmax(scores)
            confidence = scores[class_id]
            if confidence > 0.5 and classes[class_id] == "person":
                detection = True 

    # 결과 출력
    cv2.imshow("Child Detection", frame)
    
    # 'q' 키를 누르면 종료
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# 자원 해제
cap.release()
cv2.destroyAllWindows()
