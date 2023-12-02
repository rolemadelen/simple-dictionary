# Simple English Dictionary

JavaScript へのコンパイル構成を備えたシンプルな TypeScript プロジェクト。

## スタートガイド

これらの手順に従って JavaScript ファイルをコンパイルして実行します。

### 必要条件

- [Node.js](https://nodejs.org/) がインストールされていること。

### インストール

#### 1. リポジトリのクローン

```bash
git clone git@github.com:rolemadelen/simple-dictionary.git
```

`typescript/` ディレクトリに移動してください。

#### 2. 依存関係のインストール

```sh
npm install
```

### コンパイル

TypeScript ファイルを JavaScript にコンパイルするには、次のコマンドを実行します。

```sh
npx tsc
```

これにより、`./src` ディレクトリの TypeScript ファイルがコンパイルされ、同じディレクトリに出力されます。

### 実行

コンパイルが完了したら、`index.html` を開いて辞書を使用できます。
