FROM node:18.18.2 AS development

ENV NODE_ENV=development

USER node
WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node packages/backend/package.json ./packages/backend/
RUN npm ci

EXPOSE 3000

CMD ["npm", "run", "start:dev:backend"]
