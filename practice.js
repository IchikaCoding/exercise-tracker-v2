{
  const yourName = "ichika";
  console.log({ yourName });
}
// console.log(yourName);

if (true) {
  const x = "inner";
  console.log(x); // => "inner"
}
// console.log(x); // => ReferenceError: x is not defined

/**
 * いちかどんが日本から東京支部を任されたとき
 */

const globalVariable = "焼き芋永年無料";

{
  // OUTERブロックスコープ
  const japan = "afternoonTeaTicket";
  {
    // INNERブロックスコープ
    const tokyo = "travelTicket";
    const tokyoMorning = "morningTeaTicket";
    console.log("fromTokyo:", japan);
    console.log("東京から焼き芋", globalVariable);
    console.log(tokyo);
  }
  console.log(japan);
  //   console.log(tokyoMorning);
}

{
  console.log(globalVariable);
}

function eatHeavyFood() {
  const askString = askFun();
  console.log("ーーーーーーーーー");
  console.log(globalVariable);
  alert(askString);
}
function askFun() {
  const question = "焼きいも食べる？";
  return question;
}

function decisionSpeedMeasurement() {
  const startTime = Date.now();
  eatHeavyFood();
  const endTime = Date.now();
  const time = endTime - startTime;
  console.log(`実行時間は${time}ミリ秒`);
  judge(time);
}

function judge(time) {
  if (time < 1000) {
    console.log("あなた合格！！");
  } else {
    console.log("食べる覚悟が足りない");
  }
}

function ichikaFunc() {
  var var_x;
  console.log(var_x);
  {
    var_x = "varのx";
    console.log(var_x);
  }
  console.log(var_x);
}

// 宣言後にそれぞれの変数を参照すると`undefined`となる
// console.log(let_x); // => undefined
// => undefined
// 宣言後に値を代入できる
// let let_x = "letのx";

function greet() {
  console.log("こんちか✨️✨️");
}

greet();

/**
 * クロージャーの練習コード
 * @returns {string}
 */
const yakiimoCounter = () => {
  let privateCount = 0;
  return function increment() {
    privateCount++;
    return `焼き芋食べるの${privateCount}回目`;
  };
};

const counter = yakiimoCounter();
// function counter() {
//   counter.privateCount = 0;
// }
// console.log("プロパティで参照できたかな？", counter.privateCount);

console.log(counter());
console.log(counter());
console.log(counter());
console.log(counter());
console.log(counter());
console.log(counter());
console.log(counter());
console.log(counter());
console.log(counter());
console.log(counter());

/**
 * 高階関数
 * 引数で渡した変数同士を比較する条件を柔軟に設定したい
 */

function yakiimoFighter(n) {
  return function (m) {
    return m > n;
  };
}

const yakiimoLover = yakiimoFighter(5);

console.log("6本食べた人", yakiimoLover(6));
console.log(yakiimoLover(5));
console.log(yakiimoLover(4));
console.log(yakiimoLover(10) ? "本物" : "偽物");

console.log(yakiimoLover(6) ? "本物" : "偽物");

/**
 * 関数オブジェクトのプロパティの練習コード
 */

function satsumaimoGrowingUp() {
  satsumaimoGrowingUp.count = satsumaimoGrowingUp.count + 1;
  return satsumaimoGrowingUp.count;
}
// 0スタートでさつまいもを育てる
satsumaimoGrowingUp.count = 0;
console.log(satsumaimoGrowingUp());

// 10本スタートでさつまいもを育てる
satsumaimoGrowingUp.count = 10;
console.log(satsumaimoGrowingUp());
