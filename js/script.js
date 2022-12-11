const formForTask = document.querySelector('#task-form');
const taskInput = document.querySelector('#add-task');
const taskList = document.querySelector('#tasks');
const taskCounter = document.querySelector('#task-counter');

let tasksArray = [];

// if (localStorage.getItem('tasksArray')) {
//     tasksArray = JSON.parse(localStorage.getItem('tasksArray'))
// }

const titleForEmpty = document.querySelector('.main-todo-list__empty-wrapper')


tasksArray.forEach(function (task) {
    // const addingClass = task.done ? 'task-title task-title--done' : 'task-title';
    
    const taskHTML = `<div id="${task.id}" class="main-todo-list__task-wrappper">
                        <div class="main-todo-list__task">
                            <span class="main-todo-list__task-text">${task.text}</span>
                        </div>
                        <button class="main-todo-list__delete-button" data-action="delete">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="main-todo-list__delete-button_img">
                                <path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>                        
                        </button>
                    </div>     `

    taskList.insertAdjacentHTML('beforeend', taskHTML);
})

formForTask.addEventListener('submit', addTask) 
    
    function addTask (event) {
        event.preventDefault();

    
    const taskText = taskInput.value;

    const newTask = {
        id: Date.now(),
        text: taskText
    };
    

    // const addingClass = newTask.done ? 'task-title task-title--done' : 'task-title';
    
    const taskHTML = `<div id="${newTask.id}" class="main-todo-list__task-wrappper">
                        <div class="main-todo-list__task">
                            <span class="main-todo-list__task-text">${newTask.text}</span>
                        </div>
                        <div class-"main-todo-list__button-wrapper">
                            <button class="main-todo-list__complete-button" data-action="complete">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="main-todo-list__complete-button_img">
                                    <path d="M5 13L9 17L19 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                            </button>
                            <button class="main-todo-list__delete-button" data-action="delete">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="main-todo-list__delete-button_img">
                                    <path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>                        
                            </button>
                        </div>
                    </div>     `

    taskList.insertAdjacentHTML('beforeend', taskHTML);
    taskInput.value = "";
    taskInput.focus()
    tasksArray.push(newTask);

    let taskCounterHTML = `<li class="menu__link-task-counter"><span class="menu__link-task-counter_number">${taskList.children.length}</span></li>`

    if (taskList.children.length >= 1) {
        titleForEmpty.classList.add("main-todo-list__empty-wrapper_none")
        taskCounter.insertAdjacentHTML('beforeend', taskCounterHTML)
        } else {
            taskCounter.remove();
        }
    }
    
    // savingToLS();

    // tasksArray.push(newTask)

    taskList.addEventListener('click', deleteTask) 
    
    function deleteTask(event) {
        if (event.target.dataset.action === 'delete') {
            const parentTaskWrapper = event.target.closest('.main-todo-list__task-wrappper')
            parentTaskWrapper.remove();
        }

        // const id = Number(parentTaskWrapper.id);

        // const index = tasksArray.findIndex(function (task) {
        //     if (task.id === id) {
        //         return true
        //     }
        // })

        // tasksArray.splice(index, 1)

        if (taskList.children.length === 0) {
            titleForEmpty.classList.remove("main-todo-list__empty-wrapper_none");
        }

        // savingToLS();
    }

    taskList.addEventListener('click', completeTask) 

    function completeTask (event) {
        if (event.target.dataset.action === 'complete') {
            const parentTaskWrapper = event.target.closest('.main-todo-list__task-wrappper')
            
            const activeTask = parentTaskWrapper.querySelector('.main-todo-list__task')
            activeTask.classList.add("main-todo-list__task_done")   
            tasksArray.push() 
        }
    }

// function savingToLS() {
//     localStorage.setItem('tasksArray', JSON.stringify(tasksArray))
// } 