FROM node:14
WORKDIR /usr/src/application/frontend
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD [ "npm", "run", "start"]
