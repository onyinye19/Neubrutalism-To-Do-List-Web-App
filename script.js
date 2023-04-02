const addTaskButton = document.querySelector('.add-icon');
const taskList = document.querySelector('.container');

// Fetches tasks from the API and adds them to the page
function loadTasks() {
  let tasks = [];
  
  // Check if there are tasks in local storage
  if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  // Loop through the tasks and create elements for each one
  tasks.forEach(task => {
    const taskElement = createTaskElement(task);
    taskList.appendChild(taskElement);
  });

  // Add an event listener to the form that creates a new task
  taskForm.addEventListener('submit', event => {
    event.preventDefault();
    
    // Get the task title from the input field
    const taskTitle = taskInput.value;
    
    // If the task title is not empty, create a new task object and element
    if (taskTitle !== '') {
      const task = {
        title: taskTitle,
        completed: false
      };
      
      const taskElement = createTaskElement(task);
      taskList.appendChild(taskElement);
      
      // Add the new task to the tasks array and save it to local storage
      tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      
      // Clear the input field
      taskInput.value = '';
    }
  });
}




// Creates a new task element based on a task object
function createTaskElement(task) {
  const taskElement = document.createElement('div');
  taskElement.classList.add('box');
  
  // Check if the task is completed, and add the corresponding class if it is
  if (task.completed) {
    taskElement.classList.add('completed-task');
  }

  // Create the circle icon element
  const circleIcon = document.createElement('div');
  circleIcon.classList.add('circle-icon');
  
  // Check if the task is completed, and add the corresponding checkmark icon if it is
  if (task.completed) {
    circleIcon.innerHTML = '<i class=""></i>';
  }

  // Add a click event listener to the circle icon that toggles the completed-task class
  circleIcon.addEventListener('click', () => {
    taskElement.classList.toggle('completed-task');
    
    // Update the circle icon based on whether the task is completed or not
    if (taskElement.classList.contains('completed-task')) 
    {
      circleIcon.innerHTML = '<i class=""></i>';
    } else {
      circleIcon.innerHTML = '';
    }
  });

  // Create the task text element and set its text content to the task title
  const taskText = document.createElement('div');
  taskText.classList.add('task-text');
  taskText.innerText = task.title;

  // Create the edit icon element
  const editIcon = document.createElement('div');
  editIcon.classList.add('edit-icon');
  editIcon.innerHTML = '<i class="fas fa-pencil-alt"></i>';
  
  // Add a click event listener to the edit icon that prompts the user to edit the task text
  editIcon.addEventListener('click', () => {
    const newTaskText = prompt('Edit task:', task.title);
    
    // If the user enters new text, update the task text
    if (newTaskText !== null && newTaskText !== '') {
      taskText.innerText = newTaskText;
    }
  });

  // Create the delete icon element
  const deleteIcon = document.createElement('div');
  deleteIcon.classList.add('delete-icon');
  deleteIcon.innerHTML = '<i class="fas fa-trash"></i>';
  
  // Add a click event listener to the delete icon that removes the task element from the page
  deleteIcon.addEventListener('click', () => {
    taskElement.remove();
  });

  // Add all the elements to the task element in the correct order
  taskElement.appendChild(circleIcon);
  taskElement.appendChild(taskText);
  taskElement.appendChild(editIcon);
  taskElement.appendChild(deleteIcon);

  // Return the task element
  return taskElement;
}



// Sends a POST request to the API to add a new task
function addNewTask() {
  const taskTitle = prompt('Enter the title of the new task:');
  if (taskTitle) {
    fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: JSON.stringify({
        title: taskTitle,
        completed: false,
        userId: 1
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then(response => response.json())
    .then(data => {
      const taskElement = createTaskElement(data);
      taskList.appendChild(taskElement);
    });
  }
}

addTaskButton.addEventListener('click', addNewTask);

loadTasks();


const boxes = document.querySelectorAll('.box');

// Add click event listener to all edit-icon elements
boxes.forEach(box => {
  const editIcon = box.querySelector('.edit-icon');
  editIcon.addEventListener('click', () => {
    const taskText = box.querySelector('.task-text');
    taskText.focus();
  });
});

// Add click event listener to all delete-icon elements
boxes.forEach(box => {
  const deleteIcon = box.querySelector('.delete-icon');
  deleteIcon.addEventListener('click', () => {
    box.remove();
  });
});

// Add click event listener to add-task element
const addTask = document.querySelector('.add-task');
addTask.addEventListener('click', () => {
  const newBox = document.createElement('div');
  newBox.className = 'box';
  newBox.innerHTML = `
    <span class="circle-icon"></span>
    <span class="task-text" contenteditable="true"></span>
    <span class="edit-icon"><i class="fas fa-pencil-alt"></i></span>
    <span class="delete-icon"><i class="fas fa-trash"></i></span>
  `;
  const container = document.querySelector('.container');
  container.insertBefore(newBox, addTask.parentNode.nextSibling);

  // Add event listeners to new edit-icon and delete-icon elements
  const editIcon = newBox.querySelector('.edit-icon');
  editIcon.addEventListener('click', () => {
    const taskText = newBox.querySelector('.task-text');
    taskText.focus();
  });

  const deleteIcon = newBox.querySelector('.delete-icon');
  deleteIcon.addEventListener('click', () => {
    newBox.remove();
  });
});

