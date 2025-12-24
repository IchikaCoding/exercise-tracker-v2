// async function getDog() {
//   console.log("🐶 犬の画像を取りに行きます...");
//   const response = await fetch("https://dog.ceo/api/breeds/image/random");
//   console.log(response);
//   console.time("測定！");
//   const date = await response.json();
//   console.timeEnd("測定！");

//   console.log(date);
//   console.log("画像のURL：", date.message);
// }

// getDog();

// const imgElement = document.getElementById("img");
// // console.log(imgElement);
// const fetchButtonElement = document.getElementById("fetch-button");
// const loadingTextElement = document.getElementById("loading-text");
// // console.log(loadingTextElement);

// async function getDog() {
//   console.log("🐶 データを注文しました...");
//   loadingTextElement.style.display = "block";
//   try {
//     //   fetchはデータを取ってくる関数
//     //   この👇️の行ではネットワークエラーとかCORSエラーとかが生じる事がある
//     const response = await fetch("https://dog.ceo/api/breeds/image/random");
//     console.log(response);
//     console.time("測定！");
//     //   データの中身を読むために待つ
//     //   翻訳エラーが生じることがある
//     const data = await response.json();
//     console.log(data);
//     console.timeEnd("測定！");

//     console.log("データ到着！URL：", data.message);
//     imgElement.src = data.message;
//   } catch (error) {
//     alert("ごめんなさい！ 通信エラーです🐶💦");
//   } finally {
//     // 表示していたローディングの文字列を消す
//     loadingTextElement.style.display = "none";
//   }
// }

// fetchButtonElement.addEventListener("click", getDog);
// // TODO 以下のコードも検討リスト追加
// // const getImg = await fetch(data.message);
// // const blob = await getImg.blob();
// // const url = URL.createObjectURL(blob);

// myOderは、JSON文字列にして送信する
const myOder = {
  food: "sweetPotato🍠",
  cake: "いちごのタルト🍓",
  drink: "cafe latte",
};

async function postData() {
  console.log("・・・データ送る準備中・・・");
  //   responseはJSON文字列
  const response = await fetch("https://example.com/api/order", {
    method: "post",
    header: { "Content-type": "application/json" },
    body: JSON.stringify(myOder),
  });
  console.log(response);
  //   json()によって、responseはJavasrcitptのオブジェクトに変換される
  const result = await response.json();
  console.log(result);
  console.log("✅ 注文完了！ ID:", result.id);
}
