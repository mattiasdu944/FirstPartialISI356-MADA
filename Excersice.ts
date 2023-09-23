/*Aplicación de Administración de Biblioteca

Eres el desarrollador principal de una aplicación de administración de biblioteca. En un intento por hacer que la aplicación sea "fácil de usar",
 se ha agregado una gran cantidad de funcionalidad en una única clase, y se ha utilizado un único método para resolver diferentes tareas.

La clase LibraryManager no sólo se encarga de agregar o eliminar libros, sino que también gestiona los préstamos, las devoluciones y 
hasta la notificación por correo electrónico a los usuarios. Asimismo, se ha optado por usar un único método para realizar búsquedas, 
sin importar si es por título, autor o ISBN, complicando su implementación.

Se ha identificado que la clase es muy difícil de mantener y modificar. Tu tarea es estudiar el código, identificar los problemas y
 considerar cómo podría refactorizarse para mejorar su diseño y estructura.
*/

class Book {
    constructor(public title: string, public author: string, public ISBN: string) {}
}

class Library {
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

interface IEmailService {
    sendEmail(userID: string, message: string): void;
}

class EmailService implements IEmailService {
    sendEmail(userID: string, message: string) {
        console.log(`Enviando email a ${userID}: ${message}`);
        // Implementación real del envío de correo electrónico aquí
    }   
}

class LoansManager {
    private loans: { ISBN: string; userID: string; date: Date }[] = [];

    private emailService: EmailService = new EmailService();
    private library: Library = new Library();

    loanBook(ISBN: string, userID: string) {

        const book = this.library.searchByISBN(ISBN);
        if (book) {
            this.loans.push({ ISBN, userID, date: new Date() });
            this.emailService.sendEmail(userID, `Has solicitado el libro ${book.title}`);
        }
    }

    returnBook(ISBN: string, userID: string) {
        const emailService = new EmailService();

        const index = this.loans.findIndex(loan => loan.ISBN === ISBN && loan.userID === userID);
        if (index !== -1) {
            this.loans.splice(index, 1);
            emailService.sendEmail(userID, `Has devuelto el libro con ISBN ${ISBN}. ¡Gracias!`);
        }
    }

}

interface IObserver {
    update(message: string): void;
}

class User implements IObserver {
    constructor(public userID: string) {}

    update(message: string) {
        console.log(`Usuario ${this.userID} ha recibido un mensaje: ${message}`);
    }
}

class NotificationService {
    private observers: IObserver[] = [];

    addObserver(observer: IObserver) {
        this.observers.push(observer);
    }

    removeObserver(observer: IObserver) {
        const index = this.observers.indexOf(observer);
            if (index !== -1) {
                this.observers.splice(index, 1);
            }
    }

    notifyObservers(message: string) {
        this.observers.forEach(observer => observer.update(message));
    }
}

class LibraryManager {
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