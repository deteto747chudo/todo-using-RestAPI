document.addEventListener('DOMContentLoaded', () => {
    const taskFormContainer = document.getElementById('taskFormContainer');
    const taskTitleInput = document.getElementById('taskTitle');
    const taskDeadlineInput = document.getElementById('taskDeadline');
    const taskList = document.getElementById('taskList');
    const searchInput = document.getElementById('searchInput');
    const searchIcon = document.getElementById('searchIcon');
    const taskDetailModal = document.getElementById('taskDetailModal');
    const modalTaskTitle = document.getElementById('modalTaskTitle');
    const modalTaskDeadline = document.getElementById('modalTaskDeadline');
    const updateTaskButton = document.getElementById('updateTaskButton');
    const deleteTaskButton = document.getElementById('deleteTaskButton');
    const closeModalButton = document.getElementById('closeModalButton');
    const addTaskButton = document.getElementById('addTaskButton');
    const closeTaskFormButton = document.getElementById('closeTaskFormButton');
    const submitTaskButton = document.getElementById('submitTaskButton');
    
    let tasks = [];
    let currentTaskId = null;

    function fetchTasks() {
        fetch('https://detetochudo1.pythonanywhere.com/tasks')
            .then(response => response.json())
            .then(data => {
                tasks = data;
                renderTasks();
            })
            .catch(error => console.error('Error fetching tasks:', error));
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = 'task-item';
            li.textContent = `${task.name} (Deadline: ${task.deadline})`;
            li.addEventListener('click', () => showTaskDetails(task.id));
            taskList.appendChild(li);
        });
    }

    function showTaskDetails(id) {
        const task = tasks.find(t => t.id === id);
        modalTaskTitle.value = task.name;
        modalTaskDeadline.value = task.deadline;
        currentTaskId = id;
        taskDetailModal.style.display = 'flex';
    }

    function hideTaskDetails() {
        taskDetailModal.style.display = 'none';
    }

    function toggleTaskForm() {
        const isHidden = taskFormContainer.style.transform === 'scale(0)';
        taskFormContainer.style.transform = isHidden ? 'scale(1)' : 'scale(0)';
        taskFormContainer.style.opacity = isHidden ? '1' : '0';
    }

    function addTask(title, deadline) {
        fetch('https://detetochudo1.pythonanywhere.com/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: title, deadline: deadline })
        })
        .then(response => response.json())
        .then(data => {
            tasks.push(data);
            renderTasks();
            toggleTaskForm();
        })
        .catch(error => console.error('Error adding task:', error));
    }

    function updateTask(id, title, deadline) {
        fetch(`https://detetochudo1.pythonanywhere.com/tasks/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: title, deadline: deadline })
        })
        .then(response => response.json())
        .then(data => {
            const index = tasks.findIndex(t => t.id === id);
            tasks[index] = data;
            renderTasks();
            hideTaskDetails();
        })
        .catch(error => console.error('Error updating task:', error));
    }

    function deleteTask(id) {
        fetch(`https://detetochudo1.pythonanywhere.com/tasks/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(() => {
            tasks = tasks.filter(t => t.id !== id);
            renderTasks();
            hideTaskDetails();
        })
        .catch(error => console.error('Error deleting task:', error));
    }

    addTaskButton.addEventListener('click', toggleTaskForm);
    closeTaskFormButton.addEventListener('click', toggleTaskForm);

    submitTaskButton.addEventListener('click', () => {
        const title = taskTitleInput.value;
        const deadline = taskDeadlineInput.value;
        if (title && deadline) {
            addTask(title, deadline);
        }
    });

    updateTaskButton.addEventListener('click', () => {
        const title = modalTaskTitle.value;
        const deadline = modalTaskDeadline.value;
        if (title && deadline) {
            updateTask(currentTaskId, title, deadline);
        }
    });

    deleteTaskButton.addEventListener('click', () => {
        deleteTask(currentTaskId);
    });

    closeModalButton.addEventListener('click', hideTaskDetails);

    searchIcon.addEventListener('click', () => {
        searchInput.style.display = searchInput.style.display === 'none' ? 'block' : 'none';
    });

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        taskList.querySelectorAll('.task-item').forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(query) ? 'block' : 'none';
        });
    });

    fetchTasks();

    // Display the current date
    const dateDisplay = document.getElementById('currentDate');
    const today = new Date().toLocaleDateString();
    dateDisplay.textContent = `${today}`;
});
