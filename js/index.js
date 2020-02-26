// declared variables

// functions
function main(){
    // fetch API url X
    // iterate over book array X
    // for each book:
        // grab ul from the dom X
        // create a li (list item) X
        // add innerText/HTML with book name X
    // add an eventListener (click) to the unorderedList
    // make fetch request to get the full data for that book from the backend
        // backend will give us data for the single book
        // grab the show-panel div
        // append all the necessary book information into div
    // make a fetch request to get all the data about that book item
        // grab the div for the 'show' details
        // create the nodes that are required
    // add eventListener to "Read Book" button
    // make patch request 
        // assemble the request Obj for the patch req
        // body: previous users who've liked the book

    fetchBooks()
    createClickListener()
}

function fetchBooks(){
    fetch("http://localhost:3000/books")
        .then( resp => resp.json() )
        .then( bookArray => {
        const unorderedList = document.querySelector("#list")

            bookArray.forEach(function(bookObj){
                const listItem = document.createElement("li")
                listItem.className = "book-item"
                listItem.innerText = bookObj.title
                listItem.dataset.id = bookObj.id

                unorderedList.append(listItem)
            })
        })
}

function createClickListener(){
    const unorderedList = document.querySelector("#list")
    unorderedList.addEventListener("click", function(event){
        const bookId = event.target.dataset.id
        fetch(`http://localhost:3000/books/${bookId}`)
            .then( resp => resp.json() )
            .then( bookObj => {
                const showPanel = document.getElementById("show-panel")
                showPanel.innerHTML = ""
                // ^ this clears out/resets the previous book's show when another book is clicked

                const header = document.createElement("h2")
                header.innerText = bookObj.title

                const image = document.createElement("img")
                image.src = bookObj.img_url

                const description = document.createElement("p")
                description.innerText  = bookObj.description

                const button = document.createElement("button")
                button.innerText = "Read Book"

                const readersList = document.createElement("ul")

                bookObj.users.forEach(function(userObj){
                    const reader = document.createElement("li")
                    reader.innerText = userObj.username
                    readersList.append(reader)
                })

                const newUsers = bookObj.users
                newUsers.push({"id":1, "username":"pouros"})

                const formData = {
                    users: newUsers
                }

                button.addEventListener("click", function(){
                    const reqObj = {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(formData)
                    }
                    fetch(`http://localhost:3000/books/${bookId}`, reqObj)
                        .then(resp => resp.json() )
                        .then( bookObj => {
                            const reader = document.createElement("li")
                            reader.innerText = bookObj.users.pop().username
                            readersList.append(reader)
                        })
                })

                showPanel.append(header, image, description, button, readersList)
            })
    })
}
            

// invoked functions
main()