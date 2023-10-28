FROM node:18.18.2 AS development

ENV NODE_ENV=development

USER node
WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node packages/common/package.json ./packages/common/
RUN npm ci

EXPOSE 4000

CMD ["npm", "run", "start:dev:common"]
