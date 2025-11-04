import '../src/style.css';

interface Todo {
  id: number;
  description: string;
  completed: boolean;
  dueDate?: string;
}

let todos: Todo[] = [];

const todoInput = document.getElementById('todoInput') as HTMLInputElement;
const todoForm = document.querySelector('.todoForm') as HTMLFormElement;
const todoList = document.querySelector('.todoList') as HTMLUListElement;
const completedList = document.querySelector('.completedList') as HTMLUListElement;
const completedContainer = completedList.parentElement as HTMLElement;
const errorMessage = document.getElementById('errorMessage') as HTMLElement;

// Option 2: Add a button to clear all completed todos
const clearCompletedBtn = document.createElement('button');
clearCompletedBtn.textContent = 'Clear all Completed';
clearCompletedBtn.className = 'clearCompletedButton';
completedContainer.insertBefore(clearCompletedBtn, completedList);

clearCompletedBtn.addEventListener('click', () => {
  todos = todos.filter(todo => !todo.completed);
  renderTodos();
});

// Option 6: Due Date for Todos
const dateInput = document.createElement('input'); 
dateInput.type = 'date';
dateInput.className = 'todoDateInput';
todoForm.insertBefore(dateInput, todoForm.lastElementChild);

const addTodo = (description: string, dueDate?: string) => {
  const newTodo: Todo = {
    id: Date.now(),
    description,
    completed: false,
    dueDate
  };
  todos.push(newTodo);
  renderTodos();
};

todoForm.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  const description = todoInput.value.trim();
  const dueDate = dateInput.value;

  if (description === '') {
    showError('Please enter a todo.');
    return;
  }

  hideError();
  addTodo(description, dueDate);
  todoInput.value = '';
  dateInput.value = '';
});

const renderTodos = () => {
  todoList.innerHTML = '';
  completedList.innerHTML = '';

  todos.forEach((todo) => {
    const li = document.createElement('li');
    li.className = 'todoItem';

    const isOverdue =
      todo.dueDate && !todo.completed && new Date(todo.dueDate) < new Date();

    li.innerHTML = `
      <input type="checkbox" ${todo.completed ? 'checked' : ''}>
      <div class="todoInfo">
        <span style="text-decoration:${todo.completed ? 'line-through' : 'none'};
        color:${isOverdue ? 'var(--danger-color)' : 'var(--text-color)'}">
          ${todo.description}
        </span>
        ${todo.dueDate ? `<small>Due: ${todo.dueDate}</small>` : ''}
      </div>
      <button>Remove</button>
    `;

    addRemoveButtonListener(li, todo.id);
    addCheckboxListener(li, todo.id);

    if (todo.completed) {
      completedList.appendChild(li);
    } else {
      todoList.appendChild(li);
    }
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
