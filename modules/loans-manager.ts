import { EmailService, Library } from "./";

export class LoansManager {
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