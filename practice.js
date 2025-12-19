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

/**
 * try...catch構文の練習コード1
 */
try {
  console.log("さつまいも1個目tryブロック");
  undefinedFunc();
} catch (error) {
  console.log("さつまいも2個目キャッチ節");
  console.log(error instanceof ReferenceError);
  console.log(error.message);
} finally {
  console.log("さつまいもを石焼き芋にしてくれるチケット（永年無料券）");
}

try {
  undefinedFunc();
} finally {
  console.log("いちごのクレープ（パリパリ）");
}

console.log("さつまいも100個");

try {
  undefinedFunc();
} catch {
  console.log("焼き芋5個あるのに残念だな～！！！");
}

try {
  undefinedFunc();
  console.log("えへへ");
} catch (error) {
  console.error(error);
}

try {
  // 例外としてオブジェクトを投げた→error識別子へとわたる
  throw new Error("ドーナツは0の形をしているから0キロカロリー！！！！！");
} catch (error) {
  // error識別子はtryブロックの例外を受け止めてくれている
  console.log(error.message);
}

function getSweetPotato(num) {
  if (num < 2) {
    throw new Error(`さつまいも${num}個なんていちかぱーんち👊`);
  }
}

try {
  getSweetPotato(3);
} catch (error) {
  console.log(error instanceof Error);
  console.log(error.message);
}

try {
  console.log(x);
} catch (error) {
  console.log(error instanceof ReferenceError);
  console.log(error.name);
  console.log(error.message);
}

function reverseName(str) {
  if (typeof str !== "string") {
    throw new TypeError(`${str}はStringではありません！`);
  }
  return Array.from(str).reverse().join("");
}

try {
  reverseName("やきいも");
} catch (error) {
  console.log(error instanceof TypeError);
  console.log(error.name);
  console.log(error.message);
}

function sailorMoon() {
  console.error("ぽちっとな！");
  console.error("月に変わってお仕置きよ🌙");
  console.error("逃げちゃダメだ　逃げちゃダメだ　逃げちゃダメだ");
  console.log("こんちか");
}
/**
 * エラーオブジェクトが失われちゃう例
 */
function punishYouOnTheMoon() {
  throw new Error("月に変わってお仕置きよ🌙");
}

try {
  punishYouOnTheMoon();
} catch (error) {
  throw new Error("punishYouOnTheMoonでエラーが発生！アンパーンチ！");
}

function safeParseInt(numStr) {
  const num = Number.parseInt(numStr, 10);
  console.log(num);
  if (Number.isNaN(num)) {
    throw new Error(`${numStr} is not a numeric`);
  }
  return num;
}

function sumNumString(a, b) {
  try {
    const ichigoNum = safeParseInt(a);
    console.log({ ichigoNum });
    const yakkimoNum = safeParseInt(b);
    console.log({ yakkimoNum });
    return ichigoNum + yakkimoNum;
  } catch (error) {
    throw new Error("いちごと焼き芋を数えるのを失敗した", { cause: error });
  }
}

try {
  sumNumString("ichigoText", "yakkimoBox");
} catch (error) {
  console.error("失敗");
  console.error(error);
}

/**
 *
 * @param {number} strawberries
 */
function placeStrawberry(strawberries) {
  try {
    if (!strawberries) {
      throw new Error(`いちごがありません😭😭`);
    }
    console.log(`${strawberries}個のいちごがあります🍓`);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function eatStrawberry() {
  try {
    placeStrawberry(0);
  } catch (error) {
    console.error("誠に遺憾です😡");
  } finally {
    console.log("バイト終了🍰");
  }
}
