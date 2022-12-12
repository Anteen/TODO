const formForTask = document.querySelector('#task-form');
const taskInput = document.querySelector('#add-task');
const taskList = document.querySelector('#tasks');
const taskCounter = document.querySelector('#task-counter');

let tasksArray = [];

if (localStorage.getItem('tasksArray')) {
    tasksArray = JSON.parse(localStorage.getItem('tasksArray'))
}
checkEmptyList() 

tasksArray.forEach(function (task) {
    const addingClass = task.done ? "main-todo-list__task main-todo-list__task_done" : "main-todo-list__task";
    
    const taskHTML = `<div id="${task.id}" class="main-todo-list__task-wrappper">
                        <div class="${addingClass}">
                            <span class="main-todo-list__task-text">${task.text}</span>
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
})

formForTask.addEventListener('submit', addTask) 

const titleForEmpty = document.querySelector('.main-todo-list__empty-wrapper')


    
    function addTask (event) {
        event.preventDefault();

    
    const taskText = taskInput.value;

    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false
    };
    
    tasksArray.push(newTask)

    const addingClass = newTask.done ? "main-todo-list__task main-todo-list__task_done" : "main-todo-list__task";
    
    const taskHTML = `<div id="${newTask.id}" class="main-todo-list__task-wrappper">
                        <div class="${addingClass}">
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


    // let taskCounterHTML = `<li class="menu__link-task-counter"><span class="menu__link-task-counter_number">${taskList.children.length}</span></li>`

    // if (taskList.children.length >= 1) {
    //     titleForEmpty.classList.add("main-todo-list__empty-wrapper_none")
    //     taskCounter.insertAdjacentHTML('beforeend', taskCounterHTML)
    //     } else {
    //         taskCounter.remove();
    //     }
    checkEmptyList() 
    savingToLS()
    }
    
    // tasksArray.push(newTask)

    taskList.addEventListener('click', deleteTask) 
    
    function deleteTask(event) {
        if (event.target.dataset.action === 'delete') {
            const parentTaskWrapper = event.target.closest('.main-todo-list__task-wrappper')
            parentTaskWrapper.remove();

            const id = Number(parentTaskWrapper.id);
            
            const index = tasksArray.findIndex(function (task) {
                if (task.id === id) {
                    return true
                }
            })
            
            tasksArray.splice(index, 1)
        }

        // if (taskList.children.length === 0) {
        //     titleForEmpty.classList.remove("main-todo-list__empty-wrapper_none");
        // }
        checkEmptyList() 
        savingToLS();
    }

    taskList.addEventListener('click', completeTask) 

    function completeTask (event) {
        if (event.target.dataset.action === 'complete') {
            const parentTaskWrapper = event.target.closest('.main-todo-list__task-wrappper')
            
            const id = Number(parentTaskWrapper.id);
            
            const task = tasksArray.find(function (task) {
                if (task.id === id ) {
                    return true
                }
            })

            task.done = !task.done

            const activeTask = parentTaskWrapper.querySelector('.main-todo-list__task')
            if (task.done == true) {
                activeTask.classList.add("main-todo-list__task_done")   
                // tasksArray.push(tasksArray.splice(tasksArray.indexOf(task.id), 1)[0]);
            } else {
                activeTask.classList.remove("main-todo-list__task_done")   
            }

        }
        
        savingToLS()
    }

    
    function checkEmptyList() {
        if (tasksArray.length === 0) {
            const emptyTitle = `<div class="main-todo-list__empty-wrapper">
                    <h1 class="main-todo-list__empty-title">to-do list is empty</h1>
                    <h2 class="main-todo-list__empty-subtitle">Add Task to create a list</h2>
                     </div>`
            taskList.insertAdjacentHTML('afterend', emptyTitle);           
            
        } else {
            const removingTitleForEmpty = document.querySelector('.main-todo-list__empty-wrapper')
            removingTitleForEmpty ? removingTitleForEmpty.remove() : null;
        }
    }

    function savingToLS() {
        localStorage.setItem('tasksArray', JSON.stringify(tasksArray))
    } 
