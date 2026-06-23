FROM node:18-alpine
WORKDIR /app
RUN npm install -g npm@9
COPY package*.json .
COPY packages ./packages
COPY translations ./translations
COPY media ./media
# Create required empty dirs that may not exist in repo
RUN mkdir -p themes extensions public config
COPY config.json ./config/default.json
RUN npm install
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]
