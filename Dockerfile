FROM node:16

COPY package*.json .  ./

RUN npm install
RUN npm ci --only=production
COPY . .

EXPOSE 8082

CMD [ "node", "index.js" ]



