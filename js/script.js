const formForTask = document.querySelector('#task-form');
const taskInput = document.querySelector('#add-task');
const taskList = document.querySelector('#tasks');
const taskListDone = document.querySelector('#done-tasks');
const taskCounter = document.querySelector('#task-counter');
const taskContainer = document.querySelector('.main-todo-list__container')
const activeListButtonsWrapper = document.querySelector('.main-todo-list__active-list-buttons-wrapper-unactive')
const doneTitle = document.querySelector(".main-todo-list__done-wrapper")


let tasksArray = [];
let tasksArrayDone = [];

if (localStorage.getItem('tasksArray')) {
    tasksArray = JSON.parse(localStorage.getItem('tasksArray'))
}
if (localStorage.getItem('tasksArrayDone')) {
    tasksArrayDone = JSON.parse(localStorage.getItem('tasksArrayDone'))
}

addChangeButtons()
checkEmptyList() 

tasksArray.forEach(function (task) {
    const addingClass = task.done ? "main-todo-list__task main-todo-list__task_done" : "main-todo-list__task";
    
    const taskHTML = `<div id="${task.id}" class="main-todo-list__task-wrappper">
                        <div class="${addingClass}">
                            <span class="main-todo-list__task-text">${task.text}</span>
                        </div>
                        <div class="main-todo-list__button-wrapper">
                            <button class="main-todo-list__correct-button" data-action="correct">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.2322 5.23223L18.7678 8.76777M16.7322 3.73223C17.7085 2.75592 19.2915 2.75592 20.2678 3.73223C21.2441 4.70854 21.2441 6.29146 20.2678 7.26777L6.50006 21.0355H3.00006V17.4644L16.7322 3.73223Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>                            
                            </button>
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

tasksArrayDone.forEach(function (taskDone) {    
    doneTitle.classList.add("main-todo-list__done-wrapper-active")  
    const taskHTML = `<div id="${taskDone.id}" class="main-todo-list__task-wrappper">
        <div class="main-todo-list__task main-todo-list__task_done">
            <span class="main-todo-list__task-text">${taskDone.text}</span>
        </div>
        <div class="main-todo-list__button-wrapper">
            <button class="main-todo-list__delete-button" data-action="delete">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="main-todo-list__delete-button_img">
                    <path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>                        
            </button>
        </div>
        </div>     `
                    

    taskListDone.insertAdjacentHTML('beforeend', taskHTML);
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
                        <button class="main-todo-list__correct-button" id="editButton" data-action="correct">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.2322 5.23223L18.7678 8.76777M16.7322 3.73223C17.7085 2.75592 19.2915 2.75592 20.2678 3.73223C21.2441 4.70854 21.2441 6.29146 20.2678 7.26777L6.50006 21.0355H3.00006V17.4644L16.7322 3.73223Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>                            
                        </button>
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
addChangeButtons()
savingToLS()
}

function addChangeButtons () {
    if (tasksArray.length >= 1 || tasksArrayDone.length >= 1) {
        activeListButtonsWrapper.classList.add("main-todo-list__active-list-buttons-wrapper")
    } else {
        activeListButtonsWrapper.classList.remove("main-todo-list__active-list-buttons-wrapper")
    }
    savingToLS()
}

let initialTasksArray = [];
let initialTasksArrayDone = [];
let dir = 0;
let dirForDoneList = 0
const sortButton = document.querySelector ('.main-todo-list__sort-button')
sortButton.addEventListener ("click", (event) => {

    if (dir === 0) {
        initialTasksArray = tasksArray.map((item) => item) 
    }
    
    dir++ 
    tasksArray.sort(function(a, b) {
        
        const textA = a.text.toLowerCase();
        const textB = b.text.toLowerCase();
        if (dir === 1) {
            
            if (textA > textB) return 1;
            if (textA < textB) return -1;
            return 0;
        } else if (dir === 2) {
            if (textA > textB) return -1;
            if (textA < textB) return 1;
            return 0;
        } else {
            dir = 0;
            tasksArray = initialTasksArray;
            initialTasksArray = []
        }
    });
    
        
    if (dirForDoneList === 0) {
        initialTasksArrayDone = tasksArrayDone.map((item) => item) 
    }
    
    
    dirForDoneList++ 
    tasksArrayDone.sort(function(a, b) {
        
        const textA = a.text.toLowerCase();
        const textB = b.text.toLowerCase();
        if (dirForDoneList === 1) {
            
            if (textA > textB) return 1;
            if (textA < textB) return -1;
            return 0;
        } else if (dirForDoneList === 2) {
            if (textA > textB) return -1;
            if (textA < textB) return 1;
            return 0;
        } else {
            dirForDoneList = 0;
            tasksArrayDone = initialTasksArrayDone;
            initialTasksArrayDone = []
        }
    });        
    console.log(event)
    savingToLS()
    // ОТРИСОВКА СОРТИРОВКИ БУДЕТ РАБОТАТЬ ОТЛИЧНО ПРИ УСЛОВИИ УСТРАНЕНИЯ БАГА С СОРТИРОВКОЙ.

    // taskList.innerHTML = '' 
    // taskListDone.innerHTML = ''
    // taskList.innerHTML = tasksArray.map((task) => {
    //     return `<div id="${task.id}" class="main-todo-list__task-wrappper">
    //     <div class="main-todo-list__task">
    //         <span class="main-todo-list__task-text">${task.text}</span>
    //     </div>
    //     <div class="main-todo-list__button-wrapper">
            //  <button class="main-todo-list__correct-button" data-action="correct">
            //     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            //         <path d="M15.2322 5.23223L18.7678 8.76777M16.7322 3.73223C17.7085 2.75592 19.2915 2.75592 20.2678 3.73223C21.2441 4.70854 21.2441 6.29146 20.2678 7.26777L6.50006 21.0355H3.00006V17.4644L16.7322 3.73223Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            //         </svg>                            
            // </button>
    //         <button class="main-todo-list__complete-button" data-action="complete">
    //             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="main-todo-list__complete-button_img">
    //                 <path d="M5 13L9 17L19 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    //                 </svg>
    //         </button>
    //         <button class="main-todo-list__delete-button" data-action="delete">
    //             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="main-todo-list__delete-button_img">
    //                 <path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    //                 </svg>                        
    //         </button>
    //     </div>
    // </div>     `
    // }).join('')
    // doneTitle.classList.add("main-todo-list__done-wrapper-active")
    // taskListDone.innerHTML = tasksArrayDone.map((taskDone) => {   
    //     return `<div id="${taskDone.id}" class="main-todo-list__task-wrappper">
    //     <div class="main-todo-list__task main-todo-list__task_done">
    //         <span class="main-todo-list__task-text">${taskDone.text}</span>
    //     </div>
    //     <div class="main-todo-list__button-wrapper">
    //         <button class="main-todo-list__delete-button" data-action="delete">
    //             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="main-todo-list__delete-button_img">
    //                 <path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    //                 </svg>                        
    //         </button>
    //     </div>
    //     </div>     `
    // }).join('')
                                    
})

const acceptAllButton = document.querySelector ('.main-todo-list__accept-all-button') 
acceptAllButton.addEventListener('click', acceptAll)
function acceptAll (event) {
tasksArrayDone = [
    ...tasksArrayDone,
    ...tasksArray.map((item) => ({
    ...item,
    done: true
    }))
  ]
  
tasksArray = [];
taskList.innerHTML = ''
doneTitle.classList.add("main-todo-list__done-wrapper-active")
taskListDone.innerHTML = tasksArrayDone.map((taskDone) => {  
    taskListDone.classList.remove(".main-todo-list__tasks-list-none")
    return `<div id="${taskDone.id}" class="main-todo-list__task-wrappper">
    <div class="main-todo-list__task main-todo-list__task_done">
        <span class="main-todo-list__task-text">${taskDone.text}</span>
    </div>
    <div class="main-todo-list__button-wrapper">
        <button class="main-todo-list__delete-button" data-action="delete">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="main-todo-list__delete-button_img">
                <path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>                        
        </button>
    </div>
    </div>     `
}).join('')
savingToLS()
}
const deleteAllButton = document.querySelector('.main-todo-list__delete-all-button')
deleteAllButton.addEventListener('click', deleteAll)
function deleteAll (event) {
    tasksArray = []
    tasksArrayDone = []
    taskList.innerHTML = ""
    taskListDone.innerHTML = ""
    checkEmptyList()
    addChangeButtons()
    savingToLS()
}
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
    addChangeButtons()       
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
            // task.done = task.done
            tasksArrayDone.push(task)
            tasksArray = tasksArray.filter((item)=> item.id !== task.id)
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
    addChangeButtons()       
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
    savingToLS()
}
const correctButton = document.getElementById("editButton")
taskList.addEventListener('click', editTask)
function editTask (event) {
    console.log (event.target.dataset.action)
    if (event.target.dataset.action === 'correct') {
        let taskWrapper = event.target.closest('.main-todo-list__task-wrappper')
        let taskInputWrapper = taskWrapper.querySelector(".main-todo-list__task")
        taskInputWrapper.classList.add("main-todo-list__task_edit")
        let taskEdit = `<input type="text" class="main-todo-list__edit-task-input">
        <button type="submit" class="main-todo-list__task-button_edit">Save</button>`
        taskInputWrapper.insertAdjacentHTML('beforeend', taskEdit)
        let editButton = taskWrapper.querySelector(".main-todo-list__correct-button")
        editButton.setAttribute('disabled', true);
        editButton.classList.add("main-todo-list__correct-button_disabled")
        let taskText = taskWrapper.querySelector(".main-todo-list__task-text")
        let taskInput = taskWrapper.querySelector(".main-todo-list__edit-task-input")
        let saveButton = taskWrapper.querySelector(".main-todo-list__task-button_edit")
        const found = tasksArray.find((item) => item.id === Number(taskWrapper.getAttribute("id"))) // потому что если добавить элемент по текст то при наличии двух одинаковых элементов он не поймет какой изменять
        console.log (found)
        taskInput.value = taskText.innerHTML
        taskInput.focus()
        taskText.innerHTML = ''
        console.log (taskWrapper.getAttribute("id"))   // как достать значение по атрибуту
        
        saveButton.addEventListener('click', saveChanges) 
        function saveChanges () {
            taskText.innerHTML = taskInput.value
            editButton.setAttribute('disabled', false);
            taskInputWrapper.classList.remove("main-todo-list__task_edit")
            editButton.classList.remove("main-todo-list__correct-button_disabled")
            taskInputWrapper.removeChild(taskInput)
            taskInputWrapper.removeChild(saveButton)
            found.text = taskInput.value
            console.log (event.target.dataset.action)
        }
    }
}
document.querySelector('.main-todo-list__tasks-search').oninput = function() {
    let taskWrapper
    let val = this.value.trim();
    let items = document.querySelectorAll('.main-todo-list__task .main-todo-list__task-text')
    if (val != '') {
        items.forEach(function(elem){
            taskWrapper = elem.closest('.main-todo-list__task-wrappper')
            if (elem.innerText.search(val) == -1) {
                taskWrapper.classList.add('main-todo-list__task-wrappper_hide')                  
            } else {
                taskWrapper.classList.remove('main-todo-list__task-wrappper_hide');
            }
        })
    } else {
        items.forEach(function(elem){
            taskWrapper = elem.closest('.main-todo-list__task-wrappper')
            taskWrapper.classList.remove('main-todo-list__task-wrappper_hide');
        })
    }        
}

function savingToLS() {
    localStorage.setItem('tasksArray', JSON.stringify(tasksArray));
    localStorage.setItem('tasksArrayDone', JSON.stringify(tasksArrayDone));
}  
