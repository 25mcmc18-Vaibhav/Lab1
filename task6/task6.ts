enum TaskStatus { All = "all", Pending = "pending", Completed = "completed" }

class Task {
    readonly id: number = Date.now();
    constructor(public text: string, public dueDate: string, public completed: boolean = false) {}

    toggle(): void { this.completed = !this.completed; }
}

let tasks: Task[] = [];
let currentFilter: TaskStatus = TaskStatus.All;

function addTask(): void {
    const inputs: [HTMLInputElement, HTMLInputElement] = [
        document.getElementById('taskInput') as HTMLInputElement,
        document.getElementById('dateInput') as HTMLInputElement
    ];
    
    if (!inputs[0].value) return alert('Please enter a task!');

    tasks.push(new Task(inputs[0].value, inputs[1].value));
    inputs[0].value = inputs[1].value = ''; 
    render();
}

function deleteTask(id: number): void {
    tasks = tasks.filter(t => t.id !== id);
    render();
}

function toggleComplete(id: number): void {
    tasks.find(t => t.id === id)?.toggle(); 
    render();
}

function setFilter(filterType: string): void {
    currentFilter = filterType as TaskStatus;
    render();
}

function sortTasks(): void {
    tasks.sort((a, b) => a.dueDate.localeCompare(b.dueDate)); 
    render();
}

function render(): void {
    const list = document.getElementById('taskList') as HTMLUListElement;
    list.innerHTML = '';

    tasks.filter(t => 
        currentFilter === TaskStatus.All ? true :
        currentFilter === TaskStatus.Completed ? t.completed : !t.completed
    ).forEach(task => {
        const li = document.createElement('li');
        
        li.innerHTML = `<span>${task.text} ${task.dueDate ? `(Due: ${task.dueDate})` : ''}</span>`;
        if (task.completed) li.querySelector('span')!.classList.add('completed-task');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox'; checkbox.checked = task.completed;
        checkbox.onclick = () => toggleComplete(task.id);

        const btn = document.createElement('button');
        btn.innerText = 'X'; btn.className = 'delete-btn';
        btn.onclick = () => deleteTask(task.id);

        li.prepend(checkbox); 
        li.append(btn);       
        list.appendChild(li);
    });
}