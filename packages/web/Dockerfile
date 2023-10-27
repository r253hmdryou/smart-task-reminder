FROM node:18.18.2 AS development

ENV NODE_ENV=development

USER node
WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node packages/web/package.json ./packages/web/
RUN npm -w @smart-task-reminder/web ci

EXPOSE 4000

CMD ["npm", "run", "start:dev:web"]
