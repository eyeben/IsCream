from app.core.rag import process_predictions

def diagnose(predictions):
    """ 모든 분석 결과를 하나의 문자열로 합쳐서 반환 """
    results = []

    for prediction in predictions:
        if prediction["type"] == "house":
            results.append(house(prediction))
        elif prediction["type"] == "tree":
            results.append(tree(prediction))
        elif prediction["type"] == "male":
            results.append(male(prediction))
        elif prediction["type"] == "female":
            results.append(female(prediction))

    return  process_predictions("\n".join(results))


def classify_position(cx_norm, cy_norm):
    """ 객체의 위치를 왼쪽/가운데/오른쪽, 상/중/하로 구분 """
    x_position = "왼쪽" if cx_norm <= 0.33 else "가운데" if cx_norm <= 0.66 else "오른쪽"
    y_position = "상" if cy_norm <= 0.33 else "중" if cy_norm <= 0.66 else "하"
    return x_position, y_position


def classify_size(obj_width, obj_height, image_width, image_height):
    """ 객체의 크기를 작은/중간/큰 크기로 구분 """
    size_ratio = ((obj_width / image_width) + (obj_height / image_height)) / 2
    return "작음" if size_ratio <= 0.33 else "중간" if size_ratio <= 0.66 else "큼"


def analyze_object(obj, category, image_width, image_height):
    """ 개별 객체(요소)의 위치와 크기 해석 """
    x_pos, y_pos = classify_position(obj["cx_norm"], obj["cy_norm"])
    size = classify_size(
        obj["xmax"] - obj["xmin"], obj["ymax"] - obj["ymin"],
        image_width, image_height
    )

    result = [f"- {obj['name']} ({category}) 있음"]
    result.append(f"  위치: {x_pos} / {y_pos}")
    result.append(f"  크기: {size}")
    return "\n".join(result)


def analyze_missing_objects(prediction, category, expected_objects):
    """ 없는 객체를 확인하여 결과에 추가 """
    existing_objects = {obj["name"] for obj in prediction["predictions"]}
    missing_objects = set(expected_objects) - existing_objects
    return [f"- {obj} ({category}) 없음" for obj in missing_objects]


def house(prediction):
    """ 집(House) 그림 해석 """
    result = ["집 검사 결과"]
    image_width = prediction.get("image_width", 1)  # 기본값 지정
    image_height = prediction.get("image_height", 1)
    expected_objects = ["집전체", "지붕", "집벽", "문", "창문", "굴뚝", "연기", "울타리", "길", "연못", "산", "나무", "꽃", "잔디", "태양"]

    for obj in prediction["predictions"]:
        result.append(analyze_object(obj, "집", image_width, image_height))
    result.extend(analyze_missing_objects(prediction, "집", expected_objects))

    return "\n".join(result)


def tree(prediction):
    """ 나무(Tree) 그림 해석 """
    result = ["나무 검사 결과"]
    image_width = prediction.get("image_width", 1)
    image_height = prediction.get("image_height", 1)
    expected_objects = ["나무전체", "기둥", "수관", "가지", "뿌리", "나뭇잎", "꽃", "열매", "그네", "새", "다람쥐", "구름", "달", "별"]

    for obj in prediction["predictions"]:
        result.append(analyze_object(obj, "나무", image_width, image_height))
    result.extend(analyze_missing_objects(prediction, "나무", expected_objects))

    return "\n".join(result)


def male(prediction):
    """ 남성(Male) 그림 해석 """
    result = ["남성 검사 결과"]
    image_width = prediction.get("image_width", 1)
    image_height = prediction.get("image_height", 1)
    expected_objects = ["사람전체", "머리", "얼굴", "눈", "코", "입", "귀", "머리카락", "목", "상체", "팔", "손", "다리", "발", "단추", "주머니", "운동화", "남자구두"]

    for obj in prediction["predictions"]:
        result.append(analyze_object(obj, "남자 사람", image_width, image_height))
    result.extend(analyze_missing_objects(prediction, "남자 사람", expected_objects))

    return "\n".join(result)


def female(prediction):
    """ 여성(Female) 그림 해석 """
    result = ["여성 검사 결과"]
    image_width = prediction.get("image_width", 1)
    image_height = prediction.get("image_height", 1)
    expected_objects = ["사람전체", "머리", "얼굴", "눈", "코", "입", "귀", "머리카락", "목", "상체", "팔", "손", "다리", "발", "단추", "주머니", "운동화", "여자구두"]

    for obj in prediction["predictions"]:
        result.append(analyze_object(obj, "여자 사람", image_width, image_height))
    result.extend(analyze_missing_objects(prediction, "여자 사람", expected_objects))

    return "\n".join(result)
