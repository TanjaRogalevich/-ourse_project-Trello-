import { Modal, Dropdown } from "bootstrap";

function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return [...document.querySelectorAll(selector)];
}

function clock() {
  const date = new Date();
  const hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  const minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  document.querySelector(".clock").innerHTML = hours + ":" + minutes;
}
setInterval(clock, 1000);

const createTodoModalElement = new Modal("#create-todo__modal", {
  keyboard: false,
});
const addTodoButtonElement = $(".add-card-btn");

addTodoButtonElement.addEventListener("click", () => {
  createTodoModalElement.show();
});

// const addCardBtn = document.querySelector(".add-card-btn");
// const modal = document.getElementById("modal");
// const closeModalBtn = document.querySelector(".btn-close");
// const addTaskBtn = document.getElementById("addTaskBtn");
// const todoList = document.getElementById("todo");
// const inProgressList = document.getElementById("inProgress");
// const doneList = document.getElementById("done");
// const date = new Date();
// const actualDate = `${date.getDate().toString().padStart(2, "0")}.${(
//   date.getMonth() + 1
// )
//   .toString()
//   .padStart(2, "0")}.${date.getFullYear()}`;
// const wrapperCardElement = document.querySelector(".wrapper-card");

// function openModal() {
//   modal.style.display = "block";
// }

// addCardBtn.addEventListener("click", openModal);

// function closeModal() {
//   modal.style.display = "none";
// }

// closeModalBtn.addEventListener("click", closeModal);

// function createTaskCard(taskInput) {
//   const taskCard = document.createElement("div");
//   taskCard.classList.add("card");
//   taskCard.innerHTML = `
//         <p>${taskInput}</p>
//         <select class="statusSelect">
//             <option value="todo">To Do</option>
//             <option value="inProgress">In Progress</option>
//             <option value="done">Done</option>
//         </select>
//         <p> ${actualDate}</p>
//         <button class="edit-btn">Edit</button>
//         <button class="delete-btn">Delete</button>
//     `;

//   taskCard.querySelector(".edit-btn").addEventListener("click", () => {
//     const modal1 = document.getElementById("modal1");
//     modal1.style.display = "block";

//     const confirmBtn = document.getElementById("confirmBtn");
//     confirmBtn.addEventListener("click", () => {
//       const newText = document.getElementById("newTaskInput").value;
//       if (newText.trim() !== "") {
//         taskCard.querySelector("p").textContent = newText;
//       }
//       modal1.style.display = "none";
//     });

//     const closeButton = modal1.querySelector(".btn-close");
//     closeButton.addEventListener("click", () => {
//       modal1.style.display = "none";
//     });
//   });

//   taskCard.querySelector(".delete-btn").addEventListener("click", () => {
//     taskCard.remove();
//   });

//   function changeCardColor() {
//     const selectedStatus = taskCard.querySelector(".statusSelect").value;
//     switch (selectedStatus) {
//       case "inProgress":
//         taskCard.style.backgroundColor = "yellow";
//         break;
//       case "done":
//         taskCard.style.backgroundColor = "green";
//         break;
//     }
//   }

//   taskCard.querySelector(".statusSelect").addEventListener("change", () => {
//     const selectedStatus = taskCard.querySelector(".statusSelect").value;
//     const targetList = getTargetList(selectedStatus);
//     targetList.appendChild(taskCard);
//     changeCardColor();
//   });

//   changeCardColor();

//   return taskCard;
// }

// function getTargetList(status) {
//   switch (status) {
//     case "todo":
//       return todoList;
//     case "inProgress":
//       return inProgressList;
//     case "done":
//       return doneList;
//     default:
//       return todoList;
//   }
// }

// function addTaskToList(taskInput, status) {
//   const currentDate = new Date().toISOString().slice(0, 10);
//   const taskCard = createTaskCard(taskInput, status, currentDate);
//   const targetList = getTargetList(status);
//   targetList.appendChild(taskCard);
// }

// addTaskBtn.addEventListener("click", () => {
//   const taskInput = document.getElementById("taskInput").value;
//   const statusSelect = document.getElementById("statusSelect");
//   const selectedStatus = statusSelect.options[statusSelect.selectedIndex].value;

//   if (taskInput.trim() !== "") {
//     addTaskToList(taskInput, selectedStatus);
//     closeModal();
//   } else {
//     alert("Введите текст задачи!");
//   }
// });

// function deleteAllTasks(list) {
//   list.innerHTML = "";
// }

// const deleteAllCardsElement = document.querySelector(".clear-all-btn");
// deleteAllCardsElement.addEventListener("click", function () {
//   const cardsElement = document.querySelectorAll(".card");
//   cardsElement.forEach(function (card) {
//     card.remove();
//   });
// });
