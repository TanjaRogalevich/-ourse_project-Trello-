import { Todo } from './models.js';
import { data } from './data.js';
import { setDataToStorage, render, $ } from './helpers.js';
import {
  createModalTitleInputElement,
  createModalDescriptionInputElement,
  createModalUserNameElement,
  editModalTitleInputElement,
  editModalDescriptionElement,
  editModalUserNameElement,
  editTodoModalElement,
  editFormElement,
} from './app.js';

// Добавление карточки

function handleSubmitForm(event) {
  event.preventDefault();

  const title = createModalTitleInputElement.value;
  const description = createModalDescriptionInputElement.value;
  const userName = createModalUserNameElement.value;

  const newTodo = new Todo(title, description, userName);
  const formElement = $('.create-form');

  data.push(newTodo);

  setDataToStorage(data);
  formElement.reset();
  render(data);
}

// Удалить карточку

function handleClickRemoveButton({ target }) {
  const { role } = target.dataset;
  if (role !== 'remove') return;

  const rootElement = target.closest('.todo__card');
  const { id } = rootElement.dataset;

  const index = data.findIndex((todo) => todo.id == id);
  data.splice(index, 1);

  setDataToStorage(data);
  render(data);
}

// Перемещение карточки в зависимоси от статуса

function handleChangeElement({ target }) {
  const { role } = target.dataset;
  if (role !== 'status') return;

  const rootElement = target.closest('.todo__card');
  const { id } = rootElement.dataset;

  const currentCard = data.find((todo) => todo.id == id);
  const selectElement = target.closest('.card__status');

  // Проверка alert
  
  let inProgress = 0;
  data.forEach((todo) => {
    if (todo.status == 'in-progress') {
      inProgress += 1;
    }
  });

  if (inProgress >= 6 && selectElement.value == 'in-progress') {
    alert('Выполните оставшиеся задачи, чтобы добавить новую');
    render(data);
    return;
  }
  currentCard.status = selectElement.value;

  setDataToStorage(data);
  render(data);
}

// Удаление всех карточек кнопкой delete all

function handleDeleteAllButton() {
  const deleteConfirm = confirm('Вы уверены, что хотите удалить?');

  if (deleteConfirm == true) {
    const newArray = data.filter((todo) => todo.status !== 'done');
    data.length = 0;
    newArray.forEach((todo) => data.push(todo));
  }

  setDataToStorage(data);
  render(data);
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

  setDataToStorage(data);
  render(data);
}

function handleSubmitEditForm(event) {
  event.preventDefault();

  const dataId = editFormElement.getAttribute('data-id');
  const currentTodoCard = data.find((todo) => todo.id == dataId);

  currentTodoCard.title = editModalTitleInputElement.value;
  currentTodoCard.description = editModalDescriptionElement.value;
  currentTodoCard.userName = editModalUserNameElement.value;

  setDataToStorage(data);
  render(data);
}

export {
  handleSubmitForm,
  handleClickRemoveButton,
  handleChangeElement,
  handleDeleteAllButton,
  handleClickEditButton,
  handleSubmitEditForm,
};