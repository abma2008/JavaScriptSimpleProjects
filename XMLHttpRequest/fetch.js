/**
 * This is using fetch to GET, POST, PUT, and DELETE
 * from the json-server ;)
 * Please make sure to complete this exercise....
 */
// Declaring variables here:
let form = document.getElementById(`form`);
let firstName = document.getElementById(`firstname`);
let lastName = document.getElementById(`lastname`);
let phone = document.getElementById(`phone`);
let email = document.getElementById(`email`);
let postButton = document.getElementById(`post-data-button`);
let getButton = document.getElementById(`get-data-button`);
let updateButton = document.getElementById(`update-data-button`);
let deleteButton = document.getElementById(`delete-data-button`);
let deleteAllButton = document.getElementById(`delete-all-button`);
let showData = document.querySelector(`.show-data`);
let tableID = document.querySelector(`#table-show`);

// ============================================================================================================
// postData function:
function postData(){
    if(firstName.value ===`` || lastName.value ===`` || phone.value ===`` || email.value ===``){
        Swal.fire(`Some information are missing`);
        // Setting placeholder message:
        firstName.setAttribute(`placeholder`, `Must Provide First Name`);
        lastName.setAttribute(`placeholder`, `Must provide Last Name`);
        phone.setAttribute(`placeholder`, `Must Enter Phone Number`);
        email.setAttribute(`placeholder`, `Must Enter Email Address`);
        setTimeout(()=>{
            firstName.removeAttribute(`placeholder`);
            lastName.removeAttribute(`placeholder`);
            phone.removeAttribute(`placeholder`);
            email.removeAttribute(`placeholder`);
            firstName.focus();
        },3000)
    }
    else {
        let formData = new FormData(form);
        let data = Object.fromEntries(formData);
        let options ={
            method: `POST`,
            headers:{ "Content-Type": "application/json"},
            body: JSON.stringify(data)
        }
    fetch(`http://localhost:3000/items`, options)
    .then(response=>{
        return response
    }).then(msg =>{
        msg.status ===201? alert(`The POST has been done successfully`): alert(`Something went wrong`)
    })
        
    }
}

// getData function:
function getData(){
    fetch(`http://localhost:3000/items`)
    .then(response =>{
        return response.json()
    }).then(data =>{
        if(data.length > 0){
        console.clear();
        console.table(data);
        // using counter to track items:
        let counter =1;
        // cleaning tableID innerHTML with each refresh:
        tableID.innerHTML =``;
        tableID.innerHTML =`
        <tr>
            <thead>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Email Address</th>
            <th>Edit</th>
            <th>Delete</th>
            </thead>
        </tr>
        `
        // appending the results into the tableID:
        data.forEach(item =>{
            tableID.innerHTML +=
            `
            <tbody>
            <tr>
            <td>${counter}</td>
            <td>${item.firstname}</td>
            <td> ${item.lastname}</td>
            <td>${item.phone}</td>
            <td>${item.email}</td>
            <td><a href="#" class="btn btn-sm btn-outline-warning" onclick="itemUpdate(${item.id})">Update</a></td>
            <td><a href="#" class="btn btn-sm btn-outline-danger" onclick="alertItemDelete(${item.id})">Delete</a></td>
            </tr>
            
            </tbody>
            `
            counter++;
        })
        }
        else {
            tableID.innerHTML = `<h3> No Data to Display</h3>`
        }
    })

}

// deleteData function:
function deleteData(){
    let get_id = prompt(`Enter the id: `);
    if(get_id !==`` || get_id.length !==0){
        fetch(`http://localhost:3000/items/${get_id}`, {method: `DELETE`})
        .then(response =>{
            return response.status
        }).then(msg =>{
            msg === 200? alert(`Deleting ${get_id} successful`): alert(`Something went wrong`);
        })
    }
}

// updateData function:
function updateData(){
    if(firstName.value ===`` || lastName.value ===`` || phone.value ===`` || email.value ===``){
        Swal.fire(`Some information are missing`);
    }
    else {
        let update_id = prompt(`Enter ID to update: `)
        let formData = new FormData(form); // a quick way of garbing the values of the form without the need to extract them one by one
        // for testing purposes:
        // ==================================
        // console.log(formData.get(`firstname`));
        // console.log(formData.get(`lastname`));

        // ==================================
        let data = Object.fromEntries(formData); //for this feature to work, you must have name attribute assigned to each input
        // viewing data object in console for testing:
        console.table(data);
        let options ={
            method: `PUT`,
            headers: {"content-type": "application/json"},
            body: JSON.stringify(data)
        }
        fetch(`http://localhost:3000/items/${update_id}`, options)
        .then(response =>{
            return response.status
        }).then(view =>{
            view === 200? alert(`Update of ${update_id} successful`): alert(`Something went wrong in updating`)
        })
    }
}

// deleteAllData function():
function deleteAllData(){
    alert(`To delete:
    - Must specify a specific record.
    - you cannot delete all records at once
    `)
}

// itemDelete function:
function itemDelete(id){
    fetch(`http://localhost:3000/items/${id}`, {
        method:`DELETE`,
        headers: {"Contet-Type": "application/json"}
    })
    .then(response =>{
        return response
    }).then(msg =>{
        msg.status === 200? alert(`Item is deleted`): alert(`Something went wrong`)
    })
}

// function itemUpdate:
function itemUpdate(id){
    fetch(`http://localhost:3000/items/${id}`, {
        method: `PUT`,
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(
            {firstname: prompt(`Enter First Name: `),
             lastname: prompt(`Enter Last Name: `),
             phone: prompt(`Enter Phone Number: `),
             email: prompt(`Enter Email Address: `)
            }
        )
    }).then(response =>{
        return response
    }).then(msg =>{
        msg.status ===200? alert(`Item has been updated`): alert(`Something went wrong`)
    })
}




// =================================================================
// assigning add event listener to postData:
postButton.addEventListener(`click`, postData); 
getButton.addEventListener(`click`, getData);
deleteButton.addEventListener(`click`, deleteData);
updateButton.addEventListener(`click`, updateData);
deleteAllButton.addEventListener(`click`, deleteAllData);
window.onload=()=>{
    getData();
}


// creating an onclick event on the h1 title to display a message about this tutorial:
document.querySelector(`.container h1`).addEventListener(`click`, ()=>{
     alert(`
        What this Tutorial Contains:
        1- Basic Syntax of fetch function in JavaScript
        2- How to use method GET
        3- How to use method POST
        4- How to use method PUT
        5- How to use method DELETE
        json-server is used since it is installed globally
        ==========================
        also, we have included some bootstrap functionality
        in addition to some CSS styling.
        This is a very useful and educative tutorial.
        `)

});

function alertItemDelete(id){
    Swal.fire({
        icon: `warning`,
        title: `Removing ID ${id}`,
        html: `<b> Do you want to proceed? </b>`,
        showConfirmButton: true,
        showCancelButton: true
    }).then((result)=>{
        if(result.isConfirmed){
            itemDelete(id);
        }
    })
}