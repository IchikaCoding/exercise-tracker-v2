document.addEventListener("DOMContentLoaded", () => {
  setDate();
  const sortedEntries = sortEntries(loadEntries());
  renderTableFormStorage(sortedEntries);
});

/**
 * ローカルストレージキー
 */
const ICHIKA_STORAGE_KEY = "ichikaStorageKey";

const themeElement = document.getElementById("theme");
const htmlElement = document.getElementById("html");
const addButtonElement = document.getElementById("add-button");
const formElement = document.getElementById("form");
console.log(formElement);

/**
 * テーマ切り替えの処理
 */
function getTheme() {
  if (themeElement.checked) {
    return "dark";
  } else {
    return "light";
  }
}

function handleTheme(event) {
  event.preventDefault();
  const themeString = getTheme();
  htmlElement.setAttribute("data-bs-theme", themeString);
  // console.log("動いた");
}

themeElement.addEventListener("change", handleTheme);

/**
 * 入力フォームのデータを取得する
 */

const dateElement = document.getElementById("date");
const typeElement = document.getElementById("type");
const minutesElement = document.getElementById("minutes");
const noteElement = document.getElementById("note");
const tableBodyElement = document.getElementById("table-body");

const totalCountElement = document.getElementById("total-count");
console.log(totalCountElement);

/**
 * 入力データをオブジェクトの型として返すだけの処理
 * TODO バリデーションもここで追加する（minutes）
 * @returns {{id:number, date: string, type: string, minutes: number, note: string, time:number}}
 */

function buildEntryFromForm(event) {
  event.preventDefault();
  const validationObject = entryValidation(minutesElement);
  if (validationObject.hasError) {
    alert(validationObject.errorMessage);
    return "";
  }
  const currentTime = Date.now();
  const inputEntry = {
    id: String(currentTime),
    date: dateElement.value,
    type: typeElement.value,
    minutes: minutesElement.valueAsNumber,
    note: noteElement.value,
    time: currentTime,
  };
  // inputEntry = entryValidation(inputEntry);
  // console.log(inputEntry);
  return inputEntry;
}

// TODO 1時間とか文字を入力されたときにnullと表示されてしまう問題を解決する
/**
 * テーブルに追加する処理
 * エントリーを受け取って，それをテーブルのボディに追加
 * 配列からオブジェクトとしてデータをゲット→そのオブジェクトを表示する
 *
 */
function addEntriesForTable(entryArray) {
  let entries = ``;
  for (const entry of entryArray) {
    const inputEntryHtml = `<tr>
            <td>${entry.date}</td>
            <td>${entry.type}</td>
            <td>${entry.minutes}</td>
            <td>${entry.note}</td>
            <td>
              <button class="delete-button" data-id="${entry.id}">削除</button>
            </td>
          </tr>`;
    // console.log(inputEntryHtml);
    entries = entries + inputEntryHtml;
    // console.log(entries);
  }
  tableBodyElement.innerHTML = entries;
}

/**
 * 入力フォームの所要時間のバリデーション関数
 * 引数は入力データentry
 * 入力を正規化して結果とエラーを返す
 * @param {Element} entryMinutesElement
 * @return {{hasError: Boolean, errorMessage: string}}
 */
function entryValidation(entryMinutesElement) {
  // // データの正規化（replaceメソッドは文字列型に使える）
  // const entryMinutes = (entryMinutes ?? "").replace(/\s+/g, "");
  // エラーの表示
  // データ入力がなかったらデータ入力してね
  if (entryMinutesElement.value === "") {
    return { hasError: true, errorMessage: "データ入力してね" };
  }
  // 数字じゃなかったらエラー
  const entryMinutes = entryMinutesElement.valueAsNumber;
  if (Number.isNaN(entryMinutes)) {
    return { hasError: true, errorMessage: "数字を入力してね" };
  }
  // 0より小さかったらエラー
  if (entryMinutes < 0) {
    return { hasError: true, errorMessage: "0以上で入力してね" };
  }
  return { hasError: false, errorMessage: null };
}

/**
 * ローカルストレージにデータを追加する処理
 * @param {{id:number, date: string, type: string, minutes: number, note: string, time:number}} inputValue
 */
function setEntriesForStorage(entry) {
  const currentEntryArray = loadEntries();
  currentEntryArray.push(entry);
  sortEntries(currentEntryArray);
  localStorage.setItem(ICHIKA_STORAGE_KEY, JSON.stringify(currentEntryArray));
}

/**
 * ローカルストレージから保存したデータをゲット
 * TODO JSON.parse失敗時に空配列を返すtry-catchを入れる
 * @return {string[]} currentEntries
 */
function loadEntries() {
  const jsonEntries = localStorage.getItem(ICHIKA_STORAGE_KEY);
  if (jsonEntries) {
    const currentEntries = JSON.parse(jsonEntries);
    // console.log("インデックス0のデータ：", currentEntries[0]);
    return currentEntries;
  } else {
    return [];
  }
}

/**
 * 配列の数をカウントする関数
 * TODO totalCountElementの存在を確認する
 */
function countEntries() {
  const entries = loadEntries();
  const totalCount = entries.length;
  totalCountElement.textContent = `合計データ数：${totalCount}`;
}

/**
 * ローカルストレージから引数としてデータ取得→表に描画する処理
 */
function renderTableFormStorage(entryArray) {
  addEntriesForTable(entryArray);
  countEntries();
}

/**
 * 入力フォームのリセット関数
 */
function clearForm() {
  dateElement.value = "";
  typeElement.value = "";
  minutesElement.value = "";
  noteElement.value = "";
}

/**
 * フォームが送信されたときに発火するイベント
 * @param {Event} event
 */
function handleFormSubmit(event) {
  const entry = buildEntryFromForm(event);
  if (!entry) {
    return;
  }
  console.log("entryを表示：", entry);
  setEntriesForStorage(entry);
  // const sortedEntryArray = sortEntries(loadEntries());
  renderTableFormStorage(loadEntries());
  clearForm();
}

formElement.addEventListener("submit", handleFormSubmit);

/**
 * テストボタンが動くかテスト
 */

// function runTestAction() {
//   console.log("ちらっ");
// }

/**
 * テーブルのデータとIDで紐づいている削除ボタンの要素を取得
 */
// function loadDeleteButton() {
//   const deleteButtonElement = document.querySelectorAll("[data-id]");
//   // deleteButtonElement.addEventListener("click", runTestAction);
//   deleteButtonElement.forEach((deleteButton) => {
//     console.log(deleteButton.dataset.id);
//   });
// }

// 動作確認処理→ボタン押したらそのIDのデータゲット
// もしデータ属性のIDとローカルストレージのデータのIDが一致したら

/**
 * TODO この処理を関数分割するほうがいいのかどうか？
 * @param {Event} event
 */
function handleDeleteBtn(event) {
  const deleteButtonElement = event.target.closest(".delete-button");
  console.log(deleteButtonElement);
  // deleteBtnId はstring型
  const deleteBtnId = deleteButtonElement.dataset.id;
  console.log(deleteBtnId);
  // ローカルストレージに格納されている配列を取得
  const entryArray = loadEntries();
  console.log("entryArray：", entryArray);

  // IDと一致しないデータが入っている
  // filteredArrayは削除したいデータ以外のデータの配列
  const filteredArray = entryArray.filter((entry) => {
    return deleteBtnId !== entry.id;
  });
  const sortedArray = sortEntries(filteredArray);
  localStorage.setItem(ICHIKA_STORAGE_KEY, JSON.stringify(sortedArray));
  renderTableFormStorage(sortedArray);
}

tableBodyElement.addEventListener("click", handleDeleteBtn);

/**
 * 降順にソートする関数
 * @param {number []} rawEntries
 * @returns {number []} rawEntries
 */
function sortEntries(rawEntries) {
  console.log(rawEntries);
  rawEntries.sort((a, b) => {
    if (a.date === b.date) {
      return b.time - a.time;
    }
    return a.date < b.date ? 1 : -1;
  });
  return rawEntries;
}

/**
 * インデックスが22のデータを削除するためだけの関数
 */
function deleteItemFunc() {
  let entryArray = loadEntries();
  entryArray.splice(22, 1);
  localStorage.setItem(ICHIKA_STORAGE_KEY, JSON.stringify(entryArray));
}

/**
 * 自動で日付を取得する処理
 * @returns {string} todayString
 */

function setDate() {
  const today = new Date();
  const todayString = today.toISOString().slice(0, 10);
  dateElement.value = todayString;
}
