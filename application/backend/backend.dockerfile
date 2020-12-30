FROM node:14
WORKDIR /usr/src/application/backend
COPY package.json ./

RUN npm install

COPY . .
EXPOSE 3000
CMD [ "./scripts/start.sh" ]
