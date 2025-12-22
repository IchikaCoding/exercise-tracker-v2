// 時計のコード

// console.log("さつまいもを焼き始めます🍠（3秒待ちます）");

// // setTimeout(やってほしいこと, 待ち時間ミリ秒)
// setTimeout(() => {
//   console.log("🛎️ ピピピ！ 3秒経ちました！ 焼き上がりです！");
// }, 3000);

// console.log("待ってる間にJavaScriptのお勉強🥳🥸");

// const timerID = setInterval(() => {
//   console.log("石焼～き芋，おいも！");
// }, 1000);

// setTimeout(() => {
//   console.log("買います！");
//   clearInterval(timerID);
// }, 5000);

// ーーーーーーーー時計の関数ーーーーーーーーーーーー
// const clockDisplayElement = document.getElementById("clock-display");
// // console.log(clockDisplayElement);

// function updateClock() {
//   const date = new Date();
//   const dateString = date.toLocaleString();
//   clockDisplayElement.textContent = dateString;
// }

// setInterval(updateClock, 1000);

// updateClock();

//-------いちごたべるコード---------

// console.log("いちかどんがいちごを食べるスペード");
// const intervalId = setInterval(() => {
//   console.log("ぱくぱく🍓");
// }, 1000);

// function stopEatingFun() {
//   clearInterval(intervalId);
//   console.log("食べるのを辞めるんだ，いちかどん😡");
// }

// setTimeout(stopEatingFun, 5000);

// console.log("A. スタート！");

// // 0秒後に実行してね！（WebAPIがCのタスクのあとに追加するから後で実行される）
// setTimeout(() => {
//   console.log("B. 0秒経ったよ！");
// }, 0);

// console.log("C. ゴール！");

// console.log("🚀 スタート！");

// // 1. ダウンロード（3秒）
// setTimeout(() => {
//   console.log("📥 1. ダウンロード完了！");

//   // ダウンロードが終わったから、加工を開始！
//   setTimeout(() => {
//     console.log("⚙️ 2. データ加工完了！");

//     // 加工が終わったから、表示を開始！
//     setTimeout(() => {
//       console.log("📺 3. 画面に表示完了！");
//       console.log("🎉 すべての作業が終了しました！");
//     }, 1000);
//   }, 2000);
// }, 3000);

// -----------------エラー処理追加した場合の波動拳コード

// setTimeout(() => {
//   // ダウンロード成功？
//   const downloadSuccess = true; // 例なので仮に成功とする
//   console.log("ダウンロード成功");
//   if (downloadSuccess) {
//     setTimeout(() => {
//       // 加工成功？

//       const processSuccess = true; // 例なので仮に成功とする
//       if (processSuccess) {
//         setTimeout(() => {
//           console.log("加工に成功しました");
//         }, 1000);
//       } else {
//         console.log("加工失敗..."); // エラー処理
//       }
//     }, 2000);
//   } else {
//     console.log("ダウンロード失敗..."); // エラー処理
//   }
// }, 3000);

// const yakiimoTicket = Promise.resolve("🍠焼き芋チケット");
// console.log(yakiimoTicket);

// const notYakiimoTicket = Promise.reject("🍠焼き芋チケットもらえない");
// console.log(notYakiimoTicket);

// // orderCoffee: 1秒後に「☕ ホットコーヒー」を返す
// function orderCoffee() {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve("☕ ホットコーヒー"), 1000);
//   });
// }

// // drink: 飲む動作
// function drink(coffee) {
//   console.log(coffee + " を飲みました。おいしい！");
// }

// // 1. 注文して、チケット(Promise)をもらう
// const ticket = orderCoffee();

// // 2. チケットに「窓口」をつける
// ticket.then((coffee) => {
//   // 3. 成功(Fulfilled)したら、ここが実行される！
//   console.log("☕ 受け取りました:", coffee);
//   drink(coffee);
// });

// ーーーーーーーー成功したときの.thenの練習ーーーーーーーーーーー

// const pizzaTicket = Promise.resolve("🍕 ピザ");

// pizzaTicket
//   .then((food) => {
//     console.log("1. 受け取った:", food);
//     return food + " 🧀 チーズ追加";
//   })
//   .then((food) => {
//     console.log("2. 加工した:", food);
//   });

// const pizzaTicket = Promise.resolve("🍕 ピザ");

// // then に渡した関数が値を返すと、
// // その値で「解決（fulfilled）」した新しい Promise が返ります
// const p1 = pizzaTicket.then((food) => {
//   console.log("1. 受け取った:", food);
//   return food + " 🧀 チーズ追加";
// });
// console.log(p1);

// const p2 = p1.then((food) => {
//   console.log("2. 加工した:", food);
//   // ここでの戻り値がさらに次の then に渡る
// });

// console.log(p2);

// ーーーーーーーーPromiseチェーンーーーーーーーーーーー

// download: データをダウンロードするフリ
// new Promiseで発行されるのはチケット
// 非同期処理の内容を設定しているだけで，リターンされるものは即座に発行されるチケット
// function download() {
//   return new Promise((resolve) =>
//     setTimeout(() => resolve("ダウンロードデータ"), 1000)
//   );
// }

// // process: データを加工するフリ
// function process(data) {
//   return new Promise((resolve) =>
//     setTimeout(() => resolve(data + "を加工しました"), 1000)
//   );
// }

// // display: 表示するフリ
// function display(data) {
//   console.log("画面に表示:", data);
//   return Promise.resolve();
// }

// download()
//   .then((data) => {
//     console.log("1. ダウンロード完了！");
//     // 次の処理（加工）を返す
//     return process(data);
//   })
//   .then((processed) => {
//     console.log("2. 加工完了！");
//     // 次の処理（表示）を返す
//     return display(processed);
//   })
//   .then(() => {
//     console.log("3. 表示完了！");
//     console.log("🎉 すべて完了！");
//   })
//   .catch((error) => {
//     console.log("⚠️ どこかでエラーが起きました:", error);
//   });

// function luckyDice() {
//   return new Promise((resolve, reject) => {
//     const dice = Math.floor(Math.random() * 6) + 1;
//     console.log("🎲 サイコロの目:", dice);

//     setTimeout(() => {
//       if (dice >= 4) {
//         resolve("🎉 大当たり！"); // 4以上なら成功
//       } else {
//         reject("💀 ハズレ…"); // 3以下なら失敗
//       }
//     }, 1000);
//   });
// }

// // 使ってみる
// luckyDice()
//   .then((msg) => console.log(msg))
//   .catch((err) => console.log(err));

// 約束チケット姉さんの仕事場（関数の中身）
// function orderCoffee() {
//   // 1. 「新しいチケット(Promise)」を作る
//   // 引数には、成功(resolve)と失敗(reject)のスイッチが渡される
//   return new Promise((resolve, reject) => {
//     console.log("約束チケット姉さん「今からコーヒーを淹れますよ...」");

//     // 2. 何か時間がかかる処理（ここでは3秒待つ）
//     setTimeout(() => {
//       const isSuccess = false; // 今回は成功したとする！

//       if (isSuccess) {
//         // 3. 成功したら resolve(成功データ) を呼ぶ！
//         // → 運命のレバーを「成功（Resolve）」側に倒す
//         resolve("☕ ホットコーヒー");
//       } else {
//         // 4. 失敗したら reject(エラー理由) を呼ぶ！
//         // → 運命のレバーを「失敗（Reject）」側に倒す
//         reject("💥 豆がない！");
//       }
//     }, 3000);
//   });
// }

// // 実際に注文してみよう！（コピペして実行できます）
// console.log("🛎️ すみませーん、コーヒーください");

// orderCoffee()
//   .then((coffee) => {
//     console.log("✨ 受け取りました:", coffee);
//   })
//   .catch((error) => {
//     console.log("😭 エラーです:", error);
//   });

// ----------------------------

// 各種ダミー関数
// const toGetFood = () =>
//   new Promise((resolve, reject) =>
//     setTimeout(() => {
//       const num = Math.floor(Math.random() * 6 + 1);
//       console.log("サイコロの目", num);
//       if (num >= 5) {
//         resolve("いちかどんの焼き芋🍠");
//       } else if (num >= 3) {
//         resolve("いちかどんの苺🍓");
//       } else {
//         reject("なし😭");
//       }
//     }, 1000)
//   );

// const toEat = (food) =>
//   new Promise((resolve) => setTimeout(() => resolve(food + "を食べる"), 1000));
// const display = (food) =>
//   new Promise((resolve) => {
//     console.log("画面に表示:", food);
//     resolve();
//   });

// // エラー実験用の「爆発する関数」
// const dangerousWork = () => Promise.reject("爆発しました💥");

// async function main() {
//   try {
//     // ここに「成功するはず」の処理を全部書く
//     const food = await toGetFood();
//     const foodForEating = await toEat(food);
//     await display(foodForEating);
//     console.log("🎉 美味しかった！！");
//   } catch (error) {
//     // 途中で誰かが「失敗（Reject）」したら、すぐにここにワープしてくる！
//     console.log("😢 ご飯はありませんでした:", error);
//   } finally {
//     // 成功しても失敗しても、最後に必ず実行される
//     console.log("👋 お疲れ様でした（後片付け）");
//   }
// }

// orderCoffee: ランダムで失敗する関数
// function orderCoffee() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       // 50%の確率で失敗させる
//       if (Math.random() > 0.5) resolve("☕ ホットコーヒー");
//       else reject("豆切れエラー");
//     }, 1000);
//   });
// }
// async function main() {
//   try {
//     const result = await orderCoffee();
//     console.log(result);
//     console.log("おつちか☆");
//   } catch (err) {
//     console.error(err);
//     alert("おつちか☆豆がないのでお帰りくださいまし！");
//   }
// }

// 各種ダミー関数
// const showLoadingSpinner = () => console.log("🌀 グルグル表示");
// const hideLoadingSpinner = () => console.log("🧹 グルグル消去");
// const downloadData = () =>
//   new Promise((resolve, reject) => {
//     setTimeout(() => {
//       Math.random() > 0.5 ? resolve("成功データ") : reject("通信エラー");
//     }, 1000);
//   });
// const showData = (d) => console.log("✅ データ表示:", d);
// const showError = (e) => console.log("❌ エラー表示:", e);

// async function main() {
//   showLoadingSpinner();

//   try {
//     const data = await downloadData();
//     showData(data);
//   } catch (e) {
//     showError(e);
//   } finally {
//     hideLoadingSpinner();
//   }
// }

// 気まぐれな注文関数（半分失敗する）

function luckyOrder() {
  return new Promise((resolve, reject) => {
    // 0.5秒待ってから...
    setTimeout(() => {
      const isLucky = Math.random() > 0.5; // 50%の確率
      if (isLucky) {
        resolve("✨ 最高級マンデリン"); // 成功！
      } else {
        reject("💥 カップを割ってしまいました..."); // 失敗！
      }
    }, 500);
  });
}

// 注文を実行する関数
// order関数の非同期がうまくいったかどうかで状態が成功（fulfilled）・失敗（reject）に分かれる
async function order() {
  console.log("注文開始🐣");
  try {
    const coffee = await luckyOrder();
    console.log(`${coffee}をゲットしました☕`);
  } catch (error) {
    console.log("可哀想に🥺", error);
  } finally {
    console.log("お店を出る💨");
  }
}

// ------------------------

// // getUser: 3秒かかる関数
// function getUser() {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve({ name: "イチカ", id: 1 }), 3000);
//   });
// }

// // getFriends: 2秒かかる関数
// function getFriends() {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve(["Aさん", "Bさん"]), 2000);
//   });
// }
// // おまけ：お盆をひっくり返す実験用
// function getImportantData() {
//   return Promise.resolve("大事なデータ");
// }
// function getErrorData() {
//   return Promise.reject("エラーデータ");
// }

// async function loadMyPage() {
//   console.time("かかった時間"); // 時間計測スタート！

//   // 1. ユーザー情報を取る（3秒待つ）
//   const user = await getUser();
//   console.log("👤 ユーザー取れた！");

//   // 2. 友達リストを取る（2秒待つ）
//   const friends = await getFriends();
//   console.log("👥 友達取れた！");

//   console.log(`✨ 完成！ ${user.name}さんと、友達${friends.length}人`);
//   console.timeEnd("かかった時間"); // 時間計測ストップ！
// }
