
const cardFragment = document.createDocumentFragment();

let events = data.events;
let currentDate = data.currentDate;

console.log(events);

let cards = document.getElementById("cards")

function printPastEvents(array, cards) {
    for (let event of array) {
        if (currentDate > event.date) {

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
    }
    cards.appendChild(cardFragment)
}

printPastEvents(events, cards)