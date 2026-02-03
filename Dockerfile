FROM node:20-alpine

WORKDIR /app

COPY server.js index.html settings.html ./

EXPOSE 3000

CMD ["node", "server.js"]
