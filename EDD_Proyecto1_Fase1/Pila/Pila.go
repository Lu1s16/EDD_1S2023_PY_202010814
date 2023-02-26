package Pila

import "strconv"

type Pila struct {
	Top  *Nodo_Pila
	Size int
}

func (Pila *Pila) Push(Mensaje string, Nombre string, Fecha string, Hora string) {

	Nuevo_nodo := &Nodo_Pila{Mensaje: Mensaje, Nombre: Nombre, Fecha: Fecha, Hora: Hora}

	if Pila.Top == nil {

		Pila.Top = Nuevo_nodo
	} else {
		Nuevo_nodo.Anterior = Pila.Top
		Pila.Top = Nuevo_nodo

	}

	Pila.Size++

}

func (Pila *Pila) Graficar() (dot string) {

	temp_int := 0

	temp := Pila.Top

	codigo := "digraph Pila {\n\n"

	for temp != nil {

		codigo += strconv.Itoa(temp_int) + "[shape=box, label=\"" + temp.Mensaje + "\n" + temp.Nombre + "\n" + temp.Fecha + "\n" + temp.Hora + "\" , style=filled]\n\n"

		temp_int++

		temp = temp.Anterior

	}

	temp = Pila.Top
	temp_siguiente := Pila.Top.Anterior
	primero_int := 0
	segundo_int := 1

	for temp_siguiente != nil {

		codigo += strconv.Itoa(primero_int) + "->" + strconv.Itoa(segundo_int) + " "

		temp = temp.Anterior
		temp_siguiente = temp.Anterior
		primero_int++
		segundo_int++

	}

	codigo += "\n}"

	return codigo

}

func (Pila *Pila) Is_empty() bool {

	if Pila.Top == nil {
		return true

	} else {

		return false

	}

}
