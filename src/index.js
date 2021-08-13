const { response } = require("express")

const usersList = document.querySelector('#users-list')
const restaurantsList = document.querySelector('#restaurants-list')
const reservationsList = document.querySelector('#reservations-list')

let users, restaurants, reservations

const renderRestaurants = (restaurants) => {
    const html = restaurants.map( restaurant => `
    <li>
        ${ restaurant.name }
    </li>
    `).join('')
    restaurantsList.innerHTML = html
}

const renderUsers = (users) => {
    const userId = window.location.hash.slice(1)
    const html = users.map( user => `
    <li class='${ user.id === userId ? 'selected' : ''}'>
        <a href='#${user.id}'>
        ${ user.name }
        </a>
    </li>
    ` ).join('')
    usersList.innerHTML = html
}

const renderReservations = async (userId) => {
    const responseR = await fetch(`/api/users/${userId}/reservations`)
    reservations = await responseR.json()
    const html = reservations.find( reservation => reservation.userId === userId )
    reservationsList.innerHTML = html
}



const init = async () => {
    try {
        const response = await fetch('/api/restaurants')
        restaurants = await response.json()
        const responseU = await fetch('/api/users')
        users = await responseU.json()
        renderRestaurants(restaurants)
        renderUsers(users)


    }
    catch (err) {
        console.log(err)
    }
}

window.addEventListener('hashchange', async () => {
    
    renderReservations(reservations)
})

init()