import { IEmailService } from "../interfaces";
import { EmailService, IObserver, LoansManager, NotificationService,  } from "./";

export class Book {
    constructor(public title: string, public author: string, public ISBN: string) {}
}

export class Library {
    private books: Book[] = [];

    addBook(title: string, author: string, ISBN: string) {
        const book = new Book(title, author, ISBN);
        this.books.push(book);
    }
    
    removeBook(ISBN: string) {
        this.books = this.books.filter(book => book.ISBN !== ISBN);
    }

    searchByTitle(query: string) {
        return this.books.filter(book => book.title.includes(query));
    }

    searchByAuthor(query: string) {
        return this.books.filter(book => book.author.includes(query));
    }

    searchByISBN(ISBN: string) {
        return this.books.find(book => book.ISBN === ISBN);
    }
}

export class LibraryManager {
    private static instance: LibraryManager;

    private constructor(
        private library: Library,
        private loanManager: LoansManager,
        private emailService: IEmailService,
        private notificationService: NotificationService
    ) {}

    static getInstance() {
        if (!LibraryManager.instance) {
            const library = new Library();
            const loanManager = new LoansManager();
            const emailService = new EmailService();
            const notificationService = new NotificationService();
            LibraryManager.instance = new LibraryManager(library, loanManager, emailService, notificationService);
        }
        return LibraryManager.instance;
    }

    addBook(title: string, author: string, ISBN: string) {
        this.library.addBook(title, author, ISBN);
        this.notificationService.notifyObservers(`Nuevo libro agregado: ${title}`);
    }

    removeBook(ISBN: string) {
        this.library.removeBook(ISBN);
        this.notificationService.notifyObservers(`Libro eliminado: ISBN ${ISBN}`);
    }

    searchByTitle(query: string) {
        return this.library.searchByTitle(query);
    }

    searchByAuthor(query: string) {
        return this.library.searchByAuthor(query);
    }

    searchByISBN(ISBN: string) {
        return this.library.searchByISBN(ISBN);
    }

    loanBook(ISBN: string, userID: string) {
        this.loanManager.loanBook(ISBN, userID);
    }

    returnBook(ISBN: string, userID: string) {
        this.loanManager.returnBook(ISBN, userID);
    }

    addUserObserver(user: IObserver) {
        this.notificationService.addObserver(user);
    }

    removeUserObserver(user: IObserver) {
        this.notificationService.removeObserver(user);
    }
}