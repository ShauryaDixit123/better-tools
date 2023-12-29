FROM node:18.18.2
WORKDIR /app/notif
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD [ "node", "dist/apps/notif/src/main.js" ]
EXPOSE 9093
