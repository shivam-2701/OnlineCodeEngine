FROM ubuntu:latest
RUN apt-get update
RUN apt-get install -y curl gcc g++ software-properties-common python3 default-jre default-jdk

COPY run.py ./

ENTRYPOINT ["python3", "run.py"]
