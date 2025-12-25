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

// // myOderは、JSON文字列にして送信する
// const myOder = {
//   food: "sweetPotato🍠",
//   cake: "いちごのタルト🍓",
//   drink: "cafe latte",
// };

// async function postData() {
//   console.log("・・・データ送る準備中・・・");
//   //   responseはJSON文字列
//   const response = await fetch("https://example.com/api/order", {
//     method: "post",
//     header: { "Content-type": "application/json" },
//     body: JSON.stringify(myOder),
//   });
//   console.log(response);
//   //   json()によって、responseはJavasrcitptのオブジェクトに変換される
//   const result = await response.json();
//   console.log(result);
//   console.log("✅ 注文完了！ ID:", result.id);
// }

// const myData = {
//   name: "ichika",
//   favoriteSnacks: ["ガルボ", "🍠", "からあげ"],
//   study: "JavaScript",
// };

// async function postData() {
//   console.log("データの送信準備");
//   try {
//     const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
//       method: "POST",
//       headers: { "Content-type": "application/json; charset=UTF-8" },
//       body: JSON.stringify(myData),
//     });
//     // .json()メソッドで、JSのオブジェクトにする
//     const jsonObject = await response.json();
//     console.log(jsonObject);
//     console.log("データ送信成功🎉✨️");
//   } catch (error) {
//     console.error("エラーです！");
//   } finally {
//     console.log("おつちか✨️✨️");
//   }
// }

// postData();

// const userData = {
//   name: "イチカ",
//   score: 100,
// };

// async function sendScore() {
//   const response = await fetch("https://api.example.com/scores", {
//     // 送り方を指定（GETじゃなくて…）
//     method: "POST",

//     // 荷札（中身の種類を教える）
//     headers: {
//       "Content-Type": "application/json",
//     },

//     // 中身（オブジェクトを文字列に変換して送る）
//     body: JSON.stringify(userData),
//   });

//   const result = await JSON.parse(response);
//   console.log("送信完了:", result);
// }

//  ------------------------------

// 同期処理のthrowの復習
// 年齢を判定する処理
// エラーのメッセージを返すこと
// function determineAge(age) {
//   if (age < 0) {
//     throw new Error("0歳以上で入力してください");
//   }
//   return `あなたの年齢は${age}歳です`;
// }

// try {
//   console.log(determineAge(-15));
// } catch (error) {
//   console.error(error.message);
// }

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

// userIdが引数
// userIdがあるなら、そのAPIのURLにアクセス

async function getUserId(userId) {
  if (!userId) {
    throw new Error("useIdが偽です");
  }
  const response = await fetch(`api/user/${userId}`);
  console.log(response);
  //   404エラーのときはPromiseチケット自体はfulfilledになってしまう。
  // その時にエラーにするためのエラー処理のコード
  if (!response.ok) {
    throw new Error(`サーバーエラーです！ コード: ${response.status}`);
  }
  const date = await response.json();
  return date;
  //   return response;
}

// エラーがキャッチされたらPromiseStateはrejectになる
try {
  console.log(getUserId("ichika"));
} catch (error) {
  console.error(error.message);
}
