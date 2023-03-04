let events = data.events

const queryString = location.search

const params = new URLSearchParams(queryString)

const id = params.get("id")

const eventDetail = events.find(event => event._id == id)

console.log(eventDetail)

function showDate(date){
let eventDate = new Date(date).toUTCString()
return eventDate.slice(5,16)
}
let eventDate = showDate(eventDetail.date)

const div = document.querySelector('#main-details')
div.innerHTML = `<div class="card flex-lg-row flex-xl-row mx-5 rounded-2 overflow-hidden align-items-center" id="details">
<img src="${eventDetail.image}" class="details-img" alt="...">
<div class="card-body">
    <h2 class="card-title text-center">${eventDetail.name}</h2>
    <ul class="card-text list-unstyled">
        <li class="text-center fst-italic">${eventDate}</li>
        <li class="badge fs-medium bg-info m-1">${eventDetail.category}</li>
        <li class="text-start p-1">${eventDetail.description}</li>
        <li class="h3 fw-bolder m-1 text-center">$${eventDetail.price}</li>
        <li class="m-1">Place: ${eventDetail.place}</li>
        <li class="m-1">Capacity: ${eventDetail.capacity}</li>
    </ul>
</div>
</div>`







