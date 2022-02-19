FROM node:14-alpine

WORKDIR /src
COPY package*.json /src/
EXPOSE 3000
ENV NODE_ENV=development
RUN npm install -g nodemon && npm install
COPY . /src/
CMD ["nodemon", "bin/www"]
