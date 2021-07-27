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
        fragment.appendChild(title);

        const author = document.createElement('p');
        author.innerText = book.author;
        fragment.appendChild(author);

        const pages = document.createElement('p');
        pages.innerText = book.pages;
        fragment.appendChild(pages);

        bookTile.dataset.index = i;

        const containerControl = document.createElement('div');
        containerControl.classList.add('control-book');
        fragment.appendChild(containerControl);;

        const isRead = book.isRead;
        const toggleStatus = toggleSwitchRead(isRead);
        containerControl.classList.add(toggleStatus);

        
        const toggleStatus = () => {
            if (book.isRead === isRead) {
                bookTile.classList.add('book-tile-read')
        } else {
            bookTile.classList.remove('book-tile-read');
        }    
        };

        const deleteContainerBook = deleteSwitch();
        fragment.appendChild(deleteContainerBook);

        bookTile.appendChild(containerControl);
        containerControl.appendChild(bookTile);

    });

    booksContainer.appendChild(fragment);
    containerControl.appendChild(fragment);
    
    // Switch Book-Card
    const toggleSwitchRead = document.querySelector(isRead)
    toggleSwitchRead.innerText = '';
    
    
    toggleSwitchRead.forEach((span, i) => {

        const label = document.createElement('label');
        label.classList('switch');

        const imput = document.createElement('imput');
        imput.classList.add('switch-imput');
        imput.type = 'checkbox';
        imput.checked = isRead;
        imput.addEventListener('change')

        label.appendChild(imput)

    )};
    
    
    function deleteSwitch() {
    
    } 
});

