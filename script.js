/**
 * ローカルストレージキー
 */
const ICHIKA_STORAGE_KEY = "ichikaStrageKey";

const addButtonElement = document.getElementById("add-button");
const formElement = document.getElementById("form");
/**
 * 入力フォームのデータを取得する
 */

const dateElement = document.getElementById("date");
const typeElement = document.getElementById("type");
const minutesElement = document.getElementById("minutes");
const noteElement = document.getElementById("note");
const tableDateElement = document.getElementById("table-data");

/**
 * 入力値を一つのデータとして処理できるようにする
 * @returns {{id:number, date: string, type: string, minutes: number, note: string, time:number}}
 */

function getFormElementValue(event) {
  event.preventDefault();
  const currentTime = Date.now();
  const inputValue = {
    id: currentTime,
    date: dateElement.value,
    type: typeElement.value,
    minutes: minutesElement.value,
    note: noteElement.value,
    time: currentTime,
  };
  addEntriesForTable(inputValue);

  console.log(inputValue);
  return inputValue;
}

/**
 * テーブルに追加する処理
 * エントリーを受け取って，それをテーブルのボディに追加
 */
function addEntriesForTable(inputValue) {
  const entries = `<tr>
            <td>${inputValue.date}</td>
            <td>${inputValue.type}</td>
            <td>${inputValue.minutes}</td>
            <td>${inputValue.note}</td>
          </tr>`;
  tableDateElement.innerHTML = tableDateElement.innerHTML + entries;
  setEntriesForStorage(inputValue);
}

/**
 * ローカルストレージにデータを追加する処理
 * @param {{id:number, date: string, type: string, minutes: number, note: string, time:number}} inputValue
 */
function setEntriesForStorage(inputValue) {
  const currentEntryArray = getEntriesFromStorage();
  currentEntryArray.push(inputValue);
  localStorage.setItem(ICHIKA_STORAGE_KEY, JSON.stringify(currentEntryArray));
}

/**
 * ローカルストレージから保存したデータをゲット
 * @return {string[]} currentEntries
 */
function getEntriesFromStorage() {
  const JsonEntries = localStorage.getItem(ICHIKA_STORAGE_KEY);
  const currentEntries = JSON.parse(JsonEntries);
  return currentEntries;
}

formElement.addEventListener("submit", getFormElementValue);
