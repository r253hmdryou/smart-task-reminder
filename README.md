# About

リマインダーアプリ

![リマインダーの登録画面](./docs/images/register.png)
![リマインダーリスト](./docs/images/reminderList.png)
![リマインド時刻になった時の表示](./docs/images/reminderList2.png)

## 背景

モノレポの学習用に作成したアプリです。

## 実装技術

### フロントエンド

- React
- TypeScript

### バックエンド（API）

- Nest.js
- TypeScript
- prisma

### 型定義, validation

- zod

### データベース

- MySQL

## やらないこと

- 本番環境を想定したmigration
  - 何も気にせず破壊的変更を行います（必要性が無いので・・・）
