const form = document.getElementById('login-form');
const message = document.getElementById('message');



//importaciones
import {AVL} from "./Arbol_avl.js";

var arbol_estudiantes = new AVL();

var estudiante_actual
var nodo_carpeta;

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
			var div_carpetas = document.getElementById("carpetas")
			var carpetas_individuales = estudiante_actual.carpetas.show_folders("/");
			div_carpetas.innerHTML = carpetas_individuales

			//obtengo el nodo carpeta raiz
			nodo_carpeta = estudiante_actual.carpetas.getFolder("/")
			
	
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

var ruta_actual = "/";



document.getElementById("cerrar_sesion_user").onclick = close_user
document.getElementById("Crear_carpeta").onclick = crear_carpeta
document.getElementById("buscador").onclick = buscar_carpeta
document.getElementById("Eliminar_carpeta").onclick = eliminar_carpeta
document.getElementById("submit_file").onclick = subir_archivo

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





}

function buscar_carpeta(){

	const ruta = document.getElementById("miInput").value

	//console.log(ruta)

	if(estudiante_actual.carpetas.getFolder(ruta) == null){
		//no encontro la ruta
		alert("No existe esta carpeta")


	} else {

		//obtengo el nodo carpeta que acabo de buscar
		nodo_carpeta = estudiante_actual.carpetas.getFolder(ruta);



		ruta_actual = ruta;
		var div_carpetas = document.getElementById("carpetas")
		var carpeta_individuales = estudiante_actual.carpetas.show_folders(ruta_actual);
		div_carpetas.innerHTML = carpeta_individuales
	}
	


}

var copia_carpeta = 0;

function crear_carpeta() {

	//Obtengo nombre de carpeta
	var nombre_carpeta = document.getElementById("carpeta_nueva").value;

	//Verifico si ya existe en la ruta actual

	var isrepeat = estudiante_actual.carpetas.repetido(ruta_actual+"/"+nombre_carpeta);

	if(isrepeat){
		//esta repetido
		copia_carpeta++;
		nombre_carpeta+="_copia("+copia_carpeta+")";

		estudiante_actual.carpetas.insertar(nombre_carpeta, ruta_actual)
		var div_carpetas = document.getElementById("carpetas")
		var carpeta_individuales = estudiante_actual.carpetas.show_folders(ruta_actual);
		div_carpetas.innerHTML = carpeta_individuales

	} else {
		estudiante_actual.carpetas.insertar(nombre_carpeta, ruta_actual)
		var div_carpetas = document.getElementById("carpetas")
		var carpeta_individuales = estudiante_actual.carpetas.show_folders(ruta_actual);
		div_carpetas.innerHTML = carpeta_individuales
	}
	
	console.log(estudiante_actual.password)

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

function subir_archivo(e){

	e.preventDefault();

	const archivo = document.getElementById("archivo").files[0]; // obtener el archivo
	const input_archivo = document.getElementById("archivo")

	
	var nombre_archivo = archivo.name

	var ruta_origen = input_archivo.value

	console.log(nombre_archivo)
	console.log(ruta_origen)

	var tarjeta_archivo = `
	<a href="${nombre_archivo}" download="${nombre_archivo}">
	<button type="button">Descargar</button>
	</a>
	`

	var contenedor = document.getElementById("carpetas")
	contenedor.innerHTML = tarjeta_archivo

}





	

	

	

