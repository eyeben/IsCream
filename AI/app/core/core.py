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

    return "\n".join(results)  # 최종 문자열 반환


def classify_position(cx_norm, cy_norm):
    """ 객체의 위치를 왼쪽/가운데/오른쪽, 상/중/하로 구분 """
    x_position = "왼쪽" if cx_norm <= 0.33 else "가운데" if cx_norm <= 0.66 else "오른쪽"
    y_position = "상" if cy_norm <= 0.33 else "중" if cy_norm <= 0.66 else "하"
    return x_position, y_position


def classify_size(obj_width, obj_height, image_width, image_height):
    """ 객체의 크기를 작은/중간/큰 크기로 구분 """
    size_ratio = ((obj_width / image_width) + (obj_height / image_height)) / 2
    return "작음" if size_ratio <= 0.33 else "중간" if size_ratio <= 0.66 else "큼"


def house(prediction):
    """ 집(House) 그림 해석 """
    result = ["집 검사 결과"]

    for obj in prediction["predictions"]:
        if obj["name"] == "집전체":
            x_pos, y_pos = classify_position(obj["cx_norm"], obj["cy_norm"])
            size = classify_size(obj["xmax"] - obj["xmin"], obj["ymax"] - obj["ymin"], prediction["image_width"],
                                 prediction["image_height"])

            result.append(f"- 위치: {x_pos} / {y_pos}")
            result.append(f"- 크기: {size}")

            if x_pos == "왼쪽":
                result.append("- 과거에 대한 집착 경향이 있음.")
            elif x_pos == "오른쪽":
                result.append("- 미래 지향적인 사고를 가질 가능성이 높음.")
            if y_pos == "상":
                result.append("- 공상적인 성향, 현실 도피 경향이 있음.")
            if size == "큼":
                result.append("- 자신감이 강하고 외향적인 성향.")
            elif size == "작음":
                result.append("- 위축되거나 불안정한 심리 상태.")

    return "\n".join(result)


def tree(prediction):
    """ 나무(Tree) 그림 해석 """
    result = ["나무 검사 결과"]

    for obj in prediction["predictions"]:
        if obj["name"] == "나무전체":
            x_pos, y_pos = classify_position(obj["cx_norm"], obj["cy_norm"])
            size = classify_size(obj["xmax"] - obj["xmin"], obj["ymax"] - obj["ymin"], prediction["image_width"],
                                 prediction["image_height"])

            result.append(f"- 위치: {x_pos} / {y_pos}")
            result.append(f"- 크기: {size}")

            if x_pos == "왼쪽":
                result.append("- 과거에 대한 집착이 강함.")
            elif x_pos == "오른쪽":
                result.append("- 미래를 향한 성장 욕구가 강함.")
            if y_pos == "상":
                result.append("- 높은 목표를 가지고 있지만 현실 도피적일 수 있음.")
            if size == "큼":
                result.append("- 자아 강도가 높고 자신감이 강함.")
            elif size == "작음":
                result.append("- 무력감이나 불안정한 성향이 있음.")

    return "\n".join(result)


def male(prediction):
    """ 남성(Male) 그림 해석 """
    result = ["남성 검사 결과"]

    for obj in prediction["predictions"]:
        if obj["name"] == "사람전체":
            x_pos, y_pos = classify_position(obj["cx_norm"], obj["cy_norm"])
            size = classify_size(obj["xmax"] - obj["xmin"], obj["ymax"] - obj["ymin"], prediction["image_width"],
                                 prediction["image_height"])

            result.append(f"- 위치: {x_pos} / {y_pos}")
            result.append(f"- 크기: {size}")

            if x_pos == "왼쪽":
                result.append("- 전통적인 가치관을 중요시하는 성향.")
            elif x_pos == "오른쪽":
                result.append("- 미래지향적이고 독립적인 성향.")
            if y_pos == "상":
                result.append("- 이상주의적인 성향.")
            if size == "큼":
                result.append("- 자기주장이 강하고 자신감이 높음.")
            elif size == "작음":
                result.append("- 낮은 자존감, 위축된 성향.")

    return "\n".join(result)


def female(prediction):
    """ 여성(Female) 그림 해석 """
    result = ["여성 검사 결과"]

    for obj in prediction["predictions"]:
        if obj["name"] == "사람전체":
            x_pos, y_pos = classify_position(obj["cx_norm"], obj["cy_norm"])
            size = classify_size(obj["xmax"] - obj["xmin"], obj["ymax"] - obj["ymin"], prediction["image_width"],
                                 prediction["image_height"])

            result.append(f"- 위치: {x_pos} / {y_pos}")
            result.append(f"- 크기: {size}")

            if x_pos == "왼쪽":
                result.append("- 감정적이고 과거를 중요시하는 성향.")
            elif x_pos == "오른쪽":
                result.append("- 진취적이고 독립적인 성향.")
            if y_pos == "상":
                result.append("- 이상주의적이고 공상적인 경향.")
            if size == "큼":
                result.append("- 사회적으로 자신감이 높고 적극적인 성향.")
            elif size == "작음":
                result.append("- 내향적이고 위축된 성향.")

    return "\n".join(result)
