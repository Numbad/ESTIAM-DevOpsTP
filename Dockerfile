FROM debian:jessie

WORKDIR /app

RUN apt-get update \
&& apt-get install -y curl \
&& rm -rf /var/lib/apt/lists/*

RUN curl -LO "https://nodejs.org/dist/latest/node-v11.10.0-linux-x64.tar.gz" \
&& tar -xzf node-v11.10.0-linux-x64.tar.gz -C /usr/local --strip-components=1 \
&& rm node-v11.10.0-linux-x64.tar.gz

ENV MYSQL_PWD azerty123
RUN echo "mysql-server mysql-server/root_password password $MYSQL_PWD" | debconf-set-selections
RUN echo "mysql-server mysql-server/root_password_again password $MYSQL_PWD" | debconf-set-selections


RUN apt-get update && apt-get install -y mysql-server && apt-get install mysql-client

ADD package.json ./

RUN npm install 

ADD . /app/