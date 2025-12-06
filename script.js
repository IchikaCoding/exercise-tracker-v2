document.addEventListener("DOMContentLoaded", renderTableFormStorage);

/**
 * ローカルストレージキー
 */
const ICHIKA_STORAGE_KEY = "ichikaStorageKey";

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
 * 入力データをオブジェクトの型として返す処理
 * TODO この処理，詐欺っぽいらしい
 * @returns {{id:number, date: string, type: string, minutes: number, note: string, time:number}}
 */

function handleFormSubmit(event) {
  event.preventDefault();
  const currentTime = Date.now();
  const inputValue = {
    id: currentTime,
    date: dateElement.value,
    type: typeElement.value,
    minutes: Number(minutesElement.value),
    note: noteElement.value,
    time: currentTime,
  };
  setEntriesForStorage(inputValue);
  addEntriesForTable(getEntriesFromStorage());
  console.log(inputValue);
  return inputValue;
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
          </tr>`;
    console.log(inputEntryHtml);
    entries = entries + inputEntryHtml;
    console.log(entries);
  }
  tableDateElement.innerHTML = entries;
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
  if (JsonEntries) {
    const currentEntries = JSON.parse(JsonEntries);
    return currentEntries;
  } else {
    return [];
  }
}

function renderTableFormStorage() {
  addEntriesForTable(getEntriesFromStorage());
}

formElement.addEventListener("submit", handleFormSubmit);
