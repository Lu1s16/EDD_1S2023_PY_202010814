const form = document.getElementById('login-form');
const message = document.getElementById('message');

form.addEventListener('submit', function(event) {
	event.preventDefault();

	const username = form.username.value;
	const password = form.password.value;

	if (username === 'usuario' && password === 'contraseña') {
		message.innerText = 'Inicio de sesión exitoso!';
		message.style.color = 'green';
	} else {
		message.innerText = 'Nombre de usuario o contraseña incorrectos.';
		message.style.color = 'red';
	}
});