const ul = document.querySelector('ul');
const search = document.querySelector('input');

let userArray = [];

async function getAllProducts(){
    const response = await fetch('https://randomuser.me/api/?results=10');
    const data = await response.json();
    return data;
}

async function createUsers(){
    const users = await getAllProducts();
    userArray = users.results;

    ul.innerHTML = '';
    users.results.forEach((user) => {
        ul.innerHTML += `
            <li>
                <img src="${user.picture.medium}" />
                <div>
                    <h5 class="name">${user.name.first + ' ' + user.name.last}</h5>
                    <span class="city">${user.location.city}</span>
                </div>
            </li>
        `
    })
}

window.onload = function() {
    createUsers();

    search.addEventListener('keyup', async (e) => {
        let inputText = search.value.toLowerCase();
        ul.innerHTML = '';
        
        userArray.forEach((user) => {
            console.log(user.location.city);
            if(user.location.city.toLowerCase().includes(inputText) || user.name.first.toLowerCase().includes(inputText) || user.name.last.toLowerCase().includes(inputText)){
                ul.innerHTML += `
                    <li>
                        <img src="${user.picture.medium}" />
                        <div>
                            <h5 class="name">${user.name.first + ' ' + user.name.last}</h5>
                            <span class="city">${user.location.city}</span>
                        </div>
                    </li>
                `
            }
        })
    })
}