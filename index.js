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

function addBook(title, author, pages, isRead) {
    bookCollection.push(new Book(title, author, pages, isRead));
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

    // Book-Card
    const booksContainer = document.getElementById('books-tiles-container');
    booksContainer.innerText = "";

    const fragment = document.createDocumentFragment();

    bookCollection.forEach((book, i) => {
        const bookTile = document.createElement('div');
        bookTile.classList.add('book-tile');
        fragment.appendChild(bookTile);

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
        bookTile.appendChild(containerControl);;

        const isRead = book.isRead;
        bookTile.appendChild(containerControl);
    });

    booksContainer.appendChild(fragment);


});