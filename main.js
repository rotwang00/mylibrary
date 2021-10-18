let myLibrary = [];
let container = document.getElementById("container");

function Book(title, author, pages, read, id) {
    this.title = title;
    this.author =author;
    this.pages = pages;
    this.read = read;
    this.id = id;
};

Book.prototype.info = function() {
    let infoString = `${this.title} by ${this.author}, ${this.pages} pages, `;
        if (this.read) {
            infoString += 'already read';
        } else {
            infoString += ' not read yet';
        }
        infoString += `, id = ${this.id}`;
        return infoString;
};

function addBookToLibrary(newTitle, newAuthor, newPages, newRead) {
    const newId = Math.random().toString(16).slice(2);
    console.log(newId);
    const newBook = new Book(newTitle, newAuthor, newPages, newRead, newId);
    console.log(newBook);
    myLibrary.push(newBook);
    const newBookHTML = document.createElement("div");
    const newValues = Object.values(newBook);
    for (const property of newValues) {
        const newProperty = document.createElement("h5");
        newProperty.textContent = property;
        newBookHTML.appendChild(newProperty);
    }
    container.appendChild(newBookHTML);
};

addBookToLibrary('Dune', 'Frank Herbert', 400, true);
addBookToLibrary('The Hitchhiker\'s Guide to the Galazy', 'Douglas Adams', 250, true);
addBookToLibrary('Memories of Ice', 'Steven Erikson', 900, true);

myLibrary.forEach(book => {
    console.log(book.info());
});
