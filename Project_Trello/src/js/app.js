import {
  handleSubmitForm,
  handleClickRemoveButton,
  handleChangeElement,
  handleDeleteAllButton,
  handleClickEditButton,
  handleSubmitEditForm,
} from './handlers.js';
import { render, $ } from './helpers.js';
import { data } from './data.js';

function clock() {
  const date = new Date();
  const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  const minutes =
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  document.querySelector('.clock').innerHTML = hours + ':' + minutes;
}
setInterval(clock, 1000);

if (data.length) {
  render(data);
}

// const
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

const editModalConfirmButtonElement = $('.edit-todo__button');

const editFormElement = $('.edit-form');

// Вызов модального окна кнопкой add
openModalElement.addEventListener('click', () => {
  createTodoModalElement.show();
});

// Добавление карточки

addTodoButtonElement.addEventListener('click', handleSubmitForm);

// Удалить карточку

todosWrapperElement.addEventListener('click', handleClickRemoveButton);

// Перемещение карточки в зависимоси от статуса

todosWrapperElement.addEventListener('change', handleChangeElement);

// Удаление всех карточек кнопкой delete all

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

todosWrapperElement.addEventListener('click', handleClickEditButton);

editFormElement.addEventListener('submit', handleSubmitEditForm);

export {
  createModalTitleInputElement,
  createModalDescriptionInputElement,
  createModalUserNameElement,
  editModalTitleInputElement,
  editModalDescriptionElement,
  editModalUserNameElement,
  editTodoModalElement,
  editModalConfirmButtonElement,
  editFormElement,
};
