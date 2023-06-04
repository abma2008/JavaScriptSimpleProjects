/**
 * this is the index.js 
 * ====================
 * this is a tutorial to try to understand regarding XMLHttpRequest()
 */

// declaring variables here:
let displayDiv = document.querySelector(`.display`);
let tableDiv = document.querySelector(`.table`);
let nameInput = document.getElementById(`name`);
let ageInput = document.getElementById(`age`);
// Get using XMLHttpRequest:
function getData(){
    // clearing the console from the previous entries:
    console.clear();
    let getRequest = new XMLHttpRequest();
    getRequest.open(`GET`,`http://localhost:3000/items`, true);
    getRequest.send();
    getRequest.onreadystatechange = function(){
        if(this.readyState === 4 && this.status ===200){
            let result = this.responseText
            let data = JSON.parse(result)
            if(data.length >0 && data.length !==0){
                displayDiv.innerHTML=``; //Empty display div everytime we click the getData button
                let counter = 1;
                data.forEach(item=>{
                let info_div = document.createElement(`div`);
                info_div.innerHTML = `
                <div class="card" style="width: 100%;">
                <div class="card-header"><h1>${counter}</h1></div>
                <div class="card-body">
                    <h5 class="card-title">ID: ${item.id}</h5>
                    <p class="card-text"><b>My Name is</b> <em>${item.name}</em> <b>and I am</b> ${item.age}</p>
                    <a href="http://localhost:3000/items/${item.id}" target="_blank" class="btn btn-primary">Click me</a>
                    <a href="" data-id="${item.id}" class="btn btn-warning" onclick="itemUpdate(${item.id})">Update Me</a>
                    <a href="" data-id="${item.id}" class="btn btn-danger" onclick="itemDelete(${item.id})">Delete Me</a>
                </div>
                </div>
                `
                // item.age >=40? document.querySelector(`tr [color-data]=${item.age}`).style.backgroundColor=`yellow`: document.querySelector(`[color-data]=${item.age}`).style.backgroundColor = `lightgreen`;
                displayDiv.appendChild(info_div);
                counter++;
            })
            }
            else{
                console.clear();
                console.log(`No Data to retrieve`);
            }
            
        }
    }
};

// post using XMLHttpRequest:
function postData(){
    
    let name = document.getElementById(`name`);
    let age = document.getElementById(`age`);
    if(name.value ==`` || age.value == ``){
        console.clear();
        //Setting the alert sweet for this condition:
        name.setAttribute(`placeholder`, `Enter Name or Full Name`);
        age.setAttribute(`placeholder`,`Enter Age in numbers`);
        setTimeout(()=>{
            name.setAttribute(`placeholder`, ``);
            age.setAttribute(`placeholder`,``);
        }, 3000)
        
        
    }
    else{
    let myObject = {name: name.value, age: age.value}
    //initiate the request:
    let postRequest = new XMLHttpRequest();
    postRequest.open(`POST`, `http://localhost:3000/items`, true);
    postRequest.setRequestHeader(`Content-Type`, `application/json`);
    postRequest.send(`${JSON.stringify(myObject)}`);
    
    }
    name.focus();
    name.value=``;

    
};

// setting window on load to display the information:
window.onload=()=>{
    getData();
}

// creating DELETE request Using prompt:
function deleteRequest(){
    // initialize the prompt to get the ID:
    let del_id = prompt(`Enter ID to delete:`);
    if(del_id.length > 0){
        del_id = parseInt(del_id);
        let getRequest = new XMLHttpRequest();
        getRequest.open(`GET`, `http://localhost:3000/items/${del_id}`, true);
        // sending the request:
        getRequest.send();
        getRequest.onreadystatechange = function(){
            if(this.readyState === 4 && this.status === 200){
                let deleteRequest = new XMLHttpRequest();
                deleteRequest.open(`DELETE`, `http://localhost:3000/items/${del_id}`, true);
                deleteRequest.send()
                alert(`Successfully Deleted ID: ${del_id}`)

            }
            
        }
        
    }
    else{
        Swal.fire({
            icon: `warning`,
            title: `Empty Value`,
            text: `Cannot Proceed with Empty Value`,
            timer: 2500
        })
    }
}


// delete button:
function btnDelete(del_id){
    // initialize the prompt to get the ID:
        let getRequest = new XMLHttpRequest();
        getRequest.open(`GET`, `http://localhost:3000/items/${del_id}`, true);
        // sending the request:
        getRequest.send();
        getRequest.onreadystatechange = function(){
            if(this.readyState === 4 && this.status === 200){
                let deleteRequest = new XMLHttpRequest();
                deleteRequest.open(`DELETE`, `http://localhost:3000/items/${del_id}`, true);
                deleteRequest.send()
                alert(`Successfully Deleted ID: ${del_id}`)

            }
        }
    }

// update button:
function btnUpdate(){
    let update_name = prompt(`Enter Name: `);
    let update_age = prompt(`Enter Age: `);
    let update_id = prompt(`Enter ID: `);
    if(update_name && update_age && update_id){
        let updateRequest = new XMLHttpRequest();
        updateRequest.open(`PUT`, `http://localhost:3000/items/${update_id}`, true);
        updateRequest.setRequestHeader(`Content-Type`, `application/json`);
        updateRequest.send(JSON.stringify({name: update_name, age: update_age}));
        updateRequest.onreadystatechange = function(){
            if(this.readyState ===4 && this.status ===200){
                alert(`Update Successful of id: ${update_id}`)
            }
        }
    }
}

// itemUpdate function:
function itemUpdate(id){
    let update_name = prompt(`Enter Name: `);
    let update_age = prompt(`Enter Age: `);
    if(update_name && update_age){
        let updateRequest = new XMLHttpRequest();
        updateRequest.open(`PUT`, `http://localhost:3000/items/${id}`, true);
        updateRequest.setRequestHeader(`Content-Type`, `application/json`);
        updateRequest.send(JSON.stringify({name: update_name, age: update_age}));
        updateRequest.onreadystatechange = function(){
            if(this.readyState ===4 && this.status ===200){
                alert(`Update Successful of id: ${id}`)
            }
            else{
                alert(`Something went wrong`)
            }
        }
    }
}

// itemDelete function:
function itemDelete(id){
    // This is to remove the Items by clicking the button associated with them on the page:
    let itemRequest = new XMLHttpRequest();
        itemRequest.open(`DELETE`,`http://localhost:3000/items/${id}`,true);
        itemRequest.setRequestHeader(`Content-Type`, `application/json`);
        itemRequest.send();
        itemRequest.onreadystatechange = function(){
            if(this.readyState ===4 && this.status ===200){
                alert(`The item ID ${id} has been removed successfully`);
            }
        }
    }


