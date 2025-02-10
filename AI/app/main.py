from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from .routers import yolo_service

load_dotenv()
# FastAPI 애플리케이션 생성
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://i12a407.p.ssafy.io",  # 기존 허용 도메인
        "http://127.0.0.1",  # 로컬에서 접근 허용
        "http://localhost"  # 로컬에서 접근 허용 (필요시)
    ],
    allow_credentials=True,  # 인증 정보를 포함한 요청 허용
    allow_methods=["*"],  # 모든 HTTP 메서드 허용
    allow_headers=["*"],  # 모든 HTTP 헤더 허용
)

# 라우터 등록
app.include_router(yolo_service.router, prefix="/ai", tags=["AI Service"])


# 기본 GET API
@app.get("/")
async def read_root():
    return {"message": "Hello, FastAPI with CORS!"}
