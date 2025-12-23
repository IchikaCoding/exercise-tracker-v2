- 同期
  - 前の処理が終わるまで待つ → 順番待ち → 遅い
- 非同期

  - 自分だけ勝手に別の動きをする
  - 待たなくていい（速い）

- ノンブロッキングとは？
  - 非同期処理

## JS の基本

- シングルスレッド
  - ワンオペのお店的なもの
  - 同期処理
  - Web Workers というのを使うと，別店舗で複数コアを使用可能
- マルチスレッド

  - 並列処理
  - 巨大な厨房
    - メモリ（冷蔵庫）も共有だから競合が起きる
    - （プリン争奪戦）

- 非同期処理

  - 裏方で作業

- ０秒後っていうのは『今すぐ』っていう意味じゃない

  - 何もやることがなければ、すぐ ⭐️

## 勉強のコツ

- 図解大切

## [[イベントループ]]ででてくる用語まとめ

- まな板 → 「[[コールスタック]]」とも呼ばれる
  - コールスタックは一つしか乗らない
- 行列 → 「[[タスクキュー]]」とも呼ばれる
- 全体の仕組み → 「イベントループ」と呼ばれる

- タスクキューの並び順について
  - 待ち時間が短い順に「行列」に並ぶ
    - 0 秒の正体 →「0 秒後に実行」ではなく「0 秒後に行列に並ぶ」

```mermaid
flowchart TD
    Start([処理開始]) --> Step1[A. スタートを表示]
    Step1 --> Step2[setTimeout 0秒 を登録]

    subgraph WebAPI_World [裏側の世界]
        Step2 -- タイマー計測開始 --> TimerDone[0秒経過!]
        TimerDone -- 行列に並ぶ --> Queue[行列: B. 0秒...]
    end

    Step2 -- シェフは待たない --> Step3[C. ゴールを表示]

    Step3 --> Check{まな板は空か?}

    Check -- まだ作業中 --> Check
    Check -- 空っぽ! --> EventLoop[イベントループ発動!]

    EventLoop -- 行列から取り出す --> RunQueue[B. 0秒... を実行]
```

## [[Promise]]の状態の用語

- Pending（ペンディング）
  - 準備中
- Fulfilled（フルフィルド）
  - 成功！
  - データが到着したこと（処理が完了したこと）を解決（Resolve）と言うよ
- Rejected（リジェクテッド）
  - 失敗

この状態を変化させる事ができるのは JS ではなく，ブラウザとか Web API とはが書き換えるよ ♪
ちなみに，JS は待つだけ

[[コールバック]]関数とは？
引数として他の関数に渡され、外側の関数の中で呼び出されて、何らかのルーチンやアクションを完了させる関数

- Promise とは？
  - 予約チケットのこと
  - 約束のオブジェクト
  - 非同期処理の最終的な完了もしくは失敗を表すオブジェクト

# 2025-12-21

- 6.1 チケットを「窓口」に出そうまでやったよ

# 2025-12-21

## Promise の.then について(成功したとき)

- 「リジェクトを返す」か「例外を投げる」以外は成功で次に渡る

## 失敗した時の窓口 ～.catch()～

以下のコードを実行したときに，`Promise {<fulfilled>: undefined}`が undefined になるのはどうして？
`Promise.resolve(100)`だけやったら`Promise {<fulfilled>: 100}`になる

```js
Promise.resolve(100)
  .then((num) => {
    console.log("1. 受け取った:", num);
    return num * 2; // ← return がない！
  })
  .then((num) => {
    console.log("2. 受け取った:", num); // 何が出る？
  });
```

.catch は最後に一個書くだけで途中失敗しても拾ってくれる
→ 途中の処理に合わせてエラーを変える事はできるの？

タスクキューに並んでいる setTimeout よりマイクロタスクに並んでいる Promise の方が先に実行される（割り込む）

async function は「中身を Promise で包んで返す」自動包装機。
new Promise とかをやる必要がない！関数を定義する前に async を書くだけで `main().catch(...)` や `await main()` が使える！

- 非同期処理が始まるタイミングは？
  - 非同期の仕事は orderCoffee() 内の new Promise → setTimeout で始まっている
  - その結果をどう扱うかを .then/.catch で指定している、という関係です。

# 2025-12-22

async 関数を呼んだら、
中身がほしいなら await するか .then() を使おう！

```js
// 各種ダミー関数
const download = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve("ダウンロードデータ"), 1000)
  );
const process = (data) =>
  new Promise((resolve) => setTimeout(() => resolve(data + "を加工"), 1000));
const display = (data) =>
  new Promise((resolve) => {
    console.log("画面に表示:", data);
    resolve();
  });

// エラー実験用の「爆発する関数」
const dangerousWork = () => Promise.reject("爆発しました💥");
```

```js
download((data) => {
  process(data, (processed) => {
    display(processed, () => {
      console.log("完了！");
    });
  });
});
```

```js
download()
  .then((data) => process(data))
  .then((processed) => display(processed))
  .then(() => console.log("完了！"));
```

```js
// 魔法を使うための関数を定義
async function main() {
  console.log("🚀 スタート！");

  // awaitをつけるだけで、完了するまでここでピタッと止まってくれる！
  const data = await download();
  console.log("1. ダウンロード完了！");

  const processed = await process(data);
  console.log("2. 加工完了！");

  await display(processed);
  console.log("3. 表示完了！");

  console.log("🎉 すべて完了！");
}

// 実行！
main();
```

- 3 つの掟（復習）

  - await は async function の中でしか使えない！
  - async function は必ず Promise を返す！ → だから .catch() がつけられる
  - Promise を放置しない！ → await か .catch() で必ず受け止める

- フローチャートは大事！！

- try...catch が捕まえるエラーは？

  - プログラムのミス
  - Promise の失敗（Reject）

- ローディング画面を消す時（isLoading = false）
- 連打防止で無効化したボタンを、また押せるように戻す時（button.disabled = false）
- 開いたファイルやカメラを閉じる時（後始末）

「成功しても失敗しても、最後は元の状態に戻したい！」という時は finally の出番です。

- throw を忘れかけている！

- 並行
  - 複数のタスクを切り替えながら一人がこなすイメージ
- 並列
  - パラレルワールドと同じ理解。複数で同時に進める

# 2025-12-23

ここからスタート 👇️
Step 1：まずは普通の書き方で理解しよう
https://github.com/komiyamma/site_ichika_study_async_await_fetch/blob/main/D09.md

- 並列化の恩恵を受けられるときは？

  - ブラウザとかに仕事を任せているとき
  - Promise.all は「魔法の並列化」ってわけではないよ
