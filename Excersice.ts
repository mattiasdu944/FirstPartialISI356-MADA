import { App } from './app';

/*Aplicación de Administración de Biblioteca

Eres el desarrollador principal de una aplicación de administración de biblioteca. En un intento por hacer que la aplicación sea "fácil de usar",
 se ha agregado una gran cantidad de funcionalidad en una única clase, y se ha utilizado un único método para resolver diferentes tareas.

La clase LibraryManager no sólo se encarga de agregar o eliminar libros, sino que también gestiona los préstamos, las devoluciones y 
hasta la notificación por correo electrónico a los usuarios. Asimismo, se ha optado por usar un único método para realizar búsquedas, 
sin importar si es por título, autor o ISBN, complicando su implementación.

Se ha identificado que la clase es muy difícil de mantener y modificar. Tu tarea es estudiar el código, identificar los problemas y
 considerar cómo podría refactorizarse para mejorar su diseño y estructura.
*/
const app = new App();
app.run();