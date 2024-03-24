import { buildTemplate } from './templates.js';
import { data } from './data.js';

function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return [...document.querySelectorAll(selector)];
}

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

function setDataToStorage(data) {
  localStorage.setItem('data', JSON.stringify(data));
}

function render(data) {
  resetColumns();

  data.forEach((todo) => {
    const template = buildTemplate(todo);
    const containerElement = $(`#${todo.status}`);

    containerElement.insertAdjacentHTML('beforeend', template);
  });

  todoCounters();
}

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

export { getDataFromStorage, setDataToStorage, render, $ };
