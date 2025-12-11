document.addEventListener("DOMContentLoaded", () => {
  const sortedEntries = sortEntries(loadEntries());
  renderTableFormStorage(sortedEntries);
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
    id: String(currentTime),
    date: dateElement.value,
    type: typeElement.value,
    minutes: Number(minutesElement.value),
    note: noteElement.value,
    time: currentTime,
  };
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
 * ローカルストレージにデータを追加する処理
 * @param {{id:number, date: string, type: string, minutes: number, note: string, time:number}} inputValue
 */
function setEntriesForStorage(entry) {
  const currentEntryArray = sortEntries(loadEntries());
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
    // console.log("インデックス0のデータ：", currentEntries[0]);
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
  renderTableFormStorage(sortEntries(loadEntries()));
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
  const entryArray = sortEntries(loadEntries());
  console.log("entryArray：", entryArray);

  // IDと一致しないデータが入っている
  // filteredArrayは削除したいデータ以外のデータの配列
  const filteredArray = entryArray.filter((entry) => {
    return deleteBtnId !== entry.id;
  });
  localStorage.setItem(ICHIKA_STORAGE_KEY, JSON.stringify(filteredArray));
  renderTableFormStorage(filteredArray);
}

tableBodyElement.addEventListener("click", handleDeleteBtn);

// データを降順に並べ替える

function sortEntries(rawEntries) {
  console.log(rawEntries);

  rawEntries.sort((a, b) => new Date(b.time) - new Date(a.time));
  localStorage.setItem(ICHIKA_STORAGE_KEY, JSON.stringify(rawEntries));
  return rawEntries;
}
