FROM node:16

RUN mkdir -p /var/web/app
WORKDIR /var/web/app

COPY package.json /var/web/app/
RUN npm install
COPY . /var/web/app/

EXPOSE 7001

CMD [ "npm","run","dev" ]