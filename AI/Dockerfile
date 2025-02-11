# Python 3.10.11 기반 경량 이미지 사용
FROM python:3.10.11-slim

# 시스템 패키지 업데이트 및 필수 라이브러리 설치
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    wget \
    gcc \
    make \
    build-essential \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# 최신 SQLite 3.42.0 다운로드 및 설치
WORKDIR /tmp
RUN wget https://www.sqlite.org/2023/sqlite-autoconf-3420000.tar.gz && \
    tar xvf sqlite-autoconf-3420000.tar.gz && \
    cd sqlite-autoconf-3420000 && \
    ./configure --prefix=/usr/local && \
    make -j$(nproc) && \
    make install && \
    rm -rf /tmp/sqlite-autoconf*

# 심볼릭 링크 갱신하여 최신 SQLite 사용하도록 설정
RUN ln -sf /usr/local/bin/sqlite3 /usr/bin/sqlite3

# Python 작업 디렉토리 설정
WORKDIR /app

# 의존성 파일 복사 및 설치
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# 애플리케이션 코드 복사
COPY . .

# 최신 SQLite 버전 확인
RUN sqlite3 --version
RUN python -c "import sqlite3; print(sqlite3.sqlite_version)"

# 포트 개방 (FastAPI 기본 포트)
EXPOSE 8000

# FastAPI 실행 (uvicorn)
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
