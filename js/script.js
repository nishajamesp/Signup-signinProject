const API_URL="https://69626ac4d9d64c761907d511.mockapi.io/PhoneBook";

let editId = "";

let form = document.getElementById("phoneform");
let phoneList = document.getElementById("phonelist");


let nameinput = document.getElementById("name");
let phoneinput = document.getElementById("phone");
let searchinput = document.getElementById("search");

async function getcontact(){
    const res = await fetch(API_URL);
    const phonelists = await res.json();
    console.log(phonelists);
    displayphonelists(phonelists);
}

function displayphonelists(listing) {
    phoneList.innerHTML = "";

    listing.forEach(contact => {
        phoneList.innerHTML += `
            <div class="contact-row">
                <span class="contact-name">${contact.name}</span>
                <span class="contact-phone">${contact.phone}</span>

                <div class="contact-actions">
                    <button class="edit-btn" onclick="editcontact(${contact.id})">
                        Edit
                    </button>
                    <button class="delete-btn" onclick="deletecontact(${contact.id})">
                        Delete
                    </button>
                </div>
            </div>
        `;
    });
}

form.addEventListener('submit', async(e) =>{
    e.preventDefault();

    const phonedata = {
        name:nameinput.value,
        phone:phoneinput.value,
    }

    if(editId !== ""){
        await fetch(`${API_URL}/${editId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(phonedata)
        });
        editId = "";
        form.querySelector("button").innerText = 'Add contact';
    }
    else{
    await fetch(API_URL,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(phonedata)
    })
}
    form.reset()
    getcontact();
});

async function deletecontact(id){
    alert("id is : " + id);
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });
    getcontact();
}

async function editcontact(id){
     const response = await fetch(`${API_URL}/${id}`)
     const phonelist = await response.json()

     nameinput.value = phonelist.name;
     phoneinput.value = phonelist.phone;

     editId = id;
     form.querySelector("button").innerText = 'Update contact';
}

searchinput.addEventListener('input', async function (){
    const res = await fetch(API_URL)
    const phonelists = await res.json()

    let result = []
    
    for(let i=0; i<phonelists.length; i++){
        const phonelist = phonelists[i]

        if(phonelist.name.includes(searchinput.value)){
            result.push(phonelist)
        }
        if(phonelist.phone.includes(searchinput.value)){
            result.push(phonelist)
        }
        displayphonelists(result);
    }
})

getcontact();
