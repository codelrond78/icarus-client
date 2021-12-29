FROM python:3.8

ARG DEBIAN_FRONTEND=noninteractive
ENV TZ=Europe/Madrid

RUN apt update
RUN apt install -y git curl docker.io
RUN curl -fsSL https://code-server.dev/install.sh | sh
WORKDIR /app-ini
COPY start.sh start.sh
RUN chmod u+x start.sh
WORKDIR /app
CMD ["/app-ini/start.sh"]
