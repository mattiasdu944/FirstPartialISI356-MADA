import { IObserver } from "./";

export class NotificationService {

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
