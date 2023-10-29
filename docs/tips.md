## 特定のワークスペースにのみインストール

```sh
$ npm install <package> -w <workspace>
```

## prisma

- push - schemaに記述した内容をDBに反映させる
- migrate - schemaとDBの差分をmigrationファイルとして生成する
- deploy - migrationファイルをDBに反映させる（本番用）
