const form = document.getElementById('login-form');
const message = document.getElementById('message');

//importaciones
import {AVL} from "./Arbol_avl.js";

var arbol_estudiantes = new AVL();



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
			
			document.getElementById("container").style.display = "none";
			document.getElementById("pagusuario").style.display = "block";
	
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
			arbol_estudiantes.inorden();
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

document.getElementById("cerrar_sesion_user").onclick = close_user

function close_user() {
	document.getElementById("container").style.display = "block";
	document.getElementById("pagusuario").style.display = "none";

	

}