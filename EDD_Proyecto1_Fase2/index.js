const form = document.getElementById('login-form');
const message = document.getElementById('message');



//importaciones
import {AVL} from "./Arbol_avl.js";

var arbol_estudiantes = new AVL();

var estudiante_actual
var nodo_carpeta;
var ruta_actual;


//--------------------------------------Login---------------------------------------

form.addEventListener('submit', function(event) {
	event.preventDefault();

	const username = form.username.value;
	const password = form.password.value;

	

	if (username === 'admin' && password === 'admin') {
		alert("Inicio de sesion correcto")

		document.getElementById("container").style.display = "none";
		document.getElementById("pagAdmin").style.display = "block";
		//muestro el de usuario o admin

	} else {
		//Inicio de sesion como estudiante
		
		//console.log(arbol_estudiantes.buscarcarnet(username, password))

		if(arbol_estudiantes.buscarcarnet(username, password)){

			//obtengo el estudiante que inicio sesion
			estudiante_actual = arbol_estudiantes.retornar_estudiante(username, password)
			//console.log(estudiante_actual)
			
			//hago aparecer el div de usuario y desaparesco el del login
			document.getElementById("container").style.display = "none";
			document.getElementById("pagusuario").style.display = "block";

			//Creo las tarjetas de carpeta que existan en la ruta "/"
			ruta_actual = "/";
			var div_carpetas = document.getElementById("carpetas")
			var carpetas_individuales = estudiante_actual.carpetas.show_folders(ruta_actual);
			div_carpetas.innerHTML = carpetas_individuales

			

			//obtengo el nodo carpeta raiz
			nodo_carpeta = estudiante_actual.carpetas.getFolder(ruta_actual)

			//Crear tarjetas de archivos que existan
			var archivo_individuales = nodo_carpeta.archivos.tarjetas_archivos();
			div_carpetas.innerHTML+=archivo_individuales
			

			//reseteo los divs de reportes
			var contenedor_arbol_carpetas = document.getElementById("arbol_n-ario")
			contenedor_arbol_carpetas.innerHTML = "<h2>Reporte carpetas</h2>"
	
			var contenedor_matriz = document.getElementById("matriz")
			contenedor_matriz.innerHTML = "<h2>Reporte archivos</h2>"

			var div_grafo_lista_circular = document.getElementById("lista_circular")
			div_grafo_lista_circular.innerHTML = "<h2>Reporte bitacora</h2>"

		} else {
			message.innerText = 'Nombre de usuario o contraseña incorrectos.';
			message.style.color = 'red';
		}


		




		
	}
	
});

//-------------------------------------Admin-----------------------------------------

//para tipo input
const input_usuarios = document.getElementById("Cargar_estudiantes")

//para botones normales
document.getElementById("In-Orden").onclick = graficar_tabla_in_orden;
document.getElementById("Post-Orden").onclick = graficar_tabla_post_orden;
document.getElementById("Pre-Orden").onclick = graficar_tabla_preo_orden;
document.getElementById("Graficar_Arbol_avl").onclick = graficar_arbol_url;


document.getElementById("cerrar_sesion_admin").onclick = close_admin

function close_admin() {
	document.getElementById("container").style.display = "block";
	document.getElementById("pagAdmin").style.display = "none";
}



function Leer_usuarios(){
	var ruta = input_usuarios.value
	console.log(ruta)
	var nombre_ruta = ruta.replace(/^.*[\\\/]/, '')
	console.log(nombre_ruta);

	const xhttp = new XMLHttpRequest();

	xhttp.open("GET", nombre_ruta, true)

	xhttp.send()

	xhttp.onreadystatechange = function(){

		if(this.readyState == 4 && this.status == 200){
			let datos = JSON.parse(this.responseText)
			//console.log(datos)

			for(let item of datos.alumnos){
				//aqui guardo cada item en el arbol avl
				//console.log(item)

				arbol_estudiantes.insertar(item.nombre, item.carnet, item.password);



			}

			console.log("Se agregaron correctamente")

			console.log("inorde")
			//arbol_estudiantes.inorden();
			console.log("preorden");
			//arbol_estudiantes.preorden();
			console.log("postorden");
			//arbol_estudiantes.postorden();

			var div_tabla = document.getElementById("tabla_estudiantes")
			var tabla_usuarios_in_orden = arbol_estudiantes.tabla_in_orden()

			div_tabla.innerHTML = tabla_usuarios_in_orden;
			alert("se cargaron los datos correctamente")

		}

	}


}

function graficar_arbol_url(){

	var div_grafo = document.getElementById("arbol_avl")
	
	var grafo_arbol = arbol_estudiantes.graficar_arbol();

	div_grafo.innerHTML = grafo_arbol;
	
}

function graficar_tabla_in_orden(){

	

	var div_tabla = document.getElementById("tabla_estudiantes")
	var tabla_usuarios_in_orden = arbol_estudiantes.tabla_in_orden()

	div_tabla.innerHTML = tabla_usuarios_in_orden;

}

function graficar_tabla_post_orden(){

	

	var div_tabla = document.getElementById("tabla_estudiantes")
	var tabla_usuarios_post_orden = arbol_estudiantes.tabla_post_orden()

	div_tabla.innerHTML = tabla_usuarios_post_orden;

}

function graficar_tabla_preo_orden(){

	var div_tabla = document.getElementById("tabla_estudiantes")
	var tabla_usuarios_pre_orden = arbol_estudiantes.tabla_pre_orden();

	div_tabla.innerHTML = tabla_usuarios_pre_orden;

}

//("change", funcion)
input_usuarios.addEventListener("change", Leer_usuarios)


//-------------------------------------Usuario---------------------------------------




//botones con sus funciones
document.getElementById("cerrar_sesion_user").onclick = close_user
document.getElementById("Crear_carpeta").onclick = crear_carpeta
document.getElementById("buscador").onclick = buscar_carpeta
document.getElementById("Eliminar_carpeta").onclick = eliminar_carpeta
document.getElementById("submit_file").onclick = subir_archivo
document.getElementById("Reporte_bitacora").onclick = graficar_lista_cirular
document.getElementById("get_user").onclick = otorgar_permisos
document.getElementById("Reporte_archivos").onclick = graficar_matriz
document.getElementById("Reporte_carpetas").onclick = graficar_arbol_carpetas


function close_user() {
	document.getElementById("container").style.display = "block";
	document.getElementById("pagusuario").style.display = "none";

	

}

//Elimina la carpeta obtneiendo el nombre de un input tipo text
function eliminar_carpeta(){

	var folder = document.getElementById("folder_deleted").value

	estudiante_actual.carpetas.delete_folder(ruta_actual, folder)
	

	var div_carpetas = document.getElementById("carpetas")
	var carpeta_individuales = estudiante_actual.carpetas.show_folders(ruta_actual);
	div_carpetas.innerHTML = carpeta_individuales

	//Crear tarjetas de archivos
	var archivo_individuales = nodo_carpeta.archivos.tarjetas_archivos();
	div_carpetas.innerHTML+=archivo_individuales

	//agrego accion al reporte de lista circular
	var today = new Date();
	var accion = "Se elimino carpeta: "+folder
	var fecha = today.toLocaleDateString("en-US");
	var hora = today.toLocaleTimeString("en-US");
	//console.log("-------")
	//console.log("Accionn: "+accion)
	//console.log("fecha: "+fecha)
	//console.log("hora: "+hora)
	estudiante_actual.bitacora.InsertarAlFinal(accion, fecha, hora);




}
var copia_archivo = 0;
function buscar_carpeta(){

	const ruta = document.getElementById("miInput").value
	var div_carpetas = document.getElementById("carpetas")

	//console.log(ruta)

	if(estudiante_actual.carpetas.getFolder(ruta) == null){
		//no encontro la ruta
		alert("No existe esta carpeta")


	} else {

		//obtengo el nodo carpeta que acabo de buscar
		nodo_carpeta = estudiante_actual.carpetas.getFolder(ruta);



		ruta_actual = ruta;
		
		
	}

	//Crea tarjeta carpeta
	var carpeta_individuales = estudiante_actual.carpetas.show_folders(ruta_actual);
	div_carpetas.innerHTML = carpeta_individuales

	//Crear tarjetas de archivos
	var archivo_individuales = nodo_carpeta.archivos.tarjetas_archivos();
	div_carpetas.innerHTML += archivo_individuales

	copia_archivo = 0
	


}

var copia_carpeta = 0;

function crear_carpeta() {

	//Obtengo nombre de carpeta
	var nombre_carpeta = document.getElementById("carpeta_nueva").value;

	//Verifico si ya existe en la ruta actual

	var isrepeat = estudiante_actual.carpetas.repetido(ruta_actual+"/"+nombre_carpeta);
	var div_carpetas = document.getElementById("carpetas")

	if(isrepeat){
		//esta repetido
		copia_carpeta++;
		nombre_carpeta+="_copia("+copia_carpeta+")";

		estudiante_actual.carpetas.insertar(nombre_carpeta, ruta_actual)
		
		var carpeta_individuales = estudiante_actual.carpetas.show_folders(ruta_actual);
		div_carpetas.innerHTML = carpeta_individuales

	} else {
		estudiante_actual.carpetas.insertar(nombre_carpeta, ruta_actual)
		
		var carpeta_individuales = estudiante_actual.carpetas.show_folders(ruta_actual);
		div_carpetas.innerHTML = carpeta_individuales
	}
	
	console.log(estudiante_actual.password)

	//Crear tarjetas de archivos
	var archivo_individuales = nodo_carpeta.archivos.tarjetas_archivos();
	div_carpetas.innerHTML+=archivo_individuales

	//agrego accion al reporte de lista circular
	var today = new Date();
	var accion = "Se creo carpeta: "+nombre_carpeta
	var fecha = today.toLocaleDateString("en-US");
	var hora = today.toLocaleTimeString("en-US");
	//console.log("-------")
	//console.log("Accionn: "+accion)
	//console.log("fecha: "+fecha)
	//console.log("hora: "+hora)
	estudiante_actual.bitacora.InsertarAlFinal(accion, fecha, hora);


	//estudiante_actual.carpetas.insertar("Musica", "/")
	//estudiante_actual.carpetas.insertar("Videos", "/")
	//estudiante_actual.carpetas.insertar("Imagenes", "/")
	//estudiante_actual.carpetas.insertar("2022", "/Imagenes")
	//estudiante_actual.carpetas.insertar("2021", "/Imagenes")

	console.log("folder actual")
	//Imprime el nodo de "/"
	console.log(estudiante_actual.carpetas.getFolder(ruta_actual))
	//console.log("ruta de imagenes")
	//console.log(estudiante_actual.carpetas.getFolder("/Imagenes"))

	console.log(estudiante_actual.carpetas.graficar())
	
}



function subir_archivo(){

	
	const input_archivo = document.getElementById("archivo")

	
	

	var ruta_origen = input_archivo.value

	//obtengo ruta y nombre de archivo
	var nombre_ruta_archivo = ruta_origen.replace(/^.*[\\\/]/, '')


	//console.log(nombre_archivo)

	//Verifico que no este repetido el archivo
	var isRepeat = nodo_carpeta.archivos.verificar_repetido(nombre_ruta_archivo);

	console.log(isRepeat)
	if(isRepeat){
		console.log("esta repetido")
		copia_archivo++

		nombre_ruta_archivo+="_copia"+copia_archivo

		nodo_carpeta.archivos.Insertar_archivo(nombre_ruta_archivo)

	} else {

		nodo_carpeta.archivos.Insertar_archivo(nombre_ruta_archivo)
	}

	console.log("-------")
	nodo_carpeta.archivos.recorrer_cabeceras_filas()

	//Crea tarjetas de carpetas
	var div_carpetas = document.getElementById("carpetas")
	var carpeta_individuales = estudiante_actual.carpetas.show_folders(ruta_actual);
	div_carpetas.innerHTML = carpeta_individuales

	//Crear tarjetas de archivos
	var archivo_individuales = nodo_carpeta.archivos.tarjetas_archivos();
	div_carpetas.innerHTML+=archivo_individuales

	//Accion de subir archivo
	var today = new Date();
	var accion = "Se subio archivo: "+nombre_ruta_archivo
	var fecha = today.toLocaleDateString("en-US");
	var hora = today.toLocaleTimeString("en-US");
	//console.log("-------")
	//console.log("Accionn: "+accion)
	//console.log("fecha: "+fecha)
	//console.log("hora: "+hora)
	estudiante_actual.bitacora.InsertarAlFinal(accion, fecha, hora);

	//console.log(nombre_ruta_archivo)

	//var tarjeta_archivo = `
	//<a href="${nombre_ruta_archivo}" download="${nombre_ruta_archivo}">
	//<button type="button">Descargar</button>
	//</a>
	//`
//
	//var contenedor = document.getElementById("carpetas")
	//contenedor.innerHTML = tarjeta_archivo

}

//Funciones para generar graficas

function graficar_lista_cirular(){

	//estudiante_actual.bitacora.Imprimir();
	
	//console.log(grafica_lista_circular)

	var div_grafo_lista_circular = document.getElementById("lista_circular")
	var grafica_lista_circular = estudiante_actual.bitacora.graficar()

	div_grafo_lista_circular.innerHTML = grafica_lista_circular;


}

function otorgar_permisos() {

	var user = document.getElementById("user_shared").value
	var file = document.getElementById("file_shared").value

	var lectura = document.getElementById("Lectura")
	var escritura = document.getElementById("Escritura")

	var permiso = ""

	if(lectura.checked && escritura.checked){
		permiso = "r-w"
	} else if(lectura.checked){
		permiso = "r"

	} else if(escritura.checked){
		permiso = "w"
	}

	//console.log("-----")
	//console.log(user)
	//console.log(file)
	//console.log(permiso)

	var existe_user = arbol_estudiantes.verificar_existe(user)
	var existe_file = nodo_carpeta.archivos.verificar_repetido(file)

	

	if(existe_user && existe_file){
		//inserto en matriz
		console.log("Si existe usuario y archivo")
		nodo_carpeta.archivos.Insertar(file, user, permiso)
		//console.log(nodo_carpeta.archivos.graficar("hola"))
		//nodo_carpeta.archivos.graficar_2(nodo_carpeta.folderName)
		alert("Se otorgaron permisos correctamente")
		
	} else {
		console.log("Error")
		alert("Error Ussuario/archivo no existen")
	}
	

}


function graficar_matriz(){

	var graphviz = ""

	var empty = nodo_carpeta.archivos.lista_vacia();

	if(empty){
		alert("Error, no hay archivos para poder graficar")
	} else {

		var empty_users = nodo_carpeta.archivos.users_vacia();

		if(empty_users){
			var contenido = nodo_carpeta.archivos.graficar_solo_archivos(nodo_carpeta.folderName)
			graphviz = "<img id=\"image_matriz\"\n"+
			"   src=\'https://quickchart.io/graphviz?format=png&width=900&height=1200&graph="+ contenido +"\'"+
			" />"

			var contenedor_matriz = document.getElementById("matriz")
			contenedor_matriz.innerHTML = graphviz


		} else {
			var contenido = nodo_carpeta.archivos.graficar_2(nodo_carpeta.folderName)
			graphviz = "<h2>Reporte permisos</h2><img id=\"image_matriz\"\n"+
			"   src=\'https://quickchart.io/graphviz?format=png&width=900&height=1200&graph="+ contenido +"\'"+
			" />"

			var contenedor_matriz = document.getElementById("matriz")
			contenedor_matriz.innerHTML = graphviz

		}

	}



}

function graficar_arbol_carpetas(){

	var graphviz = ""

	var contenido = estudiante_actual.carpetas.graficar();

	graphviz = "<h2>Reporte carpetas</h2><img id=\"image\"\n"+
	"   src=\'https://quickchart.io/graphviz?format=png&width=800&height=1100&graph=digraph{"+ contenido +"}\'"+
	" />"

	var contenedor_arbol_carpetas = document.getElementById("arbol_n-ario")

	contenedor_arbol_carpetas.innerHTML = graphviz






}


	

	

	

