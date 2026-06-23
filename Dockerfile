FROM node:18-alpine
WORKDIR /app
RUN npm install -g npm@9
COPY package*.json .
COPY packages ./packages
COPY translations ./translations
COPY config.json ./config/default.json
RUN mkdir -p themes extensions public media
RUN npm install
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]
