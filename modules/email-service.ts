import { IEmailService } from "../interfaces";

export class EmailService implements IEmailService {
    sendEmail(userID: string, message: string) {
        console.log(`Enviando email a ${userID}: ${message}`);
        // Implementación real del envío de correo electrónico aquí
    }   
}