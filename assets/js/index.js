/*agregr todos los elementos con $ arriba de todo*/
let events = data.events;
let cards = document.getElementById("cards")
const cardFragment = document.createDocumentFragment();
const checkboxFragment = document.createDocumentFragment();
const checkedCheckboxes = document.querySelectorAll('input[type=checkbox]')
const searchBox = document.getElementById("search-box")
let checkboxes = document.getElementById("category-checkbox")
let categories = Array.from(new Set(events.map(element => element.category)))
///tambien se puede usar el spread operator [...new Set()] en lugar de array from

function printEvents(array, cards) {
    cards.innerHTML = ""
    array.forEach(event => {
        let divCard = document.createElement('div');
        divCard.className = "card border-0 mx-1 mt-3 rounded-1 overflow-hidden"
        divCard.innerHTML += `
            <img src="${event.image}" class=" card-img-top" alt="card image">
            <div class="card-body">
                <h5 class="card-title">${event.name}</h5>
                <p class="card-text">${event.category}</p>
                <p class="fw-bold">Price $${event.price}</p>
                <div class="price d-flex justify-content-center">
                    <a class="btn btn-danger" href="/pages/details.html?id=${event._id}">Read more</a>
                </div>
            </div>
            `
        cardFragment.appendChild(divCard)
    })
    cards.appendChild(cardFragment)
}
printEvents(events, cards)

/*Display category checkboxes*/

function displayCategories(array, checkboxes) {
    array.forEach(category => {
        let categoryDiv = document.createElement('div');
        categoryDiv.className = "form-check form-check-inline"
        categoryDiv.innerHTML += `
                    <input class="form-check-input" type="checkbox" id="${category}" value="${category}" name="${category}">
                    <label class="form-check-label category-label" for="${category}">${category}</label>
                    `
        checkboxFragment.appendChild(categoryDiv);
    })
    checkboxes.appendChild(checkboxFragment)
}
displayCategories(categories, checkboxes)

/*Search Box Filter*/

const searchFilter = (array) => {
    let filteredArray = array.filter(event => event.name.toLowerCase().includes(searchBox.value.toLowerCase().trim()))
    console.log(filteredArray)
    if (filteredArray > 1) {
        return array
    } else {
        return filteredArray
    }
}

searchBox.addEventListener('keyup', (e) => {
    let crossArray = crossFilter(events)
    if (crossArray < 1) {
        const div = document.querySelector('#cards')
        div.innerHTML = `
            <div class="card-body">
                <h5 class="card-title text-white text-center">Nothing found</h5>
            </div>
            `
    } else {
        printEvents(crossArray, cards)
    }
})

/*Checkbox filter*/

const checkboxFilter = (array) => {
    let checked = document.querySelectorAll('input[type=checkbox]:checked')
    let checkedValues = [...checked].map(checkbox => checkbox.value.toLowerCase())
    console.log(checkedValues)
    let filteredArray = array.filter(event => checkedValues.indexOf(event.category.toLowerCase()) !== -1)
    if (filteredArray < 1) {
        return array
    } else {
        return filteredArray
    }
}

checkboxes.addEventListener('change', (e) => {
    let crossArray = crossFilter(events)
    if (crossArray < 1) {
        const div = document.querySelector('#cards')
        div.innerHTML = `
            <div class="card-body">
                <h5 class="card-title text-white text-center">Nothing found</h5>
            </div>
            `
    } else {
        printEvents(crossArray, cards)
    }
})

/*Cross Filter*/
function crossFilter(array) {
    let crossArray = checkboxFilter(array)
    crossArray = searchFilter(crossArray)
    return crossArray
}
