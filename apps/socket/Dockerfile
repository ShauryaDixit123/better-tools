FROM node:18.18.2
WORKDIR /app/socket
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD [ "node", "dist/apps/socket/src/main.js" ]
EXPOSE 82 
