// DEfine UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners

loadEventListeners();

// load all event listeners

function loadEventListeners() {
  // DOM load Event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event

  form.addEventListener('submit', addTask)
  //Add Task

  //remove task event
  taskList.addEventListener('click', removeTask);
  clearBtn.addEventListener('click', clearTasks);
  //filter tasks event
  filter.addEventListener('keyup', filterTasks)
}

// Get Tasks from LS

function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach(function(task){
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    //create textNode and append to the li
    li.appendChild(document.createTextNode(task));
    // Create a new link element
    const link = document.createElement('a')
    // Add a class
    link.className = 'delete-item secondary-content'
    // Add the icon html
    link.innerHTML = '<i class="fa fa-remove"></i>'
    li.appendChild(link);
    //append li to the ul
    taskList.appendChild(li);
  })
}


function addTask(e) {
  if (taskInput.value == '') {
    alert('Add a task')
  }
  // create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  //create textNode and append to the li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create a new link element
  const link = document.createElement('a')
  // Add a class
  link.className = 'delete-item secondary-content'
  // Add the icon html
  link.innerHTML = '<i class="fa fa-remove"></i>'
  li.appendChild(link);
  //append li to the ul
  taskList.appendChild(li);


  //Store in LocalStorage
storeTaskInLocalStorage(taskInput.value)


  taskInput.value = ''
  e.preventDefault();
}


function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
      tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));

  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

function removeTask(e) {
if(e.target.parentElement.classList.contains('delete-item')){
  if(confirm('Are you sure?')){
    e.target.parentElement.parentElement.remove()
    removeFromLocalStorage(e.target.parentElement.parentElement);
  }
}
}



function removeFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
      tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));

  }
  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1)
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}



function clearTasks(){
  //taskList.innerHTML = ''
while (taskList.firstChild) {
  taskList.removeChild(taskList.firstChild)
}

//Clear from LS
clearTasksFromLocalStorage();
}



// Clear tasks from ls

function clearTasksFromLocalStorage(){
  localStorage.clear();
}


function filterTasks(e){
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block'
    } else {
      task.style.display = 'none'
    }
  });
}
