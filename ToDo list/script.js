"use strick";
// grap all elements
const form = document.querySelector("[data-form]");
const lists = document.querySelector("[data-lists]");
const input = document.querySelector("[data-input]");

// Local storage
class Storage {
  static addTodStorage(todoArr) {
    let storage = localStorage.setItem("todo", JSON.stringify(todoArr));
    return storage;
  }

  static getStorage() {
    let storage =
      localStorage.getItem("todo") === null
        ? []
        : JSON.parse(localStorage.getItem("todo"));
    return storage;
  }
}

// Empty Array
let todoArr = Storage.getStorage();

// Form part
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let id = Math.random() * 1000000;
  const todo = new Todo(id, input.value);
  todoArr = [...todoArr, todo];
  UI.displayData();
  UI.clearInput();
  UI.removeTodo();
  Storage.addTodStorage(todoArr);
});

// Make Object instance
class Todo {
  constructor(id, todo) {
    this.id = id;
    this.todo = todo;
  }
}

// Display the todo in the DOM
class UI {
  static displayData() {
    let displayData = todoArr.map((item) => {
      return `
        <div class="todo">
            <p>${item.todo}</p>
            <span class="remove" data-id = ${item.id}>🗑</span>
        </div>
        `;
    });
    lists.innerHTML = displayData.join("");
  }
  static clearInput() {
    input.value = "";
  }
  static removeTodo() {
    lists.addEventListener("click", (e) => {
      if (e.target.classList.contains("remove")) {
        e.target.parentElement.remove();
      }
      let btnId = e.target.dataset.id;
      UI.removeArrayTodo(btnId);
    });
  }
  static removeArrayTodo(id) {
    todoArr = todoArr.filter((item) => item.id !== +id);
    Storage.addTodStorage(todoArr);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  UI.displayData();
  UI.removeTodo();
});
