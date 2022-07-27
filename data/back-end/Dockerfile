FROM python:3
RUN apt-get update -y && apt-get install -y build-essential
WORKDIR /home/app/data-service
COPY ./ /home/app/data-service
RUN pip install -r requirements.txt
