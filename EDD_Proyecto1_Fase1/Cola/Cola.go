package Cola

import (
	"proyecto/Objects"
	"strconv"
)

type Cola struct {
	Front *Nodo_cola
	Rear  *Nodo_cola
	Size  int
}

func (Cola *Cola) Insertar(Nombre string, Apellido string, Carnet string, Contrasena string) {

	Nuevo_alumno := Objects.Alumno{Nombre: Nombre, Apellido: Apellido, Carnet: Carnet, Contrasena: Contrasena}

	Nuevo_nodo := &Nodo_cola{Alumno: Nuevo_alumno}

	if Cola.Front == nil {
		Cola.Front = Nuevo_nodo
		Cola.Rear = Nuevo_nodo
		Cola.Size++

	} else {
		Nuevo_nodo.Siguiente = Cola.Rear
		Cola.Rear = Nuevo_nodo
		Cola.Size++

	}

}

func (Cola *Cola) Delete() {

	if Cola.Size == 1 {

		Cola.Front = nil
		Cola.Rear = nil
		Cola.Size--

	} else {

		temp := Cola.Rear

		for temp.Siguiente != Cola.Front {
			temp = temp.Siguiente
		}

		Cola.Front = temp
		temp.Siguiente = nil
		Cola.Size--
	}

}

func (Cola *Cola) Get_front() (Alumno *Objects.Alumno) {
	Estudiante := Cola.Front.Alumno

	return &Estudiante

}

func (Cola *Cola) Is_empty() (empty bool) {
	if Cola.Size == 0 {
		empty := true
		return empty
	} else {
		empty := false
		return empty
	}

}

func (Cola *Cola) Graficar() (Codigo_Graphviz string) {

	codigo := "digraph Cola { \n \n"

	nodos := ""
	temp := Cola.Rear
	cont := 1

	Str_cont := ""
	Str_nombre := ""
	Str_apellido := ""
	Str_carnet := ""
	Str_contrasena := ""

	for temp != nil {
		Str_cont = strconv.Itoa(cont)
		Str_nombre = temp.Alumno.Nombre
		Str_apellido = temp.Alumno.Apellido
		Str_carnet = temp.Alumno.Carnet
		Str_contrasena = temp.Alumno.Contrasena

		nodos += Str_cont + "[shape=box, label=\"" + Str_nombre + "\n" + Str_apellido + "\n" + Str_carnet + "\n" + Str_contrasena + "\", style=filled]\n\n"
		temp = temp.Siguiente
		cont++

	}

	if Cola.Size == 1 {
		codigo += nodos + "}"

		return codigo

	} else {

		temp2 := Cola.Rear
		Uniones := "{rank = same\n"
		cont = 1

		for temp2.Siguiente != nil {
			temp2 = temp2.Siguiente
			primero := strconv.Itoa(cont)
			segundo := strconv.Itoa(cont + 1)

			Uniones += primero + "->" + segundo + "[arrowsize=0.5]; \n"

			cont++

		}

		codigo += nodos + Uniones + "  }\n }"

		return codigo

	}

}
