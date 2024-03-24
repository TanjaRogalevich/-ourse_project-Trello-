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
  }

  export { Todo };