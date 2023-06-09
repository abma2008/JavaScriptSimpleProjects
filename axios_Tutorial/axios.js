// The section below is for declaring variables of the DOM:
let container = document.querySelector(`.container`);
let form = document.querySelector(`#form`);
let dataShow = document.querySelector(`.data-show`);
let getButton = document.querySelector(`#getButton`);
let postButton = document.querySelector(`#postButton`);
let putButton = document.querySelector(`#putButton`);
let deleteAllButton = document.querySelector(`#deleteAllButton`);
let tableData = document.querySelector(`#table-data`);
let selectClassbutton = document.querySelector(`.select`);


// ===========================================================
// This section is for creating functions to be called later:
// getData:
let getData = async () =>{
    $(`.show-data`).html(``)
    await axios.get(`http://localhost:3000/emps`)
    .then((response)=>{
        return response.data
    }).then((data)=>{
        // clearing the console each time the window loads:
        console.clear();
        console.table(data);
        let header = `
            <thead>
            <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Occupation</th>
            <th>Email</th>
            <th>URL</th>
            <th>Edit</th>
            <th>Delete</th>
            <th>select</th>
            </tr>
            </thead>`;
            tableData.innerHTML = header;
        if(data.length >0){
            data.forEach(record=>{
                tableData.innerHTML +=
                `
                <tbody>
                <tr>
                <td>${record.id}</td>
                <td>${record.name}</td>
                <td>${record.job}</td>
                <td>${record.email}</td>
                <td><a href="http://${record.url}"  class="btn btn-sm btn-outline-success" target="_blank">Visit</a></td>
                <td><a data-id="${record.id}" class="btn btn-sm btn-outline-warning edit">Edit</a></td>
                <td><a data-id="${record.id}" class="btn btn-sm btn-outline-danger delete">Delete</a></td>
                <td><a data-id="${record.id}"
                data-name="${record.name}" data-job="${record.job}" data-email="${record.email}" data-url="${record.url}"
                class="btn btn-sm btn-outline-secondary select">select</a></td>
                </tr><t/body>
                `
            })
        }
        else {
            tableData.innerHTML =``;
        }
    })
}

// postData:
let postData = async ()=>{
    if($(`#name`).val() && $(`#job`).val()  && $(`#email`).val() && $(`#url`).val()){
        let data = {
        name: document.querySelector(`#name`).value,
        job: document.querySelector(`#job`).value,
        email: document.querySelector(`#email`).value,
        url: document.querySelector(`#url`).value
    }
    const post_data = await axios.post(`http://localhost:3000/emps`, data)
    .then((response)=>{
        return response
    }).then((msg)=>{
        msg.status ===201? alert(`It is working`):alert(`Something went wrong`)
    })
    } else {
        Swal.fire({
            icon: `info`, title: `Missing Data`,
            text: `You are not providing any data to save!!!!`,
            timer: 2000,
        })
       
    }
     $(`#name`).focus();
    
}
// updateData:
let putData = ()=> {
    if($(`#name`).val() && $(`#job`).val() && $(`#email`).val() && $(`#url`).val()){
        let id = prompt(`Enter ID: `)
        let data ={
        name: $(`#name`).val(), 
        job: $(`#job`).val(),
        email: $(`#email`).val(),
        url: $(`#url`).val()
        }
        axios.put(`http://localhost:3000/emps/${id}`, data)
        .then((response)=>{
            return response.status
        }).then((msg)=>{
            if(msg ===200){
                alert(`Updated successfully`);
                getData();
            } else {
                console.log(msg);
                alert(`something went wrong`);
                
            }
        })
    }
    else {
        Swal.fire({
            icon: `error`,
            title: `Missing Data`,
            text: `Fill out the form before entering the ID to Update`,
            timer: 2500,
        })
    }
    
}
// deleteAllData() function:
let deleteAllData = ()=>{
    Swal.fire({
        icon: `warning`,
        title: `Delete All Emps`,
        text: `Do you want to delete all records in emps?`,
        showConfirmButton: true,
        showCancelButton: true,
    }).then((result)=>{
        if(result.isConfirmed){
            axios.get(`http://localhost:3000/emps`)
            .then((response)=>{
                return response.data
            }).then((data)=>{
                if(data.length !==0){
                    data.forEach(record=>{
                        axios.delete(`http://localhost:3000/emps/${record.id}`)
                    })
                }
            })
        }
    })
}
// this is the section for assigning functions to buttons:

getButton.addEventListener(`click`, function(){
    getData();
})

postButton.addEventListener(`click`, function(){
    postData();
})

putButton.addEventListener(`click`, function(){
    putData();
})
deleteAllButton.addEventListener(`click`, function(){
    deleteAllData();
})


// This is on window loading, we will be calling the getData() function:
window.onload = ()=>{
    getData();
    $(`#name`).focus();
}


// catching the event when the classes are either edit or delete:
document.addEventListener(`click`, function(e){
    if(e.target.classList.contains(`delete`)){
        let data_id = e.target.getAttribute(`data-id`);
        Swal.fire({
            icon: `warning`,
            title: `Removing ID ${data_id}`,
            text: `Do you want to delete record ID: ${data_id}?`,
            showConfirmButton: true,
            showCancelButton: true,
        }).then((result)=>{
            if(result.isConfirmed){
                 axios.delete(`http://localhost:3000/emps/${data_id}`)
                 .then((response)=>{
                    return response;
                 }).then(msg=>{
                    // msg.status ===200?alert(`Record ID ${data_id} has been deleted`): alert(`Something went wrong`)
                 })
            }
        })
    }
    else if(e.target.classList.contains(`select`)){
        $(`#name`).val(e.target.getAttribute("data-name"))
        $(`#job`).val(e.target.getAttribute("data-job"))
        $(`#email`).val(e.target.getAttribute("data-email"))
        document.querySelector(`#url`).value = e.target.getAttribute(`data-url`);

    }
    
})


