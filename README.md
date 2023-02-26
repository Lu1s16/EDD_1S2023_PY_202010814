# Manual Tecnico

# Presentacion
El siguiente manual describe los pasos necesarios para que cualquier persona que tenga cierta base de programacion en Golang y manejo de archivos .csv pueda hacer uso y entender el funcionamiento del programa, a su vez guiara a los usuarios que haran soporte al sistema, el cual les dara los requerimientos y la estructura para la construccion del sistema, además contiene un diagrama de clases para entender mejor el funcionamiento del sistema.

# Objetivos
## General
Brindar informacion necesaria para el uso y manejo del programa, con el fin de que se pueda hacer soporte y modificaciones en caso de ser necesarias.
## Especificos
- Describir los metodos creados en el programa
- Describirr las librerias utilizadas para el funcionamiento del programa
- Mostrar el diagrama de clases

# Procesos
1. Inicio de sesion
2. Carga de archivo .csv
3. Ingreso de datos de un estudiante
4. Aceptar/Rechazar estudiantes
5. Mostrar estudiantes aceptados
6. Graficar las diferentes estructuras

# Descripcion de los metodos creados
## Carpeta Cola
Esta carpeta contiene archivos para la estructura de la Cola para los estudiantes por aceptar/rechazar los cuales son los siguientes

### Nodo_Cola.go
Este archivo contiene una estructura Nodo_cola con los datos a almacenar que son el objeto Alumno el cual se explicara mas adelante y un apuntador llamado Siguiente. Para su uso se hace una importacion de la carpeta Objects donde se encuentran los archivos con los datos del estudiante.

### Cola.go
Este archivo contiene una estructura Cola el cual se usara para los diferentes metodos de la Cola. Los metodos que contiene son de Insertar, el cual insertara los datos del estudiante por aceptar/rechazar. Tambien contiene el metodo "Delete" el cual se encarga de eliminar los datos de la cola cuando el estudiante es aceptado/rechazado. Y por ultimo un metodo graficar el cual crea el texto para el archivo .dot el cual se explicara mas adelante para posteriormente crear una imagen donde se muestra la estructura de forma grafica.
