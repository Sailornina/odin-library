function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;

    this.toggleReadStatus = () => {
        this.isRead = !this.isRead;
    }
}

function updateStorage() {
    localStorage.setItem('BOOK_COLLECTION_KEY', JSON.stringify(bookCollection));
}

let bookCollection = [
    new Book("Rayuela", "Julio Cortazar", 300, true),
    new Book("War and Peace", "Leo Tolstoy", 280, true),
    new Book("Little Women", "Louisa May Alcott", 350, true),
];

function addBook(book) {
    bookCollection.push(book);
    updateStorage();
}

if (!localStorage.getItem('BOOK_COLLECTION_KEY')) {
    localStorage.setItem('BOOK_COLLECTION_KEY', JSON.stringify(bookCollection));
} else {
    bookCollection = JSON.parse(localStorage.getItem('BOOK_COLLECTION_KEY')).map(item => {
        return new Book(item.title, item.author, item.pages, item.isRead);
    });
}

window.addEventListener('DOMContentLoaded', () => {

    const bookForm = document.getElementById('add-book-form');
    const booksContainer = document.getElementById('books-tiles-container');

    bookForm.addEventListener('submit', e => {
        e.preventDefault();
        const { title, author, pages, read} = e.currentTarget.elements;
        const book = new Book(title.value, author.value, parseInt(pages.value), read.checked);
        addBook(book);
        let bookTile = createBookTile(book, bookCollection.length - 1)
        booksContainer.appendChild(bookTile);
    });


    // Book-Card  
    booksContainer.innerText = "";

    const fragment = document.createDocumentFragment();

    bookCollection.forEach((book, i) => {
       let bookTile = createBookTile(book, i);
       fragment.appendChild(bookTile);
    });

    // This is important to prevent reloading the DOM every time we add a book
    booksContainer.appendChild(fragment);
});

function createBookTile(book, i) {
    const bookTile = document.createElement('div');
    bookTile.classList.add('book-tile');

    const title = document.createElement('p');
    title.innerText = book.title;
    bookTile.appendChild(title);

    const author = document.createElement('p');
    author.innerText = book.author;
    bookTile.appendChild(author);

    const pages = document.createElement('p');
    pages.innerText = book.pages;
    bookTile.appendChild(pages);

    bookTile.dataset.index = i;

    const containerControl = document.createElement('div');
    containerControl.classList.add('control-book');
    bookTile.appendChild(containerControl);

    const isRead = book.isRead;
    bookTile.appendChild(containerControl);

    const label = document.createElement('label');
    label.classList.add('switch');

    const toggle = document.createElement('input');
    toggle.classList.add('switch-input');
    toggle.checked = book.isRead;
    toggle.type = 'checkbox';
    toggle.name = 'read';
    toggle.setAttribute('type', 'checkbox');
    toggle.addEventListener('change', (e) => {
        book.toggleReadStatus();
        updateStorage();
    });
    label.appendChild(toggle);

    const span = document.createElement('span');
    span.classList.add('slider');
    span.classList.add('round');
    label.appendChild(span);

    bookTile.appendChild(label);
    const deleteButton = createDeleteButton(book, bookTile);
    bookTile.appendChild(deleteButton);
    return bookTile;
}

function createDeleteButton(book, bookTile) {
    const deleteBook = document.createElement('i');
    deleteBook.classList.add('fas');
    deleteBook.classList.add('fa-trash-alt');
    deleteBook.addEventListener('click', (e) => {
        const index = bookCollection.indexOf(book);
        bookCollection.splice(index, 1);
        updateStorage();
        bookTile.remove();
    
    });

    return deleteBook;
};




