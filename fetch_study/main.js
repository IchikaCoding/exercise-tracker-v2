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

async function getDog() {
  console.log("🐶 犬の画像を取りに行きます...");
  const response = await fetch("https://dog.ceo/api/breeds/image/random");
  console.log(response);
  console.time("測定！");
  const data = await response.json();
  console.timeEnd("測定！");

  console.log(data);
  console.log(typeof data);
}

getDog();
// TODO 以下のコードも検討リスト追加
const getImg = await fetch(data.message);
const blob = await getImg.blob();
const url = URL.createObjectURL(blob);
