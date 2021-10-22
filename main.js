let myLibrary = JSON.parse(localStorage.getItem("myLibrary") || "[]");
let container = document.getElementById("container");
updateDisplay();

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
    let read = document.getElementById('read').checked;
    addBookToLibrary(title, author, pages, read);
    form.reset();
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

    // Save library to localStorage
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));

    updateDisplay();
};

// Remove all books from DOM, then add them all back.
// I think React will make this better.
function updateDisplay() {
    // Clear all children
    container.innerHTML = '';

    myLibrary.forEach(function (book) {
        const bookHTML = document.createElement("div");
        const values = Object.values(book);
        for (const property of values) {
            const newProperty = document.createElement("h5");
            newProperty.textContent = property;
            if  (property === true) {
                newProperty.textContent = 'Read? yes';
            }
            if (property === false) {
                newProperty.textContent = 'Read? no';
            }
            bookHTML.appendChild(newProperty);
        }
        const btn = document.createElement('button');
        btn.textContent = 'Delete';
        btn.addEventListener('click', function() {
            deleteBook(this.title);
        });
        bookHTML.appendChild(btn);

        bookHTML.classList.add('book');

        container.appendChild(bookHTML);
    });
};

function deleteBook(toBeDeleted) {
    console.log(toBeDeleted);
};

// addBookToLibrary('Dune', 'Frank Herbert', 400, true);
// addBookToLibrary('The Hitchhiker\'s Guide to the Galaxy', 'Douglas Adams', 250, false);
// addBookToLibrary('Memories of Ice', 'Steven Erikson', 900, true);
