let addBrewery = true;
let state = ''
const ul = document.getElementById('list-group')
const div = document.getElementById('show-panel')
const form = document.getElementById('location')
const container = document.getElementById('container')
const addNewBrewery = document.getElementById('add-new-brewery')
const header = document.getElementById('header')
const newBrewery = document.getElementById('new-brewery')
const breweryTitle = document.getElementById('title')
const navSearch = document.getElementById('search-bar')


const fetchBreweries = event => {
    event.preventDefault()
    state = event.target.state.value
    event.target.reset()
    fetch(`http://localhost:3000/breweries`)
        .then(resp => resp.json())
        .then(breweries => renderData(breweries.filter(brewery => brewery.state === state)))
        .catch(err => console.log(err))
}

const renderData = breweries => {
    ul.innerHTML = ''
    breweryTitle.innerHTML = "<h2 style='color: white' class='display-2 text-center'>Breweries:</h2>"
    breweries.forEach(brewery => addToBreweryList(brewery))
}

const addToBreweryList = brewery => {
    const li = `<li id=${brewery.id} class='list-group-item' data-id=${brewery.id}>${brewery.name}</li>`
    ul.innerHTML += li
}

const fetchBreweryInfo = event => {
    const breweryId = event.target.dataset.id
    fetch(`http://localhost:3000/breweries/${breweryId}`)
        .then(resp => resp.json())
        .then(brewery => showBrewery(brewery))
        .catch(err => console.log(err))
}

const showBrewery = brewery => {
    const search = brewery.name.split(' ').join('+') + `+${brewery.city}`
    const breweryInfo = `<h2>Name: ${brewery.name}</h2>
    <h4 class="capitalize">Type: ${brewery.kind}</h4>
    <a href=${brewery.website} target='_blank'>${brewery.name}'s Website</a>
    <h4>Address: ${brewery.address} ${brewery.city}, ${brewery.state}</h4>
    <a href=https://www.google.com/maps/search/${search} target='_blank'>Google Maps</a>
    <h3>Beers</h3>
    <ul id='beer'>
    </ul>
    <button type='button' id='add' data-id=${brewery.id}>MORE BEERS</button>`
    div.innerHTML = breweryInfo
    const button = document.getElementById('add')
    button.addEventListener('click', newBeerFetch)
    const beerUl = document.getElementById('beer')
    if (brewery.beers.length > 0) {
        brewery.beers.forEach(beer => {
            const li = `<li style='background-color: black' id=${beer.id} class='list-group-item'>${beer.name}<br><button type="button" class="button" data-id=${beer.id}>I DON'T EXIST</button></li><br>`
            beerUl.innerHTML += li
            beerUl.addEventListener('click', destroyFetch)
        })
    } else {
        const noBeerTag = "<li>Oh no, there's no beer!</li>"
        beerUl.innerHTML = noBeerTag
    }
}

const newBeerFetch = event => {
    const breweryId = parseInt(event.target.dataset.id)
    fetch('http://localhost:3000/beers', createBeer(breweryId))
        .then(resp => resp.json())
        .then(brewery => showBrewery(brewery))
        .catch(err => console.log(err))
}

const createBeer = breweryId => {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({brewery_id: breweryId})
    }
}

const destroyFetch = event => {
    if (event.target.className === 'button') {
        const beerId = parseInt(event.target.dataset.id)
        fetch(`http://localhost:3000/beers/${beerId}`, destroyBeer(beerId))
            .then(resp => resp.json())
            .then(brewery => showBrewery(brewery))
            .catch(err => console.log(err))
    }
}

const destroyBeer = beerId => {
    return {
        method: 'DELETE', 
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({id: beerId})
    }
}

const showNewBreweryForm = () => {
    addBrewery = !addBrewery;
    if (addBrewery) {
      newBrewery.style.display = "block";
    } else {
      newBrewery.style.display = "none";
    }
}

const addNewBreweryFetch = event => {
    event.preventDefault()
    const postInfo = {
    name: event.target.name.value,
    kind: event.target.kind.value,
    address: event.target.address.value,
    city: event.target.city.value,
    state: event.target.state.value,
    website: event.target.website.value
    }
    debugger
    newBrewery.reset()
    fetch('http://localhost:3000/breweries', createBrewery(postInfo))
        .then(resp => resp.json())
        .then(brewery => {
            if (brewery.state === state) addToBreweryList(brewery);
            showBrewery(brewery)
        })
        .catch(err => console.log(err))
}

const createBrewery = postInfo => {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(postInfo)
    }
}

ul.addEventListener('click', fetchBreweryInfo)
form.addEventListener('submit', fetchBreweries)
addNewBrewery.addEventListener('click', showNewBreweryForm)
newBrewery.addEventListener('submit', addNewBreweryFetch)
navSearch.addEventListener('submit', fetchBreweries)

showNewBreweryForm()