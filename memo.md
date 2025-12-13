```ts
// フォームの入力値の型エイリアス
type formElement = {
  id: string;
  date: string;
  type: string;
  minutes: string;
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
