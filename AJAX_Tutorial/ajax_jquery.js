// this is a direct usage of JQuery without the old syntax.
// Please make sure to view them :)

$(() => {
    // This is the button handling hiding the container class from the page:
    $(`.container`).on(`dblclick`, () => {
        $(`.container`).slideUp(2000);
        $(`#show-container`).slideDown(2000);
    })
    // This is the button in the header handling showing back the container div:
    $(`#show-container`).on(`click`, () => {
        $(`#show-container`).slideUp(2000);
        $(`.container`).slideDown(2000);
    })
    // Creating a function for posting data to ajax.json file:
    let postData = () => {
        if ($(`#firstname`).val() == `` || $(`#lastname`).val() == `` || $(`#phone`).val() == `` || $(`#email`).val() == ``) {
            Swal.fire({
                icon: `info`,
                title: `Missing Data`,
                text: `Must provide data`
            })
            $(`#firstname`).focus();
        }
        else {
            // This is the part of ajax that posts the data into the items json file.
            $.ajax({
                method: `POST`,
                url: `http://localhost:3000/items`,
                data: {
                    firstname: $(`#firstname`).val(),
                    lastname: $(`#lastname`).val(),
                    phone: $(`#phone`).val(),
                    email: $(`#email`).val()
                },
                success: function (data, status) {
                    console.log(data, status)
                    alert(`The data has been saved successfully`)
                },
                error: function (err, status) {
                    console.log(err, status)
                }
            })
        }
    }

    // creating a function to getData:
    let getData = function () {
        let table = document.querySelector(`#data-table`);
        let table_head = `
        <tr>
        <thead>
        <th>ID</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Phone</th>
        <th>Email Address</th>
        <th>edit</th>
        <th>delete</th>
        </thead>
        </tr>`
        $.ajax({
            method: `GET`,
            url: `http://localhost:3000/items`,
            data: {
                items: `items`
            },
            success: function (items, status) {
                // console.table(items)
                // console.log(status)
                if (items.length != 0) {
                    table.innerHTML = table_head;
                    items.forEach(item => {
                        let table_row = `
                        <tr>
                        <tbody>
                        <td>${item.id}</td>
                        <td>${item.firstname}</td>
                        <td>${item.lastname}</td>
                        <td>${item.phone}</td>
                        <td>${item.email}</td>
                        <td><a id="${item.id}" class="btn btn-sm btn-outline-warning update">Edit</a></td>
                        <td><a id="${item.id}" class="btn btn-sm btn-outline-danger del">Delete</a></td>

                        </tbody>
                        </tr>`;
                        table.innerHTML += table_row;
                    })
                }
                else {
                    $(`#show-data`).html(``);
                }
            },
            error: function (err) {
                console.log(err);
            }
        })
    }

    //editButton ........ updateData():
    let updateData = (id) => {
        $.ajax({
            method: `PUT`,
            url: `http://localhost:3000/items/${id}`,
            data: {
                firstname: prompt(`Enter First Name: `),
                lastname: prompt(`Enter Last Name: `),
                phone: prompt(`Enter Phone Number: `),
                email: prompt(`Enter Email Address: `),
            },
            success: function (data, status) {
                alert(`The Item has been updated...... ID: ${id}`)
            },
            error: function () {
                alert(`Something went wrong`)
            }
        })
    }

    // deleteButton.....deleteData():
    let deleteData = (id) => {
        Swal.fire({
            icon: `warning`,
            title: `ID: ${id}`,
            text: `are you sure you want to delete item ID: ${id}?`,
            showConfirmButton: true,
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                // This is the part of ajax that deletes the item from the table:
                $.ajax({
                    method: `DELETE`,
                    url: `http://localhost:3000/items/${id}`,
                    success: function () {
                        alert(`The Item has been deleted successfully..... ID: ${id}`)
                    },
                    error: function () {
                        alert(`Something went wrong.....`)
                    }
                })
            }
        })
    }

    // Delete all Data by clicking the button deleteButton:
    let deleteAllData = () => {
        Swal.fire({
            icon: `warning`,
            title: `Delete All`,
            text: `Are you Sure you want to proceed with this action?`,
            showConfirmButton: true,
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                // this is the part that handles removing all items:
                $.ajax({
                    method: `GET`,
                    url: `http://localhost:3000/items`,
                    success: function (data, status) {
                        if (data.length != 0) {
                            data.forEach(item => {
                                $.ajax({
                                    method: `DELETE`,
                                    url: `http://localhost:3000/items/${item.id}`,
                                    success: function () { },
                                    error: function () { }
                                })
                            })
                        }
                        else {
                            alert(`No Data to delete`)
                        }
                    },
                    error: function () {
                        alert(`something went wrong`)
                    }
                })
            }
        })
    }


    // Assigning the function postData to the button postButton:
    $(`#postButton`).on(`click`, function () {
        postData();
    })

    // Assigning the function getData to the button getButton:
    $(`getButton`).on(`click`, () => {
        getData();
    })

    // using document event to select the target:
    document.addEventListener(`click`, function (e) {
        if (e.target.classList.contains(`update`)) {
            let get_id = e.target.getAttribute(`id`)
            updateData(get_id);
        }
        else if (e.target.classList.contains(`del`)) {
            let get_id = e.target.getAttribute(`id`)
            deleteData(get_id);
        }
    })


    // adding onclick to deleteButton:
    $(`#deleteButton`).on(`click`, function () {
        deleteAllData();
    })

    // hideShowBtn Functionality:
    $(`#hideShowBtn`).on(`click`, function () {
        $(`.show-data`).slideToggle(3000);
        $(`#hideShowBtn`).text() === `Hide Table` ? $(`#hideShowBtn`).text(`Show Table`) : $(`#hideShowBtn`).text(`Hide Table`)
    })
    // onload functionality:
    window.onload = () => {
        getData();
        $(`#firstname`).focus();
    }
})