# ナミノオト工程表アプリ（PWA版 v1.1.0）

スマホ・タブレットでアプリのように使える工程表入力PWA。Google Driveへの自動保存機能つき。

## 📁 ファイル構成

```
naminooto-schedule-app/
├── index.html           ← アプリ本体（PWA化＆Drive保存対応）
├── manifest.json        ← PWAマニフェスト
├── sw.js                ← Service Worker（オフライン対応）
├── icon-192.png         ← アイコン192x192
├── icon-512.png         ← アイコン512x512
├── icon-maskable-512.png← Android maskableアイコン
├── apple-touch-icon.png ← iOSホーム画面用
├── favicon.png          ← ブラウザタブ用
├── icon.svg             ← ソースSVG
└── README.md            ← このファイル
```

---

## 🚀 GitHub Pages で公開する手順（素人向け・10分でできる）

### 必要なもの
- GitHubアカウント（無料、メールアドレスだけで作れる）
- このフォルダの中身全部

### ステップ1：GitHubアカウントを作る（持ってる人はスキップ）

1. ブラウザで [https://github.com](https://github.com) を開く
2. 右上の **「Sign up」** をクリック
3. メールアドレス・パスワード・ユーザー名を入力して登録
4. メール認証を完了

### ステップ2：新しいリポジトリを作る

1. GitHubにログインしたら、右上の **「+」** → **「New repository」** をクリック
2. **Repository name**: `naminooto-schedule-app` と入力
3. **Public**（公開）にチェック ※PWA公開には必須
4. **「Add a README file」** はチェックなし
5. **「Create repository」** ボタンをクリック

### ステップ3：ファイルをアップロード

1. 作ったリポジトリのページで **「uploading an existing file」** リンクをクリック
   - もしくは **「Add file」** → **「Upload files」**
2. このフォルダ（`naminooto-schedule-app/`）の中の**全部のファイル**を選択してドラッグ＆ドロップ
   - `index.html` `manifest.json` `sw.js` `icon-*.png` など全部
   - **`README.md`は除外してもOK**（このファイルは説明用）
3. 下の方の **「Commit changes」** ボタンをクリック

### ステップ4：GitHub Pages を有効化

1. リポジトリのページ上部の **「Settings」** タブをクリック
2. 左サイドバーの **「Pages」** をクリック
3. **Source** の項目で：
   - Branch: **`main`** を選択
   - フォルダ: **`/ (root)`** のまま
4. **「Save」** ボタンをクリック
5. 数分待つ（最初は5〜10分かかることもある）
6. 上部に **「Your site is live at https://〇〇〇.github.io/naminooto-schedule-app/」** と表示される

これが**公開URL**やで〜！🎉

### ステップ5：スマホでホーム画面に追加

#### iPhone（Safari）
1. 公開URLをSafariで開く
2. 下の **共有ボタン**（□に↑）をタップ
3. **「ホーム画面に追加」** をタップ
4. **「追加」** をタップ
5. ホーム画面にナミノオトのアイコンが追加される！

#### Android（Chrome）
1. 公開URLをChromeで開く
2. アドレスバー右の **「︙」（三点メニュー）** をタップ
3. **「ホーム画面に追加」** をタップ
4. **「追加」** をタップ
5. ホーム画面にナミノオトのアイコンが追加される！

これで**アイコンタップで全画面起動**できるで！

---

## ☁️ Google Drive 自動保存の設定（初回1回だけ）

Drive保存機能を使うには、Google CloudでOAuth Client IDを作る必要があるで。

### ステップ1：Google Cloud プロジェクト作成

1. [https://console.cloud.google.com](https://console.cloud.google.com) にアクセス
2. **Googleアカウントでログイン**（murakami@nami-no-oto.co.jp推奨）
3. 上部の **「プロジェクトを選択」** → **「新しいプロジェクト」**
4. プロジェクト名：`ナミノオト工程表` と入力 → **「作成」**

### ステップ2：Google Drive APIを有効化

1. 左サイドバーの **「APIとサービス」** → **「ライブラリ」**
2. 検索欄に **「Google Drive API」** と入力
3. **「Google Drive API」** をクリック → **「有効にする」**

### ステップ3：OAuth同意画面を設定

1. 左サイドバーの **「APIとサービス」** → **「OAuth同意画面」**
2. **「外部」** を選択 → **「作成」**
3. アプリ名：`ナミノオト工程表`
4. ユーザーサポートメール：`murakami@nami-no-oto.co.jp`
5. デベロッパー連絡先：`murakami@nami-no-oto.co.jp`
6. **「保存して次へ」**
7. **「スコープ」** はスキップ（後で自動追加される）
8. **「テストユーザー」** に自分のGoogleアカウントを追加
9. **「保存して次へ」** → **「ダッシュボードへ戻る」**

### ステップ4：OAuth クライアントID作成

1. 左サイドバーの **「APIとサービス」** → **「認証情報」**
2. 上部の **「+ 認証情報を作成」** → **「OAuth クライアントID」**
3. アプリケーションの種類：**「ウェブアプリケーション」**
4. 名前：`ナミノオト工程表 PWA`
5. **承認済みのJavaScript生成元** に **公開URL** を追加：
   - 例：`https://〇〇〇.github.io`
   - ※末尾スラッシュなし
6. **「作成」** をクリック
7. ポップアップに表示される **クライアントID** をコピー
   - 末尾が `.apps.googleusercontent.com` の長い文字列

### ステップ5：アプリにClient IDを設定

1. 公開URLのアプリを開く
2. JSON出力モーダルの **「☁️ Driveに保存」** ボタンを初めてタップ
3. プロンプトが出るので、**コピーしたClient ID**を貼り付け
4. **OK**をタップ
5. Google認証画面が出るので**承認**
6. 「✓ Driveに保存しました」が表示されたら成功！

これ以降、ボタン一発でDriveに保存されるで！

---

## 🔄 アプリを更新する時

ファイル修正したら：
1. GitHubのリポジトリページで該当ファイルを開く
2. 鉛筆アイコン（編集）→修正→ **Commit changes**
3. または **「Add file」→「Upload files」** で上書き

修正後数分でGitHub Pagesに反映される。**スマホのキャッシュ**は Service Worker がほぼ自動で更新するけど、すぐ反映したいなら：
- iPhone：設定 → Safari → 履歴とWebサイトデータを消去
- Android：Chrome設定 → プライバシー → 閲覧履歴データを削除

---

## 💡 使い方フロー（完成版）

1. スマホでアイコンタップ → 全画面起動
2. プリセット選んで読込 or **「ゼロから入力」**
3. 物件名・住所・期間入力
4. 工程ごとに担当者・期間・作業内容入力
5. **「📋 テキスト出力」** ボタン
6. JSONペイロード生成画面で：
   - **「📋 コピー」** → なっちゃんに貼り付け → フルオート工程表生成
   - **「☁️ Driveに保存」** → Drive保存（バックアップ用）

---

## 🐛 困った時

| 症状 | 対処 |
|---|---|
| ホーム画面追加できない | Chromeで開く／HTTPS必須 |
| Driveボタン押しても何も起きない | Client ID未設定／キャンセル済→ブラウザ更新して再設定 |
| 保存失敗エラー | OAuth同意画面でテストユーザーに自分を追加してるか確認 |
| アプリ古いまま | キャッシュ削除＋アプリ再起動 |
| Service Worker 動かない | 必ずHTTPS（GitHub Pages公開URL）でアクセス |

---

## 📞 サポート

問題出たらなっちゃん（Claude）に聞いてな〜！
