import { Modal, Dropdown } from 'bootstrap';

function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return [...document.querySelectorAll(selector)];
}

function clock() {
  const date = new Date();
  const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  const minutes =
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  document.querySelector('.clock').innerHTML = hours + ':' + minutes;
}
setInterval(clock, 1000);

const createTodoModalElement = new Modal('#create-todo__modal', {
  keyboard: false,
});

const editTodoModalElement = new Modal('#edit-todo__modal', {
  keyboard: false,
});

const openModalElement = $('.add-card-btn');
const editTodoButtonElement = $('.edit-btn');
const addTodoButtonElement = $('.create-todo__button');

const createModalTitleInputElement = $('#new-title-input');
const createModalDescriptionInputElement = $('#new-description-input');
const createModalUserNameElement = $('.create-users__select');

const editModalTitleInputElement = $('#edit-title-input');
const editModalDescriptionElement = $('#edit-description-input');
const editModalUserNameElement = $('.edit-users__select');

const todosWrapperElement = $('.todos__wrapper');

const deleteAllButtonElement = $('.clear-all-btn');

const editFormElement = $('.edit-form');

// Вызов модального окна кнопкой add
openModalElement.addEventListener('click', () => {
  createTodoModalElement.show();
});

function getDataFromStorage() {
  const data = localStorage.getItem('data');

  if (data) {
    const dataFromStorage = JSON.parse(data);

    return dataFromStorage.map((todo) => {
      todo.createdAt = new Date(todo.createdAt);
      return todo;
    });
  } else {
    return [];
  }
}

function setDataToStorage() {
  localStorage.setItem('data', JSON.stringify(data));
}

const data = getDataFromStorage();

if (data.length) {
  render();
}

function render() {
  resetColumns();
  // let html = "";

  data.forEach((todo) => {
    const template = buildTemplate(todo);
    const containerElement = $(`#${todo.status}`);

    containerElement.insertAdjacentHTML('beforeend', template);
  });

  // data.forEach((todo) => {
  //   const template = buildTemplate(todo);
  //   html += template;
  // });

  // const todoElement = $("#todo");
  // todoElement.innerHTML = html;
  todoCounters();
}

// Объект карточки

// function createTodo(title, description, userName) {
//   const todo = {
//     id: Date.now(),
//     title,
//     description,
//     createdAt: new Date(),
//     status: "todo",
//     userName,
//   };

//   return todo;
// }

class Todo {
  constructor(title, description, userName) {
    this.id = Date.now();
    this.title = title;
    this.description = description;
    this.createdAt = new Date();
    this.status = 'todo';
    this.userName = userName;
  }

  show() {
    this.styles.display = 'block';
  }

  hide() {
    this.styles.display = 'none';
  }
}

function buildTemplate({
  id,
  title,
  description,
  createdAt,
  userName,
  status,
}) {
  const time = `${createdAt.getDate().toString().padStart(2, '0')}.${(
    createdAt.getMonth() + 1
  )
    .toString()
    .padStart(2, '0')}.${createdAt.getFullYear()}  ${createdAt
    .getHours()
    .toString()
    .padStart(2, '0')}:${createdAt
    .getMinutes()
    .toString()
    .padStart(2, '0')}:${createdAt.getSeconds().toString().padStart(2, '0')}`;

  return `
    <div class="todo__card" data-id="${id}">
      <span class="card__title">${title}</span>
      <span class="card__description">${description}</span>
      <span class="card__user-name">${userName}</span>
      <select class="card__status" data-role="status">
        <option value="todo" ${status == 'todo' ? 'selected' : ''}>Todo</option>
        <option value="in-progress" ${
          status == 'in-progress' ? 'selected' : ''
        }>In Progress</option>
        <option value="done" ${status == 'done' ? 'selected' : ''}>Done</option>
      </select>
      <div class="card__options">
        <span class="card__date">${time}</span>
        <div class="card__buttons">
          <button class="edit-btn" data-role="edit">Edit</button>
          <button class="delete-btn" data-role="remove">Delete</button>
        </div>
      </div>
    </div>
  `;
}

// Добавление карточки

addTodoButtonElement.addEventListener('click', handleSubmitForm);

function handleSubmitForm(event) {
  event.preventDefault();

  const title = createModalTitleInputElement.value;
  const description = createModalDescriptionInputElement.value;
  const userName = createModalUserNameElement.value;

  const newTodo = new Todo(title, description, userName);
  const formElement = $('.create-form');

  data.push(newTodo);

  setDataToStorage();
  formElement.reset();
  render();
}

// Удалить карточку

function handleClickRemoveButton({ target }) {
  const { role } = target.dataset;

  if (role !== 'remove') return;

  const rootElement = target.closest('.todo__card');
  const { id } = rootElement.dataset;

  const index = data.findIndex((todo) => todo.id == id);

  data.splice(index, 1);

  setDataToStorage();
  render();
}

todosWrapperElement.addEventListener('click', handleClickRemoveButton);

// Счетчик карточек

function todoCounters() {
  const counterTodoElement = $('#todo-counter');
  const counterInProgressElement = $('#in-progress-counter');
  const counterDoneElement = $('#done-counter');

  let todoCounter = 0;
  let inProgressCounter = 0;
  let doneCounter = 0;

  data.forEach((todo) => {
    if (todo.status == 'todo') {
      todoCounter += 1;
    } else if (todo.status == 'in-progress') {
      inProgressCounter += 1;
    } else if (todo.status == 'done') {
      doneCounter += 1;
    }
  });

  counterTodoElement.textContent = todoCounter;
  counterInProgressElement.textContent = inProgressCounter;
  counterDoneElement.textContent = doneCounter;
}

// Очиста от карточек в каждой колонке

function resetColumns() {
  const todoContainerElement = $('#todo');
  const inProgressContainerElement = $('#in-progress');
  const doneContainerElement = $('#done');

  todoContainerElement.innerHTML = '';
  inProgressContainerElement.innerHTML = '';
  doneContainerElement.innerHTML = '';
}

// Перемещение карточки в зависимоси от статуса

function handleChangeElement({ target }) {
  const { role } = target.dataset;
  if (role !== 'status') return;

  const rootElement = target.closest('.todo__card');
  const { id } = rootElement.dataset;

  const currentCard = data.find((todo) => todo.id == id);

  const selectElement = target.closest('.card__status');

  let inProgress = 0;

  data.forEach((todo) => {
    if (todo.status == 'in-progress') {
      inProgress += 1;
    }
  });

  if (inProgress >= 6 && selectElement.value == 'in-progress') {
    alert('Выполните оставшиеся задачи, чтобы добавить новую');
    render();
    return;
  }

  currentCard.status = selectElement.value;

  setDataToStorage();
  render();
}

function handleClickRemoveButton({ target }) {
  const { role } = target.dataset;

  if (role !== 'remove') return;

  const rootElement = target.closest('.todo__card');
  const { id } = rootElement.dataset;

  const index = data.findIndex((todo) => todo.id == id);

  data.splice(index, 1);

  setDataToStorage();
  render();
}

todosWrapperElement.addEventListener('change', handleChangeElement);

// Удаление всех карточек кнопкой delete all

function handleDeleteAllButton() {
  const deleteConfirm = confirm('Вы уверены, что хотите удалить?');

  if (deleteConfirm == true) {
    const newArray = data.filter((todo) => todo.status !== 'done');
    data.length = 0;
    newArray.forEach((todo) => data.push(todo));
  }

  setDataToStorage();
  render();
}

deleteAllButtonElement.addEventListener('click', handleDeleteAllButton);

// Подключение пользователей

fetch('https://jsonplaceholder.typicode.com/users')
  .then((response) => response.json())
  .then((users) => {
    renderUserName(users);
  })
  .catch(() => {
    console.log('Что-то пошло не так');
  });

function buildTemplateUsersName({ name }) {
  return `
    <option value="${name}">${name}</option>
    `;
}

function renderUserName(users) {
  let html = '';

  users.forEach((user) => {
    const template = buildTemplateUsersName(user);
    html += template;
  });

  const selectUsersNameElement = $('.create-users__select');
  const selectEditUsersNameElement = $('.edit-users__select');

  selectUsersNameElement.insertAdjacentHTML('beforeend', html);
  selectEditUsersNameElement.insertAdjacentHTML('beforeend', html);
}

// Кнопка Edit

function handleClickEditButton({ target }) {
  const { role } = target.dataset;

  if (role !== 'edit') return;

  editTodoModalElement.show();

  const rootElement = target.closest('.todo__card');
  const { id } = rootElement.dataset;

  const todoCard = data.find((todo) => todo.id == id);

  editFormElement.setAttribute('data-id', `${id}`);

  editModalTitleInputElement.value = todoCard.title;
  editModalDescriptionElement.value = todoCard.description;
  editModalUserNameElement.value = todoCard.userName;

  setDataToStorage();
  render();
}

todosWrapperElement.addEventListener('click', handleClickEditButton);

function handleSubmitEditForm(event) {
  event.preventDefault();

  const dataId = editFormElement.getAttribute('data-id');
  console.log(dataId);

  const currentTodoCard = data.find((todo) => todo.id == dataId);
  console.log(currentTodoCard);

  currentTodoCard.title = editModalTitleInputElement.value;
  currentTodoCard.description = editModalDescriptionElement.value;
  currentTodoCard.userName = editModalUserNameElement.value;

  setDataToStorage();
  render();
}

editFormElement.addEventListener('submit', handleSubmitEditForm);
