var TaskStatus;
(function (TaskStatus) {
    TaskStatus["All"] = "all";
    TaskStatus["Pending"] = "pending";
    TaskStatus["Completed"] = "completed";
})(TaskStatus || (TaskStatus = {}));
class Task {
    constructor(text, dueDate, completed = false) {
        this.text = text;
        this.dueDate = dueDate;
        this.completed = completed;
        this.id = Date.now();
    }
    toggle() { this.completed = !this.completed; }
}
let tasks = [];
let currentFilter = TaskStatus.All;
function addTask() {
    const inputs = [
        document.getElementById('taskInput'),
        document.getElementById('dateInput')
    ];
    if (!inputs[0].value)
        return alert('Please enter a task!');
    tasks.push(new Task(inputs[0].value, inputs[1].value));
    inputs[0].value = inputs[1].value = '';
    render();
}
function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    render();
}
function toggleComplete(id) {
    var _a;
    (_a = tasks.find(t => t.id === id)) === null || _a === void 0 ? void 0 : _a.toggle();
    render();
}
function setFilter(filterType) {
    currentFilter = filterType;
    render();
}
function sortTasks() {
    tasks.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
    render();
}
function render() {
    const list = document.getElementById('taskList');
    list.innerHTML = '';
    tasks.filter(t => currentFilter === TaskStatus.All ? true :
        currentFilter === TaskStatus.Completed ? t.completed : !t.completed).forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${task.text} ${task.dueDate ? `(Due: ${task.dueDate})` : ''}</span>`;
        if (task.completed)
            li.querySelector('span').classList.add('completed-task');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.onclick = () => toggleComplete(task.id);
        const btn = document.createElement('button');
        btn.innerText = 'X';
        btn.className = 'delete-btn';
        btn.onclick = () => deleteTask(task.id);
        li.prepend(checkbox);
        li.append(btn);
        list.appendChild(li);
    });
}
