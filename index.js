import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDmyj3Ne6KMwDhxo_gNy-a9twR93RRzrdA",
  authDomain: "playground-6712e.firebaseapp.com",
  databaseURL: "https://playground-6712e-default-rtdb.firebaseio.com",
  projectId: "playground-6712e",
  storageBucket: "playground-6712e.appspot.com",
  messagingSenderId: "375698542211",
  appId: "1:375698542211:web:cd6651435add0a70a495b6",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const listItems = ref(database, "items");
////////////////// DATA BASE CONFIG ^^^^^

///////////////////Main To-DO LIST
const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const toDoListEl = document.getElementById("todo-list");

onValue(listItems, function (snapshot) {
  let listItemsArray = Object.values(snapshot.val());
  for (let i = 0; i < listItemsArray.length; i++) {
    appendItemToToDoListEl(listItemsArray[i]);
  }
  clearOldList();
});

addButtonEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value;
  push(listItems, inputValue);

  appendItemToToDoListEl(inputValue);

  clearInputFieldEl();
  push(secondListItems, inputValue);
  console.log(`${inputValue} added to database`);
});

function clearOldList() {
  appendItemToToDoListEl.innerHTML = "";
}
function clearInputFieldEl() {
  inputFieldEl.value = "";
}

function appendItemToToDoListEl(itemValue) {
  toDoListEl.innerHTML += `<li>${itemValue}</li>`;
}
