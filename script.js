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
};

function addBookToLibrary(author, title, pages, read) {
    let newBook = new Book(author, title, pages, read, crypto.randomUUID());
    library.push(newBook);
}

function displayBook() {
    for (const book of library) {
        let bookshelf = document.querySelector('.library');
        let card = document.createElement('div');
        card.classList.add('books');
        for (const info in book) {
            if (info === 'id') {
                continue;
            }
            let content = document.createElement('p');
            let text = document.createTextNode(book[info]);
            content.appendChild(text);
            card.appendChild(content);
            bookshelf.appendChild(card);
        }
    }
}