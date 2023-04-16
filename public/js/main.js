// selects all the buttons of the same class
let deleteBtn = document.querySelectorAll('.deleteBtn');    
// console.log(deleteBtn);

// Loops through each button and grabs only the button on which click event is called, and eventually a callback of deleteRecord function is called
Array.from(deleteBtn).forEach(btn => {
    btn.addEventListener('click', deleteRecord)
});

// immediately called on the click event. It's an async function as it has some fetch calls inside.
async function deleteRecord(){
    // First grab the data that you want to search in the database in order to delete
    const rec = this.parentNode.childNodes[1].innerText;     // here `this` represents the `button`
    // console.log(rec);

    // try catch block for handling exceptions
    try{
        const response = await fetch('../delete-record', {      // since the server.js file has the api function delete-record, and the server.js file is outside, so we have to go outside the directory of main.js file
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'recordToBeDeleted': rec
            })
        })
        // while this above code runs, it actually does a delete fetch and sends alongwith the required info to the server api where the fetch is pointing to, it then goes to the server.js, does whatever it's told to(i.e., to delete the record), comes back from the server.js, and continues executing the next suybsequent code of this function that's written right below.

        const data = await response.json()  // the response from fetch to be converted to json and stored in variable named `data`
        console.log(data)
        location.reload()   // after receiving the response from the server, it reloads (which again means that it sends a GET request to display the remaining data from the database.)
    }
    catch(err){
        console.log(`Error ${err}`);
    }
}
