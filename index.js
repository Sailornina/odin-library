
// Clase Book, con un constructor que recibe...
function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;

    this.toggleReadStatus = () => {
        this.isRead = !this.isRead;
    }
}

const booksCollection = [
    new Book("Rayuela", "Julio Cortazar", 300, true),
    new Book("War and Peace", "Leo Tolstoy", 280, true),
    new Book("Little Women", "Louisa May Alcott", 350, true),
  
];
 
window.addEventListener('DOMContentLoaded', () => {

});


