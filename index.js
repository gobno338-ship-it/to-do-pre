let items = [
  "Сделать проектную работу",
  "Полить цветы",
  "Пройти туториал по Реакту",
  "Сделать фронт для своего проекта",
  "Прогуляться по улице в солнечный день",
  "Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");
const itemTemplate = document.querySelector("#to-do__item-template").content;
const storageKey = "toDoItems";

function loadTasks() {
  const savedTasks = localStorage.getItem(storageKey);

  if (savedTasks) {
    return JSON.parse(savedTasks);
  }

  return items;
}

function createItem(item) {
  const clone = itemTemplate.querySelector(".to-do__item").cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  const editButton = clone.querySelector(".to-do__item-button_type_edit");

  textElement.textContent = item;
  textElement.setAttribute("contenteditable", "false");

  deleteButton.addEventListener("click", () => {
    clone.remove();
    items = getTasksFromDOM();
    saveTasks(items);
  });

  duplicateButton.addEventListener("click", () => {
    const itemName = textElement.textContent;
    const newItem = createItem(itemName);

    listElement.prepend(newItem);

    items = getTasksFromDOM();
    saveTasks(items);
  });

  editButton.addEventListener("click", () => {
    textElement.setAttribute("contenteditable", "true");
    textElement.focus();
  });

  textElement.addEventListener("blur", () => {
    textElement.textContent = textElement.textContent.trim();
    textElement.setAttribute("contenteditable", "false");
    items = getTasksFromDOM();
    saveTasks(items);
  });

  return clone;
}

function getTasksFromDOM() {
  const itemsNamesElements = document.querySelectorAll(".to-do__item-text");
  const tasks = [];

  itemsNamesElements.forEach((itemNameElement) => {
    tasks.push(itemNameElement.textContent.trim());
  });

  return tasks;
}

function saveTasks(tasks) {
  localStorage.setItem(storageKey, JSON.stringify(tasks));
}

items = loadTasks();

items.forEach((item) => {
  const listItem = createItem(item);
  listElement.append(listItem);
});

formElement.addEventListener("submit", (event) => {
  event.preventDefault();

  const item = inputElement.value.trim();

  if (!item) {
    inputElement.focus();
    return;
  }

  const listItem = createItem(item);
  listElement.prepend(listItem);

  items = getTasksFromDOM();
  saveTasks(items);
  inputElement.value = "";
});
