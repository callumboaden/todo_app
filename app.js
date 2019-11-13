const addTodoBtn = document.querySelector('.btn__add--todo');
const addTodoForm = document.querySelector('.add__todo__form');
const todoInput = document.querySelector('#todo__input');
const todoInputBtn = document.querySelector('.add__todo--input');
const todoList = document.querySelector('.todos');
const alert = document.querySelector('.alert');

addTodoBtn.addEventListener('click', () => {
    addTodoForm.classList.add('active');
});

addTodoForm.addEventListener('click', e => {
    const action = e.target.dataset.action;

    if (action === 'close') {
        addTodoForm.classList.remove('active');
        store();
    }

});

todoInput.addEventListener('keydown', e => {
    const title = todoInput.value;
    const date = getDate();

    const todo = {
        title: title,
        date: date
    }

    if (e.keyCode === 13) {
        addTodo(todo);
        store();
        
        todoInput.value = '';
        addTodoForm.classList.remove('active');
    }

    if (todoInput.value.length > 1) {
        todoInputBtn.classList.add('active');
    } else {
        todoInputBtn.classList.remove('active');
    }
 
});

todoInputBtn.addEventListener('click', e => {
    const title = todoInput.value;
    const date = getDate();


    const todo = {
        title: title,
        date: date
    }

    addTodo(todo);
    store();
    
    todoInput.value = '';
    addTodoForm.classList.remove('active');

});

todoList.addEventListener('click', e => {
    const target = e.target;
    const action = target.dataset.action;
    const todo = target.parentElement.parentElement;

    // delete todo
    if (action === 'remove') {
        removeTodo(target);
    }

    if (action === 'edit') {
        editTodo(todo);
    }

    if (action === 'save') {
        saveTodo(todo);
    }

    if (action === 'check') {
        checkTodo(todo);
    }

    store();

});

todoList.addEventListener('keypress', e => {
    const target = e.target;
    const todo = target.parentElement;

    if (e.keyCode === 13) {
        saveTodo(todo);
        store();
    }

});

getTodos();

function addTodo(todo) {

    let markup = `
        <li class="todo">
            <p class="todo__date--added">${todo.date}</p>
            <h2 class="todo__title">${todo.title}</h2>
            <div class="buttons">
                <i class="fa fa-trash" class="btn btn__remove--todo" data-action="remove"></i>
                <i class="fa fa-edit" class="btn btn__edit--todo" data-action="edit"></i>
                <i class="fa fa-check class="btn btn__check--todo" data-action="check"></i>
            </div>
        </li>
    `;

    todoList.insertAdjacentHTML('beforeend', markup);
}

function editTodo(todo) {
    let date = todo.childNodes.item(1).textContent;
    let title = todo.childNodes.item(3).textContent;
    
    let markup = `
        <p class="todo__date--added">${date}</p>
        <input type="text" class="edit__todo--input" value="${title}">
        <div class="buttons">
            <i class="fa fa-trash" class="btn btn__remove--todo" data-action="remove"></i>
            <i class="fa fa-save" class="btn btn__save--todo" data-action="save"></i>
            <i class="fa fa-check class="btn btn__check--todo" data-action="check"></i>
        </div>
    `;
    
    // clear html
    todo.innerHTML = '';
    todo.insertAdjacentHTML('beforeend', markup);
    
}

function saveTodo(todo) {

    let date = todo.childNodes.item(1).textContent;
    let title = todo.childNodes.item(3).value;
    
    let markup = `
        <p class="todo__date--added">${date}</p>
        <h2 class="todo__title">${title}</h2>
        <div class="buttons">
            <i class="fa fa-trash" class="btn btn__remove--todo" data-action="remove"></i>
            <i class="fa fa-edit" class="btn btn__edit--todo" data-action="edit"></i>
            <i class="fa fa-check class="btn btn__check--todo" data-action="check"></i>
        </div>
    `;

    todo.innerHTML = '';
    todo.insertAdjacentHTML('beforeend', markup);
}

function toggleCompleted(todo) {
    console.log(todo);
}

function checkTodo(todo) {
    todo.classList.toggle('checked');
}
function store() {
    window.localStorage.myTodos = todoList.innerHTML;
}

function getTodos() {
    const storedTodos = window.localStorage.myTodos;

    if (!storedTodos) {
        todoList.innerHTML = '';
    } else {
        todoList.innerHTML = storedTodos;
    }
}

function getDate() {
    const t = new Date();
    const d = t.getDate();
    const m = t.getMonth() + 1;
    const y = t.getFullYear();

    return `${d}/${m}/${y}`;
}

function removeTodo(todo) {
    todo.parentElement.parentElement.classList.add('fadeout');
    setTimeout(function() {
        todo.parentElement.parentElement.remove(todo);
        store();
    }, 1000);
}

