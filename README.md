# MOTI JPN GG - Minecraft Server Website

マインクラフトサーバー `moti.jpn.gg` のためのプレミアムなWebサイトテンプレートです。
GitHub Pages を利用して**完全無料**で公開することができます。

## 構成ファイル

* `index.html` : サイトの骨組み、SEO設定、コンテンツ構造
* `style.css` : ダークテーマ、ネオンオレンジ/シアンのグラデーション、美しいレスポンシブデザイン
* `app.js` : サーバー接続ステータス（api.mcsrvstat.us経由）、オンライン人数動的カウントアップ、IPコピー機能の処理

---

## 🚀 GitHub Pages への公開手順 (完全無料)

### ステップ 1: GitHubでリポジトリを作成する
1. [GitHub](https://github.com/) にログイン（未作成の場合はアカウント作成）します。
2. 右上の「**+**」アイコンをクリックし、「**New repository**」を選択します。
3. リポジトリ名（Repository name）を入力します。
   * 例: `moti-website`
   * または、`your-github-username.github.io` と名付けると、公開URLがサブパスなし（`https://your-github-username.github.io/`）の短いURLになります。
4. 公開設定を「**Public**」に設定します。
5. 「**Create repository**」ボタンを押します。

### ステップ 2: ファイルをアップロードする
1. 作成したリポジトリのページで、「**uploading an existing file**」というリンクをクリックします。
2. 作成されたこのフォルダ内のファイル（`index.html`, `style.css`, `app.js`）をドラッグ＆ドロップします。
3. 画面下部の「**Commit changes**」ボタンをクリックしてアップロードを確定させます。

### ステップ 3: GitHub Pages を有効化する
1. リポジトリ上部のメニューから「**Settings** (設定)」タブを開きます。
2. 左メニューにある「**Pages**」をクリックします。
3. 「**Build and deployment**」セクションの「**Branch**」の設定で、`None` から `main`（または `master`）に変更します。
4. フォルダ設定は `/ (root)` のままにし、「**Save**」をクリックします。

数分後にページがビルドされ、画面上部に公開URL（例: `https://your-username.github.io/moti-website/`）が表示されます。そのURLを開くとサーバーのWebサイトが表示されます！

---

## 🎨 カスタマイズについて
* Discordの招待リンクや、GitHubリポジトリを変更したい場合は `index.html` 内の `https://discord.gg/your-invite` や `https://github.com/your-repo` などの箇所をお好みのリンクに書き換えてください。
* サーバーIPを変更したい場合は `app.js` 内の `const SERVER_IP = 'moti.jpn.gg';` を書き換えてください。
