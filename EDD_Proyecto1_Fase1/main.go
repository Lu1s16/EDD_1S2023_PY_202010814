package main

import (
	f "fmt"
	"proyecto/Cola"
	"proyecto/Lista_doble"
	"proyecto/Pila"
	"proyecto/dot"

	"encoding/csv" //para leer archivos csv
	"encoding/json"
	"log"
	"os"
	str "strconv"
	"strings"
	"time"
)

type Estudiante struct {
	Nombre       string `json:"Nombre"`
	Carnet       string `json:"Carnet"`
	Password     string `json:"Password"`
	Carpeta_Raiz string `json:"Carpeta_Raix"`
}

func Crear_json(Estudiantes *Lista_doble.Lista_doble) {

	temp := Estudiantes.Last

	data := `{  "Alumnos": [ `

	for temp != nil {

		if Estudiantes.Size == 1 {
			data += `{ "Nombre": ` + `"` + temp.Alumno.Nombre + " " + temp.Alumno.Apellido + `", ` + `"Carnet": ` + `"` + temp.Alumno.Carnet + `",  ` + `"Password": ` + `"` + temp.Alumno.Contrasena + `",  ` + `"Carpeta_Raiz": "/"   } `

		} else {

			if temp.Siguiente == nil {

				data += `{  "Nombre": ` + `"` + temp.Alumno.Nombre + " " + temp.Alumno.Apellido + `",  ` + `"Carnet": ` + `"` + temp.Alumno.Carnet + `",  ` + `"Password": ` + `"` + temp.Alumno.Contrasena + `",  ` + `"Carpeta_Raiz": "/"   } `

			} else {

				data += `{  "Nombre": ` + `"` + temp.Alumno.Nombre + " " + temp.Alumno.Apellido + `",  ` + `"Carnet": ` + `"` + temp.Alumno.Carnet + `",  ` + `"Password": ` + `"` + temp.Alumno.Carnet + `",  ` + `"Carpeta_Raiz": "/"   }, `

			}

		}

		temp = temp.Siguiente

	}

	data += "]  }"

	bytes := []byte(data)
	var e Estudiante

	err := json.Unmarshal(bytes, &e)

	if err != nil {
		panic(err)
	}

	//f.Println(string(bytes))

	path, err := os.Getwd()

	if err != nil {
		log.Println(err)
	}

	json_nuevo := strings.Split(string(bytes), ",")

	json_nuevo2 := ""

	sub_total := 0

	total := len(json_nuevo)

	for _, elem := range json_nuevo {

		if sub_total == total-1 {
			json_nuevo2 += elem + " \n"
		} else if sub_total%4 == 0 {
			json_nuevo2 += elem + ", \n\n"
		} else {
			json_nuevo2 += elem + ", \n"
		}

		sub_total++
	}

	dot.Escribir_json(json_nuevo2, "Reporte.json", path)

}

func Menu_Reportes(Cola_estudiantes *Cola.Cola, Estudiantes_aceptados *Lista_doble.Lista_doble, Bitacora_admin *Pila.Pila) {

	for {
		var op int

		f.Println("--------Menu Reportes--------")
		f.Println("1.Reporte bitacora admin")
		f.Println("2.Reporte lista estudiantes")
		f.Println("3.Reporte Cola estudiantes")
		f.Println("4.Reporte Json")
		f.Println("5.Salir")
		f.Println("-----------------------------")

		f.Print("Ingrese una opcion: ")
		f.Scanln(&op)

		if op == 1 {
			//Reporte bitacora admin
			Codigo := Bitacora_admin.Graficar()

			path, err := os.Getwd()

			if err != nil {
				log.Println(err)
			}

			dot.Escriir_archivo(Codigo, "Bitacora.dot", path)

			dot.GenerarPNG("Bitacora.dot", path)

		} else if op == 2 {
			//Reporte lista estudiantes
			Codigo := Estudiantes_aceptados.Graficar()

			//f.Println(Codigo)

			path, err := os.Getwd()

			if err != nil {
				log.Println(err)
			}

			dot.Escriir_archivo(Codigo, "Estudiantes.dot", path)

			dot.GenerarPNG("Estudiantes.dot", path)

		} else if op == 3 {
			//Reporte cola estudiantes
			Codigo := Cola_estudiantes.Graficar()

			//f.Println(Codigo)
			path, err := os.Getwd()

			if err != nil {
				log.Println(err)
			}

			dot.Escriir_archivo(Codigo, "Cola.dot", path)

			dot.GenerarPNG("Cola.dot", path)

		} else if op == 4 {
			//Reporte Json

			Crear_json(Estudiantes_aceptados)

		} else {
			f.Println("")
			break
		}
	}

}

func Carga_estudiantes(Cola_estudiantes *Cola.Cola) {

	//Se ingresa el nombre del archivo
	var route string
	f.Print("Ingrese nombre del archivo: ")
	f.Scanln(&route)

	//Se abre el archivo
	fi, err1 := os.Open(route)

	if err1 != nil {
		log.Fatal("No existe el archivo "+route, err1)
		//f.Println("No existe el archivo")
		//f.Println("")
	}

	file := csv.NewReader(fi)

	records, err := file.ReadAll()

	if err != nil {
		log.Fatal("Error en la lectura del archivo"+route, err)
	}

	//For each para leer cada linea del archivo
	for index, row := range records {
		if index > 0 {
			Carnet := row[0]
			Nombre_completo := row[1]

			Nombre_y_apellido := strings.Split(Nombre_completo, " ")

			Nombre := Nombre_y_apellido[0]
			Apellido := Nombre_y_apellido[1]
			Contrasena := row[2]

			//f.Println("Nombre: " + Nombre)
			//f.Println("Apellido: " + Apellido)
			//f.Println("Carnet: " + Carnet)
			//f.Println("Contraseña: " + Contrasena)
			//f.Println("--------------------------")

			Cola_estudiantes.Insertar(Nombre, Apellido, Carnet, Contrasena)

		}
	}

	f.Println("Se cargo el archivo correctamente")
	f.Println("")

}

func Registrar_estudiante(Cola_Estudiantes *Cola.Cola) {

	for {

		var Nombre string
		var Apellido string
		var Carnet string
		var Contrasena string

		f.Print("Ingrese nombre del estudiante: ")
		f.Scanln(&Nombre)

		f.Print("Ingrese apellido del estudiante: ")
		f.Scanln(&Apellido)

		f.Print("Ingrese carnet del estudiante: ")
		f.Scanln(&Carnet)

		f.Print("Ingrese contraseña: ")
		f.Scanln(&Contrasena)

		Cola_Estudiantes.Insertar(Nombre, Apellido, Carnet, Contrasena)

		var op string
		f.Println("Desea agregar otro estudiante? si/no")
		f.Scanln(&op)

		if op == "no" {
			f.Println("")
			break
		}

	}

}

func Aceptar_estudiantes(Cola_Estudiantes *Cola.Cola, Estudiantes_aceptados *Lista_doble.Lista_doble, Bitacora_admin *Pila.Pila) {

	for {
		Size := Cola_Estudiantes.Size

		if Cola_Estudiantes.Is_empty() {
			f.Println("No hay estudiantes pendientes")
			f.Println("")
			break
		} else {

			Estudiante_actual := Cola_Estudiantes.Get_front()

			var op int

			//Datos para bitacora
			var Mensaje string

			f.Println("----- Pendientes: ", str.Itoa(Size), " -----")
			f.Println("")
			f.Println("----- Estudiante actual -----")
			f.Println("Nombre: ", Estudiante_actual.Nombre)
			f.Println("Apellido: ", Estudiante_actual.Apellido)
			f.Println("")
			f.Println("1.Aceptar")
			f.Println("2.Rechazar")
			f.Println("3.Regresar")
			f.Print("Ingrese una opcion: ")
			f.Scanln(&op)

			if op == 1 {

				//Verificar si existe el estudiante en la lista doble.

				Existe := Estudiantes_aceptados.Verificar_repetido(Estudiante_actual.Carnet)

				if !Existe {

					//Acepta y agrega a lista doble enlazada
					//Crear pila
					Bitacora_estudiante := Pila.Pila{}

					estudiante_aceptado := Cola_Estudiantes.Get_front()

					Nombre := estudiante_aceptado.Nombre
					Apellido := estudiante_aceptado.Apellido
					Carnet := estudiante_aceptado.Carnet
					Contrasena := estudiante_aceptado.Contrasena

					//Obtener datos para la bitacora del admin
					Mensaje = "Aceptado"
					now := time.Now()

					//Fecha actual en formato dd-mm-yyyy
					Fecha := f.Sprintf("%02d-%02d-%d", now.Day(), now.Month(), now.Year())

					//Hora actual en formato hh:mm:ss
					Hora := now.Format("15:04:05")

					Estudiantes_aceptados.Insertar(Nombre, Apellido, Carnet, Contrasena, &Bitacora_estudiante)
					Estudiantes_aceptados.Ordenar()
					Cola_Estudiantes.Delete()

					//Insertar datos en la bitacora del admin
					Bitacora_admin.Push(Mensaje, Nombre, Fecha, Hora)

					//Prueba
					//f.Println("Mensaje: " + Mensaje)
					//f.Println("Nombre: " + Nombre)
					//f.Println("Fecha: " + Fecha)
					//f.Println("Hora: " + Hora)

				} else {
					f.Println("Ya existe el usuario")
				}

			} else if op == 2 {

				//Obtener nombre del estudiante rechazado
				estudiante_rechazado := Cola_Estudiantes.Get_front()
				Nombre := estudiante_rechazado.Nombre

				//Sacar de la cola
				Cola_Estudiantes.Delete()

				//Datos para la bitacora del admin
				Mensaje = "Rechazado"
				now := time.Now()

				//Fecha actual
				Fecha := f.Sprintf("%02d-%02d-%d", now.Day(), now.Month(), now.Year())

				//Hora actual
				Hora := now.Format("15:04:05")

				//Insertar datos a bitacora del admin
				Bitacora_admin.Push(Mensaje, Nombre, Fecha, Hora)

				//Prueba
				//f.Println("Mensaje: " + Mensaje)
				//f.Println("Nombre: " + Nombre)
				//f.Println("Fecha: " + Fecha)
				//f.Println("Hora: " + Hora)

			} else if op == 3 {
				f.Println("")
				break
			}
		}

	}

}

// Menu Admin
func admin(Cola_Estudiantes *Cola.Cola, Estudiantes_aceptados *Lista_doble.Lista_doble, Bitacora_admin *Pila.Pila) {

	for {
		f.Println("----------Menu Admin----------")
		f.Println("1.Ver estudiantes pendientes")
		f.Println("2.Ver estudiantes del sistema")
		f.Println("3.Registrar nuevo estudiante")
		f.Println("4.Carga masiva de estudiantes")
		f.Println("5.Reportes")
		f.Println("6.Cerrar sesion")
		f.Println("------------------------------")

		var op int

		f.Print("Ingrese una opcion: ")
		f.Scanln(&op)

		if op == 1 {

			//ve estudiantes pendientes
			Aceptar_estudiantes(Cola_Estudiantes, Estudiantes_aceptados, Bitacora_admin)

		} else if op == 2 {

			//Ver estudiantes del sistema
			Estudiantes_aceptados.Imprimir()
			f.Println("")
		} else if op == 3 {
			//Registrar nuevo estudiante
			Registrar_estudiante(Cola_Estudiantes)

		} else if op == 4 {
			//Carga masiva de estudiante
			Carga_estudiantes(Cola_Estudiantes)

		} else if op == 5 {
			//Reportes
			Menu_Reportes(Cola_Estudiantes, Estudiantes_aceptados, Bitacora_admin)

		} else {
			f.Println("Se cerro sesion")
			f.Println("")
			break
		}
	}

}

func main() {

	Bitacora_admin := Pila.Pila{}
	Cola_Estudiantes := Cola.Cola{}
	Estudiantes_aceptados := Lista_doble.Lista_doble{}

	//f.Println(Bitacora_admin)

	for {
		f.Println("----------EDD GoDrive----------")
		f.Println("1.Iniciar sesion")
		f.Println("2.Salir")
		f.Println("-------------------------------")

		var op int
		f.Print("Ingrese una opcion: ")
		f.Scanln(&op)

		if op == 1 {
			//Ejecutar funcion para inicio de sesion
			var usuario string
			var password string
			f.Print("Ingrese su usuario: ")
			f.Scanln(&usuario)

			f.Print("Ingrese su contraseña: ")
			f.Scanln(&password)

			if usuario == "admin" && password == "admin" {
				admin(&Cola_Estudiantes, &Estudiantes_aceptados, &Bitacora_admin)
			} else {
				//Buscar usuario
				Existe, Estudiante := Estudiantes_aceptados.Buscar_Alumno(usuario, password)

				if Existe {

					now := time.Now()

					//Datos para la bitacora del usuario
					Nombre := Estudiante.Alumno.Nombre
					Mensaje := "Inicio de sesion correcta"

					Fecha := f.Sprintf("%02d-%02d-%d", now.Day(), now.Month(), now.Year())

					Hora := now.Format("15:04:05")

					//Agregarlos a la pila del estudiante
					Estudiante.Pila.Push(Mensaje, Nombre, Fecha, Hora)

					f.Println("Inicio correcto")

				} else {
					f.Println("Usuario / contraseña incorrecta")
				}

			}

		} else if op == 2 {
			f.Println("")
			break

		} else {
			f.Println("")
			break
		}

	}

}
