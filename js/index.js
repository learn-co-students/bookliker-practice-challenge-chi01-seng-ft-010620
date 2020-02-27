document.addEventListener('DOMContentLoaded', function() {
  fetchBooks();
  bookTitleListener();
  //   buttonListener();
});

function fetchBooks() {
  fetch('http://localhost:3000/books')
    .then(resp => resp.json())
    .then(data => {
      console.log(data);
      renderBooks(data);
    });
}

function renderBooks(data) {
  const renderField = document.querySelector('#list');
  const header = document.createElement('h1');
  renderField.append(header);
  header.innerHTML = 'Book List';

  data.forEach(book => {
    const listItem = document.createElement('li');
    listItem.innerHTML = book.title;
    listItem.dataset.id = book.id;
    renderField.append(listItem);
  });
}
function bookTitleListener() {
  const bookList = document.getElementById('list');
  bookList.addEventListener('click', () => {
    let bookID = event.target.dataset.id;
    fetch(`http://localhost:3000/books/${bookID}`)
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        //debugger;
        renderBookInfo(data);
      });
    document.getElementById('show-panel').innerHTML = '';
  });
}

function renderBookInfo(data) {
  let bookInfoField = document.getElementById('show-panel');
  const ul = document.createElement('ul');
  ul.dataset.id = 'user-list';
  data.users.forEach(user => {
    const userList = document.createElement('li');
    userList.innerHTML = user.username;
    ul.append(userList);
  });
  const bookTitle = document.createElement('h2');
  const img = document.createElement('img');
  img.src = data.img_url;
  const description = document.createElement('h4');
  const button = document.createElement('button');
  button.innerHTML = 'Read Book';
  description.innerHTML = data.description;
  bookTitle.innerHTML = data.title;
  bookInfoField.append(bookTitle, img, description, button, ul);

  ////////////////////read me rendering////////////////
  const userList = document.querySelector(`[data-id='user-list']`);
  const username = { id: 1, username: 'pouros' };
  const usernameLi = document.createElement('li');
  //usernameLi.style.display ="block";
  usernameLi.innerHTML = username.username;
  let counter = 0;
  bookInfoField.addEventListener('click', function() {
    if ((event.target.innerHTML = 'Read Book')) {
      counter += 1;
      if (counter % 2 == 0) {
        console.log('nope');
        userList.lastChild.remove();
        removeLike(data);
      }
      if (counter % 2 != 0) {
        addLike(data);
        userList.append(usernameLi);
      }
    }
  });
}

function addLike(data) {
    const bookID = data.id
  const body = {
    users: [...data.users, { id: 1, username: 'pouros' }]
  };
  fetch(`http://localhost:3000/books/${bookID}`, {
    method: 'PATCH',
    headers: { 'Content-type': 'application/json', Accpet: 'application/json' },
    body: JSON.stringify(body)
  });
}
function removeLike(data){
    const bookID = data.id
    const body = {
        users: [...data.users]
    }
    fetch(`http://localhost:3000/books/${bookID}`, {
    method: 'PATCH',
    headers: { 'Content-type': 'application/json', Accpet: 'application/json' },
    body: JSON.stringify(body)
  });
}
/////with Patch only the described attriubute changes take place, if the like button is left on and page 
//refreshed, the like become permanently in API
///to prevent this the like button must always be left off beforee a refresh, 
////of we must use PUT which will edit all atttributes. in such case we must 
//// have a fully devloped body to send in that PUT request and exclude the like
//// this is difficult to do as we'd need to iterate through users as all books have different number of user,
