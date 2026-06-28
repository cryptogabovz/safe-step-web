FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache postgresql-client
RUN npm install -g npm@9

# 1) Dependencias — capa CACHEABLE.
#    Copiamos solo los manifiestos primero. Mientras package*.json (raíz y de
#    cada workspace) no cambien, Docker reutiliza esta capa y los deploys de
#    solo-código NO reinstalan dependencias (el mayor ahorro de tiempo).
COPY package*.json ./
COPY packages/evershop/package.json ./packages/evershop/
COPY packages/postgres-query-builder/package.json ./packages/postgres-query-builder/
COPY packages/create-evershop-app/package.json ./packages/create-evershop-app/
RUN npm install

# 2) Código fuente y assets (cambia seguido → va DESPUÉS de npm install)
COPY packages ./packages
COPY translations ./translations
COPY config.json ./config/default.json
COPY safestep-homepage-seed-v2.sql .
COPY safestep-legal-pages.sql .
COPY safestep-about-contact.sql .
COPY seed/images/safestep ./seed-media/safestep
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
RUN mkdir -p themes extensions public media

# 3) Compilar (SWC) y build (webpack)
RUN npm run compile:db && npm run compile && npm run build

EXPOSE 3000
ENTRYPOINT ["docker-entrypoint.sh"]
