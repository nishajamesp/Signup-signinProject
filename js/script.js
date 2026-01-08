 
        const taskInput = document.getElementById('taskInput');
        const addTaskBtn = document.getElementById('addTaskBtn');
        const taskList = document.getElementById('taskList');

        // Function to create a new task item
        function createTaskElement(taskText) {
            const li = document.createElement('li');
            li.className = 'task-item';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'task-checkbox';
            
            const taskSpan = document.createElement('span');
            taskSpan.className = 'task-text';
            taskSpan.textContent = taskText;

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn-delete';
            deleteBtn.innerHTML = '<i class="fas fa-trash"></i> Delete';

            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    li.classList.add('completed');
                    taskSpan.classList.add('completed');
                } else {
                    li.classList.remove('completed');
                    taskSpan.classList.remove('completed');
                }
            });


            taskSpan.addEventListener('click', function() {
                checkbox.checked = !checkbox.checked;
                checkbox.dispatchEvent(new Event('change'));
            });


            deleteBtn.addEventListener('click', function() {
                li.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    li.remove();
                    checkEmptyState();
                }, 300);
            });


            li.appendChild(checkbox);
            li.appendChild(taskSpan);
            li.appendChild(deleteBtn);

            return li;
        }

        // Function to add a new task
        function addTask() {
            const taskText = taskInput.value.trim();

            if (taskText === '') {
                alert('Please enter a task!');
                return;
            }

            const emptyState = taskList.querySelector('.empty-state');
            if (emptyState) {
                emptyState.remove();
            }

            const taskElement = createTaskElement(taskText);
            taskList.appendChild(taskElement);


            taskInput.value = '';
            taskInput.focus();
        }

        // Function to check if list is empty and show empty state
        function checkEmptyState() {
            if (taskList.children.length === 0) {
                const emptyDiv = document.createElement('div');
                emptyDiv.className = 'empty-state';
                emptyDiv.innerHTML = `
                    <i class="fas fa-clipboard-list"></i>
                    <p>No tasks yet. Add one to get started!</p>
                `;
                taskList.appendChild(emptyDiv);
            }
        }

        // Event listener for Add Task button
        addTaskBtn.addEventListener('click', addTask);

        taskInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                addTask();
            }
        });

        // Add fade out animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeOut {
                from {
                    opacity: 1;
                    transform: translateX(0);
                }
                to {
                    opacity: 0;
                    transform: translateX(50px);
                }
            }
        `;
        document.head.appendChild(style);