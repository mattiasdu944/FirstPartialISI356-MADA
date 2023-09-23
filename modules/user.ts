export interface IObserver {
    update(message: string): void;
}

export class User implements IObserver {
    constructor(public userID: string) {}

    update(message: string) {
        console.log(`Usuario ${this.userID} ha recibido un mensaje: ${message}`);
    }
}
