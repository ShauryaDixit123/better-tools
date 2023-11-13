FROM node:18.18.2
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD [ "node", "dist/src/main.js" ]
EXPOSE 3010 81 
