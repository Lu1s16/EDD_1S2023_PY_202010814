package Lista_doble

import (
	"fmt"
	"proyecto/Objects"
	"proyecto/Pila"
	"strconv"
)

type Lista_doble struct {
	First *Nodo_lista_doble
	Last  *Nodo_lista_doble
	Size  int
}

func (Lista_doble *Lista_doble) Insertar(Nombre string, Apellido string, Carnet string, Contrasena string, Pila *Pila.Pila) {

	Nuevo_alumno := Objects.Alumno{Nombre: Nombre, Apellido: Apellido, Carnet: Carnet, Contrasena: Contrasena}

	fmt.Println("Pila del estudiante")
	fmt.Println(Pila)

	Nuevo_nodo := &Nodo_lista_doble{Alumno: Nuevo_alumno, Pila: Pila}

	if Lista_doble.First == nil {
		Lista_doble.First = Nuevo_nodo
		Lista_doble.Last = Nuevo_nodo
		Lista_doble.Size++
	} else {

		//Inserto al final de la lista
		Nuevo_nodo.Siguiente = Lista_doble.Last
		Lista_doble.Last.Anterior = Nuevo_nodo
		Lista_doble.Last = Nuevo_nodo

		Lista_doble.Size++
	}

}

func (Lista_doble *Lista_doble) Verificar_repetido(Carnet string) bool {

	temp := Lista_doble.Last

	for temp != nil {

		if temp.Alumno.Carnet == Carnet {
			return true
		}

		temp = temp.Siguiente

	}

	return false

}

func (Lista_doble *Lista_doble) Imprimir() {

	temp := Lista_doble.Last

	if temp == nil {
		fmt.Println("No hay estudiantes en el sistema")
	}

	for temp != nil {

		//Imprimo desde el ultimo hasta el primero

		fmt.Println("Nombre: ", temp.Alumno.Nombre)
		fmt.Println("Apellido: ", temp.Alumno.Apellido)
		fmt.Println("Carnet: ", temp.Alumno.Carnet)
		//fmt.Println("Pila: ", temp.Pila)
		fmt.Println("---------------------------------")

		temp = temp.Siguiente
	}

}

func (Lista_doble *Lista_doble) Ordenar() {

	var (
		i          int
		k          int
		aux_alumno Objects.Alumno
		//aux_Pila   *Pila.Pila
	)

	for k = 1; k < Lista_doble.Size; k++ {
		actual := Lista_doble.Last

		for i = 0; i < Lista_doble.Size-k; i++ {

			if actual.Alumno.Carnet > actual.Siguiente.Alumno.Carnet {
				aux_alumno = actual.Alumno
				actual.Alumno = actual.Siguiente.Alumno
				actual.Siguiente.Alumno = aux_alumno

				//aux_Pila = actual.Pila
				//actual.Pila = actual.Siguiente.Pila
				//actual.Siguiente.Pila = aux_Pila

			}
			actual = actual.Siguiente
		}

	}

}

func (Lista_doble *Lista_doble) Buscar_Alumno(Carnet_Alumno string, Password string) (existe bool, Estudiante Nodo_lista_doble) {

	var Inf int
	var Center int
	var Sup int
	var pos int

	//var Alumno_center Nodo_lista_doble

	Inf = 1
	Sup = Lista_doble.Size

	existe = false

	for Inf <= Sup {

		pos = 1

		Center = ((Sup + Inf) / 2)

		temp := Lista_doble.Last

		for pos < Center {

			temp = temp.Siguiente
			pos++

		}

		Alumno_center := temp

		if Alumno_center.Alumno.Carnet == Carnet_Alumno && Alumno_center.Alumno.Contrasena == Password {
			existe = true
			return existe, *Alumno_center
		} else if Carnet_Alumno < Alumno_center.Alumno.Carnet {
			Sup = Center - 1
		} else {
			Inf = Center + 1
		}

	}

	return existe, Estudiante

}

func (Lista_doble *Lista_doble) Graficar() (codigo string) {

	Codigo := "digraph Lista { \n"

	temp := Lista_doble.Last
	Nodo := ""

	temp_int := 1

	for temp != nil {

		if temp.Pila.Is_empty() {

			Nodo += temp.Alumno.Carnet + "[shape=box, label=\"" + temp.Alumno.Nombre + "\n" + temp.Alumno.Apellido + "\n" + temp.Alumno.Carnet + "\n" + temp.Alumno.Contrasena + "\" , style=filled]\n\n"

		} else {

			primero_int := temp_int
			primero_int_conexion := temp_int
			segundo_int_conexion := temp_int + 1

			Nodo += temp.Alumno.Carnet + "[shape=box, label=\"" + temp.Alumno.Nombre + "\n" + temp.Alumno.Apellido + "\n" + temp.Alumno.Carnet + "\n" + temp.Alumno.Contrasena + "\" , style=filled]\n\n"

			//Creacion de pila

			Nodo += "subgraph " + "Pila_" + temp.Alumno.Carnet + "{ \n"
			Nodo += "node [style=filled]; \n"

			actual_Pila := temp.Pila.Top

			//Nodos de la pila
			for actual_Pila != nil {

				Nodo += strconv.Itoa(temp_int) + "[shape=box, label=\"" + actual_Pila.Mensaje + "\n" + actual_Pila.Nombre + "\n" + actual_Pila.Fecha + "\n" + actual_Pila.Hora + "\" , \n style=filled]\n\n"

				actual_Pila = actual_Pila.Anterior
				temp_int++

			}

			//Conectar nodos de la pila

			actual_Pila = temp.Pila.Top
			siguiente_Pila := temp.Pila.Top.Anterior

			for siguiente_Pila != nil {
				Nodo += strconv.Itoa(primero_int_conexion) + "->" + strconv.Itoa(segundo_int_conexion) + " "

				actual_Pila = actual_Pila.Anterior
				siguiente_Pila = siguiente_Pila.Anterior

				primero_int_conexion++
				segundo_int_conexion++

			}

			Nodo += " \n }\n"

			Nodo += temp.Alumno.Carnet + "->" + strconv.Itoa(primero_int) + "\n"

			//Fin de nodos de pila

		}

		temp = temp.Siguiente
	}

	temp = Lista_doble.Last
	temp_siguiente := Lista_doble.Last.Siguiente

	Nodo += "{rank = same \n"

	for temp_siguiente != nil {

		Nodo += temp.Alumno.Carnet + "->" + temp_siguiente.Alumno.Carnet
		Nodo += " [dir=both, arrowsize=0.6]; \n"

		temp = temp.Siguiente
		temp_siguiente = temp_siguiente.Siguiente

	}

	Codigo += Nodo + "} \n }"

	return Codigo

}
