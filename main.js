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

    updateDisplay();
    updateLocalStorage();
};

// Remove all books from DOM, then add them all back.
// I think React will make this better.
function updateDisplay() {
    // Clear all children
    container.innerHTML = '';

    myLibrary.forEach(function (book) {
        // This needs improving
        const bookHTML = document.createElement("div");
        const values = Object.values(book);
        
        // Add title with title class
        const newTitle = document.createElement('h3');
        newTitle.textContent = book.title;
        newTitle.classList.add(
            'card-title'
        )
        bookHTML.appendChild(newTitle);
        
        // Add author with text class
        const newAuthor = document.createElement('p');
        newAuthor.textContent = book.author;
        newAuthor.classList.add(
            'card-text'
        )
        bookHTML.appendChild(newAuthor);

        // Add pages with text class
        const newPages = document.createElement('p');
        newPages.textContent = book.pages + ' pages';
        newPages.classList.add(
            'card-text'
        )
        bookHTML.appendChild(newPages);

        // Add read with text class
        const newRead = document.createElement('p');
        if (book.read === true) {
            newRead.textContent = 'Already read';
        } else {
            newRead.textContent = 'Not read yet';
        }
        newRead.classList.add(
            'card-text'
        )
        bookHTML.appendChild(newRead);

        // for (const property of values) {
        //     const newProperty = document.createElement("p");
        //     newProperty.textContent = property;
        //     if  (property === true) {
        //         newProperty.textContent = 'Read? yes';
        //     }
        //     if (property === false) {
        //         newProperty.textContent = 'Read? no';
        //     }
        //     bookHTML.appendChild(newProperty);
        // }

        // Add Read toggle button
        const btn1 = document.createElement('button');
        btn1.textContent = 'Toggle Read';
        btn1.addEventListener('click', function() {
            toggleRead(book.id);
        });
        bookHTML.appendChild(btn1);

        // Add Delete button
        const btn2 = document.createElement('button');
        btn2.textContent = 'Delete';
        btn2.addEventListener('click', function() {
            deleteBook(book.id);
        });
        bookHTML.appendChild(btn2);

        // Add Bootstrap classes
        bookHTML.classList.add(
            'card',
            'bg-secondary',
            'bg-gradient',
            'text-white'
            );

        container.appendChild(bookHTML);
    });
};

function updateLocalStorage() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function toggleRead(toggleReadID) {
    const toBeReadBook = myLibrary.find(book => book.id === toggleReadID);
    toBeReadBook.read = !toBeReadBook.read;
    updateDisplay();
    updateLocalStorage();
}

function deleteBook(toBeDeletedID) {
    myLibrary = myLibrary.filter(book => book.id !== toBeDeletedID);
    updateDisplay();
    updateLocalStorage();
};

// addBookToLibrary('Dune', 'Frank Herbert', 400, true);
// addBookToLibrary('The Hitchhiker\'s Guide to the Galaxy', 'Douglas Adams', 250, false);
// addBookToLibrary('Memories of Ice', 'Steven Erikson', 900, true);
