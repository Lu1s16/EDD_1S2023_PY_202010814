# Manual Tecnico
A continuacion se muestra un manual tecnico para que otras personas con conocimiento en js y html puedan darle mantenimiento a la aplicacion.

## Index.html
Este archivo contiene los elementos para la pagina de login, la pagina del admin y la pagina del estudiante. Para evitar que se muestren al mismo tiempo se uso un < div > que contiene todos los elementos de cada pagina y dependiendo de donde se encuentre el usuario se mostrara el < div > correspondiente y se oculataran los demas.

## Index.js
Este archivo contiene toda la logica que maneja la pagina para su funcionamiento, las funciones que tiene son las siguientes:
- Pasar estudiantes a tabla hash
- Inicio de sesion
- Subir archivos
- Crear carpetas
- Eliminar carpetas
- Visualizar archivos compartidos
- Enviar mensajes
- Buscar carpetas
- Otorgar permisos
- Generar reportes
- Generar tabla de permisos
- Generar tabla hash

## Arbol_nario.js
Este archivo a diferencia de la version anterior sufrio unos cuantos cambios, ya que ahora este sirve para generar el gafro dirigido. La logica se mantiene similar a excpecion de la graficacion que si tiene unos cambios:
 
- ### insertar
  Esta funcion recibe como parametro el nombre de la carpeta y la ruta actual para hacer su insercion.

- ### getFolder
  Esta funcion recibe como parametro la ruta actual, sirve para obtener las carpetas de la ruta que el usuario busque.
  
- ### delete_folder
  Esta funcion recibe como parametro la ruta y carpeta que se desea eliminar. si en caso no encuentra la carpeta se mostra un mensaje de error
  
- ### show_folders
  Esta funcion recibe como parametro la ruta actual, lo que hara es crear una tarjeta que muestra la carpeta que tiene para que el estudiante pueda verlo de mejor manera.
  
- ### repetido
  Esta funcion recibe como parametro el nombre de la carpeta y verifica si ya existe la carpeta en la ruta en la que se encuentre.
  
- ### graficar
  Esta funcion genera el codigo en graphviz para poder graficar el grafo dirigido.

## Blockchain.js
Este archivo contiene la logica para la estructura de datos blockchain, el cual se maneja con una lista doblemente enlazada. Este guardara el index, timestamp que es la fecha actual, transmiter que es quien envia el mensaje, receiver quien es el que recibe el mensaje, el mensaje, el hash previo y el hash del nodo, en este caso manejarmos los nodos como bloques. Los metodos que se tuilizaron fueron las siguientes:

### InsertarAlFinal
Este metodo encripta el mensaje y guarda los demas datos junto al mensaje encriptado al nodo y lo inserta al final de la lista.

### getSha256
Este metodo es el que encripta el mensaje, para eso se envia el mensaje y retorna el mensaje ya encriptado.

### Imprimir_de_primero_ultimo
Este metodo imprime en consola los datos de cada bloque.

### graficar
Este metodo grafica cada bloque del blockchain y retorna su imagen para ser mostrada al usuario.

### graficar_individual
Este metodo recibe una posicion, para poder graficar solo un bloque, se verifica si la posicion es menor al tamaño del blockchain para poder graficarlo.

## home.css
Este archivo sirve para darle estilo a los diferentes elementos de la pagina.

## Algoritmos
A continuacion se muestra algunos algoritmos que se utilizaron para el funcionamiento de la pagina

- ### Crear carpeta
 1. Primero obtener la ruta actual donde este el estudiante
 2. Obtener el nombre de la carpeta que se desea crear
 3. Verificar si la carpeta ya existe
 4. Si existe agregar "copia" al nombre de la carpeta y agregarlo al arbol n-ario
 5. Caso contrario solo se agrega al arbol n-ario

- ### Graficar matriz dispersa
 1. Verificar si existen archivos
 2. Si no existen los archivos mostrar un mensaje de erorr
 3. Caso contrario verificar si ya se otorgaron permisos
 4. Si no se otorgaron permisos solo se grafican los archivos
 5. Caso contrario se grafica la matriz completa.

- ### otorgar permisos
 1. Obtener el carnet del usuario
 2. Obtener el nombre del archivo
 3. Obtener el tipo de permiso
 4. Verificar que existe ael usuario y el archivo
 5. Si no existe mostrar mensaje de error
 6. Caso contrario insertar en la matriz

- ### subir archivo
 1. Obtener la carpeta actual
 2. Obtener el nombre del archivo
 3. Verifico que no este reptido
 4. Si esta repetido, agregar un alias de "copia" al archivo y almacenarlo en la coordenada Y de la matriz dispersa
 5. Caso contrario solo almacenarlo en la coordenada Y de la matriz dispersa.
