let myLibrary = [];
let container = document.getElementById("container");

const newBookButton = document.getElementById("newBookButton");
newBookButton.addEventListener('click', () => {
    enterNewBookInfo();
})

const form = document.getElementById('form-container');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let read = document.getElementById('read').value;
    addBookToLibrary(title, author, pages, read);
})

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

function enterNewBookInfo() {
    
}

function addBookToLibrary(newTitle, newAuthor, newPages, newRead) {
    const newId = Math.random().toString(16).slice(2);
    const newBook = new Book(newTitle, newAuthor, newPages, newRead, newId);
    
    // Save new book to library
    myLibrary.push(newBook);

    // Display new book on page. Could be a separate function
    const newBookHTML = document.createElement("div");
    const newValues = Object.values(newBook);
    for (const property of newValues) {
        const newProperty = document.createElement("h5");
        newProperty.textContent = property;
        if  (property === true) {
            newProperty.textContent = 'Read? yes';
        }
        if (property === false) {
            newProperty.textContent = 'Read? no';
        }
        newBookHTML.appendChild(newProperty);
    }
    newBookHTML.classList.add('book');
    container.appendChild(newBookHTML);
};

addBookToLibrary('Dune', 'Frank Herbert', 400, true);
addBookToLibrary('The Hitchhiker\'s Guide to the Galaxy', 'Douglas Adams', 250, false);
addBookToLibrary('Memories of Ice', 'Steven Erikson', 900, true);

myLibrary.forEach(book => {
    console.log(book.info());
});
