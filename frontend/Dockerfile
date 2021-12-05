FROM node:17.1.0

WORKDIR /code
COPY package.json /code

RUN echo "REACT_APP_API_URL=http://127.0.0.1:8000" > .env.local

RUN npm install

COPY . /code
