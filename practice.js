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
