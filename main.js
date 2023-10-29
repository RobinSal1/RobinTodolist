function newElement() {  //User input//
    var taskText = document.getElementById("myInput").value; { //entered text
    var newTaskitem = document.createElement("li"); //New list item
    newTaskitem.appendChild(document.createTextNode(taskText)); //append the text node
    document.getElementById("myUL").appendChild(newTaskitem);
    document.getElementById("myInput").value = ""; // Clear the input field
    updateTasksLeftCount() //update count
    localStorage.setItem('tasks', document.getElementById('myUL').innerHTML); //store to localstorage
    }
}

function validateInput() { // validating the input
    var userInput = document.getElementById("myInput").value; //entered text
    var userInputElement = document.getElementById("myInput"); //get the input element

    if (userInput === "" || userInput.length > 20) { 
        userInputElement.classList.add("error-border"); // add invalid red border
        return false; // input is invalid
    } else {
        userInputElement.classList.remove("error-border"); // remove the invalid border
        return true; // input is valid
    }
}

function clickevent() { // check the validation
    var isValid = validateInput(); // validate the input
    if (!isValid) {
        return; // return if invalid
    }
    newElement(); // add valid input to the list
}

document.getElementById('myUL').addEventListener('click', function(event) { //select the myUL element and execute the element function when clicked
    if (event.target.tagName === 'LI') { //check if its a list item
      event.target.classList.toggle('checked'); // toggle the checked class and add it or remove it
      updateTasksLeftCount();//update count
      localStorage.setItem('tasks', this.innerHTML); // store to localstorage
    }
  });
function updateTasksLeftCount() {
    var tasks = document.querySelectorAll('ul li:not(.checked)'); //select all the elements that do not have the class checked
    var tasksLeft = tasks.length; //number of li elements without the checked class. 
    document.getElementById('tasks-left').textContent = 'Tasks left: ' + tasksLeft;
}

document.getElementById('clear').addEventListener('click', function() { // click event to the Id="clear"
    var completedTasks = document.querySelectorAll('ul li.checked'); // select all of the li elements that are checked
    completedTasks.forEach(function(task) { 
    task.remove(); // remove the checked tasks with a loop
    localStorage.setItem('tasks', document.getElementById('myUL').innerHTML); //update the localstorage
    });
    updateTasksLeftCount();
});

var taskstorage = localStorage.getItem('tasks'); // get the stored tasks form localstorage
if (taskstorage) {
    document.getElementById('myUL').innerHTML = taskstorage;
}
updateTasksLeftCount(); //update the count


