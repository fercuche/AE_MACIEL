
const cardFragment = document.createDocumentFragment();

let events = data.events;

console.log(events);

let cards = document.getElementById("cards")

function printEvents(array, cards) {
    cards.innerHTML = ""
    for (let event of array) {
        let divCard = document.createElement('div');
        divCard.className = "card border-0 mx-1 mt-3 rounded-1 overflow-hidden"
        divCard.innerHTML += `
            <img src="${event.image}" class=" card-img-top" alt="card image">
            <div class="card-body">
                <h5 class="card-title">${event.name}</h5>
                <p class="card-text">${event.category}</p>
                <p class="fw-bold">Price $${event.price}</p>
                <div class="price d-flex justify-content-center">
                    <a class="btn btn-danger" href="/pages/details.html"> Read more</a>
                </div>
            </div>
            `
        cardFragment.appendChild(divCard)
    }
    cards.appendChild(cardFragment)
}

    printEvents(events, cards)

/*Display category checkboxes*/
const checkboxFragment = document.createDocumentFragment();

let checkboxes = document.getElementById("category-checkbox")

let categories = Array.from(new Set(events.map(element => element.category)))

function displayCategories(array, checkboxes) {
    array.forEach(category => {
        let categoryDiv = document.createElement('div');
        categoryDiv.className = "form-check form-check-inline"
        categoryDiv.innerHTML += `
                    <input class="form-check-input" type="checkbox" id="${category}" value="${category}">
                    <label class="form-check-label category-label" for="${category}">${category}</label>
                    `
        checkboxFragment.appendChild(categoryDiv);
    })
    checkboxes.appendChild(checkboxFragment)
}
displayCategories(categories, checkboxes)

/*Search Box Input*/

const searchBox = document.getElementById("search-box")

function searchEvent() {
    const query = searchBox.value.toLowerCase();

    const filteredEvents = events.filter(event => event.name.toLowerCase().includes(query))
    printEvents(filteredEvents, cards)
    console.log(filteredEvents)
}

searchBox.addEventListener('keyup',searchEvent);