FROM node:10.17.0

COPY . /app

WORKDIR /app

RUN rm -rf ./node_modules && npm install

CMD ["npm", "start"]
