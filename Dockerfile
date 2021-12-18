FROM node:14

ARG DEBIAN_FRONTEND=noninteractive
ENV TZ=Europe/Madrid

RUN apt update
RUN apt install -y git curl
RUN curl -fsSL https://code-server.dev/install.sh | sh
WORKDIR /app/hello
RUN git config --global user.email "codelrond@protonmail.com"
RUN git config --global user.name "Lord Codelrond"
CMD ["code-server", "--auth", "password", "--bind-addr", "0.0.0.0:8080", "/app/hello"]
