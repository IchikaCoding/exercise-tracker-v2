document.addEventListener("DOMContentLoaded", () => {
  renderTableFormStorage(loadEntries());
  loadDeleteButton();
});

/**
 * ローカルストレージキー
 */
const ICHIKA_STORAGE_KEY = "ichikaStorageKey";

const addButtonElement = document.getElementById("add-button");
const formElement = document.getElementById("form");
// console.log(addButtonElement);

/**
 * 入力フォームのデータを取得する
 */

const dateElement = document.getElementById("date");
const typeElement = document.getElementById("type");
const minutesElement = document.getElementById("minutes");
const noteElement = document.getElementById("note");
const tableBodyElement = document.getElementById("table-body");

/**
 * 入力データをオブジェクトの型として返すだけの処理
 * TODO バリデーションもここで追加する（minutes）
 * @returns {{id:number, date: string, type: string, minutes: number, note: string, time:number}}
 */

function buildEntryFromForm(event) {
  event.preventDefault();
  const currentTime = Date.now();
  const inputEntry = {
    id: currentTime,
    date: dateElement.value,
    type: typeElement.value,
    minutes: Number(minutesElement.value),
    note: noteElement.value,
    time: currentTime,
  };
  // console.log(inputEntry);
  return inputEntry;
}

/**
 * テーブルに追加する処理
 * エントリーを受け取って，それをテーブルのボディに追加
 * 配列からオブジェクトとしてデータをゲット→そのオブジェクトを表示する
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
              <button class="delete-button">削除</button>
            </td>
          </tr>`;
    // console.log(inputEntryHtml);
    entries = entries + inputEntryHtml;
    // console.log(entries);
  }
  tableBodyElement.innerHTML = entries;
}

/**
 * ローカルストレージにデータを追加する処理
 * @param {{id:number, date: string, type: string, minutes: number, note: string, time:number}} inputValue
 */
function setEntriesForStorage(entry) {
  const currentEntryArray = loadEntries();
  currentEntryArray.push(entry);
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
    return currentEntries;
  } else {
    return [];
  }
}

/**
 * ローカルストレージから引数としてデータ取得→表に描画する処理
 */
function renderTableFormStorage(entryArray) {
  addEntriesForTable(entryArray);
}

/**
 * フォームが送信されたときに発火するイベント
 * @param {Event} event
 */
function handleFormSubmit(event) {
  const entry = buildEntryFromForm(event);
  setEntriesForStorage(entry);
  renderTableFormStorage(loadEntries());
}

formElement.addEventListener("submit", handleFormSubmit);

/**
 * テストボタンが動くかテスト
 */

// function runTestAction() {
//   console.log("ちらっ");
// }

// function loadDeleteButton() {
//   const deleteButtonElement = document.querySelectorAll(".delete-button");
//   // deleteButtonElement.addEventListener("click", runTestAction);
//   console.log(deleteButtonElement[0]);
// }
