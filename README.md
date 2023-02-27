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

## Carpeta dot
Esta carpeta contiene el archivo dot.go el cual contiene el metodo Escribir_json el cual se encarga de crear un archivo .json para los reportes. Tambien tiene un metodo Escribir_archivo el cual crea el archivo .dot y tambien tiene un metodo GenerarPNG el cual convierte el archivo .dot en .png

## Carpeta Lista_doble
Esta carpeta contiene los archivos para la estructura de lista doble para los estudiantes aceptados, los cuales son los siguientes:

### Nodo_lista_doble.go
Este archivo contiene una estructura Nodo_lista_doble el cual almacena el bojeto alumno, dos apuntadores (Siguiente y Anterior) y tambien una estructura Pila el cual se explicara mas adelante.

### Lista_doble.go
Este archivo contiene los metodos para el funcionamiento de la lista doble y una estructura Lista_doble el cual contiene los nodos Nodo_lista_doble (First y Last) y tambien el tamaño de la Lista_doble. Los metodos que contiene son Insertar el cual agrega un estudiante aceptado a la lista doble con su respectiva pila. Tiene un metodo Verificar_repetido el cual verifica si un carnet esta repetido en la lista doble y retorna un true si ya existe un estudiante con el mismo carnet, y false en caso contrario. Contiene un metodo Imprimir el cual muestra en consola los datos de los estudiantes aceptados. Contiene el metodo Ordenar el cual ordena los estudiantes por carnet por medio del metodo burbuja. Contiene el metodo Buscar_Alumno el cual busca un alumno en la lista doble y lo retorna en caso de encontrarlo, utiliza el metodo de busqueda binaria. Y por ultimo contiene el metodo Graficar el cual crea el texto para el archivo .dot.


## Carpeta Objects
Esta carpeta contiene los archivos de los objetos Alumno y Bitacora, el archivo Alumnos.go Contiene los siguientes datos para los alumnos: Nombre, Apellido, Carnet y Contrasena. El archivo Bitacoras.go contiene los siguietnes datos para la bitacora: Nombre, Fecha y Hora.

## Carpeta Pila
Esta carpeta contiene los archivos para la estructura de una Pila, los cuales sirven para la bitacora del admin y del estudiante. Los cuales son los siguientes:

### Nodo_pila.go
Este archivo contiene una estructura llamada Nodo_Pila el cual almacena los datos para la bitacora y un apuntador Anterior.

### Pila.go
Este archivo contiene los metodos para la Pila. Contiene el metodo Push el cual inserta los datos en la Pila. Tambien contiene el metodo Graficar, el cual crea el texto para el archivo .dot.

### Archivo main.go
Este archivo contiene las funcionalidades principales del administrador, como inicio de sesion, crear los reportes, carga masiva de estudiantes, ver estudiantes en consola, ver estudiantes pendientes por aceptar/rechazar.
