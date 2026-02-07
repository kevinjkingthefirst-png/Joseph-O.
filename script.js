let todoList = JSON.parse(localStorage.getItem('todos')) || [];

renderTodoList();

function renderTodoList() {
  const listEl = document.querySelector('.js-todo-list');
  listEl.innerHTML = '';

  todoList.forEach((todo, index) => {
    const div = document.createElement('div');
    div.className = `todo-item ${todo.completed ? 'completed' : ''}`;

    div.innerHTML = `
      <div>
        <div class="todo-name">${todo.name}</div>
        <div class="todo-date">${formatDate(todo.dueDate)}</div>
      </div>
      <button class="complete-btn">✔</button>
      <button class="delete-btn">✖</button>
    `;

    div.querySelector('.complete-btn').onclick = () => {
      todo.completed = !todo.completed;
      saveAndRender();
    };

    div.querySelector('.delete-btn').onclick = () => {
      todoList.splice(index, 1);
      saveAndRender();
    };

    listEl.appendChild(div);
  });
}

function addTodo() {
  const nameInput = document.querySelector('.js-name-input');
  const dateInput = document.querySelector('.js-date-input');

  if (!nameInput.value) return;

  todoList.push({
    name: nameInput.value,
    dueDate: dateInput.value,
    completed: false
  });

  nameInput.value = '';
  dateInput.value = '';

  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem('todos', JSON.stringify(todoList));
  renderTodoList();
}

function formatDate(date) {
  if (!date) return '';
  return new Date(date).toLocaleDateString();
}

document.querySelector('.js-add-btn').onclick = addTodo;
document.addEventListener('keydown', e => {
  if (e.key === 'Enter') addTodo();
});