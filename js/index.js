let BOOKS, USERS, CURRENT_USER, LIST = document.querySelector("#list"),
    PANEL = document.querySelector("#show-panel");

function fetchBooks() {
    fetch("http://localhost:3000/books")
        .then(resp => resp.json())
        .then(data => {
            BOOKS = data
            renderBooks()
        })
}

function fetchUsers() {
    fetch("http://localhost:3000/users")
        .then(resp => resp.json())
        .then(data => {
            USERS = data;
            CURRENT_USER = data[2];
        })
}

function renderBooks() {
    let html = "";
    BOOKS.forEach(book => {
        html += `<li data-id="${book.id}" >${book.title}</li>`
    })
    LIST.innerHTML = html;
}

function renderBook(book) {
    PANEL.innerHTML = `
    <h1>${book.title}</h1><br>
    <img src="${book.img_url}" height="42" width="42"><br>
    <p>${book.description}</p><br>
    <ul>${renderUsers(book)}</ul><br>
    <button id="like" data-book-id="${book.id}">${likeLabel(book)}</button>`.trim()
}

function renderUsers(book) {
    let html = ""
    book.users.forEach(user => {
        html += `<li>${user.username}</li>`
    })
    return html;
}

function addMainListener() {
    LIST.addEventListener("click", event => {
        if (event.target.tagName = "li") {
            const displayBook = BOOKS.find(book => book.id == event.target.dataset.id);
            renderBook(displayBook);
            addLikeListener();
        }
    })
}

function addLikeListener() {
    const likeBtn = document.querySelector("#like")
    likeBtn.addEventListener("click", event => {
        const displayingBook = BOOKS.find(book => book.id == event.target.dataset.bookId)
        if (JSON.stringify(displayingBook.users).includes(JSON.stringify(CURRENT_USER))) {
            displayingBook.users = displayingBook.users.filter(user => {
                return user.id !== CURRENT_USER.id
            })
            fetch(`http://localhost:3000/books/${displayingBook.id}`, unpatchFunc(displayingBook))
                .then(resp => {
                    fetchBooks();
                    renderBook(displayingBook);
                    addLikeListener();
                })
        } else {
            fetch(`http://localhost:3000/books/${displayingBook.id}`, patchFunc(displayingBook))
                .then(resp => {
                    fetchBooks();
                    renderBook(displayingBook);
                    addLikeListener();
                })
        }
    })
}

function patchFunc(disBook) {
    let users = disBook.users;
    users.push(CURRENT_USER)
    return {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            users: users
        })
    }
}

function unpatchFunc(disBook) {
    users = disBook.users.filter(user => {
        return user.id !== CURRENT_USER.id
    })
    return {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            users: users
        })
    }
}


function likeLabel(book) {
    if (JSON.stringify(book.users).includes(JSON.stringify(CURRENT_USER))) {
        return "Unlike Book"
    } else {
        return "Like Book"
    }

}

function main() {
    fetchBooks();
    fetchUsers();
    addMainListener();

}
main();




// function findBook(id){
//    return BOOKS.find(book => book.id == id)
// }