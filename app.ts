import { User, LibraryManager } from './modules';

export class App {
    private libraryManager: LibraryManager;
    private user: User;

    run(){
        this.libraryManager = LibraryManager.getInstance();
        this.user = new User("user01");
        this.libraryManager.addUserObserver(this.user);
        this.libraryManager.addBook("Cien años de soledad", "Gabriel García Márquez", "9780143039649");
        this.libraryManager.loanBook("9780143039649", "user01");
    }
}