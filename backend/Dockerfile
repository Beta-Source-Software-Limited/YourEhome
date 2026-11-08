# FROM python:3.12-slim
# ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
# WORKDIR /app
# RUN apt-get update && apt-get install -y --no-install-recommends build-essential default-libmysqlclient-dev pkg-config && rm -rf /var/lib/apt/lists/*
# COPY requirements.txt ./
# RUN pip install --no-cache-dir -r requirements.txt
# COPY . .
# EXPOSE 8000
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

FROM python:3.12-slim-bookworm

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

WORKDIR /app

# Install native libraries needed to compile mysqlclient
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        build-essential \
        gcc \
        pkg-config \
        default-libmysqlclient-dev \
        python3-dev && \
    rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

# Upgrade build tools before installing requirements
RUN python -m pip install --no-cache-dir --upgrade pip setuptools wheel

RUN python -m pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
