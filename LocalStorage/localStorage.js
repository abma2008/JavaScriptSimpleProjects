/**
 * We will be creating a to-do list using localStorage as the database
 * for storing all the information we want to save.
 * For the purpose of avoiding any clash
 */

// Section for declaring variables and array:
// =================================================================================================
let inputField = document.getElementById(`inputField`); //this is for the inputField element
let submitButton = document.getElementById(`submit`); //this is for the save or submit button
let deleteButton = document.getElementById(`delete-all`); //this is for the delete-all tasks button
let divTasks = document.querySelector(`.tasks`); //this is for selecting the tasks div on the html page

// Creating the arrayOfTasks:
let arrayOfTasks = []; // initializing the array of tasks here
// Checking LocalStorage if it contains tasks or not:
if(localStorage.getItem(`tasks`)){
    arrayOfTasks = JSON.parse(localStorage.getItem(`tasks`));
    addTaskToPage(arrayOfTasks);
    console.clear();
    console.table(arrayOfTasks);
}


// section for creating functions in order:
// ==================================================================================================

// Creating the function of addTaskToPage:
function addTaskToPage(arrayOfTasks){
    divTasks.innerHTML = ``;
    arrayOfTasks.forEach((task)=>{
        let add_task = document.createElement(`div`);
        if(task.completed ===true){
            add_task.classList.add(`d-flex`, `justify-content-between`, `add_task`, `completed`);
        }else{
            add_task.classList.add(`d-flex`, `justify-content-between`, `add_task`);
        }
        add_task.setAttribute(`task-id`, task.id)
        add_task.appendChild(document.createTextNode(task.title));
        let task_button = document.createElement(`button`);
        task_button.innerHTML = `delete`;
        task_button.classList.add(`btn`, `btn-danger`, `del`);
        task_button.setAttribute(`id`, task.id);
        add_task.appendChild(task_button);
        divTasks.appendChild(add_task);
    })
};
// Delete task Function:
function deleteTask(taskid){
    Swal.fire({
        title: `Delete ID: ${taskid}`,
        text: `Do you want to proceed?`,
        background: `bisque`,
        showConfirmButton: true,
        showCancelButton: true
    }).then((result)=>{
        if(result.isConfirmed){
            for(let i=0; i <arrayOfTasks.length; i++){
            if(arrayOfTasks[i].id == taskid){
                arrayOfTasks.pop(i);
            }
            // updating the localStorage:
            localStorage.setItem(`tasks`, JSON.stringify(arrayOfTasks));
            console.clear();
            console.table(arrayOfTasks);
        }
        
    }
})
}



// section for checking the inputField and prcoedures should take place if there is a value inserted:
// ==================================================================================================

// creating onclick event on the submit button:
submitButton.onclick=()=>{
    if(inputField.value != ``){
        // creating our object of task:
        let task = { id: Date.now(), title: inputField.value, completed: false};
        // pushing the new object task into the arrayOfTasks:
        arrayOfTasks.push(task);
        // adding the arrayOfTasks to the localStorage:
        localStorage.setItem(`tasks`, JSON.stringify(arrayOfTasks));
        addTaskToPage(arrayOfTasks); // calling the function addTaskToPage()
        inputField.value=``;
        inputField.setAttribute(`placeholder`, `Enter Task`)
        inputField.focus();
        console.clear();
        console.table(arrayOfTasks);

    }else{
        inputField.setAttribute(`placeholder`,`Must give Task name`);
        inputField.focus();
        setTimeout(()=>{
            inputField.setAttribute(`placeholder`, `Enter Task`)
        }, 3000)
    }
}

// adding window event listener to capture del class button:
window.addEventListener(`click`, (e)=>{
    if(e.target.classList.contains(`del`)){
        let taskid = e.target.getAttribute(`id`);
        e.target.parentElement.remove();
        deleteTask(taskid);
    }
});

// adding window event listener on dbclick to update the completed status of the task:
window.addEventListener(`dblclick`, (e)=>{
    if(e.target.classList.contains(`add_task`)){
        let taskid = e.target.getAttribute(`task-id`);
        for(let i=0; i <arrayOfTasks.length; i++){
            if(arrayOfTasks[i].id == taskid){
                arrayOfTasks[i].completed ===true?arrayOfTasks[i].completed=false: arrayOfTasks[i].completed=true;
                e.target.classList.toggle(`completed`);
            }
        }
        //updating localstorage:
        localStorage.setItem(`tasks`, JSON.stringify(arrayOfTasks));
        console.clear();
        console.table(arrayOfTasks)
        
    }
})

// Delete all event listener:
deleteButton.onclick=()=>{
    Swal.fire({
        title: `Delete All Tasks`,
        text: `Do you want to delete all tasks?`,
        background: `bisque`,
        showCancelButton: true,
        showConfirmButton: true
    }).then((result)=>{
        if(result.isConfirmed){
            arrayOfTasks = []; //emptying the arrayOfTask
            localStorage.removeItem(`tasks`);
            console.clear();
            console.log(`All Tasks have been removed successfully!`);
            // setting the divTasks to empty innerHTML:
            divTasks.innerHTML=``;
        }
    })
}