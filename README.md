# data-muginosato

`https://data.muginosato.com/` の入口のページです（麦の郷印刷・お客様とのファイルの受け渡し）。

- 中身は「受付のページ（Google Apps Script のウェブアプリ）を中に出すだけ」の小さなページです。
- 受付のページそのもの・置き場（Google ドライブ）・合言葉はここにはありません。**このリポジトリは公開なので、秘密の物を入れないこと。**
- 中に出してよいのは `app.js` の `APP`（本番の受付・`?t=…`）に書いたアドレスだけです（ほかのページを会社のアドレスで出されないように）。試しの `?k=…` は 2026-11-24 に外しました。
- 本番の受付のコードは非公開のリポジトリ `mugi-moriwaki/mugi-files`（`gas/uketori`）。お客様へのリンクは insatsu の指示書から作ります（`https://data.muginosato.com/?t=d…`）。

## 置き方

- GitHub Pages（Settings → Pages → Deploy from a branch → `main` / `/ (root)`）
- 会社のアドレスは `CNAME` ファイル（`data.muginosato.com`）
- ドメインの設定（Xserver の DNS レコード）：`data` → CNAME → `mugi-moriwaki.github.io`
- 計画：insatsu の `plans/20261124-data-uketori.md`
