const library = [];

function Book(author,title,pages,read,id) {
    if (!new.target) {
        throw Error("You must use 'new'")
    }
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
    this.id = id;
}

function addBookToLibrary(author, title, pages, read) {
    let newBook = new Book(author, title, pages, read, crypto.randomUUID());
    library.push(newBook);
}

const bookshelf = document.querySelector('.library');

function displayBook() {
    for (const book of library) {
        if (document.querySelector(`div[data-id='${book.id}']`)) {
            continue;
        } else {
            const card = document.createElement('div');
            card.classList.add('books');
            for (const info in book) {
                if (info === 'id') {
                    continue;
                }
                const content = document.createElement('p');
                const label = document.createTextNode(`${info.charAt(0).toUpperCase() + info.slice(1)}: `);
                const text = document.createTextNode(book[info]);
                content.append(label, text);
                card.appendChild(content);
            }
            bookshelf.appendChild(card);
        }
    }
}

const dialog = document.querySelector('dialog');
const showButton = document.querySelector('#showDialog');
const closeButton = document.querySelector('dialog button');

showButton.addEventListener('click', function() {
    dialog.showModal();
});

closeButton.addEventListener('click', function() {
    dialog.close();
});

const form = document.getElementById('newBook');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    if (form.querySelector('#read').checked) {
        form.querySelector('#notRead').disabled = true;
    } else {
        form.querySelector('#notRead').disabled = false;
    }
    const formData = Object.fromEntries(new FormData(form));
    addBookToLibrary(formData.author, formData.title, formData.pages, formData.read);
    form.reset();
    displayBook();
});