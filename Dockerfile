FROM node:20-alpine

WORKDIR /app

COPY server.js index.html settings.html themes.js ./

EXPOSE 3000

CMD ["node", "server.js"]
