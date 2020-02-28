// // get list of books and render
//
// // fetch and loop over eac hbook in array
//
// // for each book: create LI : add inner text with book name
//
//
//
//
//
// // declared vars
// BOOKS_URL = "http://localhost:3000/books"
// const list = document.querySelector("#list")
// const panel = document.querySelector("#list-panel")
//
//
// // defined funcs
// const fetchBooks = () => {
//   fetch(BOOKS_URL)
//   .then(resp => resp.json())
//   .then(data => renderAllBooks(data))
//   .catch(err => renderErrors(err))
// }
//
// const renderErrors = (err) => {
//   console.log(err)
// }
//
// const renderAllBooks = (bookArray) => {
//   console.log("DATAAAA", bookArray)
//   bookArray.forEach(book => {
//     const li = document.createElement('li')
//     li.dataset.id = book.id
//     li.innerHTML = `${book.title}`
//     list.append(li)
//   })
// }
//
// const expandBook = (event) => {
//     if (event.target.tagName === "LI") {
//       console.log("KJFKSD", `BOOKS_URL/${event.target.dataset.id}`)
//       fetch(`${BOOKS_URL}/${event.target.dataset.id}`)
//       .then(resp => resp.json())
//       .then(book => renderBookInfo(book))
//       .catch(err => renderErrors(err))
//     }
// }
//
// const renderBookInfo = (book) => {
//   console.log(book)
//   console.log(panel)
//
//   const header = document.createElement('h1')
//   header.innerHTML = `${book.title}`
//   panel.innerHTML = ""
//   panel.append(header)
//
//   const img = document.createElement('img')
//   img.src = `${book.img_url}`
//   panel.append(img)
//
//   const description = document.createElement('p')
//   description.innerText = book.description
//   panel.append(description)
//
//   const readersList = document.createElement('ul')
//   const button = document.createElement('button')
//   button.innerText = "add new user"
//   panel.append(button)
//   button.addEventListener('click', function(e){
//     book.users.forEach(usersObj => {
//       panel.append(readersList)
//       const reader = document.createElement('li')
//       reader.innerText = usersObj.username
//       reader.dataset.id = usersObj.id
//       readersList.append(reader)
//     })
//   })
//
// }
//
//
//
//
// // event listeners
// list.addEventListener('click', expandBook)
//
//
// // invoked functions
// fetchBooks()








// practice

BOOKS_URL = "http://localhost:3000/books"
const list = document.querySelector("#list")
const showPanel = document.querySelector("#show-panel")

const fetchBooks = () => {
  fetch(BOOKS_URL)
  .then(resp => resp.json())
  .then(books => renderBooks(books))
  .catch(err => console.log(err))
}

const renderBooks = (books) => {
  books.forEach(book => {
    const bookCard = `<li data-id="${book.id}">${book.title}</li>`
    list.innerHTML += bookCard
  })
}















 const showBookOnPanel = (event) => {
   if (event.target.tagName === "LI") {

   }
 }


list.addEventListener('click', showBookOnPanel)


// invoked functions
fetchBooks()
