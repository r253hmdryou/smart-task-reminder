#!/bin/sh
set -eu

# データベース操作
echo "Deploy to database..."
npm run prisma:deploy
npm run prisma:generate -w @smart-task-reminder/backend

# アプリケーションの起動
echo "Starting the application..."
npm run start:dev:backend
