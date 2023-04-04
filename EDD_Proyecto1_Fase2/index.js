const form = document.getElementById('login-form');
const message = document.getElementById('message');




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

		document.getElementById("container").style.display = "none";
		document.getElementById("pagusuario").style.display = "block";


		message.innerText = 'Nombre de usuario o contraseña incorrectos.';
		message.style.color = 'red';
	}
});

//-------------------------------------Admin-----------------------------------------


document.getElementById("cerrar_sesion_admin").onclick = close_admin

function close_admin() {
	document.getElementById("container").style.display = "block";
	document.getElementById("pagAdmin").style.display = "none";
}


//-------------------------------------Usuario---------------------------------------

document.getElementById("cerrar_sesion_user").onclick = close_user

function close_user() {
	document.getElementById("container").style.display = "block";
	document.getElementById("pagusuario").style.display = "none";

	

}