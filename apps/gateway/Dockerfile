FROM node:18.18.2
WORKDIR /app/gateway
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD [ "node", "dist/apps/gateway/src/main.js" ]
EXPOSE 3002 
