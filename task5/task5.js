let tasks = [];
let currentFilter = 'all';

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const dateInput = document.getElementById('dateInput');
    const text = taskInput.value;
    const date = dateInput.value;

    if (text === '') {
        alert('Please enter a task!');
        return;
    }

    const newTask = {
        id: Date.now(), 
        text: text,
        dueDate: date,
        completed: false
    };

    tasks.push(newTask);

    taskInput.value = '';
    dateInput.value = '';
    render();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    render();
}

function toggleComplete(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
    }
    render();
}

function setFilter(filterType) {
    currentFilter = filterType;
    render();
}

function sortTasks() {
    tasks.sort((a, b) => {
        if (!a.dueDate) return 1; 
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
    });
    render();
}

function render() {
    const list = document.getElementById('taskList');
    list.innerHTML = '';

    let filteredTasks = tasks;
    if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(t => t.completed);
    } else if (currentFilter === 'pending') {
        filteredTasks = tasks.filter(t => !t.completed);
    }

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.onclick = () => toggleComplete(task.id);

        const span = document.createElement('span');
        span.innerText = `${task.text} ${task.dueDate ? '(Due: ' + task.dueDate + ')' : ''}`;
        if (task.completed) {
            span.classList.add('completed-task');
        }

        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'X';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.onclick = () => deleteTask(task.id);

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        list.appendChild(li);
    });
}