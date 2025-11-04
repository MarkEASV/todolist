import './style.css';

interface Todo {
  id: number;
  description: string;
  completed: boolean;
}

let todos: Todo[] = [];

const todoInput = document.getElementById('todoInput') as HTMLInputElement;
const todoForm = document.querySelector('.todoForm') as HTMLFormElement;
const todoList = document.querySelector('.todoList') as HTMLUListElement;
const errorMessage = document.getElementById('errorMessage') as HTMLElement;

const addTodo = (description: string) => {
  const newTodo: Todo = {
    id: Date.now(),
    description,
    completed: false
  };
  todos.push(newTodo);
  renderTodos();
};

todoForm.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  const description = todoInput.value.trim();

  if (description === '') {
    showError('Please enter a todo.');
    return;
  }

  hideError();
  addTodo(description);
  todoInput.value = '';
});

const renderTodos = () => {
  todoList.innerHTML = '';

  todos.forEach((todo) => {
    const li = document.createElement('li');
    li.className = 'todoItem';
    li.innerHTML = `
      <input type="checkbox" ${todo.completed ? 'checked' : ''}>
      <span style="text-decoration:${todo.completed ? 'line-through' : 'none'}">
        ${todo.description}
      </span>
      <button>Remove</button>
    `;

    addRemoveButtonListener(li, todo.id);
    addCheckboxListener(li, todo.id);

    todoList.appendChild(li);
  });
};

const addRemoveButtonListener = (li: HTMLLIElement, id: number) => {
  const removeButton = li.querySelector('button') as HTMLButtonElement;
  removeButton?.addEventListener('click', () => removeTodo(id));
};

const removeTodo = (id: number) => {
  todos = todos.filter(todo => todo.id !== id);
  renderTodos();
};

const addCheckboxListener = (li: HTMLLIElement, id: number) => {
  const checkBox = li.querySelector('input[type="checkbox"]') as HTMLInputElement;
  checkBox?.addEventListener('change', () => toggleTodoCompletion(id));
};

const toggleTodoCompletion = (id: number) => {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    renderTodos();
  }
};

const showError = (message: string) => {
  if (errorMessage) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    errorMessage.style.color = 'var(--danger-color)';
  }
};

const hideError = () => {
  if (errorMessage) {
    errorMessage.style.display = 'none';
  }
};

hideError();
renderTodos();
