# Manual Tecnico

## Index.html
Este archivo contiene los elementos para la pagina de login, la pagina del admin y la pagina del estudiante. Para evitar que se muestren al mismo tiempo se uso un < div > que contiene todos los elementos de cada pagina y dependiendo de donde se encuentre el usuario se mostrara el < div > correspondiente y se oculataran los demas.

## Index.js
Este archivo contiene toda la logica que maneja la pagina para su funcionamiento, las funciones que tiene son las siguientes:
- Carga de estudiantes
- Inicio de sesion
- Subir archivos
- Crear carpetas
- Eliminar carpetas
- Buscar carpetas
- Otorgar permisos
- Generar reportes

## Matriz_dispersa.js
Este archivo contiene la logica para el funcionamiento de una estructura de matriz dispersa, esta estructura se utilizo para el almacenamiento de los permisos que el estudiante otorgue a otros estudiantes, para esto almacenara en las coordenadas Y los archivos y en las coordenadas X el carnet del estudiante y en sus celdas el permiso que se le otorgo. Para coordenada se creo una lista enlazada y poder almacenar los datos. Este archivo cuenta con las siguientes funciones

- ### Insertar
  Esta funcion se encarga de insertar el permiso en la matriz buscando el     archivo y carnet para hacer las conexiones.
  
- ### Verificar_repetido
  Esta funcion recibe como parametro el archivo para poder verificar si existe el archivo en la lista enlazada de la coordenada Y
  
- ### Lista_vacia
  Esta funcion verifica si la lista enlazada donde se almacenan los archivos esta vacia

- ### users_vacia
  Esta funcion verifica si la lista enlazada que almacena los estudiantes esta vacia
  
- ### tarjetas_archivos
  Esta funcion crea las tarjetas de los archivos subidos para que el usuario pueda visualizarlos de mejor manera ne la pagina
  
- ### Insertar_archivo
  Esta funcion inserta solamente el archivo en la lista enlazada que corresponde la  coordenada Y de la matriz dispersa
  
- ### graficar
  Esta funcion genera el codigo en graphviz para mostrar la grafica de la matriz dispersa
 
- ### graficar_solo_archivos
  Esta funcion genera el codigo en graphviz para mostrar solo la lista de los archivos subidos.

## Lista_circular.js
Este archivo contiene la logica para la estructura de la lista circular simple, esta estructura almacenara las acciones que realice el estudiante, asi como tambien la fecha y hora en la que lo realizo. Este cuenta con las siguientes funciones:

- ### InsertarAlFinal
  Esta funcion recibe como parametro la accioo, fecha y hora e inserta al final de la lista
  
- ### graficar
  Esta funcion genera el codigo en graphviz para graficar la lista circular simple.

## Arbol_nario.js
Este archivo contiene la logica para la estructura del arbol n-ario, esta estructura almacena las carpetas que el estudiante cree. Este cuenta con las siguientes funciones:
 
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
  Esta funcion genera el codigo en graphviz para poder graficar el arbol n-ario.

## Arbol_avl.js
Este archivo contiene la logica para la estructura de un arbol avl, esta estructura almacena los daots del estudiante, como su nombre, carnet y contraseña. Este cuenta con las siguientes funciones:

- ### insertar
  Esta fucnion recibe como parametro los datos del estudiante y hace la insercion, en caso de haber un desequilibro en el arbol se hace una rotacion dependiendo del caso.
  
- ### preorden
  Esta funcion hace un recorrido pre-orden del arbol avl, esta funcion sirve para generar la tabla en pre-orden al momento de mostrarle al usuario los datos de cada estudiante.
  
- ### postorden
  Esta funcion hace un recorrido post-orden del arbol avl, esta funcion sirve para generar la tabla en post-orden al momento de mostrarle al usuario los datos de cada estudiante
  
- ### inorden
  Esta funcion hace un recorrido in-orden del arbol avl, esta funcion sirve para generar la tabla en in-orden al momento de mostrarle al usuario los datos de cada estudiante.
 
- ### verificar_existe
  Esta fucnion recibe como parametro el carnet del estudiante y sirve para verificar si ya existe en el arbol
  
- ### buscarcarnet
  Esta funcion recibe como parametro el carnet y contrasena del usuario, sirve para el inicio de sesion y busca el estudiante en el arbol.
  
- ### retornar_estudiante
  Esta fucnion recibe como parametro el carnet y contrasena del usuario, sirve para retornar el nodo del estudiante.
  
- ### graficar_arbol
  Esta funcion genera el codigo en graphviz para hacer la grafica del arbol avl.

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
