document.addEventListener("DOMContentLoaded", () => {
  setDateFromBrowser();
  const sortedEntries = sortEntries(loadEntries());
  renderTableFormStorage(sortedEntries);
  renderTheme();
});

/**
 * ローカルストレージキー
 */
const ICHIKA_STORAGE_KEY = "ichikaStorageKey";
const THEME_STORAGE_KEY = "themeStorageKey";

const themeElement = document.getElementById("theme");
const htmlElement = document.getElementById("html");
const addButtonElement = document.getElementById("add-button");
const formElement = document.getElementById("form");
console.log(formElement);
const filterDateElement = document.getElementById("filter-date");
const filterResetButtonElement = document.getElementById("filter-reset-button");

/**
 * ローカルストレージの文字列に合わせてテーマのチェックボックスを変更する処理
 */
// function renderTheme() {
//   const nextTheme = themeElement.checked === true ? "dark" : "light";

//   const currentTheme = loadThemeFromStorage();
//   if (currentTheme === "dark") {
//     themeElement.checked = true;
//   } else {
//     themeElement.checked = false;
//   }
//   // if (themeElement.checked) {
//   //   return "dark";
//   // } else {
//   //   return "light";
//   // }
// }

/**
 * ローカルストレージに選択されたテーマを保存する処理
 */
function setThemeForStorage() {
  // チェックボックスの状態を確認するコード
  const nextTheme = syncCheckBoxToHtmlTheme();
  localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  console.log({ nextTheme });
}

/**
 * HTMLのテーマを変えるだけの処理
 */
function syncCheckBoxToHtmlTheme() {
  // チェックボックスの状態を確認するコード
  const nextTheme = themeElement.checked === true ? "dark" : "light";
  // テーマ設定の切り替えコード
  htmlElement.setAttribute("data-bs-theme", nextTheme);
  console.log(nextTheme);
  return nextTheme;
}

function loadThemeFromStorage() {
  const currentTheme = localStorage.getItem(THEME_STORAGE_KEY);
  console.log(currentTheme);
  return currentTheme;
}

/**
 * ローカルストレージからデータを取得→HTMLのテーマを変更
 */
function renderTheme() {
  const currentTheme = loadThemeFromStorage();
  const validationTheme = currentTheme === "light" ? "light" : "dark";
  if (!currentTheme) {
    localStorage.setItem(THEME_STORAGE_KEY, validationTheme);
  }
  // これ大事！これがないとチェックボックスのチェックがリロードするたびに消えちゃう！
  themeElement.checked = validationTheme === "dark";
  htmlElement.setAttribute("data-bs-theme", validationTheme);
}

/**
 * チェックが変更されたら，ローカルストレージのデータを変更
 */
function handleTheme() {
  setThemeForStorage();
  // const themeString = loadThemeFromStorage();
  // console.log(themeString);
  // renderTheme();
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

// /**
//  * UTCの日付からJSTに変換する
//  * 自動で日付を取得する処理
//  * @returns {string} todayString
//  */

// function setDate() {
//   const today = new Date();
//   // Intl.DateTimeFormatOptionsの中にある表示形式の選択肢
//   const options = {
//     // weekday: "long",
//     year: "numeric",
//     month: "2-digit",
//     day: "2-digit",
//     // hour: "2-digit",
//     // minute: "2-digit",
//   };
//   const jstString = today
//     .toLocaleDateString(undefined, options)
//     .replaceAll("/", "-");
//   console.log(jstString);
//   dateElement.value = jstString;
// }

/**
 * ブラウザの時間をそのまま自動取得するコード
 */
function setDateFromBrowser() {
  const today = new Date();
  // 年を取る
  const todayYear = today.getFullYear();
  // 月を取る
  const todayMonth = today.getMonth() + 1;
  // 日を取る
  const todayDate = today.getDate();
  // ハイフンでくっつける
  const hyphenatedDate = `${todayYear}-${todayMonth}-${todayDate}`;
  dateElement.value = hyphenatedDate;
  console.log(hyphenatedDate);
}

/**
 * 指定した日付でフィルターした結果をコンソールに返す処理
 * @returns {[{id:number, date: string, type: string, minutes: number, note: string, time:number}{id:number, date: string, type: string, minutes: number, note: string, time:number}]}
 */
function getFilterDate() {
  // フィルターが指定した日時
  const filterDateValue = filterDateElement.value;
  // 全部の配列
  const entryArray = loadEntries();
  console.log(entryArray);
  const filterArray = entryArray.filter(
    (entry) => entry.date === filterDateValue
  );
  return filterArray;
}

/**
 * フィルターの解除ボタンの処理
 * @param {Event} event
 */
function handleFilterResetBtn(event) {
  event.preventDefault();
  filterDateElement.value = "";
}

filterResetButtonElement.addEventListener("click", handleFilterResetBtn);
