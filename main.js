let myLibrary = [];
let container = document.getElementById("container");

function Book(title, author, pages, read) {
    this.title = title;
    this.author =author;
    this.pages = pages;
    this.read = read;
};

Book.prototype.info = function() {
    let infoString = `${this.title} by ${this.author}, ${this.pages} pages, `;
        if (this.read) {
            infoString += 'already read';
        } else {
            infoString += ' not read yet';
        }
        return infoString;
};

function addBookToLibrary(newTitle, newAuthor, newPages, newRead) {
    const newBook = new Book(newTitle, newAuthor, newPages, newRead);
    myLibrary.push(newBook);
    const newBookHTML = document.createElement("div");
    const newValues = Object.values(newBook);
    for (const property in newValues) {
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

