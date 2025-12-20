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

setTimeout(() => {
  // ダウンロード成功？
  const downloadSuccess = true; // 例なので仮に成功とする
  console.log("ダウンロード成功");
  if (downloadSuccess) {
    setTimeout(() => {
      // 加工成功？

      const processSuccess = true; // 例なので仮に成功とする
      if (processSuccess) {
        setTimeout(() => {
          console.log("加工に成功しました");
        }, 1000);
      } else {
        console.log("加工失敗..."); // エラー処理
      }
    }, 2000);
  } else {
    console.log("ダウンロード失敗..."); // エラー処理
  }
}, 3000);

const yakiimoTicket = Promise.resolve("🍠焼き芋チケット");
console.log(yakiimoTicket);

const notYakiimoTicket = Promise.reject("🍠焼き芋チケットもらえない");
console.log(notYakiimoTicket);
