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