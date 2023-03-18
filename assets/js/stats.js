import { getDataPages } from "./functions.js";

let events
let currentDate
let categories
let eventsHighAttendance
let eventsLowAttendance
let eventLargeCapacity
let pastEvents
let upcomingEvents
let tableEvents = document.getElementById('body-event-stats')
let tableEventFragment = document.createDocumentFragment()
let tableUpcomingByCategory = document.getElementById('body-upcoming-events-by-category')
let upcomingByCategoryFragment = document.createDocumentFragment()
let tablePastByCategory = document.getElementById('body-past-events-by-category')
let pastByCategoryFragment = document.createDocumentFragment()

getDataPages()
    .then(data => {
        events = data.events
        currentDate = data.currentDate;
        categories = Array.from(new Set(events.map(element => element.category)))
        eventsHighAttendance = events.filter(event => calcAttendance(event) >= 99)
        eventsLowAttendance = events.filter(event => calcAttendance(event) <= 75)
        eventLargeCapacity = getLargerCapacityEvent(events)
        fillEventStats(eventsHighAttendance, eventsLowAttendance, eventLargeCapacity, tableEvents, tableEventFragment)
        pastEvents = getCategoryDetails(events, "past")
        displayCategoryStatistics(pastEvents, tablePastByCategory, upcomingByCategoryFragment)
        upcomingEvents = getCategoryDetails(events, "upcoming")
        displayCategoryStatistics(upcomingEvents, tableUpcomingByCategory, pastByCategoryFragment)
    })

function calcAttendance(event) {
    let assistance = Number(event.assistance)
    let capacity = Number(event.capacity)
    let attendance = (assistance / capacity) * 100
    return attendance
}

function getLargerCapacityEvent(array) {
    let largerCapacity = 0
    let largerCapacityEvent = []
    array.forEach(event => {
        if (event.capacity > largerCapacity) {
            largerCapacity = event.capacity
            largerCapacityEvent = event
        }
    })
    return largerCapacityEvent.name
}

function fillEventStats(highAtt, lowAtt, largeCap, table, fragment) {
    let highAttendance = (highAtt.map(event => event.name)).join(" - ")
    let lowAttendance = (lowAtt.map(event => event.name)).join(" - ")
    let largeCapacity = largeCap

    let tableRow = document.createElement('tr')
    tableRow.innerHTML += `
            <td>${highAttendance}</td>
            <td>${lowAttendance}</td>
            <td>${largeCapacity}</td>
            `
    fragment.appendChild(tableRow)

    table.appendChild(fragment)
}

function getFilteredbyTense(events, eventTense) {
    let filteredEvents = [];

    if (eventTense === "upcoming") {
        filteredEvents = events.filter(event => event.date > currentDate);
        return filteredEvents
    } else if (eventTense === "past") {
        filteredEvents = events.filter(event => event.date < currentDate);
        return filteredEvents
    }
}

function getCategoryDetails(events, eventTense) {
    let filteredEvents = getFilteredbyTense(events, eventTense)
    const categories = {};

    filteredEvents.forEach(event => {
        categories[event.category] = {
            name: event.category,
            revenue: 0,
            attendance: 0,
            capacity: 0,
            eventCount: 0,
        };

        const attendance = event.assistance || event.estimate;
        const revenue = event.price * attendance;
        categories[event.category].revenue += revenue;
        categories[event.category].attendance += attendance;
        categories[event.category].eventCount++;
        categories[event.category].capacity += event.capacity;
    });

    const categoriesArray = [];

    /* Iterando a través del objeto de categorías y empujando el nombre, los ingresos y el porcentaje
    de asistencia a las categoríasArray. */

    for (const category in categories) {
        const revenue = categories[category].revenue;
        const attendancePercentage = ((categories[category].attendance * 100) / categories[category].capacity).toFixed(2);


        categoriesArray.push({
            name: categories[category].name,
            revenue: revenue,
            attendancePercentage: attendancePercentage + "%",
        });
    }
    categoriesArray.sort((a, b) => a.revenue - b.revenue)
    return categoriesArray
}

function displayCategoryStatistics(array, table, fragment) {
    array.forEach((element) => {
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${element.name}</td>
        <td>$${element.revenue.toLocaleString()}</td>
        <td>${element.attendancePercentage}</td>
        `
        fragment.appendChild(row);
    });
    table.appendChild(fragment);
}
