export interface IEmailService {
    sendEmail(userID: string, message: string): void;
}
