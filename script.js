const library = 
[
    new Book('J R. R. Tolkien', 'The Hobbit', '394', 'Completed', crypto.randomUUID()),
    new Book('Orson Scott Card', "Ender's Game", '324', 'Not Completed', crypto.randomUUID()),
    new Book('Jeff Smith', 'Bone: The Complete Cartoon Epic in One Volume', '1360', 'Completed', crypto.randomUUID())
];

function Book(author, title, pages, status,id) {
    if (!new.target) {
        throw Error("You must use 'new'")
    }
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.status = status;
    this.id = id;
}

function addBookToLibrary(author, title, pages, status) {
    let newBook = new Book(author, title, pages, status, crypto.randomUUID());
    library.push(newBook);
}

const bookshelf = document.querySelector('.library');

function displayBook() {
    for (const book of library) {
        if (document.querySelector(`div[data-id='${book.id}']`)) {
            continue;
        } else {
            const card = document.createElement('div');
            card.setAttribute('data-id', book.id);
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
    if (form.querySelector('#status').checked) {
        form.querySelector('#statusHidden').disabled = true;
    } else {
        form.querySelector('#statusHidden').disabled = false;
    }
    const formData = Object.fromEntries(new FormData(form));
    addBookToLibrary(formData.author, formData.title, formData.pages, formData.status);
    form.reset();
    displayBook();
});