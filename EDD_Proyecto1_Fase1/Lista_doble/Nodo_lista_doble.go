package Lista_doble

import (
	"proyecto/Objects"
	"proyecto/Pila"
)

type Nodo_lista_doble struct {
	Alumno    Objects.Alumno
	Siguiente *Nodo_lista_doble
	Anterior  *Nodo_lista_doble
	Pila      *Pila.Pila
}
