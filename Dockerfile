FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache postgresql-client
RUN npm install -g npm@9
COPY package*.json .
COPY packages ./packages
COPY translations ./translations
COPY config.json ./config/default.json
COPY safestep-homepage-seed-v2.sql .
COPY safestep-legal-pages.sql .
COPY seed/images/safestep ./seed-media/safestep
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
RUN mkdir -p themes extensions public media
RUN npm install
RUN npm run compile:db
RUN npm run compile
RUN npm run build

EXPOSE 3000
ENTRYPOINT ["docker-entrypoint.sh"]
