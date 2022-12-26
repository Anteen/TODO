const formForTask = document.querySelector('#task-form');
const taskInput = document.querySelector('#add-task');
const taskList = document.querySelector('#tasks');
const taskListDone = document.querySelector('#done-tasks');
const taskCounter = document.querySelector('#task-counter');
const taskContainer = document.querySelector('.main-todo-list__container')
const sortButtonWrapper = document.querySelector('.main-todo-list__sort-button-wrapper')
const doneTitle = document.querySelector(".main-todo-list__done-wrapper")


let tasksArray = [];
let tasksArrayDone = [];

if (localStorage.getItem('tasksArrayDone')) {
    tasksArray = JSON.parse(localStorage.getItem('tasksArray'))
}
if (localStorage.getItem('tasksArrayDone')) {
    tasksArray = JSON.parse(localStorage.getItem('tasksArrayDone'))
}

addSortButton()
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


const emptyTitle = document.querySelector('.main-todo-list__empty-wrapper')

    
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
                        <div class="main-todo-list__button-wrapper">
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

    checkEmptyList() 
    addSortButton()
    savingToLS()
    }
    
    function addSortButton () {
        if (tasksArray.length >= 1 || tasksArrayDone.length >= 1) {
            sortButtonWrapper.classList.add("main-todo-list__sort-button-wrapper_active")
        } else {
            sortButtonWrapper.classList.remove("main-todo-list__sort-button-wrapper_active")
        }

        savingToLS()
    }

    const sortButton = document.querySelector ('.main-todo-list__sort-button')
    sortButton.addEventListener ("click", (event) => {
        tasksArray.sort(function(a, b) {
            
            const textA = a.text.toLowerCase();
            const textB = b.text.toLowerCase();

            if (textA > textB) return 1;
            if (textA < textB) return -1;
            return 0;
        });
        savingToLS()
    })
    



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

        checkEmptyList() 
        addSortButton()       
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
                doneTitle.classList.add("main-todo-list__done-wrapper-active")
                task.done = task.done
                tasksArrayDone.push(tasksArray.splice(tasksArray.indexOf(task.id), 1)[0]);

                const parentTaskWrapper = event.target.closest('.main-todo-list__task-wrappper')
                parentTaskWrapper.remove();

                const addingClass = task.done ? "main-todo-list__task main-todo-list__task_done" : "main-todo-list__task";

                taskListDone.classList.remove(".main-todo-list__tasks-list-none")

                const taskHTMLDone = `<div id="${task.id}" class="main-todo-list__task-wrappper">
                <div class="${addingClass}">
                    <span class="main-todo-list__task-text">${task.text}</span>
                </div>
                <div class="main-todo-list__button-wrapper">
                    <button class="main-todo-list__delete-button" data-action="delete">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="main-todo-list__delete-button_img">
                            <path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>                        
                    </button>
                </div>
                </div>     `
                taskListDone.insertAdjacentHTML('beforeend', taskHTMLDone)

            } else {
                activeTask.classList.remove("main-todo-list__task_done")   
                doneTitle.classList.remove("main-todo-list__done-wrapper-active")   
                tasksArray.push(tasksArrayDone.splice(tasksArrayDone.indexOf(task.id), 1)[0]);
            }
            
            
        }
        checkEmptyList() 
        savingToLS()
    }

    taskListDone.addEventListener('click', deleteActiveTask) 
    
    function deleteActiveTask(event) {
        if (event.target.dataset.action === 'delete') {
            const parentTaskWrapper = event.target.closest('.main-todo-list__task-wrappper')
            parentTaskWrapper.remove();

            const id = Number(parentTaskWrapper.id);
            
            const index = tasksArrayDone.findIndex(function (task) {
                if (task.id === id) {
                    return true
                }
            })
            


            tasksArrayDone.splice(index, 1)
        }
        

        checkEmptyList() 
        addSortButton()       
        savingToLS();
    }
    
    function checkEmptyList() {
        const emptyTitle = document.querySelector('.main-todo-list__empty-wrapper')
        
        if ((tasksArray.length >= 1) || (tasksArrayDone.length >= 1)) {
            emptyTitle.classList.add("main-todo-list__empty-wrapper_none")               
        } else if ((tasksArray.length === 0) && (tasksArrayDone.length === 0)) {  
            doneTitle.classList.remove("main-todo-list__done-wrapper-active")
            emptyTitle.classList.remove("main-todo-list__empty-wrapper_none")               
        } 
        if (tasksArrayDone.length === 0) {
            doneTitle.classList.remove("main-todo-list__done-wrapper-active")            
        } 
        // else {
        //     const removingTitleForEmpty = document.querySelector('.main-todo-list__empty-wrapper')
        //     removingTitleForEmpty ? removingTitleForEmpty.remove() : null;
        // }
        savingToLS()
    }

    function savingToLS() {
        localStorage.setItem('tasksArray', JSON.stringify(tasksArray));
        localStorage.setItem('tasksArrayDone', JSON.stringify(tasksArrayDone));
    } 
