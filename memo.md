```ts
// フォームの入力値の型エイリアス
type formElement = {
  id: string;
  date: string;
  type: string;
  minutes: number;
  note: string;
  time: number;
};
```

- 削除ボタンにデータ属性を追加

  - data-index-number="12315"

- JS で読み込む方法

  - dataset オブジェクトを通して data 属性を取得する
  - 属性名の `data-` より後の部分を使用して取得します（なお、ダッシュはキャメルケースに変換されます）。

```js
const articles = document.querySelectorAll("[data-columns]");

articles.forEach((article) => {
  console.log(article.dataset.indexNumber);
});
```

## データを降順にする手順

- [x] ローカルストレージのデータを全件取得
- [ ] Date の順番でソートする（b-a）
  - [ ] Date
- [ ] ソートしたデータを変数`sortedArray`に格納
- [ ] ローカルストレージの配列をアップデート
- [ ] 再描画

---

# 自動取得するコードを考える

## 最終目標

ページを開いた瞬間に，今の時刻を日時文字列形式で受け取って，YYYY-MM-DD の文字列を id="date"の要素に表示する

出力の場所はコンソール

## 変換方法

日時文字列形式を取得して，最初の 10 文字を取得

## 日本語で擬似コードを書いてみよう！！

- `Date` インスタンスで日時文字列形式を取得
- 最初の 10 文字を取得
- YYYY-MM-DD の文字列を表示する

---

# ダークモードの実装方法

## 最終目標

ページを開いたらダークモードになっていて，
ライトモードにしたいときはチェックボックスをクリックしてダークモードをオフにする。

リロードしてもモードは更新されない。

## モードの変換方法

ローカルストレージのデータを読み込んで，その文字列を`data-bs-theme` 属性の文字列としてセットする。
"dark"から"light"に書き換える

## 日本語で擬似コードを書いてみよう！！

- チェックボックスを JS で操作できるようにする
- ローカルストレージの文字列（ダークかライト）を参照して，ダークだったら`data-bs-theme` 属性が"dark"になる
- ライトだったら`data-bs-theme` 属性が"light"になる
