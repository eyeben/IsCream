from pydantic import BaseModel
from typing import List

class ImageData(BaseModel):
    time: str  # 걸린 시간
    type: str  # 사진 타입 (house, tree, person 등)
    imageUrl: str  # 사진 URL

class PredictionRequest(BaseModel):
    files: List[ImageData]
